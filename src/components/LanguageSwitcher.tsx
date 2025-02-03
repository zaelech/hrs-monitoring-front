"use client";
import { usePathname, useRouter } from "next/navigation";
import { languages } from "@/i18n/settings";

interface LanguageSwitcherProps {
    lng: string;
}

const LanguageSwitcher = ({ lng }: LanguageSwitcherProps) => {
    const pathname = usePathname();
    const router = useRouter();

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

    const handleLanguageChange = (newLang: string) => {
        const newPath = getNewPath(newLang);
        // Utiliser window.location pour forcer un rechargement complet
        window.location.href = newPath;
    };

    return (
        <div className="ml-auto flex gap-2">
            {languages.map((l) => (
                <button
                    key={l}
                    onClick={() => handleLanguageChange(l)}
                    className={`text-white hover:text-gray-200 text-sm ${l === lng ? "font-bold underline" : "font-normal"}`}
                >
                    {l.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
