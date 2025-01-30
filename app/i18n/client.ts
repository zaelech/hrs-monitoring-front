"use client";

import { useEffect, useState } from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions } from "./settings";
import LanguageDetector from "i18next-browser-languagedetector";

// Initialisation de i18next
if (!i18next.isInitialized) {
    i18next
        .use(initReactI18next)
        .use(LanguageDetector)
        .use(resourcesToBackend((language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)))
        .init({
            ...getOptions(),
            detection: {
                order: ["path", "htmlTag", "cookie", "navigator"],
            },
            fallbackLng: false,
            supportedLngs: ["fr", "en", "de", "it"],
            load: "currentOnly",
        });
}

export function useTranslation(lng: string, ns: string) {
    const [initialized, setInitialized] = useState(false);
    const ret = useTranslationOrg(ns, { useSuspense: false });
    const { i18n } = ret;

    useEffect(() => {
        // Premier chargement
        if (!initialized && lng && i18n.resolvedLanguage !== lng) {
            i18n.changeLanguage(lng).then(() => {
                setInitialized(true);
                console.log("Initial language set to:", lng);
            });
        }
        // Changement de langue ultérieur
        else if (initialized && lng && i18n.resolvedLanguage !== lng) {
            console.log("Changing language from", i18n.resolvedLanguage, "to", lng);
            i18n.changeLanguage(lng).then(() => {
                console.log("Language changed to:", lng);
            });
        }
    }, [lng, i18n, initialized]);

    // Forcer le rechargement des ressources au changement de langue
    useEffect(() => {
        if (!initialized) return;

        const reloadResources = async () => {
            await i18n.reloadResources();
            console.log("Resources reloaded for language:", i18n.resolvedLanguage);
        };

        reloadResources();
    }, [i18n.resolvedLanguage, initialized]);

    return ret;
}
