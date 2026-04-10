import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function toDateOrNull(value: string | null | undefined) {
    if(!value) return null;
    return new Date(value);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const updated = await prisma.trivia.update({
            where: { item_id: body.item_id },
            data: {
                item_name: body.item_name,
                topic_level_1: body.topic_level_1,
                topic_level_2: body.topic_level_2,

                is_checked_fact: body.answer_links_url !== null,
                is_checked_voice: body.is_checked_voice,
                is_checked_hook: body.is_checked_hook,
                is_checked_interest: body.is_checked_interest,
                is_checked_conciseness: body.is_checked_conciseness,

                is_posted_question: (toDateOrNull(body.datetime_posted_question) !== null) && (body.question_post_link_urlstub !== null),
                is_posted_answer: (toDateOrNull(body.datetime_posted_answer) !== null) && (body.answer_post_link_urlstub !== null),
                is_staged_question: toDateOrNull(body.datetime_scheduled_question) !== null,
                is_staged_answer: toDateOrNull(body.datetime_scheduled_answer) !== null,

                datetime_scheduled_question: toDateOrNull(body.datetime_scheduled_question),
                datetime_scheduled_answer: toDateOrNull(body.datetime_scheduled_answer),
                datetime_posted_question: toDateOrNull(body.datetime_posted_question),
                datetime_posted_answer: toDateOrNull(body.datetime_posted_answer),

                question_opener: body.question_opener,
                question_raw: body.question_raw,
                answer_raw: body.answer_raw,
                answer_notes: body.answer_notes,

                question_images_url: body.question_images_url,
                question_source_links_url: body.question_source_links_url,
                question_post_link_urlstub: body.question_post_link_urlstub,
                answer_links_url: body.answer_links_url,
                answer_post_link_urlstub: body.answer_post_link_urlstub
            }
        });

        return NextResponse.json(updated);
    } catch(error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Update failed", },
            { status: 500 }
        );
    }
}