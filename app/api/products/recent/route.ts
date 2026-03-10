import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 50;
    const skip = (page - 1) * limit;

    // Filter to last 250 products total
    // But since we only load 50 at once, and we want to allow paging through 250
    // We should cap the total available to 250.
    
    if (skip >= 250) {
      return NextResponse.json([]);
    }

    const take = Math.min(limit, 250 - skip);

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: take,
      skip: skip,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Recent Products API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
