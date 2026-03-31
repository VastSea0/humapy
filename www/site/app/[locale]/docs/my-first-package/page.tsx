import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/dictionaries";

export const metadata: Metadata = {
  title: "İlk Hüma Paketinizi Oluşturun",
  description:
    "Adım adım Hüma kütüphanesi oluşturma ve GitHub üzerinden yayınlama rehberi.",
};

export default async function MyFirstPackagePage({
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
          <span className="text-on-surface-variant">
             {locale === "tr" ? "Kılavuzlar" : "Guides"}
          </span>
          <span>/</span>
          <span className="text-primary">{dict.Sidebar.items.my_first_package}</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          {locale === "tr" ? "Benim İlk Hüma Paketim" : "My First Hüma Package"}
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-12">
           {locale === "tr"
              ? "Kendi kütüphanenizi oluşturmak, Hüma topluluğuna katkıda bulunmanın en güzel yoludur. Bu rehberde bir paketin nasıl oluşturulacağını, standartlara nasıl uygun hale getirileceğini ve yayınlanacağını öğreneceksiniz."
              : "Creating your own library is the best way to contribute to the Hüma community. In this guide, you will learn how to create a package, ensure its compliance with standards, and publish it."}
        </p>

        <div className="space-y-16">
          {/* Adım 1 */}
          <section id="adim-1">
            <h2 className="text-2xl font-bold text-on-surface mb-4">
               {locale === "tr" ? "1. Başlatma" : "1. Initialization"}
            </h2>
            <p className="text-on-surface-variant mb-4">
               {locale === "tr"
                  ? "Hüma CLI, kütüphane projeleri için hazır bir şablon sunar. Terminalinizi açın ve şu komutu çalıştırın:"
                  : "The Hüma CLI offers a ready-made template for library projects. Open your terminal and run the following command:"}
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
              huma paket yeni benim_kutuphanem
            </div>
          </section>

          {/* Adım 2 */}
          <section id="adim-2">
            <h2 className="text-2xl font-bold text-on-surface mb-4">
               {locale === "tr" ? "2. Metadata (paket.json)" : "2. Metadata (paket.json)"}
            </h2>
            <p className="text-on-surface-variant mb-4">
               {locale === "tr"
                  ? "Oluşturulan dizine girdiğinizde bir `paket.json` dosyası göreceksiniz. Bu dosya, kütüphanenizin kimliğidir."
                  : "When you enter the created directory, you will see a `paket.json` file. This file is the identity of your library."}
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4">
              <pre className="font-mono text-xs text-on-surface-variant">
{`{
  "ad": "benim_kutuphanem",
  "surum": "1.0.0",
  "aciklama": "${locale === "tr" ? "Hüma için ilk kütüphanem" : "My first library for Hüma"}",
  "yazar": "${locale === "tr" ? "Adınız" : "Your Name"}",
  "giris": "benim_kutuphanem.hb"
}`}
              </pre>
            </div>
            <p className="text-xs text-on-surface-variant mt-2 italic">
               {locale === "tr" ? "* giris alanı, kütüphanenizin ana giriş dosyasını belirtir." : "* the giris field specifies the main entry point of your library."}
            </p>
          </section>

          {/* Adım 3 */}
          <section id="adim-3">
            <h2 className="text-2xl font-bold text-on-surface mb-4">
               {locale === "tr" ? "3. Kod Yazımı" : "3. Writing Code"}
            </h2>
            <p className="text-on-surface-variant mb-4">
               {locale === "tr"
                  ? "`benim_kutuphanem.hb` dosyasını açın ve kütüphane fonksiyonlarınızı tanımlayın:"
                  : "Open the `benim_kutuphanem.hb` file and define your library functions:"}
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4">
                <pre className="font-mono text-xs text-on-surface-variant">
{`// benim_kutuphanem.hb

merhaba_de fonksiyon olsun {
    "Merhaba Hüma Dünyası!"'ı yazdır
}

topla fonksiyon olsun a, b alsın {
    (a + b)'yi döndür
}`}
                </pre>
            </div>
          </section>

          {/* Adım 4 */}
          <section id="adim-4">
            <h2 className="text-2xl font-bold text-on-surface mb-4">
               {locale === "tr" ? "4. Yerel Test" : "4. Local Testing"}
            </h2>
            <p className="text-on-surface-variant mb-4">
               {locale === "tr"
                  ? "Kütüphanenizi başka bir Hüma dosyasında test etmek için `yükle` komutunu kullanın:"
                  : "To test your library in another Hüma file, use the `yükle` command:"}
            </p>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary">
              yükle &quot;benim_kutuphanem.hb&quot;;
            </div>
          </section>

          {/* Adım 5 */}
          <section id="adim-5">
            <h2 className="text-2xl font-bold text-on-surface mb-4">
               {locale === "tr" ? "5. Yayınlama (GitHub)" : "5. Publishing (GitHub)"}
            </h2>
            <p className="text-on-surface-variant mb-4">
               {locale === "tr"
                  ? "Paketinizi paylaşmak için bir GitHub deposu oluşturun ve kodları yükleyin. Kurulumun çalışması için `paket.json` ve `hb` dosyalarınızın ana dizinde (root) olduğundan emin olun."
                  : "Create a GitHub repository to share your package and upload your code. Ensure that your `paket.json` and `hb` files are in the root directory for installation to work."}
            </p>
            <p className="text-on-surface-variant">
               {locale === "tr"
                  ? "Tebrikler! Artık diğer kullanıcılar şu komutla paketinizi kurabilir:"
                  : "Congratulations! Other users can now install your package using the following command:"}
              <br/>
              <code className="text-tertiary">huma paket kur github.com/kullanici/repo</code>
            </p>
          </section>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-outline-variant/10">
          <Link
            href={`/${locale}/docs/package-manager`}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            {dict.Sidebar.items.package_manager}
          </Link>
          <Link
            href={`/${locale}/docs/changelog`}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            {dict.Sidebar.items.changelog}
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </Link>
        </div>
      </main>

      {/* Right TOC */}
      <aside className="hidden xl:block w-64 sticky top-16 h-[calc(100vh-4rem)] py-12 px-8 overflow-y-auto border-l border-outline-variant/10 shrink-0">
        <h5 className="text-xs font-bold text-on-surface uppercase tracking-[0.2em] mb-6">
           {locale === "tr" ? "Adımlar" : "Steps"}
        </h5>
        <ul className="space-y-3 text-xs font-medium">
          <li><a href="#adim-1" className="text-on-surface-variant/60 hover:text-on-surface"> {locale === "tr" ? "1. Başlatma" : "1. Initialization"}</a></li>
          <li><a href="#adim-2" className="text-on-surface-variant/60 hover:text-on-surface"> {locale === "tr" ? "2. Metadata" : "2. Metadata"}</a></li>
          <li><a href="#adim-3" className="text-on-surface-variant/60 hover:text-on-surface"> {locale === "tr" ? "3. Kod Yazımı" : "3. Writing Code"}</a></li>
          <li><a href="#adim-4" className="text-on-surface-variant/60 hover:text-on-surface"> {locale === "tr" ? "4. Yerel Test" : "4. Local Test"}</a></li>
          <li><a href="#adim-5" className="text-on-surface-variant/60 hover:text-on-surface"> {locale === "tr" ? "5. Yayınlama" : "5. Publishing"}</a></li>
        </ul>
      </aside>
    </>
  );
}
