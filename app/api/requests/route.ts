import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { content, email } = await req.json();

        if (!content) {
            return NextResponse.json({ error: "Content is required" }, { status: 400 });
        }

        const newRequest = await prisma.request.create({
            data: {
                content,
                email: email || null,
            },
        });

        return NextResponse.json(newRequest, { status: 201 });
    } catch (error) {
        console.error("Request Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const requests = await prisma.request.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(requests);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

