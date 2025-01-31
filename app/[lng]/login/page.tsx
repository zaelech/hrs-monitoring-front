"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, FormEvent, use } from "react";
import { useTranslation } from "@/../app/i18n/client";

interface LoginPageProps {
    params: Promise<{
        lng: string;
    }>;
}

export default function LoginPage({ params }: LoginPageProps) {
    const { lng } = use(params);
    const { t } = useTranslation(lng, "common");
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(t("invalidCredentials"));
            } else if (result?.ok) {
                // Attendre un court instant pour s'assurer que la session est bien mise à jour
                await new Promise(resolve => setTimeout(resolve, 500));
                router.push(`/${lng}`);
                router.refresh();
            }
        } catch (e) {
            setError(t("loginError"));
            console.error("Erreur de connexion:", e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-sm w-full mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-center mb-6">{t("loginTitle")}</h1>

                    {error && <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                {t("username")}
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF6600] focus:border-[#FF6600]"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                {t("password")}
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF6600] focus:border-[#FF6600]"
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF6600] hover:bg-[#FF8533] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6600] disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? t("loading") : t("login")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
