"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Core",
    items: [
      { href: "/docs", label: "Getting Started", icon: "rocket_launch" },
      { href: "/docs/introduction", label: "Introduction", icon: "info" },
    ],
  },
  {
    title: "The Language",
    items: [
      { href: "/docs/syntax", label: "Basic Syntax", icon: "code" },
      {
        href: "/docs/functions-classes",
        label: "Functions & Classes",
        icon: "data_object",
      },
      {
        href: "/docs/lists-errors",
        label: "Lists & Error Handling",
        icon: "list",
      },
    ],
  },
  {
    title: "Ecosystem",
    items: [
      { href: "/docs/stdlib", label: "Standard Library", icon: "menu_book" },
      {
        href: "/docs/compiler",
        label: "Compiler Internals",
        icon: "settings_input_component",
      },
      {
        href: "/docs/ide",
        label: "Hüma IDE",
        icon: "desktop_windows",
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col h-[calc(100vh-4rem)] w-64 sticky top-16 left-0 bg-surface-container-lowest py-8 px-6 gap-2 border-r border-outline-variant/10 overflow-y-auto shrink-0">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-on-surface">Documentation</h3>
        <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 font-semibold mt-0.5">
          v1.0.4-stable
        </p>
      </div>
      <nav className="space-y-8">
        {navSections.map((section) => (
          <div key={section.title}>
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">
              {section.title}
            </h4>
            <ul className="space-y-1 font-body text-sm font-semibold tracking-wide">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-all hover:translate-x-1 ${
                        isActive
                          ? "text-primary bg-surface-container-high"
                          : "text-on-surface-variant hover:bg-surface-container-low"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
