import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAdminPassword } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const heroItems = await (prisma as any).heroItem.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(heroItems);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("admin_auth")?.value;
    const adminPassword = getAdminPassword();

    if (adminAuth !== adminPassword) {
        return NextResponse.json({ error: "Access Denied: Unauthorized" }, { status: 403 });
    }

    try {
        const data = await req.json();
        const { title, movieName, image, ctaLink } = data;

        if (!title || !movieName || !image || !ctaLink) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newHeroItem = await (prisma as any).heroItem.create({
            data: {
                title,
                movieName,
                image,
                ctaLink,
            },
        });

        return NextResponse.json(newHeroItem, { status: 201 });
    } catch (error: any) {
        console.error("Hero Post Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("admin_auth")?.value;
    const adminPassword = getAdminPassword();

    if (adminAuth !== adminPassword) {
        return NextResponse.json({ error: "Access Denied: Unauthorized" }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await (prisma as any).heroItem.delete({
            where: { id: id }
        });

        return NextResponse.json({ message: "Hero item deleted successfully" });
    } catch (error: any) {
        console.error("Hero Delete Error:", error);
        return NextResponse.json({ error: "Failed to delete hero item" }, { status: 500 });
    }
}
