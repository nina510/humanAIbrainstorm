import { ReactNode } from "react";

type TaskCardProps = {
  title: string;
  children: ReactNode;
};

export function TaskCard({ title, children }: TaskCardProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
      {title ? (
        <h2 className="text-base font-semibold tracking-tight text-ink">
          {title}
        </h2>
      ) : null}
      <div className={`${title ? "mt-4" : ""} text-sm leading-6 text-slate-600`}>
        {children}
      </div>
    </section>
  );
}
