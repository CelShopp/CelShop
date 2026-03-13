import { prisma } from "@/lib/prisma";
import { getAdminPassword } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function GET() {
  try {
    const outfits = await prisma.outfitIdea.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        products: {
          select: { productId: true, order: true },
          orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        },
      },
    });

    return NextResponse.json(
      outfits.map((o) => ({
        ...o,
        productIds: o.products.map((p) => p.productId),
        products: undefined,
      })),
    );
  } catch (error) {
    console.error("Fetch Outfits Error:", error);
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
    const { title, image, description, productIds } = await req.json();
    if (!title || !image) return NextResponse.json({ error: "Title and image are required" }, { status: 400 });

    const slug = slugify(title);
    const ids: string[] = Array.isArray(productIds) ? productIds.filter(Boolean) : [];

    const outfit = await prisma.outfitIdea.create({
      data: {
        title,
        slug,
        image,
        description: description || null,
        products: ids.length
          ? {
              createMany: {
                data: ids.map((productId, index) => ({ productId, order: index })),
                skipDuplicates: true,
              },
            }
          : undefined,
      },
      include: { products: { select: { productId: true, order: true } } },
    });

    return NextResponse.json({
      ...outfit,
      productIds: outfit.products.map((p) => p.productId),
      products: undefined,
    });
  } catch (error: any) {
    console.error("Create Outfit Error:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "An outfit with this title/slug already exists." }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to create outfit" }, { status: 500 });
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
    const { id, title, image, description, productIds } = await req.json();
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const ids: string[] | undefined = Array.isArray(productIds) ? productIds.filter(Boolean) : undefined;

    const updated = await prisma.$transaction(async (tx) => {
      const outfit = await tx.outfitIdea.update({
        where: { id },
        data: {
          ...(title !== undefined ? { title, slug: slugify(title) } : {}),
          ...(image !== undefined ? { image } : {}),
          ...(description !== undefined ? { description: description || null } : {}),
        },
      });

      if (ids) {
        await tx.outfitProduct.deleteMany({ where: { outfitId: id } });
        if (ids.length) {
          await tx.outfitProduct.createMany({
            data: ids.map((productId, index) => ({ outfitId: id, productId, order: index })),
            skipDuplicates: true,
          });
        }
      }

      const relations = await tx.outfitProduct.findMany({
        where: { outfitId: id },
        select: { productId: true },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      });

      return { outfit, productIds: relations.map((r) => r.productId) };
    });

    return NextResponse.json({
      ...updated.outfit,
      productIds: updated.productIds,
    });
  } catch (error: any) {
    console.error("Update Outfit Error:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "An outfit with this title/slug already exists." }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to update outfit" }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await prisma.outfitIdea.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete Outfit Error:", error);
    return NextResponse.json({ error: "Failed to delete outfit" }, { status: 500 });
  }
}

