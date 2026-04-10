export type TriviaItem = {
    item: {
        item_id: number;
        item_name: string | null;

        topic_level_1: string | null;
        topic_level_2: string | null;

        is_checked_fact: boolean | null;
        is_checked_voice: boolean | null;
        is_checked_hook: boolean | null;
        is_checked_interest: boolean | null;
        is_checked_conciseness: boolean | null;
        is_posted_question: boolean | null;
        is_posted_answer: boolean | null;
        is_staged_question: boolean | null;
        is_staged_answer: boolean | null;

        datetime_scheduled_question: string | Date | null;
        datetime_scheduled_answer: string | Date | null;
        datetime_posted_question: string | Date | null;
        datetime_posted_answer: string | Date | null;

        question_opener: string | null;
        question_raw: string | null;
        question_images_url: string | null;
        question_source_links_url: string | null;
        question_post_link_urlstub: string | null;

        answer_raw: string | null;
        answer_notes: string | null;
        answer_links_url: string | null;
        answer_post_link_urlstub: string | null;
    }
};