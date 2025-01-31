"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    // Cette fonction sera appelée lors de la soumission du formulaire
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        // Tentative de connexion avec next-auth
        const result = await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false, // Nous gérons la redirection nous-mêmes
        });

        if (result?.error) {
            // En cas d'erreur, on l'affiche à l'utilisateur
            setError("Identifiants invalides");
        } else {
            // En cas de succès, on redirige vers la page d'accueil
            router.push("/");
            router.refresh(); // Important pour mettre à jour l'état d'authentification
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-8 text-center">Connexion</h2>

                {error && <div className="mb-4 p-4 text-red-500 bg-red-50 rounded">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Nom d'utilisateur
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                        </div>

                        <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                            Se connecter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
