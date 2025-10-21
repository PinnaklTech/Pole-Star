import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: "4xl" | "5xl" | "6xl" | "7xl";
}

export function PageContainer({ children, maxWidth = "5xl" }: PageContainerProps) {
  const maxWidthClass = {
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl"
  }[maxWidth];

  return (
    <div className={`${maxWidthClass} mx-auto space-y-6 animate-in fade-in duration-500`}>
      {children}
    </div>
  );
}
