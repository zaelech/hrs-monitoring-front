"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { languages } from "@/i18n/settings";

interface LanguageSwitcherProps {
    lng: string;
}

const LanguageSwitcher = ({ lng }: LanguageSwitcherProps) => {
    const pathname = usePathname();

    const getNewPath = (newLang: string) => {
        if (!pathname) return `/${newLang}`;
        
        // Diviser le pathname en segments
        const segments = pathname.split("/").filter(Boolean);
        // Remplacer le premier segment (la langue) par la nouvelle langue
        if (segments.length > 0) {
            segments[0] = newLang;
        }
        // Reconstruire le chemin
        return `/${segments.join("/")}`;
    };

    return (
        <div className="ml-auto flex gap-2">
            {languages.map((l) => (
                <Link key={l} href={getNewPath(l)} className={`text-white hover:text-gray-200 text-sm ${l === lng ? "font-bold underline" : "font-normal"}`}>
                    {l.toUpperCase()}
                </Link>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
