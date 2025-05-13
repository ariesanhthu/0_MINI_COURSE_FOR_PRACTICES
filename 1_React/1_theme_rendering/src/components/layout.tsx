import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <main
      className={cn(
        "w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </main>
  );
}