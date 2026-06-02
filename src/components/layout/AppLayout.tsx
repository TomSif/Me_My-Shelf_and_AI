import type { ReactNode } from "react";
import type { Fragrance } from "../../types/fragrance";
import { AppHeader } from "./AppHeader";
import { Atelier } from "./Atelier";
import { GestureBar } from "./GestureBar";
import { Mezzanine } from "./Mezzanine";

interface Props {
  children: ReactNode;
  headerCount?: number;
  incompleteCount?: number;
  onQuickAdd?: () => void;
  onIncompleteBadgeClick?: () => void;
  selectedFragrance?: Fragrance;
  hasPrev?: boolean;
  hasNext?: boolean;
  onGestureClose?: () => void;
  onGesturePrev?: () => void;
  onGestureNext?: () => void;
}

export function AppLayout({
  children,
  headerCount,
  incompleteCount,
  onQuickAdd,
  onIncompleteBadgeClick,
  selectedFragrance,
  hasPrev,
  hasNext,
  onGestureClose,
  onGesturePrev,
  onGestureNext,
}: Props) {
  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <AppHeader
        count={headerCount}
        incompleteCount={incompleteCount}
        onQuickAdd={onQuickAdd}
        onIncompleteBadgeClick={onIncompleteBadgeClick}
      />
      <Mezzanine />
      <div className="flex flex-1 overflow-hidden">
        <Atelier />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <GestureBar
        selectedFragrance={selectedFragrance}
        hasPrev={hasPrev}
        hasNext={hasNext}
        onClose={onGestureClose}
        onPrev={onGesturePrev}
        onNext={onGestureNext}
      />
    </div>
  );
}