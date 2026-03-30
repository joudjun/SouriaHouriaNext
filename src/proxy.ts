import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["fr", "ar"];
const DEFAULT_LOCALE = "fr";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip static assets and API routes
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // Check if pathname already starts with a valid locale
    const hasLocale = LOCALES.some(
        (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
    );

    if (!hasLocale) {
        // Check cookie preference first
        const cookieLocale = request.cookies.get("sh-locale")?.value;
        if (cookieLocale && LOCALES.includes(cookieLocale)) {
            return NextResponse.redirect(
                new URL(
                    `/${cookieLocale}${pathname === "/" ? "" : pathname}`,
                    request.url,
                ),
            );
        }

        // Fall back to default locale
        return NextResponse.redirect(
            new URL(
                `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`,
                request.url,
            ),
        );
    }

    // Set locale header for the root layout and security headers
    const locale = LOCALES.find(
        (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
    )!;
    const response = NextResponse.next();
    response.headers.set("x-locale", locale);
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "SAMEORIGIN");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
