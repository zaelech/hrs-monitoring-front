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
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            console.log(result);

            if (result?.error) {
                setError(t("invalidCredentials"));
            } else if (result?.ok) {
                console.log("result ok");
                // Attendre un court instant pour s'assurer que la session est bien mise à jour
                await new Promise((resolve) => setTimeout(resolve, 1000));
                console.log("Redirection vers la page d'accueil");
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
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold">{t("loginTitle")}</h1>
                </div>
                <form onSubmit={handleSubmit} className="bg-surface space-y-6 p-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            {t("email")}
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            {t("password")}
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            disabled={isLoading}
                        />
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-md bg-content px-4 py-2 text-white hover:bg-content-hover focus:outline-none focus:ring-2 focus:ring-content-hover focus:ring-offset-2 disabled:opacity-50"
                    >
                        {isLoading ? t("loading") : t("login")}
                    </button>
                </form>
            </div>
        </div>
    );
}
