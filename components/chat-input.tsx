"use client";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
  loading: boolean;
};

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
  loading,
}: ChatInputProps) {
  return (
    <div className="border-t border-line/70 bg-white px-4 py-4 sm:px-6">
      <div className="flex items-end gap-3 rounded-[1.5rem] border border-line bg-panel p-3 shadow-sm">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSend();
            }
          }}
          placeholder="Write your completed campaign idea first..."
          rows={1}
          className="max-h-40 min-h-[56px] flex-1 resize-none bg-transparent px-2 py-3 text-sm text-ink outline-none placeholder:text-slate-400"
        />

        <button
          type="button"
          onClick={onSend}
          disabled={disabled}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accentDeep disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
