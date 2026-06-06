import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm transition-colors outline-none",
        "placeholder:text-(--text-muted)",
        "border-[rgba(120,100,80,.12)]",
        "focus-visible:border-[#e3aa3a] focus-visible:ring-2 focus-visible:ring-[rgba(232,178,61,.2)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
