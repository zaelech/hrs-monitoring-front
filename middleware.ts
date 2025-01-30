// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { languages, defaultLanguage } from "@/i18n/settings";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Si l'URL est /sip/edit, rediriger vers /fr/sip/edit (ou la langue par défaut)
    const pathnameIsMissingLocale = languages.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);

    if (pathnameIsMissingLocale) {
        const locale = defaultLanguage;
        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
