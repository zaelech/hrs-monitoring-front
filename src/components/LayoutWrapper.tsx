// Dans /components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function LayoutWrapper({ children, lng }: { children: React.ReactNode; lng: string }) {
    const pathname = usePathname();
    const isLoginPage = pathname?.includes("/login") ?? false;

    if (isLoginPage) {
        return (
            <>
                <Header lng={lng} />
                <div className="flex items-center justify-center min-h-screen">{children}</div>
            </>
        );
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
