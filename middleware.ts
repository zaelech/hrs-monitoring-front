import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { languages, defaultLanguage } from "./app/i18n/settings";
import { auth } from "./app/auth";

export default auth((req) => {
    const pathname = req.nextUrl.pathname;
    const session = req.auth;
    console.log("Middleware - Session:", session);
    console.log("Middleware - pathname:", pathname);

    if (pathname.startsWith("/api/")) {
        console.log("Middleware - API route detected");
        return NextResponse.next();
    }

    // Gérer d'abord la redirection de langue pour la page de login
    if (pathname === "/fr/login") {
        console.log("Middleware - Login page detected");
        return NextResponse.next();
    }

    const pathnameIsMissingLocale = languages.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);
    console.log("Middleware - Missing locale:", pathnameIsMissingLocale);

    if (pathname === "/" || pathnameIsMissingLocale) {
        const locale = defaultLanguage;
        const newUrl = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, req.url);
        newUrl.search = req.nextUrl.search;
        console.log("Middleware - Redirecting to:", newUrl.toString());
        return NextResponse.redirect(newUrl);
    }

    console.log("Middleware - Continuing to next middleware");
    return NextResponse.next();
});
