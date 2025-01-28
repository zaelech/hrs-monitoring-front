import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen bg-gray-50/50">
                    <Header />
                    <div className="flex pt-12">
                        <Sidebar />
                        <div className="flex-1 ml-64">
                            <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
