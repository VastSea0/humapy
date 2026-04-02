import Link from "next/link";
import { getDictionary } from "@/dictionaries/dictionaries";

export default async function IntroductionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "tr");
  const i = dict.Docs.introduction;

  return (
    <>
      <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
        <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
          <Link href={`/${locale}/docs`} className="hover:text-primary transition-colors">
            {dict.Nav.docs}
          </Link>
          <span>/</span>
          <span className="text-on-surface-variant">{dict.Sidebar.core}</span>
          <span>/</span>
          <span className="text-primary">{i.title}</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          {i.hero_title}
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
            {i.hero_desc}
          </p>
          
          <h2 className="text-2xl font-bold text-on-surface mb-8 mt-16">
            {i.philosophy.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: i.philosophy.cognitive_ease.title,
                desc: i.philosophy.cognitive_ease.desc,
                icon: "psychology"
              },
              {
                title: i.philosophy.agglutination.title,
                desc: i.philosophy.agglutination.desc,
                icon: "auto_fix"
              },
              {
                title: i.philosophy.industrial.title,
                desc: i.philosophy.industrial.desc,
                icon: "factory"
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-surface-container-low rounded-lg border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary mb-4 block">{item.icon}</span>
                <h3 className="text-sm font-bold text-on-surface mb-2">{item.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 border border-primary/20 p-8 rounded-lg mt-12">
            <h3 className="text-xl font-bold text-primary mb-6">
               {i.why_huma.title}
            </h3>
            <ul className="space-y-4 text-on-surface-variant">
              {i.why_huma.points.map((point: string, idx: number) => (
                <li key={idx} className="flex gap-3 items-center">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  <span className="text-sm font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-outline-variant/10">
          <div />
          <Link
            href={`/${locale}/docs`}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            {dict.Docs.getting_started.title}
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </Link>
        </div>
      </main>
    </>
  );
}
