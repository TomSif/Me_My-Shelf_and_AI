const HINTS = [
  { gesture: "Glisser", action: "une rangée" },
  { gesture: "Cliquer", action: "pour sélectionner" },
  { gesture: "Double-cliquer", action: "pour ouvrir" },
];

export function GestureBar() {
  return (
    <footer
      className="flex items-center justify-center gap-8 px-6 py-3 shrink-0"
      style={{
        backgroundColor: "var(--surface-primary)",
        borderTop: "1px solid var(--border-light)",
        backdropFilter: "blur(var(--glass-blur))",
      }}
    >
      {HINTS.map(({ gesture, action }) => (
        <div key={gesture} className="flex flex-col items-center gap-0.5">
          <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
            {gesture}
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {action}
          </span>
        </div>
      ))}
    </footer>
  );
}