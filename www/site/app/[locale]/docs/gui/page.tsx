import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/dictionaries";

export const metadata: Metadata = {
  title: "Görsel Arayüz (GUI) Kütüphanesi",
  description: "Hüma'nın egui tabanlı yerel görsel arayüz API referansı.",
};

interface StdlibFunction {
  name: string;
  signature: string;
  description: string;
}

interface StdlibModule {
  id: string;
  file: string;
  icon: string;
  title: string;
  description: string;
  constants?: { name: string; value: string; description: string }[];
  functions: StdlibFunction[];
  colorAccent: string;
}

const getModules = (locale: string): StdlibModule[] => [
  {
    id: "gui",
    file: "gui.hb",
    icon: "window",
    title: locale === "tr" ? "Görsel Arayüz (GUI)" : "Graphical User Interface (GUI)",
    description: locale === "tr" ? "egui tabanlı yerel arayüz oluşturma araçları." : "egui-based native interface creation tools.",
    colorAccent: "text-primary",
    functions: [
      {
        name: "pencere_oluştur(başlık, w, h, çizim_fks)",
        signature: "pencere_oluştur(başlık: Metin, w: Sayı, h: Sayı, çizim_fks: Fonksiyon)",
        description: locale === "tr" ? "Yeni bir masaüstü penceresi oluşturur ve çizim döngüsünü başlatır." : "Creates a new desktop window and starts the drawing loop.",
      },
      {
        name: "buton_ekle(metin, ...)",
        signature: "buton_ekle(metin: Metin, [r, g, b, w, h]) → Mantıksal",
        description: locale === "tr" ? "Bir buton ekler. Renk (RGB) ve boyut (Genişlik, Yükseklik) parametreleri isteğe bağlıdır. Tıklandığında doğru (1) döner." : "Adds a button. Color (RGB) and size (Width, Height) parameters are optional. Returns true (1) when clicked.",
      },
      {
        name: "yazı_ekle(metin, ...)",
        signature: "yazı_ekle(metin: Metin, [stil | r, g, b])",
        description: locale === "tr" ? "Metin etiketi ekler. Stil olarak 'başlık', 'kalın' veya 'eğik' alabilir. Renk parametreleri isteğe bağlıdır." : "Adds a text label. Can take 'başlık' (title), 'kalın' (bold), or 'eğik' (italic) as a style. Color parameters are optional.",
      },
      {
        name: "metin_kutusu_ekle(değişken, [w])",
        signature: "metin_kutusu_ekle(değişken: Metin, [w: Sayı]) → Metin",
        description: locale === "tr" ? "Tek satırlık metin giriş alanı ekler. Değişen metni döndürür." : "Adds a single-line text entry field. Returns the changed text.",
      },
      {
        name: "büyük_metin_kutusu_ekle(değişken)",
        signature: "büyük_metin_kutusu_ekle(değişken: Metin) → Metin",
        description: locale === "tr" ? "Çok satırlık metin alanı (Text Edit) ekler." : "Adds a multi-line text area (Text Edit).",
      },
      {
        name: "kaydırıcı_ekle(değer, min, max)",
        signature: "kaydırıcı_ekle(değer: Sayı, min: Sayı, max: Sayı) → Sayı",
        description: locale === "tr" ? "Sayısal bir kaydırıcı (Slider) ekler." : "Adds a numerical slider.",
      },
      {
        name: "onay_kutusu_ekle(durum, metin)",
        signature: "onay_kutusu_ekle(durum: Mantıksal, metin: Metin) → Mantıksal",
        description: locale === "tr" ? "İşaretlenebilir bir onay kutusu (Checkbox) ekler." : "Adds a checkable checkbox.",
      },
      {
        name: "yan_yana_diz(fks)",
        signature: "yan_yana_diz(fks: Fonksiyon)",
        description: locale === "tr" ? "İçindeki bileşenleri yatay (horizontal) düzende hizalar." : "Aligns internal components horizontally.",
      },
      {
        name: "alt_alta_diz(fks)",
        signature: "alt_alta_diz(fks: Fonksiyon)",
        description: locale === "tr" ? "İçindeki bileşenleri dikey (vertical) düzende hizalar." : "Aligns internal components vertically.",
      },
      {
        name: "kaydırılabilir_liste_ekle(id, fks)",
        signature: "kaydırılabilir_liste_ekle(id: Metin, fks: Fonksiyon)",
        description: locale === "tr" ? "İçeriği kaydırılabilir (ScrollArea) bir alan oluşturur." : "Creates a scrollable area (ScrollArea).",
      },
      {
        name: "grup_kutusu_ekle(başlık, fks)",
        signature: "grup_kutusu_ekle(başlık: Metin, fks: Fonksiyon)",
        description: locale === "tr" ? "Başlıklı ve çerçeveli bir grup alanı oluşturur." : "Creates a grouped area with a title and frame.",
      },
      {
        name: "ayraç_çiz()",
        signature: "ayraç_çiz()",
        description: locale === "tr" ? "Yatay bir ayırıcı çizgi ekler." : "Adds a horizontal separator line.",
      },
      {
        name: "boşluk_bırak(miktar)",
        signature: "boşluk_bırak(miktar: Sayı)",
        description: locale === "tr" ? "Bileşenler arasında boşluk bırakır." : "Adds space between components.",
      },
    ],
  },
];

export default async function GuiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "tr");
  const modules = getModules(locale);

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
          <span className="text-primary">{dict.Sidebar.items.gui}</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          {dict.Sidebar.items.gui}
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-4">
          {locale === "tr" 
             ? "Hüma, modern masaüstü uygulamaları geliştirmek için Rust'ın egui kütüphanesini temel alan yerel bir GUI katmanı sunar."
             : "Hüma provides a native GUI layer based on Rust's egui library for developing modern desktop applications."
          }
        </p>
        <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary mb-12">
          {locale === "tr" ? "yükle \"gui.hb\";" : "yükle \"gui.hb\";"}
        </div>

        {/* Modules */}
        <div className="space-y-20">
          {modules.map((mod) => (
            <section key={mod.id} id={mod.id} className="scroll-mt-24">
              {/* Module header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-surface-container-high rounded-sm">
                  <span
                    className={`material-symbols-outlined ${mod.colorAccent}`}
                  >
                    {mod.icon}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-on-surface font-mono">
                    {mod.file}
                  </h2>
                  <p className="text-sm text-on-surface-variant mt-0.5">
                    {mod.description}
                  </p>
                </div>
              </div>

              {/* Functions */}
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">
                {locale === "tr" ? "Fonksiyonlar" : "Functions"}
              </h3>
              <div className="space-y-3">
                {mod.functions.map((fn) => (
                  <div
                    key={fn.name}
                    className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 overflow-hidden"
                  >
                    <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant/5">
                      <code className="font-mono text-sm text-tertiary">
                        {fn.signature}
                      </code>
                    </div>
                    <div className="px-4 py-3 text-sm text-on-surface-variant">
                      {fn.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Example */}
        <section className="mt-20">
            <h2 className="text-2xl font-bold text-on-surface mb-6">
               {locale === "tr" ? "Örnek Uygulama" : "Example Application"}
            </h2>
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-6">
                <pre className="font-mono text-sm text-on-surface-variant overflow-x-auto">
{`yükle "gui.hb";

sayac = 0 olsun

cizim_fks fonksiyon olsun {
    yazı_ekle("Merhaba Hüma GUI!", "başlık")
    boşluk_bırak(10.0)
    
    yazı_ekle("Sayaç değeri: " + sayac)
    
    buton_ekle("Artır") ise {
        sayac = sayac + 1
    }
}

pencere_oluştur("Hüma Örnek", 400.0, 300.0, cizim_fks)`}
                </pre>
            </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-outline-variant/10">
          <Link
            href={`/${locale}/docs/stdlib`}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            {dict.Sidebar.items.stdlib}
          </Link>
          <Link
            href={`/${locale}/docs/package-manager`}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            {dict.Sidebar.items.package_manager}
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </Link>
        </div>
      </main>
    </>
  );
}
