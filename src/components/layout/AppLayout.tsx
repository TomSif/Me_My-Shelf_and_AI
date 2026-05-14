import type { ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import { SideNav } from "./SideNav";
import { GestureBar } from "./GestureBar";

interface Props {
  children: ReactNode;
  headerCount?: number;
  onQuickAdd?: () => void;
}

export function AppLayout({ children, headerCount, onQuickAdd }: Props) {
  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <AppHeader count={headerCount} onQuickAdd={onQuickAdd} />
      <div className="flex flex-1 overflow-hidden">
        <SideNav />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <GestureBar />
    </div>
  );
}