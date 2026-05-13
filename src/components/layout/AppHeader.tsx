interface Props {
  count?: number;
}

export function AppHeader({ count }: Props) {
  return (
    <header
      className="flex items-center gap-4 px-6 py-3 shrink-0"
      style={{
        backgroundColor: "var(--header-bg)",
        borderBottom: "1px solid var(--header-border)",
        backdropFilter: "blur(var(--glass-blur))",
      }}
    >
      <span
        className="text-sm font-medium tracking-wide shrink-0"
        style={{ color: "var(--text-primary)" }}
      >
        my-shelf and AI
      </span>

      <div
        className="flex-1 max-w-xs h-7 rounded-full px-3 flex items-center"
        style={{ backgroundColor: "var(--search-bg)" }}
      >
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          Rechercher un parfum…
        </span>
      </div>

      {count !== undefined && (
        <span className="ml-auto text-xs" style={{ color: "var(--text-muted)" }}>
          {count} parfum{count > 1 ? "s" : ""}
        </span>
      )}
    </header>
  );
}