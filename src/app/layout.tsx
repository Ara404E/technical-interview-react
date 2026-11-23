import type { ReactNode } from "react";
import { NavLink } from "react-router";

const tabs = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/products", label: "Products" },
];
export function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-900 lg:flex-row">
      <aside className="border-b border-slate-700 bg-slate-800 p-4 lg:w-64 lg:border-r">
        <nav className="flex lg:gap-3 gap-10 lg:flex-col">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `rounded-lg text-sm ${
                  isActive
                    ? "text-yellow-400"
                    : "text-slate-200 hover:text-slate-700"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 lg:p-8">{children}</main>
    </div>
  );
}
