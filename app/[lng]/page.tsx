"use client";

import { useTranslation } from "@/../app/i18n/client";
import { defaultLanguage } from "@/../app/i18n/settings";
import { use } from "react";

interface PageProps {
    params: Promise<{
        lng: string;
    }>;
}

export default function HomePage({ params }: PageProps) {
    const { lng } = use(params);
    const { t } = useTranslation(lng || defaultLanguage, "common");

    return (
        <div className="flex h-screen items-center justify-center">
            <h1 className="text-4xl font-bold">{t("welcome")}</h1>
        </div>
    );
}
