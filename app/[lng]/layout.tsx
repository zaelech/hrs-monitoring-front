import { Inter } from "next/font/google";
import "@/../app/globals.css";
import { languages } from "@/i18n/settings";
import LayoutWrapper from "@/components/LayoutWrapper";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

// Notez que nous recevons params comme un objet complet
export default async function Layout({ children, params }: { children: React.ReactNode; params: { lng: string } }) {
    // Nous pouvons accéder à lng ici
    const { lng } = params;

    return (
        <div className={`min-h-screen bg-gray-50/50 ${inter.className}`}>
            <Providers>
                <LayoutWrapper lng={lng}>{children}</LayoutWrapper>
            </Providers>
        </div>
    );
}
