import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAdminPassword } from "@/lib/auth";
import { cookies } from "next/headers";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("admin_auth")?.value;
    const adminPassword = getAdminPassword();

    if (adminAuth !== adminPassword) {
        return NextResponse.json({ error: "Access Denied" }, { status: 403 });
    }

    try {
        const data = await req.json();
        const { title, movieName, image, ctaLink } = data;

        const updated = await (prisma as any).heroItem.update({
            where: { id },
            data: {
                title,
                movieName,
                image,
                ctaLink,
            },
        });

        return NextResponse.json(updated);
    } catch (error: any) {
        console.error("Hero Update Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
