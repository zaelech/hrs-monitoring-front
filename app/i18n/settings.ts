export const languages = ["fr", "en", "de", "it"];
export const defaultLanguage = "fr";

export const fallbackLng = defaultLanguage;
export const cookieName = "i18next";

export function getOptions(lng = fallbackLng, ns = "common") {
    return {
        supportedLngs: languages,
        fallbackLng,
        lng,
        ns,
    };
}
