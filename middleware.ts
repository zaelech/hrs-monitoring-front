import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { languages, defaultLanguage } from "@/i18n/settings";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = languages.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = defaultLanguage;

        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
