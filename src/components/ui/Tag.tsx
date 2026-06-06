import { X } from "lucide-react";
import type { ReactNode } from "react";

interface TagProps {
  onRemove?: () => void;
  children: ReactNode;
}

export function Tag({ onRemove, children }: TagProps) {
  return (
    <span
      className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs transition-all"
      style={{
        backgroundColor: "var(--bg-chip)",
        border: "1px solid var(--icon-border)",
        color: "var(--text-chip)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center rounded-full opacity-40 hover:opacity-80 transition-opacity translate-y-[1.6px]"
          style={{ color: "var(--text-chip)" }}
        >
          <X size={10} strokeWidth={2.5} color={"var(--text-chip)"} />
        </button>
      )}
    </span>
  );
}
