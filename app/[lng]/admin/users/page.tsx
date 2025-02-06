"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/../app/i18n/client";
import { WithPermission } from "@/components/WithPermission";
import { User, Group } from "@prisma/client";
import { PageHeader } from "@/components/common/PageHeader";

interface PageProps {
    params: Promise<{
        lng: string;
    }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

type UserWithGroups = User & {
    groups: Array<{
        group: Group;
    }>;
};

function UsersPageClient({ lng }: { lng: string }) {
    const { t } = useTranslation(lng, "user");
    const [users, setUsers] = useState<UserWithGroups[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState<UserWithGroups | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        groupIds: [] as string[],
    });

    // Chargement des utilisateurs
    const fetchUsers = () => {
        fetch("/api/users")
            .then((response) => {
                if (!response.ok) throw new Error("Erreur lors du chargement des utilisateurs");
                return response.json();
            })
            .then((data) => setUsers(data))
            .catch((err) => setError(err instanceof Error ? err.message : "Une erreur est survenue"));
    };

    // Chargement des groupes
    const fetchGroups = () => {
        fetch("/api/groups")
            .then((response) => {
                if (!response.ok) throw new Error("Erreur lors du chargement des groupes");
                return response.json();
            })
            .then((data) => setGroups(data))
            .catch((err) => setError(err instanceof Error ? err.message : "Une erreur est survenue"))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchUsers();
        fetchGroups();
    }, []);

    useEffect(() => {
        if (editingUser) {
            setFormData({
                name: editingUser.name,
                email: editingUser.email,
                password: "", // On ne remplit pas le mot de passe pour des raisons de sécurité
                groupIds: editingUser.groups.map((g) => g.group.id),
            });
        } else {
            setFormData({
                name: "",
                email: "",
                password: "",
                groupIds: [],
            });
        }
    }, [editingUser]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingUser ? `/api/users/${editingUser.id}` : "/api/users";
        const method = editingUser ? "PUT" : "POST";

        fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error(editingUser ? "Erreur lors de la mise à jour de l'utilisateur" : "Erreur lors de la création de l'utilisateur");
            })
            .then(() => {
                // Réinitialiser le formulaire et recharger les utilisateurs
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    groupIds: [],
                });
                setEditingUser(null);
                fetchUsers();
            })
            .catch((err) => setError(err instanceof Error ? err.message : "Une erreur est survenue"));
    };

    const handleCancel = () => {
        setEditingUser(null);
        setFormData({
            name: "",
            email: "",
            password: "",
            groupIds: [],
        });
    };

    if (loading) return <div className="p-4">Chargement...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <WithPermission permission="MANAGE_USERS" fallback={<div className="p-4">Accès non autorisé</div>}>
            <div className="p-4">
                <PageHeader items={[]} currentLabel={t("title")} title={t("title")} lng={lng} />

                {/* Formulaire de création d'utilisateur */}
                <div className="bg-surface p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">{editingUser ? "Modifier l'utilisateur" : "Créer un nouvel utilisateur"}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Nom
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                {editingUser ? "Nouveau mot de passe (laisser vide pour ne pas changer)" : "Mot de passe"}
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required={!editingUser}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Groupes
                                <select
                                    multiple
                                    value={formData.groupIds}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            groupIds: Array.from(e.target.selectedOptions, (option) => option.value),
                                        })
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    {groups.map((group) => (
                                        <option key={group.id} value={group.id}>
                                            {group.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {editingUser ? "Mettre à jour" : "Créer l'utilisateur"}
                            </button>
                            {editingUser && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Annuler
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Liste des utilisateurs */}
                <div className="bg-white rounded-lg shadow-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Groupes</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.groups.map((g) => g.group.name).join(", ")}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button onClick={() => setEditingUser(user)} className="text-indigo-600 hover:text-indigo-900">
                                            Modifier
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </WithPermission>
    );
}

export default async function UsersPage({ params, searchParams }: PageProps) {
    const { lng } = await params;
    return <UsersPageClient lng={lng} />;
}
