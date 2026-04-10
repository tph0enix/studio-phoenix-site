import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const created = await prisma.trivia.create({
            data: {},
        });

        return NextResponse.redirect(new URL("/admin/trivia", req.url));
    } catch(error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Create failed", },
            { status: 500 }
        );
    }
}