import type { ConversationMode } from "@/components/types";

type ModeSwitcherProps = {
  mode: ConversationMode;
  onChange: (mode: ConversationMode) => void;
};

const options: { label: string; value: ConversationMode }[] = [
  { label: "User starts", value: "user_first" },
  { label: "AI starts", value: "ai_first" },
];

export function ModeSwitcher({ mode, onChange }: ModeSwitcherProps) {
  return (
    <div className="inline-flex rounded-2xl bg-mist p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
            mode === option.value
              ? "bg-white text-ink shadow-sm"
              : "text-slate-500 hover:text-ink"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
