import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { languages, defaultLanguage } from "./app/i18n/settings";
import { auth } from "./app/auth";

export default auth((req) => {
    const pathname = req.nextUrl.pathname;

    // Si on est à la racine, rediriger vers la langue par défaut
    if (pathname === "/") {
        return NextResponse.redirect(new URL(`/${defaultLanguage}`, req.url));
    }

    // Vérifier si le chemin contient déjà un code de langue
    const pathnameIsMissingLocale = languages.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Si le chemin n'a pas de locale, ajouter la langue par défaut
    if (pathnameIsMissingLocale) {
        return NextResponse.redirect(new URL(`/${defaultLanguage}${pathname}`, req.url));
    }
});

// Configuration du matcher pour exclure les ressources statiques et les API
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next/.*|$).*)"],
};
