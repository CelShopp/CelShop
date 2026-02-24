import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Block all /admin routes and admin-only API routes in production
    const isAdminPage = pathname.startsWith("/admin");
    const isAdminApi = pathname === "/api/requests" && request.method === "GET";
    const isProductPostApi = pathname === "/api/products" && request.method === "POST";

    if (isAdminPage || isAdminApi || isProductPostApi) {
        // Only allow from localhost in development
        const host = request.headers.get("host") || "";
        const isLocalhost =
            host.startsWith("localhost") ||
            host.startsWith("127.0.0.1") ||
            host.startsWith("[::1]");

        const isDev = process.env.NODE_ENV === "development";

        if (!isDev || !isLocalhost) {
            return NextResponse.json(
                { error: "Access Denied" },
                { status: 403 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/products", "/api/requests"],
};
