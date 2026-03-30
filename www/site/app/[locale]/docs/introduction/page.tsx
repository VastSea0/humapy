import Link from "next/link";
import { getDictionary } from "@/dictionaries/dictionaries";

export default async function IntroductionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "tr");

  return (
    <>
      <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
        <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
          <Link href={`/${locale}/docs`} className="hover:text-primary transition-colors">
            {dict.Nav.docs}
          </Link>
          <span>/</span>
          <span className="text-on-surface-variant">{dict.Sidebar.core}</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          {locale === "tr" ? "Giriş" : "Introduction"}
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
            {locale === "tr" 
              ? "Hüma, ana dilde kodlama yapabilmek için tasarlanmış bir programlama dilidir." 
              : "Hüma is a programming language designed to allow coding in your native language."}
          </p>
          
          <h2 className="text-2xl font-bold text-on-surface mb-4 mt-12">
            {locale === "tr" ? "Felsefemiz" : "Our Philosophy"}
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            {locale === "tr"
              ? "Programlama dilleri genellikle İngilizce konuşan geliştiriciler için optimize edilmiştir. Hüma, bu bilişsel boşluğu kapatmayı amaçlar."
              : "Programming languages are typically optimized for English-speaking developers. Hüma aims to close this cognitive gap."}
          </p>

          <div className="bg-primary/5 border border-primary/20 p-8 rounded-lg mt-12">
            <h3 className="text-xl font-bold text-primary mb-4">
               {locale === "tr" ? "Neden Hüma?" : "Why Hüma?"}
            </h3>
            <ul className="space-y-4 text-on-surface-variant">
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>{locale === "tr" ? "Doğal Türkçe Semantiği" : "Natural Turkish Semantics"}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>{locale === "tr" ? "Yüksek Performanslı Rust Çekirdeği" : "High-Performance Rust Core"}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>{locale === "tr" ? "Sıfır Bağımlılıkla Derleme" : "Zero-Dependency Compilation"}</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
