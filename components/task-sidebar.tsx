import { TaskCard } from "@/components/task-card";
import type { ConversationMode } from "@/components/types";

type TaskSidebarProps = {
  mode: ConversationMode;
};

export function TaskSidebar({ mode }: TaskSidebarProps) {
  const isUserFirst = mode === "user_first";

  return (
    <aside className="w-full rounded-[2rem] bg-[linear-gradient(180deg,_rgba(214,232,255,0.88)_0%,_rgba(238,245,255,0.96)_100%)] p-4 shadow-soft lg:w-[35%] lg:min-w-[320px] lg:max-w-[420px]">
      <div className="flex h-full flex-col gap-4">
        <div className="px-2 pt-2">
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d56ef]">
            Task description
          </h1>
        </div>

        <TaskCard title="">
          <p>
            {isUserFirst ? (
              <>
                In this brainstorming task, you need to add more details about{" "}
                <span className="font-semibold text-[#1d56ef]">
                  a Nike marketing campaign idea
                </span>{" "}
                (e.g., an event or activity to promote Nike)
              </>
            ) : (
              <>
                In this brainstorming task, you refine and explore more about{" "}
                <span className="font-semibold text-[#1d56ef]">
                  a Nike marketing campaign idea
                </span>{" "}
                (e.g., an event or activity to promote Nike)
              </>
            )}
          </p>
          <p className="mt-8 text-black">The final outcome should be</p>

          <ul className="mt-6 space-y-4 text-[#8f9297]">
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c8d5ff] text-white">
                ✓
              </span>
              <span>
                {isUserFirst
                  ? "A single paragraph (under 75 words)"
                  : "A single concise paragraph (under 75 words)"}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c8d5ff] text-white">
                ✓
              </span>
              <span>
                {isUserFirst
                  ? "Includes an idea, its target audience, and why the idea appeals to the audience."
                  : "Includes a campaign concept, its underlying cultural or consumer insight, and the target audience."}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c8d5ff] text-white">
                ✓
              </span>
              <span>The idea needs to be novel.</span>
            </li>
          </ul>
        </TaskCard>

        <div className="px-2 pt-6">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1d56ef]">
            To get start
          </h2>
        </div>

        <div className="space-y-8 px-2 pt-2 text-black">
          <div className="flex gap-5">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#afc3ff] text-xl font-semibold text-white">
              1
            </span>
            <p className="pt-1 text-[1.05rem] leading-10">
              {isUserFirst ? (
                <>
                  You need to{" "}
                  <span className="font-semibold text-[#1d56ef]">
                    add more details to this
                  </span>{" "}
                  idea starting point: “Nike Run — a campaign designed to get
                  people involved in running and discover Nike’s running
                  products.”.
                </>
              ) : (
                <>
                  Now,{" "}
                  <span className="font-semibold text-[#1d56ef]">
                    the AI has generated
                  </span>{" "}
                  a complete version of the idea. You need to{" "}
                  <span className="font-semibold text-[#1d56ef]">
                    first write out your complete idea.
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="flex gap-5">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#afc3ff] text-xl font-semibold text-white">
              2
            </span>
            <p className="pt-1 text-[1.05rem] leading-10">
              {isUserFirst ? (
                <>
                  Then, you will have{" "}
                  <span className="font-semibold text-[#1d56ef]">
                    two rounds of discussion with the AI
                  </span>{" "}
                  to evaluate the idea’s novelty, insight, and suitability of
                  the campaign activity.
                </>
              ) : (
                <>
                  Then, you will have{" "}
                  <span className="font-semibold text-[#1d56ef]">
                    two rounds of discussion with the AI
                  </span>{" "}
                  to evaluate the idea’s novelty, insight, and suitability of
                  the campaign activity.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
