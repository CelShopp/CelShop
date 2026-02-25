import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            select: {
                collection: true,
            },
            distinct: ['collection'],
        });

        // Handle multiple collections stored as comma-separated values
        const allCollections = new Set<string>();
        products.forEach(p => {
            p.collection.split(',').forEach(c => {
                const trimmed = c.trim();
                if (trimmed) allCollections.add(trimmed);
            });
        });

        return NextResponse.json(Array.from(allCollections).sort());
    } catch (error) {
        console.error("Fetch Collections Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
