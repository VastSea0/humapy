"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const locales = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  ];

  const handleLocaleChange = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");
    router.push(newPathname);
    setIsOpen(false);
  };

  const current = locales.find((l) => l.code === currentLocale) || locales[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-surface-container-high border border-outline-variant/10 hover:bg-surface-container-highest transition-colors text-xs font-medium text-on-surface"
      >
        <span>{current.flag}</span>
        <span className="uppercase">{current.code}</span>
        <span className="material-symbols-outlined text-[16px] opacity-50">
          expand_more
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 w-32 bg-surface-container-highest border border-outline-variant/20 rounded-sm shadow-2xl z-50 overflow-hidden">
            {locales.map((locale) => (
              <button
                key={locale.code}
                onClick={() => handleLocaleChange(locale.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs text-left hover:bg-primary/10 transition-colors ${
                  currentLocale === locale.code
                    ? "text-primary font-bold bg-primary/5"
                    : "text-on-surface-variant"
                }`}
              >
                <span>{locale.flag}</span>
                <span>{locale.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
