import { Link } from "react-router-dom";
import { useFragrancesStore } from "../../stores/fragrancesStore";
import { getSectionCompletion } from "../../utils/fragrance";
import { isComplete } from "../../utils/fragrance";

interface Props {
  onClose: () => void;
}

const SECTION_LABELS: Record<string, string> = {
  identity: "Identité",
  physical: "Physique",
  olfactive: "Olfactif",
  memory: "Mémoire",
};

export function IncompletePanel({ onClose }: Props) {
  const fragrances = useFragrancesStore((s) => s.fragrances);
  const incomplete = fragrances.filter((f) => !isComplete(f));

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="fixed z-50 flex flex-col rounded-2xl overflow-hidden"
        style={{
          top: "calc(var(--header-height, 52px) + 8px)",
          right: "24px",
          width: "min(360px, calc(100vw - 48px))",
          maxHeight: "min(480px, 60vh)",
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border-soft)",
          boxShadow: "var(--shadow-elevated)",
          backdropFilter: "blur(var(--glass-blur))",
        }}
      >
        <div
          className="px-4 py-3 shrink-0 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--border-light)" }}
        >
          <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            {incomplete.length} parfum{incomplete.length > 1 ? "s" : ""} à compléter
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-base leading-none"
            style={{ color: "var(--text-muted)" }}
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {incomplete.map((f) => {
            const completion = getSectionCompletion(f);
            const missing = Object.entries(completion)
              .filter(([, done]) => !done)
              .map(([key]) => SECTION_LABELS[key]);

            return (
              <Link
                key={f.id}
                to={`/fragrance/${f.id}`}
                onClick={onClose}
                className="flex flex-col gap-1 px-4 py-3 transition-colors"
                style={{
                  borderBottom: "1px solid var(--border-light)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--surface-secondary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {f.name}
                  <span className="font-normal" style={{ color: "var(--text-muted)" }}>
                    {" "}· {f.brand}
                  </span>
                </span>
                <div className="flex flex-wrap gap-1">
                  {missing.map((label) => (
                    <span
                      key={label}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "var(--state-warning-bg, rgba(245,158,11,0.12))",
                        color: "var(--state-warning, #b45309)",
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
