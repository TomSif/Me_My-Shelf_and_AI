interface Props {
  count?: number;
  incompleteCount?: number;
  onQuickAdd?: () => void;
  onIncompleteBadgeClick?: () => void;
}

export function AppHeader({ count, incompleteCount, onQuickAdd, onIncompleteBadgeClick }: Props) {
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

      <div className="ml-auto flex items-center gap-3">
        {count !== undefined && (
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {count} parfum{count > 1 ? "s" : ""}
          </span>
        )}
        {incompleteCount !== undefined && incompleteCount > 0 && (
          <button
            type="button"
            onClick={onIncompleteBadgeClick}
            className="h-5 min-w-5 px-1.5 rounded-full flex items-center justify-center text-xs font-medium leading-none transition-opacity"
            style={{
              backgroundColor: "var(--icon-active)",
              color: "#fff",
              opacity: 0.85,
            }}
            title={`${incompleteCount} parfum${incompleteCount > 1 ? "s" : ""} incomplet${incompleteCount > 1 ? "s" : ""}`}
          >
            {incompleteCount}
          </button>
        )}
        {onQuickAdd && (
          <button
            type="button"
            onClick={onQuickAdd}
            className="w-7 h-7 rounded-full flex items-center justify-center text-base leading-none transition-colors"
            style={{
              backgroundColor: "var(--icon-active)",
              color: "#fff",
            }}
            title="Ajout rapide"
          >
            +
          </button>
        )}
      </div>
    </header>
  );
}
