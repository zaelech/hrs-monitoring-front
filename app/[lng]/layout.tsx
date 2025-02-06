import { Inter } from "next/font/google";
import "@/../app/globals.css";
import { languages } from "@/i18n/settings";
import LayoutWrapper from "@/components/LayoutWrapper";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ lng: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
    // Attendre la résolution des paramètres
    const { lng } = await params;

    return (
        <div className={`min-h-screen bg-classic ${inter.className}`}>
            <Providers>
                <LayoutWrapper lng={lng}>{children}</LayoutWrapper>
            </Providers>
        </div>
    );
}
