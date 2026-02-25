import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAdminPassword } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("admin_auth")?.value;
    const adminPassword = getAdminPassword();

    if (adminAuth !== adminPassword) {
        return NextResponse.json({ error: "Access Denied: Unauthorized" }, { status: 403 });
    }

    try {
        const data = await req.json();

        const { name, slug, description, price, image, buyLink, collection, actorName, movie, isFeatured } = data;

        if (!name || !slug || !description || !price || !image || !buyLink || !collection) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                slug,
                description,
                price,
                image,
                buyLink,
                collection,
                actorName: actorName || null,
                movie: movie || null,
                // @ts-ignore - Prisma client may need a restart to recognize this new field
                isFeatured: !!isFeatured,
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error: any) {
        console.error("Archive Error:", error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "A product with this slug already exists." }, { status: 400 });
        }
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        await prisma.product.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error: any) {
        console.error("Delete Error:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
