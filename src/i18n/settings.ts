export const languages = ["fr", "it", "de"];
export const defaultLanguage = "fr";

export function getOptions(lng = defaultLanguage) {
    return {
        supportedLngs: languages,
        fallbackLng: defaultLanguage,
        lng,
    };
}
