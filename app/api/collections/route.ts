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
            });
            const allCollections = new Set<string>();
            products.forEach(p => {
                p.collection.split(',').forEach(c => {
                    const trimmed = c.trim();
                    if (trimmed) allCollections.add(trimmed);
                });
            });
            return NextResponse.json(Array.from(allCollections).sort().map(name => ({
                id: name,
                name,
                slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
                image: null,
                description: null,
                showInHome: false
            })));
        }

        return NextResponse.json(collections);
    } catch (error) {
        console.error("Fetch Collections Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("admin_auth")?.value;
    const adminPassword = getAdminPassword();

    if (adminAuth !== adminPassword) {
        return NextResponse.json({ error: "Access Denied" }, { status: 403 });
    }

    try {
        const { name, image, description, showInHome } = await req.json();
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

        const newCollection = await (prisma as any).collection.create({
            data: {
                name,
                slug,
                image,
                description,
                showInHome: !!showInHome
            }
        });

        return NextResponse.json(newCollection);
    } catch (error: any) {
        console.error("Create Collection Error:", error);
        return NextResponse.json({ error: error.message || "Failed to create collection" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("admin_auth")?.value;
    const adminPassword = getAdminPassword();

    if (adminAuth !== adminPassword) {
        return NextResponse.json({ error: "Access Denied" }, { status: 403 });
    }

    try {
        const { id, name, image, description, showInHome } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const data: any = {};
        if (name !== undefined) {
            data.name = name;
            data.slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        }
        if (image !== undefined) data.image = image;
        if (description !== undefined) data.description = description;
        if (showInHome !== undefined) data.showInHome = !!showInHome;

        // Try to update by ID first. If not found, it might be a fallback "ghost" collection, 
        // so we try to find by name and update, or create a new record.
        let updatedCollection;
        try {
            updatedCollection = await (prisma as any).collection.update({
                where: { id },
                data
            });
        } catch (updateError: any) {
            // If the record doesn't exist in the Collection table yet
            if (updateError.code === 'P2025') {
                updatedCollection = await (prisma as any).collection.upsert({
                    where: { name: name || id },
                    update: data,
                    create: {
                        name: name || id,
                        slug: (name || id).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
                        image: image || null,
                        description: description || null,
                        showInHome: !!showInHome
                    }
                });
            } else {
                throw updateError;
            }
        }

        return NextResponse.json(updatedCollection);
    } catch (error: any) {
        console.error("Update Collection Error:", error);
        return NextResponse.json({ error: error.message || "Failed to update collection" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("admin_auth")?.value;
    const adminPassword = getAdminPassword();

    if (adminAuth !== adminPassword) {
        return NextResponse.json({ error: "Access Denied" }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await (prisma as any).collection.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Delete Collection Error:", error);
        return NextResponse.json({ error: "Failed to delete collection" }, { status: 500 });
    }
}
