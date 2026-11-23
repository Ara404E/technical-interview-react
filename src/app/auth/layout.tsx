import type { ReactNode } from "react";

export function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="min-h-dvh w-full flex items-center justify-center p-4 bg-amber-100">
      {children}
    </main>
  );
}
