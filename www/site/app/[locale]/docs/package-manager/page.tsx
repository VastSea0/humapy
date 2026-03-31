import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/dictionaries";

export const metadata: Metadata = {
  title: "Hüma Paket Yöneticisi",
  description:
    "Hüma kütüphanelerini yönetin, güncelleyin ve topluluktan indirin.",
};

export default async function PackageManagerPage({
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
          <span className="text-on-surface-variant">{dict.Sidebar.ecosystem}</span>
          <span>/</span>
          <span className="text-primary">{dict.Sidebar.items.package_manager}</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          {dict.Sidebar.items.package_manager}
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
          {locale === "tr"
            ? "Hüma Paket Yöneticisi, projeleriniz için kütüphane yönetimini kolaylaştırır. Topluluk tarafından geliştirilen modülleri projenize tek bir komutla dahil edebilirsiniz."
            : "The Hüma Package Manager simplifies library management for your projects. You can include community-developed modules into your project with a single command."}
        </p>

        <section className="space-y-12">
          {/* Kurulum */}
          <div className="scroll-mt-24" id="kur">
            <h2 className="text-2xl font-bold text-on-surface mb-4">
               {locale === "tr" ? "Paket Kurma" : "Installing Packages"}
            </h2>
            <p className="text-on-surface-variant mb-4">
               {locale === "tr" 
                  ? "Yeni bir kütüphaneyi projenize eklemek için `huma paket kur` komutunu kullanın. Doğrudan bir isim kullanabilir veya bir GitHub URL'si verebilirsiniz."
                  : "Use the `huma paket kur` command to add a new library to your project. You can use a direct name or provide a GitHub URL."}
            </p>
            <div className="space-y-2">
              <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
                huma paket kur nlp_temel
              </div>
              <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
                huma paket kur github.com/kullanici/repo
              </div>
            </div>
          </div>

          {/* Yeni Paket */}
          <div className="scroll-mt-24" id="yeni">
            <h2 className="text-2xl font-bold text-on-surface mb-4">
               {locale === "tr" ? "Yeni Paket Oluşturma" : "Creating a New Package"}
            </h2>
            <p className="text-on-surface-variant mb-4">
               {locale === "tr"
                  ? "Kendi kütüphanenizi oluşturmak için standart bir şablon üretir:"
                  : "Generates a standard template to create your own library:"}
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
              huma paket yeni benim_kutuphanem
            </div>
          </div>

          {/* Listeleme */}
          <div className="scroll-mt-24" id="liste">
            <h2 className="text-2xl font-bold text-on-surface mb-4">
               {locale === "tr" ? "Paketleri Listeleme" : "Listing Packages"}
            </h2>
            <p className="text-on-surface-variant mb-4">
               {locale === "tr"
                  ? "Mevcut projede yüklü olan tüm paketleri görüntülemek için:"
                  : "To view all installed packages in the current project:"}
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
              huma paket liste
            </div>
          </div>

          {/* Güncelleme */}
          <div className="scroll-mt-24" id="guncelle">
            <h2 className="text-2xl font-bold text-on-surface mb-4">
               {locale === "tr" ? "Paketleri Güncelleme" : "Updating Packages"}
            </h2>
            <p className="text-on-surface-variant mb-4">
               {locale === "tr"
                  ? "Tüm yüklü paketleri en son sürümüne güncellemek için:"
                  : "To update all installed packages to their latest versions:"}
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
              huma paket güncelle
            </div>
          </div>

          <div className="scroll-mt-24" id="vcs">
            <h2 className="text-2xl font-bold text-on-surface mb-4">Sürüm Kontrolü ve Kilit Dosyaları</h2>
            <p className="text-on-surface-variant mb-4">
              Hüma, projelerinizde tekrarlanabilir derlemeler sağlamak için <code>huma.lock</code> (kilit dosyası) sistemini kullanır. Bir paket kurulduğunda, o anki tam sürümü kilit dosyasına kaydedilir.
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-6">
               <h3 className="text-sm font-bold text-primary mb-3">Güçlü Sürüm Kontrolü Özellikleri:</h3>
               <ul className="space-y-3 text-sm text-on-surface-variant">
                  <li className="flex gap-2">
                     <span className="text-primary font-bold">●</span>
                     <span><strong>SemVer Desteği:</strong> Paketler semantic versioning (anlamsal sürümleme) standartlarına göre yönetilir.</span>
                  </li>
                  <li className="flex gap-2">
                     <span className="text-primary font-bold">●</span>
                     <span><strong>Hüma Versiyon Uyumluluğu:</strong> Bir paket kurulmadan önce, Hüma'nın mevcut sürümüyle uyumlu olup olmadığı otomatik olarak kontrol edilir.</span>
                  </li>
                  <li className="flex gap-2">
                     <span className="text-primary font-bold">●</span>
                     <span><strong>Kilitli Sürümler:</strong> <code>huma.lock</code> dosyası sayesinde ekibinizdeki herkes aynı sürüm kütüphanelerle çalışır.</span>
                  </li>
               </ul>
            </div>
          </div>
        </section>

        {/* Community Packages */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-on-surface mb-6">
             {locale === "tr" ? "Topluluk Kütüphaneleri" : "Community Libraries"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface-container-low rounded-lg p-6 border border-outline-variant/10">
              <h3 className="font-bold text-primary mb-2">nlp_temel</h3>
              <p className="text-xs text-on-surface-variant mb-4">
                {locale === "tr" ? "Doğal dil işleme için temel araç seti (Kök bulma, Tokenizer)." : "Basic toolkit for natural language processing (Stemming, Tokenization)."}
              </p>
              <code className="text-[10px] text-tertiary font-mono">huma paket kur nlp_temel</code>
            </div>
            <div className="bg-surface-container-low rounded-lg p-6 border border-outline-variant/10">
              <h3 className="font-bold text-primary mb-2">ag_istekleri</h3>
              <p className="text-xs text-on-surface-variant mb-4">
                 {locale === "tr" ? "HTTP istekleri yapmak için modern bir yardımcı kütüphane." : "A modern helper library for making HTTP requests."}
              </p>
              <code className="text-[10px] text-tertiary font-mono">huma paket kur ag_istekleri</code>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-outline-variant/10">
          <Link
            href={`/${locale}/docs/gui`}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            {dict.Sidebar.items.gui}
          </Link>
          <Link
            href={`/${locale}/docs/my-first-package`}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            {dict.Sidebar.items.my_first_package}
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </Link>
        </div>
      </main>

      {/* Right TOC */}
      <aside className="hidden xl:block w-64 sticky top-16 h-[calc(100vh-4rem)] py-12 px-8 overflow-y-auto border-l border-outline-variant/10 shrink-0">
        <h5 className="text-xs font-bold text-on-surface uppercase tracking-[0.2em] mb-6">
          {locale === "tr" ? "Konular" : "Topics"}
        </h5>
        <ul className="space-y-3 text-xs font-medium">
          <li>
            <a href="#kur" className="text-on-surface-variant/60 hover:text-on-surface transition-all">
               {locale === "tr" ? "Paket Kurma" : "Installing Packages"}
            </a>
          </li>
          <li>
            <a href="#yeni" className="text-on-surface-variant/60 hover:text-on-surface transition-all">
               {locale === "tr" ? "Yeni Paket" : "New Package"}
            </a>
          </li>
          <li>
            <a href="#liste" className="text-on-surface-variant/60 hover:text-on-surface transition-all">
               {locale === "tr" ? "Paketleri Listeleme" : "Listing Packages"}
            </a>
          </li>
          <li>
            <a href="#guncelle" className="text-on-surface-variant/60 hover:text-on-surface transition-all">
               {locale === "tr" ? "Güncelleme" : "Update"}
            </a>
          </li>
          <li>
            <a href="#vcs" className="text-on-surface-variant/60 hover:text-on-surface transition-all">
               {locale === "tr" ? "Sürüm Kontrolü" : "Version Control"}
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}
