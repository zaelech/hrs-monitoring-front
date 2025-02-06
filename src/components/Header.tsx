"use client";
import { useTranslation } from "@/../app/i18n/client";
import LanguageSwitcher from "./LanguageSwitcher";
import { useEffect, useState } from "react";
import Link from "next/link";

interface HeaderProps {
    lng: string;
}

const Header = ({ lng }: HeaderProps) => {
    const { t, i18n } = useTranslation(lng, "common");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <header className="h-12 bg-primary fixed top-0 left-0 right-0 z-50 flex items-center px-4">
            <Link href={`/${lng}`} className="flex items-center">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 654.5 453.1" className="h-6">
                    <g fill="#fff">
                        <path d="M85.8,128.7V0H0v324.5h85.8v-110H110v238.7h85.8V200.6c0-39.8-32.2-72-72-72L85.8,128.7L85.8,128.7z"></path>
                        <path d="M654.5,128.7H512.1c-39.8,0-72,32.3-72,72v38h-110v85.8h123.8c39.8,0,72-32.2,72-72v-13.8v-24.3h128.7L654.5,128.7L654.5,128.7z"></path>
                        <path d="M415.9,214.4v-13.8c0-39.8-32.2-72-72-72H220.1v6.9v188.9h85.8v-110L415.9,214.4L415.9,214.4z"></path>
                    </g>
                </svg>
                <h1 className="ml-4 text-white font-medium">{isClient ? t("title") : "Monitoring de Projet"}</h1>
            </Link>
            <LanguageSwitcher lng={lng} />
        </header>
    );
};

export default Header;
