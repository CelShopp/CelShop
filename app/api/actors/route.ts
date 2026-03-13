import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAdminPassword } from "@/lib/auth";
import { cookies } from "next/headers";

const slugify = (value: string) => value.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

export async function GET() {
  try {
    const actors = await prisma.actor.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        products: { select: { productId: true } },
      },
    });

    return NextResponse.json(
      actors.map((actor) => ({
        ...actor,
        productIds: actor.products.map((p) => p.productId),
        products: undefined,
      })),
    );
  } catch (error) {
    console.error("Fetch Actors Error:", error);
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
    const { name, image, productIds } = await req.json();
    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const slug = slugify(name);
    const ids: string[] = Array.isArray(productIds) ? productIds.filter(Boolean) : [];

    const actor = await prisma.actor.create({
      data: {
        name,
        slug,
        image: image || null,
        products: ids.length
          ? {
              createMany: {
                data: ids.map((productId) => ({ productId })),
                skipDuplicates: true,
              },
            }
          : undefined,
      },
      include: { products: { select: { productId: true } } },
    });

    return NextResponse.json({
      ...actor,
      productIds: actor.products.map((p) => p.productId),
      products: undefined,
    });
  } catch (error: any) {
    console.error("Create Actor Error:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "An actor with this name/slug already exists." }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to create actor" }, { status: 500 });
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
    const { id, name, image, productIds } = await req.json();
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const ids: string[] | undefined = Array.isArray(productIds) ? productIds.filter(Boolean) : undefined;

    const updated = await prisma.$transaction(async (tx) => {
      const actor = await tx.actor.update({
        where: { id },
        data: {
          ...(name !== undefined ? { name, slug: slugify(name) } : {}),
          ...(image !== undefined ? { image: image || null } : {}),
        },
      });

      if (ids) {
        await tx.actorProduct.deleteMany({ where: { actorId: id } });
        if (ids.length) {
          await tx.actorProduct.createMany({
            data: ids.map((productId) => ({ actorId: id, productId })),
            skipDuplicates: true,
          });
        }
      }

      const relations = await tx.actorProduct.findMany({ where: { actorId: id }, select: { productId: true } });
      return { actor, productIds: relations.map((r) => r.productId) };
    });

    return NextResponse.json({
      ...updated.actor,
      productIds: updated.productIds,
    });
  } catch (error: any) {
    console.error("Update Actor Error:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "An actor with this name/slug already exists." }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to update actor" }, { status: 500 });
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

    await prisma.actor.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete Actor Error:", error);
    return NextResponse.json({ error: "Failed to delete actor" }, { status: 500 });
  }
}

