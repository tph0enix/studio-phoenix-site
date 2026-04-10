"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TriviaItem } from "@/types/trivia";

function formatForDateTimeLocal(value: string | Date | null | undefined) {
    if(!value) return "";

    const date = new Date(value);
    const pad = (n: number) => String(n).padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function TriviaEditor({ item }: TriviaItem) {
    const [itemName, setItemName] = useState(item.item_name ?? "");

    const [itemTopicLevel1, setItemTopicLevel1] = useState(item.topic_level_1 ?? "");
    const [itemTopicLevel2, setItemTopicLevel2] = useState(item.topic_level_2 ?? "");

    //const [itemIsCheckedFact, setItemIsCheckedFact] = useState(item.is_checked_fact ?? false);
    const [itemIsCheckedVoice, setItemIsCheckedVoice] = useState(item.is_checked_voice ?? false);
    const [itemIsCheckedHook, setItemIsCheckedHook] = useState(item.is_checked_hook ?? false);
    const [itemIsCheckedInterest, setItemIsCheckedInterest] = useState(item.is_checked_interest ?? false);
    const [itemIsCheckedConciseness, setItemIsCheckedConciseness] = useState(item.is_checked_conciseness ?? false);
    //const [itemIsPostedQuestion, setItemIsPostedQuestion] = useState(item.is_posted_question ?? false);
    //const [itemIsPostedAnswer, setItemIsPostedAnswer] = useState(item.is_posted_answer ?? false);
    //const [itemIsStagedQuestion, setItemIsStagedQuestion] = useState(item.is_staged_question ?? false);
    //const [itemIsStagedAnswer, setItemIsStagedAnswer] = useState(item.is_staged_answer ?? false);

    const [itemDTScheduledQuestion, setItemDTScheduledQuestion] = useState(formatForDateTimeLocal(item.datetime_scheduled_question));
    const [itemDTScheduledAnswer, setItemDTScheduledAnswer] = useState(formatForDateTimeLocal(item.datetime_scheduled_answer));
    const [itemDTPostedQuestion, setItemDTPostedQuestion] = useState(formatForDateTimeLocal(item.datetime_posted_question));
    const [itemDTPostedAnswer, setItemDTPostedAnswer] = useState(formatForDateTimeLocal(item.datetime_posted_answer));

    const [itemQuestionOpener, setItemQuestionOpener] = useState(item.question_opener ?? "");
    const [itemQuestionRaw, setItemQuestionRaw] = useState(item.question_raw ?? "");
    const [itemAnswerRaw, setItemAnswerRaw] = useState(item.answer_raw ?? "");
    const [itemAnswerNotes, setItemAnswerNotes] = useState(item.answer_notes ?? "");

    const [itemQuestionImagesURL, setItemQuestionImagesURL] = useState(item.question_images_url ?? "");
    const [itemQuestionSourceLinksURL, setItemQuestionSourceLinksURL] = useState(item.question_source_links_url ?? "");
    const [itemQuestionURLStub, setItemQuestionURLStub] = useState(item.question_post_link_urlstub ?? "");
    const [itemAnswerLinksURL, setItemAnswerLinksURL] = useState(item.answer_links_url ?? "");
    const [itemAnswerURLStub, setItemAnswerURLStub] = useState(item.answer_post_link_urlstub ?? "");

    const [saving, setSaving] = useState(false);
    const router = useRouter();

    async function handleSave() {
        setSaving(true);

        const res = await fetch("/api/trivia/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                item_id: item.item_id,
                item_name: itemName,
                topic_level_1: itemTopicLevel1,
                topic_level_2: itemTopicLevel2,

                //is_checked_fact: itemIsCheckedFact,
                is_checked_voice: itemIsCheckedVoice,
                is_checked_hook: itemIsCheckedHook,
                is_checked_interest: itemIsCheckedInterest,
                is_checked_conciseness: itemIsCheckedConciseness,
                //is_posted_question: itemIsPostedQuestion,
                //is_posted_answer: itemIsPostedAnswer,
                //is_staged_question: itemIsStagedQuestion,
                //is_staged_answer: itemIsStagedAnswer,

                datetime_scheduled_question: itemDTScheduledQuestion,
                datetime_scheduled_answer: itemDTScheduledAnswer,
                datetime_posted_question: itemDTPostedQuestion,
                datetime_posted_answer: itemDTPostedAnswer,

                question_opener: itemQuestionOpener,
                question_raw: itemQuestionRaw,
                answer_raw: itemAnswerRaw,
                answer_notes: itemAnswerNotes,

                question_images_url: itemQuestionImagesURL,
                question_source_links_url: itemQuestionSourceLinksURL,
                question_post_link_urlstub: itemQuestionURLStub,
                answer_links_url: itemAnswerLinksURL,
                answer_post_link_urlstub: itemAnswerURLStub
            }),
        });

        const data = await res.json();
        console.log("SAVE RESPONSE: ", data);

        if(!res.ok) {
            throw new Error(data.error || "Save failed");
        }

        router.refresh();
        setSaving(false);
    }

    return (
        <div className="border-x border-b border-neutral-800 bg-neutral-800 rounded-b-2xl p-4">

            {/* general info */}
            <div className="space-y-2">
                <label className="text-sm">Item Name</label>
                <input
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md"
                />
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm">Topic (Level 1)</label>
                    <input
                        value={itemTopicLevel1}
                        onChange={(e) => setItemTopicLevel1(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm">Topic (Level 2)</label>
                    <input
                        value={itemTopicLevel2}
                        onChange={(e) => setItemTopicLevel2(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md"
                    />
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={itemIsCheckedVoice}
                        onChange={(e) => setItemIsCheckedVoice(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Voice Checked?
                </label>

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={itemIsCheckedHook}
                        onChange={(e) => setItemIsCheckedHook(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Hook Checked?
                </label>

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={itemIsCheckedInterest}
                        onChange={(e) => setItemIsCheckedInterest(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Interest Checked?
                </label>
                
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={itemIsCheckedConciseness}
                        onChange={(e) => setItemIsCheckedConciseness(e.target.checked)}
                        className="h-4 w-4"
                    />
                    Conciseness Checked?
                </label>
            </div>

            <div className="grid grid-cols-2 gap-6">

                {/* question info */}
                <div className="space-y-3">

                    <div className="text-sm font-semibold text-purple-300">Question</div>

                    <label className="text-sm">Opener</label>
                    <input
                        value={itemQuestionOpener}
                        onChange={(e) => setItemQuestionOpener(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md text-sm"
                    />

                    <label className="text-sm">Question</label>
                    <textarea
                        value={itemQuestionRaw}
                        onChange={(e) => setItemQuestionRaw(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md text-sm"
                        rows={3}
                    />

                    <div className="space-y-2">
                        <label className="text-sm">Question Scheduled</label>
                        <input
                            type="datetime-local"
                            value={itemDTScheduledQuestion}
                            onChange={(e) => setItemDTScheduledQuestion(e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm">Question Posted</label>
                        <input
                            type="datetime-local"
                            value={itemDTPostedQuestion}
                            onChange={(e) => setItemDTPostedQuestion(e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md"
                        />
                    </div>

                    <label className="text-sm">Question Image URL</label>
                    <input
                        value={itemQuestionImagesURL}
                        onChange={(e) => setItemQuestionImagesURL(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md"
                    />

                    <label className="text-sm">Question Source URL</label>
                    <input
                        value={itemQuestionSourceLinksURL}
                        onChange={(e) => setItemQuestionSourceLinksURL(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md"
                    />

                    <label className="text-sm">Question Post URL Stub</label>
                    <input
                        value={itemQuestionURLStub}
                        onChange={(e) => setItemQuestionURLStub(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md"
                    />

                </div>

                {/* answer info */}
                <div className="space-y-3">

                    <div className="text-sm font-semibold text-red-300">Answer</div>

                    <label className="text-sm">Answer</label>
                    <textarea
                        value={itemAnswerRaw}
                        onChange={(e) => setItemAnswerRaw(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md text-sm"
                        rows={3}
                    />

                    <label className="text-sm">Notes (goes in replies)</label>
                    <textarea
                        value={itemAnswerNotes}
                        onChange={(e) => setItemAnswerNotes(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md text-sm"
                        rows={3}
                    />

                    <div className="space-y-2">
                        <label className="text-sm">Answer Scheduled</label>
                        <input
                            type="datetime-local"
                            value={itemDTScheduledAnswer}
                            onChange={(e) => setItemDTScheduledAnswer(e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm">Answer Posted</label>
                        <input
                            type="datetime-local"
                            value={itemDTPostedAnswer}
                            onChange={(e) => setItemDTPostedAnswer(e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md"
                        />
                    </div>

                    <label className="text-sm">Answer Source URL</label>
                    <input
                        value={itemAnswerLinksURL}
                        onChange={(e) => setItemAnswerLinksURL(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md"
                    />

                    <label className="text-sm">Answer Post URL Stub</label>
                    <input
                        value={itemAnswerURLStub}
                        onChange={(e) => setItemAnswerURLStub(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-md"
                    />

                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={saving}
                className="bg-neutral-200 text-black px-4 y-2 rounded-md disabled:opacity-50"
            >
                {saving ? "Saving..." : "Save"}
            </button>
        </div>
    )
}