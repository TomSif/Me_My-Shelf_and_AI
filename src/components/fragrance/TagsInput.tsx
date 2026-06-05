import { useState } from "react";
import { Tag } from "../ui/Tag";
import { Input } from "../ui/Input";

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
      <div className="flex gap-1.5 flex-wrap">
        {value.map((tag) => (
          <Tag key={tag} onRemove={() => remove(tag)}>
            {tag}
          </Tag>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Ajouter un tag…"
          className="flex-1 text-xs"
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-1.5 rounded-lg text-sm"
          style={{
            backgroundColor: "var(--surface-primary)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-chip)",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
