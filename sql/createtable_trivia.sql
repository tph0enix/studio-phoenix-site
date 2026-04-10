CREATE TABLE trivia (
    item_id SERIAL PRIMARY KEY,
    item_name TEXT,

    topic_level_1 TEXT,
    topic_level_2 TEXT,

    is_checked_fact BOOLEAN DEFAULT FALSE,
    is_checked_voice BOOLEAN DEFAULT FALSE,
    is_checked_hook BOOLEAN DEFAULT FALSE,
    is_checked_interest BOOLEAN DEFAULT FALSE,
    is_checked_conciseness BOOLEAN DEFAULT FALSE,
    is_posted_question BOOLEAN DEFAULT FALSE,
    is_posted_answer BOOLEAN DEFAULT FALSE,
    is_staged_question BOOLEAN DEFAULT FALSE,
    is_staged_answer BOOLEAN DEFAULT FALSE,

    datetime_scheduled_question TIMESTAMPTZ,
    datetime_scheduled_answer TIMESTAMPTZ,
    datetime_posted_question TIMESTAMPTZ,
    datetime_posted_answer TIMESTAMPTZ,

    question_opener TEXT,
    question_raw TEXT,
    question_images_url TEXT,
    question_source_links_url TEXT,
    question_post_link_urlstub TEXT,

    answer_raw TEXT,
    answer_notes TEXT,
    answer_links_url TEXT,
    answer_post_link_urlstub TEXT
);