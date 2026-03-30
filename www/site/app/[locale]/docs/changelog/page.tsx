import { getDictionary } from "@/dictionaries/dictionaries";
import Link from "next/link";

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "tr");
  const ch = dict.Docs.changelog;

  const versions = ["v0_3_1", "v0_3_0", "v0_2_0", "v0_1_0"];

  return (
    <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
      <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
        <Link href={`/${locale}/docs`} className="hover:text-primary transition-colors">
          {dict.Nav.docs}
        </Link>
        <span>/</span>
        <span className="text-on-surface-variant">{dict.Sidebar.ecosystem}</span>
      </nav>

      <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-4">
        {ch.title}
      </h1>
      <p className="text-lg text-on-surface-variant leading-relaxed mb-16">
        {ch.description}
      </p>

      <div className="relative space-y-16">
        {/* Vertical line for timeline */}
        <div className="absolute left-0 top-2 bottom-0 w-px bg-outline-variant/20 ml-[7px] hidden md:block" />

        {versions.map((vKey) => {
          const v = ch[vKey as keyof typeof ch] as any;
          return (
            <section key={vKey} className="relative md:pl-10">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full border-2 border-primary bg-surface z-10 hidden md:block" />
              
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6">
                <h2 className="text-2xl font-black text-on-surface tracking-tight">
                  {v.version}
                </h2>
                <span className="text-xs font-mono text-on-surface-variant/50 uppercase tracking-widest mt-1 md:mt-0">
                  {v.date}
                </span>
              </div>

              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-8 glass-card">
                <ul className="space-y-4">
                  {v.changes.map((change: string, idx: number) => (
                    <li key={idx} className="flex gap-3 text-on-surface-variant leading-relaxed">
                      <span className="text-primary mt-1.5 shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      {/* Raw commits link */}
      <div className="mt-24 p-8 rounded-xl bg-surface-container-low border border-outline-variant/10 text-center">
        <h3 className="text-on-surface font-bold mb-2">Want the raw data?</h3>
        <p className="text-sm text-on-surface-variant mb-6">
          You can view the last 100 raw git commits directly from our repository history file.
        </p>
        <a 
          href="/commits.txt" 
          target="_blank"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-surface-container-high border border-outline-variant/20 hover:bg-surface-bright transition-all text-sm font-bold text-primary"
        >
          <span className="material-symbols-outlined text-base">history</span>
          View Commits Raw
        </a>
      </div>
    </main>
  );
}
