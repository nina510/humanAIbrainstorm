type PromptBannerProps = {
  prompt: string;
};

export function PromptBanner({ prompt }: PromptBannerProps) {
  return (
    <div className="rounded-[1.5rem] border border-line bg-mist px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accentDeep/70">
        Task Prompt
      </p>
      <p className="mt-2 text-sm leading-6 text-ink">{prompt}</p>
    </div>
  );
}
