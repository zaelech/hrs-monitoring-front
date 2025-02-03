"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/../app/i18n/client";
import { WithPermission } from "@/components/WithPermission";
import { User, Group } from "@prisma/client";

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
    const { t } = useTranslation(lng, "common");
    const [users, setUsers] = useState<UserWithGroups[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // États pour le formulaire de création
    const [newUser, setNewUser] = useState({
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Erreur lors de la création de l'utilisateur");
            })
            .then(() => {
                // Réinitialiser le formulaire et recharger les utilisateurs
                setNewUser({
                    name: "",
                    email: "",
                    password: "",
                    groupIds: [],
                });
                fetchUsers();
            })
            .catch((err) => setError(err instanceof Error ? err.message : "Une erreur est survenue"));
    };

    if (loading) return <div className="p-4">Chargement...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <WithPermission permission="MANAGE_USERS" fallback={<div className="p-4">Accès non autorisé</div>}>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>

                {/* Formulaire de création d'utilisateur */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">Créer un nouvel utilisateur</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Nom
                                <input
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
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
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Mot de passe
                                <input
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Groupes
                                <select
                                    multiple
                                    value={newUser.groupIds}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
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
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Créer l'utilisateur
                        </button>
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
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.groups.map((g) => g.group.name).join(", ")}</td>
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
