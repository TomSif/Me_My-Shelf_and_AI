import { useState } from "react";
import type { OlfactoryPyramid } from "../../types/fragrance";

type PyramidLevel = keyof OlfactoryPyramid;

const LEVELS: { key: PyramidLevel; label: string }[] = [
  { key: "top",   label: "Notes de tête" },
  { key: "heart", label: "Notes de cœur" },
  { key: "base",  label: "Notes de fond" },
];

interface Props {
  value: OlfactoryPyramid;
  onChange: (value: OlfactoryPyramid) => void;
}

export function PyramidInput({ value, onChange }: Props) {
  const [inputs, setInputs] = useState<Record<PyramidLevel, string>>({
    top: "", heart: "", base: "",
  });

  function add(level: PyramidLevel) {
    const note = inputs[level].trim();
    if (note && !value[level].includes(note)) {
      onChange({ ...value, [level]: [...value[level], note] });
    }
    setInputs((prev) => ({ ...prev, [level]: "" }));
  }

  function remove(level: PyramidLevel, note: string) {
    onChange({ ...value, [level]: value[level].filter((n) => n !== note) });
  }

  return (
    <div className="flex flex-col gap-4">
      {LEVELS.map(({ key, label }) => (
        <div key={key} className="flex flex-col gap-2">
          <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            {label}
          </span>
          <div className="flex gap-2 flex-wrap min-h-6">
            {value[key].map((note) => (
              <span
                key={note}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                style={{
                  backgroundColor: "var(--surface-secondary)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-light)",
                }}
              >
                {note}
                <button
                  type="button"
                  onClick={() => remove(key, note)}
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
              value={inputs[key]}
              onChange={(e) => setInputs((prev) => ({ ...prev, [key]: e.target.value }))}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(key); } }}
              placeholder={`Ex: bergamote, jasmin…`}
              className="flex-1 text-sm px-3 py-1.5 rounded-lg outline-none"
              style={{
                backgroundColor: "var(--surface-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-light)",
              }}
            />
            <button
              type="button"
              onClick={() => add(key)}
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
      ))}
    </div>
  );
}