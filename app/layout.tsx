import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { dir } from "i18next";
import { languages, defaultLanguage } from "@/i18n/settings";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params: { lng } }: { children: React.ReactNode; params: { lng: string } }) {
    return (
        <html lang={lng} dir={dir(lng)}>
            <body className={inter.className}>
                <div className="min-h-screen bg-gray-50/50">
                    <Header lng={lng} />
                    <div className="flex pt-12">
                        <Sidebar lng={lng} />
                        <div className="flex-1 ml-64">
                            <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
