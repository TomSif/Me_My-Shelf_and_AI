interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function Toggle({ value, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full"
      style={{
        backgroundColor: value ? "#e3aa3a" : " var(--bg-toggle)",
        transition: "var(--ease-premium)",
      }}
    >
      <span
        className="inline-block h-4 w-4 rounded-full bg-white"
        style={{
          transform: value ? "translateX(18px)" : "translateX(2px)",
          transition: "transform .18s ease",
          boxShadow: "0 1px 3px rgba(0,0,0,.15)",
        }}
      />
    </button>
  );
}
