import { prisma } from "@/lib/prisma";
import {
  Check,
  MessageCircle,
  Anchor,
  Sparkles,
  Shrink,
  Send,
  Clock3
} from "lucide-react";
import TriviaEditor from "@/components/TriviaEditor";

function QualityIcons({
  fact,
  voice,
  hook,
  interest,
  conciseness,
}: {
  fact: boolean | null;
  voice: boolean | null;
  hook: boolean | null;
  interest: boolean | null;
  conciseness: boolean | null;
}) {
  const on = "opacity-100";
  const off = "opacity-30";

  return (
    <div className="flex gap-2 items-center justify-center">
      <Check size={13} className={fact ? on : off} />
      <MessageCircle size={13} className={voice ? on : off} />
      <Anchor size={13} className={hook ? on : off} />
      <Sparkles size={13} className={interest ? on : off} />
      <Shrink size={13} className={conciseness ? on : off} />
    </div>
  )
}

export default async function TriviaPage() {
  const [trivia, topicLevel1Options] = await Promise.all([
    prisma.trivia.findMany({
      orderBy: { item_id: "asc"}
    }),
    prisma.trivia.findMany({
      distinct: ["topic_level_1"],
      select: { topic_level_1: true },
      orderBy: { topic_level_1: "asc" },
    }),
  ]);

  return (
    <div className="p-6 space-y-1">
      <select className="bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-none">
        <option value="">All</option>
        {topicLevel1Options.map((option: { topic_level_1: string | null }) => (
          <option
            key={option.topic_level_1 ?? "null"}
            value={option.topic_level_1 ?? ""}
          >
            {option.topic_level_1 ?? "(none)"}
          </option>
        ))}
      </select>

      <form action="/api/trivia/create" method="post">
        <button className="px-4 py-2 bg-neutral-700 text-white">
          New Trivia
        </button>
      </form>

      {trivia.map((item) => (
        <details key={item.item_id}>
          <summary className="cursor-pointer list-none">
            <div className="grid grid-cols-[3fr_1fr_1fr] items-stretch rounded-2xl overflow-hidden bg-neutral-900">
              
              {/* general row info */}
              <div className="border-r p-3 border-neutral-900 bg-neutral-900 flex flex-col justify-center text-xs">
                <div className="flex items-center justify-between gap-3">
                  {item.item_name ?? "(no item name)"}: {item.topic_level_2 ?? "(no topic)"}
                  <QualityIcons
                    fact={item.is_checked_fact}
                    voice={item.is_checked_voice}
                    hook={item.is_checked_hook}
                    interest={item.is_checked_interest}
                    conciseness={item.is_checked_conciseness}
                  />
                </div>
              </div>

              {/* question info */}
              <div className="border-r border-purple-950 bg-purple-950 p-3 text-xs space-y-2">
                <div className="flex items-center gap-2">
                  {item.is_posted_question ? (
                    <>
                      <Send size={13} className="opacity-100" />
                      <span>{item.datetime_posted_question?.toLocaleString([], {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                      })}</span>
                    </>
                  ) : (
                    <>
                      <Clock3 size={13} className={item.is_staged_question ? "opacity-100" : "opacity-30"} />
                      <span>{item.datetime_scheduled_question?.toLocaleString([], {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                      })}</span>
                    </>
                  )}
                </div>
              </div>

              {/* answer info */}
              <div className="bg-red-950 p-3 text-xs space-y-2">
                <div className="flex items-center gap-2">
                  {item.is_posted_answer ? (
                    <>
                      <Send size={13} className="opacity-100" />
                      <span>{item.datetime_posted_answer?.toLocaleString([], {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                      })}</span>
                    </>
                  ) : (
                    <>
                      <Clock3 size={13} className={item.is_staged_answer ? "opacity-100" : "opacity-30"} />
                      <span>{item.datetime_scheduled_answer?.toLocaleString([], {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                      })}</span>
                    </>
                  )}
                </div>
              </div>

            </div>
          </summary>
          
          {/* expandable section for editing trivia item */}
          <TriviaEditor item={item} />
        </details>
      ))}
    </div>
  );
}