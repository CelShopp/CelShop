import { NextResponse } from "next/server";
import { getAdminPassword } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { password } = await req.json();
        const adminPassword = getAdminPassword();

        if (password === adminPassword) {
            const response = NextResponse.json({ success: true });

            // Set cookie that expires in 30 days
            response.cookies.set("admin_auth", adminPassword, {
                httpOnly: false, // Allow client-side check to see the cookie
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: "/",
            });

            return response;
        }

        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
