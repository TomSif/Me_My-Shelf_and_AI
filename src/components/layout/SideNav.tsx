const NAV_ITEMS = [
  { label: "Étagère", icon: "⬜" },
  { label: "Filtres", icon: "⬜" },
  { label: "Favoris", icon: "⬜" },
  { label: "Stats", icon: "⬜" },
  { label: "Réglages", icon: "⬜" },
];

export function SideNav() {
  return (
    <nav
      className="flex flex-col items-center gap-6 px-3 py-6 shrink-0"
      style={{
        borderRight: "1px solid var(--border-light)",
        backgroundColor: "var(--surface-secondary)",
      }}
    >
      {NAV_ITEMS.map(({ label }) => (
        <button
          key={label}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
          style={{ color: "var(--icon-secondary)" }}
          title={label}
        >
          {label[0]}
        </button>
      ))}
    </nav>
  );
}