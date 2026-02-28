import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { slug, actorName, movie, image, products } = body;

    const look = await prisma.actorLook.create({
      data: {
        slug,
        actorName,
        movie,
        image,
        products: {
          create: products,
        },
      },
      include: { products: true },
    });

    return NextResponse.json(look);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create look" }, { status: 500 });
  }
}