import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow the login page and the login API to be accessed without auth
    if (pathname === "/admin/login" || pathname === "/api/admin/login") {
        return NextResponse.next();
    }

    const isAdminPage = pathname.startsWith("/admin");
    const isAdminApi = pathname === "/api/requests" && request.method === "GET";
    const isProductPostApi = pathname === "/api/products" && request.method === "POST";

    if (isAdminPage || isAdminApi || isProductPostApi) {
        const authCookie = request.cookies.get("admin_auth")?.value;
        const adminPassword = process.env.ADMIN_PASSWORD;

        // If in development and on localhost, allow access (for your convenience)
        const host = request.headers.get("host") || "";
        const isLocalhost = host.startsWith("localhost") || host.startsWith("127.0.0.1") || host.startsWith("[::1]");
        const isDev = process.env.NODE_ENV === "development";

        const isAuthenticated = authCookie === adminPassword;

        if (!isAuthenticated && (!isDev || !isLocalhost)) {
            // If it's a page request, redirect to login
            if (isAdminPage) {
                const loginUrl = new URL("/admin/login", request.url);
                return NextResponse.redirect(loginUrl);
            }

            // If it's an API request, return 401
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/products", "/api/requests", "/api/admin/login"],
};
