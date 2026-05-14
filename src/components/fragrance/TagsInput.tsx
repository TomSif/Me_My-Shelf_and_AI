import { useState } from "react";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export function TagsInput({ value, onChange }: Props) {
  const [input, setInput] = useState("");

  function add() {
    const tag = input.trim();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput("");
  }

  function remove(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 flex-wrap">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
            style={{
              backgroundColor: "var(--surface-secondary)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-light)",
            }}
          >
            {tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder="Ajouter un tag…"
          className="flex-1 text-sm px-3 py-1.5 rounded-lg outline-none"
          style={{
            backgroundColor: "var(--surface-secondary)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-light)",
          }}
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-1.5 rounded-lg text-sm"
          style={{
            backgroundColor: "var(--surface-secondary)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-light)",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}