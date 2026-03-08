import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAdminPassword } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const collections = await (prisma as any).collection.findMany({
            orderBy: { updatedAt: 'desc' }
        });

        if (collections.length === 0) {
            // Fallback: search products for collections if table is empty
            const products = await prisma.product.findMany({
                select: { collection: true },
                distinct: ['collection'],
            });
            const allCollections = new Set<string>();
            products.forEach(p => {
                p.collection.split(',').forEach(c => {
                    const trimmed = c.trim();
                    if (trimmed) allCollections.add(trimmed);
                });
            });
            return NextResponse.json(Array.from(allCollections).sort().map(name => ({
                name,
                slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
            })));
        }

        return NextResponse.json(collections);
    } catch (error) {
        console.error("Fetch Collections Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("admin_auth")?.value;
    const adminPassword = getAdminPassword();

    if (adminAuth !== adminPassword) {
        return NextResponse.json({ error: "Access Denied: Unauthorized" }, { status: 403 });
    }

    try {
        const { id, image, description } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const updatedCollection = await (prisma as any).collection.update({
            where: { id },
            data: { 
                image: image !== undefined ? image : undefined,
                description: description !== undefined ? description : undefined,
            }
        });

        return NextResponse.json(updatedCollection);
    } catch (error: any) {
        console.error("Update Collection Error:", error);
        return NextResponse.json({ error: "Failed to update collection" }, { status: 500 });
    }
}
