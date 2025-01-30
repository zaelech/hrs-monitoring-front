import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "HRS Monitoring",
    description: "HRS Monitoring System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
