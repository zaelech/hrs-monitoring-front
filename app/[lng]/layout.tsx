import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "@/../app/globals.css"; // Ajustez le chemin selon votre structure
import { languages } from "@/i18n/settings";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

export default function Layout({ children, params: { lng } }: { children: React.ReactNode; params: { lng: string } }) {
    return (
        <div className={`min-h-screen bg-gray-50/50 ${inter.className}`}>
            <Header lng={lng} />
            <div className="flex pt-12">
                <Sidebar lng={lng} />
                <div className="flex-1 ml-64">
                    <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
                </div>
            </div>
        </div>
    );
}
