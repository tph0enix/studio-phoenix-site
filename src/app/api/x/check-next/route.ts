import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const now = new Date();

        const nextPost = await prisma.trivia.findFirst({
            where: {
                datetime_scheduled_question: {
                    not: null,
                    lte: now,
                },
                datetime_posted_question: null,
            },
            orderBy: {
                datetime_scheduled_question: "asc",
            },
        });

        if(!nextPost) {
            return NextResponse.json({
                ok: true,
                message: "No scheduled posts are due right now.",
            });
        }

        return NextResponse.json({
            ok: true,
            message: "Found next due post.",
            post: nextPost,
        });
    } catch(error) {
        const message = error instanceof Error ? error.message : "Unknown error";

        return NextResponse.json(
            {
                ok: false,
                error: message,
            },
            { status: 500 }
        );
    }
}