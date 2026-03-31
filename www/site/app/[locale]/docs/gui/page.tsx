import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Görsel Arayüz (GUI) Kütüphanesi",
  description:
    "Hüma'nın egui tabanlı yerel görsel arayüz API referansı.",
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

const modules: StdlibModule[] = [
  {
    id: "gui",
    file: "gui.hb",
    icon: "window",
    title: "Görsel Arayüz (GUI)",
    description: "egui tabanlı yerel arayüz oluşturma araçları.",
    colorAccent: "text-primary",
    functions: [
      {
        name: "pencere_oluştur(başlık, w, h, çizim_fks)",
        signature: "pencere_oluştur(başlık: Metin, w: Sayı, h: Sayı, çizim_fks: Fonksiyon)",
        description: "Yeni bir masaüstü penceresi oluşturur ve çizim döngüsünü başlatır.",
      },
      {
        name: "buton_ekle(metin, ...)",
        signature: "buton_ekle(metin: Metin, [r, g, b, w, h]) → Mantıksal",
        description: "Bir buton ekler. Renk (RGB) ve boyut (Genişlik, Yükseklik) parametreleri isteğe bağlıdır. Tıklandığında doğru (1) döner.",
      },
      {
        name: "yazı_ekle(metin, ...)",
        signature: "yazı_ekle(metin: Metin, [stil | r, g, b])",
        description: "Metin etiketi ekler. Stil olarak 'başlık', 'kalın' veya 'eğik' alabilir. Renk parametreleri isteğe bağlıdır.",
      },
      {
        name: "metin_kutusu_ekle(değişken, [w])",
        signature: "metin_kutusu_ekle(değişken: Metin, [w: Sayı]) → Metin",
        description: "Tek satırlık metin giriş alanı ekler. Değişen metni döndürür.",
      },
      {
        name: "büyük_metin_kutusu_ekle(değişken)",
        signature: "büyük_metin_kutusu_ekle(değişken: Metin) → Metin",
        description: "Çok satırlık metin alanı (Text Edit) ekler.",
      },
      {
        name: "kaydırıcı_ekle(değer, min, max)",
        signature: "kaydırıcı_ekle(değer: Sayı, min: Sayı, max: Sayı) → Sayı",
        description: "Sayısal bir kaydırıcı (Slider) ekler.",
      },
      {
        name: "onay_kutusu_ekle(durum, metin)",
        signature: "onay_kutusu_ekle(durum: Mantıksal, metin: Metin) → Mantıksal",
        description: "İşaretlenebilir bir onay kutusu (Checkbox) ekler.",
      },
      {
        name: "yan_yana_diz(fks)",
        signature: "yan_yana_diz(fks: Fonksiyon)",
        description: "İçindeki bileşenleri yatay (horizontal) düzende hizalar.",
      },
      {
        name: "alt_alta_diz(fks)",
        signature: "alt_alta_diz(fks: Fonksiyon)",
        description: "İçindeki bileşenleri dikey (vertical) düzende hizalar.",
      },
      {
        name: "kaydırılabilir_liste_ekle(id, fks)",
        signature: "kaydırılabilir_liste_ekle(id: Metin, fks: Fonksiyon)",
        description: "İçeriği kaydırılabilir (ScrollArea) bir alan oluşturur.",
      },
      {
        name: "grup_kutusu_ekle(başlık, fks)",
        signature: "grup_kutusu_ekle(başlık: Metin, fks: Fonksiyon)",
        description: "Başlıklı ve çerçeveli bir grup alanı oluşturur.",
      },
      {
        name: "ayraç_çiz()",
        signature: "ayraç_çiz()",
        description: "Yatay bir ayırıcı çizgi ekler.",
      },
      {
        name: "boşluk_bırak(miktar)",
        signature: "boşluk_bırak(miktar: Sayı)",
        description: "Bileşenler arasında boşluk bırakır.",
      },
    ],
  },
];

export default function GuiPage() {
  return (
    <>
      <main className="flex-1 px-8 md:px-16 py-12 max-w-4xl">
        <nav className="flex gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-4">
          <Link href="/docs" className="hover:text-primary transition-colors">
            Belgeler
          </Link>
          <span>/</span>
          <span className="text-on-surface-variant">Ekosistem</span>
          <span>/</span>
          <span className="text-primary">Görsel Arayüz (GUI)</span>
        </nav>

        <h1 className="text-5xl font-extrabold text-on-surface tracking-tighter mb-6">
          Görsel Arayüz (GUI)
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-4">
          Hüma, modern masaüstü uygulamaları geliştirmek için Rust'ın <code>egui</code> kütüphanesini temel alan yerel bir GUI katmanı sunar.
        </p>
        <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 font-mono text-sm text-tertiary mb-12">
          yükle &quot;gui.hb&quot;;
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
                Fonksiyonlar
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
            <h2 className="text-2xl font-bold text-on-surface mb-6">Örnek Uygulama</h2>
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
            href="/docs/stdlib"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Standart Kütüphane
          </Link>
          <Link
            href="/docs/package-manager"
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Paket Yöneticisi
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </Link>
        </div>
      </main>
    </>
  );
}
