import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { languages, defaultLanguage } from "./app/i18n/settings";
import { auth } from "./app/auth";

export default auth((req) => {
    // Votre logique de middleware existante pour i18n
    const pathname = req.nextUrl.pathname;
    const pathnameIsMissingLocale = languages.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);

    if (pathnameIsMissingLocale) {
        return NextResponse.redirect(new URL(`/${defaultLanguage}${pathname}`, req.url));
    }
});

// La configuration du matcher reste la même
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next/.*|$).*)"],
};
