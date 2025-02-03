// Dans /components/LayoutWrapper.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";

export default function LayoutWrapper({ children, lng }: { children: React.ReactNode; lng: string }) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const router = useRouter();
    const isLoginPage = pathname?.includes("/login") ?? false;

    useEffect(() => {
        if (status === "unauthenticated" && !isLoginPage) {
            router.push(`/${lng}/login`);
        }
    }, [status, isLoginPage, router, lng]);

    if (status === "loading") {
        return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
    }

    if (isLoginPage) {
        return (
            <>
                <Header lng={lng} />
                <div className="flex items-center justify-center min-h-screen">{children}</div>
            </>
        );
    }

    if (!session && !isLoginPage) {
        return null; // Prevent flash of content while redirecting
    }

    return (
        <>
            <Header lng={lng} />
            <div className="flex pt-12">
                <Sidebar lng={lng} />
                <div className="flex-1 ml-64">
                    <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
                </div>
            </div>
        </>
    );
}
