# Hüma Programlama Dili

Hüma, modern yazılım geliştirme prensiplerini Türkçe doğal dil yapısıyla birleştiren, yüksek performanslı ve güvenli bir programlama dilidir. Rust diliyle geliştirilmiş olup, hem yorumlanabilir (tree-walking) hem de bytecode üzerinden derlenebilir (VM) bir mimariye sahiptir.

[**Click here for the English version of README.**](README.en.md)

## 🚀 Öne Çıkan Özellikler

- **Doğal Türkçe Sözdizimi:** Kod yazarken kendi dilinizde düşünebilirsiniz.
- **Hibrit Çalışma Modu:** İsterseniz doğrudan yorumlayın, isterseniz bytecode'a derleyip sanal makinede (VM) koşturun.
- **Bağımsız İkili Dosyalar (Standalone):** Kodlarınızı derleyip herhangi bir bağımlılık olmadan çalışabilen native binary'lere dönüştürebilirsiniz.
- **Zengin Sistem Kütüphaneleri:** Matematik, terminal renklendirme, zaman yönetimi ve liste araçları kutudan çıktığı gibi hazırdır.

---

## 🛠️ Kurulum ve Derleme

Hüma'yı derlemek için sisteminizde [Rust](https://www.rust-lang.org/) kurulu olmalıdır.

```bash
git clone https://github.com/VastSea0/humapy.git
cd humapy
cargo build --release
```

Derleme sonrası çalıştırılabilir dosya `target/release/huma` konumunda olacaktır.

---

## 💻 Kullanım Rehberi

### 1. Etkileşimli Mod (REPL)

Doğrudan komut satırından kod denemek için:

```bash
cargo run
```

### 2. Dosya Çalıştırma (Yorumlayıcı)

Bir `.hb` dosyasını ağaç-gezinme (tree-walking) yöntemiyle çalıştırmak için:

```bash
cargo run -- program.hb
```

### 3. Bytecode Modu (Performans)

Kodunuzu önce bytecode'a derleyip sonra Sanal Makine üzerinde koşturabilirsiniz:

```bash
# Derle
cargo run -- --derle program.hb cikti.hbc
# Yürüt
cargo run -- --yürüt cikti.hbc
```

### 4. Bağımsız Uygulama Oluşturma (Native Binary)

Hüma kodunuzu standalone bir Rust dosyasına dönüştürüp native binary olarak derleyebilirsiniz:

```bash
cargo run -- --inşa-et program.hb uygulama
rustc uygulama.rs
./uygulama
```

---

## 📖 Dil Referansı

### Temel Sözdizimi

```huma
// Değişken Tanımlama
değişken x = 10;
değişken isim = "Hüma";

// Matematiksel İşlemler
değişken toplam = x + 5 * 2;

// Koşullu İfadeler
eğer x > 5 {
    yazdır("Sayı büyüktür.");
} değilse {
    yazdır("Sayı küçüktür.");
}

// Döngüler
değişken i = 0;
döngü i < 5 {
    yazdır("Sıra: " + i);
    i = i + 1;
}
```

### Fonksiyonlar ve Modüller

```huma
yükle "matematik.hb";

fonksiyon merhaba_de(ad) {
    yazdır("Merhaba " + ad + "!");
}

merhaba_de("Dünya");
yazdır("PI Değeri: " + PI);
```

### Listeler

```huma
değişken meyveler = ["Elma", "Armut", "Muz"];
yazdır(meyveler[0]); // Elma
yazdır("Boyut: " + uzunluk(meyveler));
```

---

## 📚 Sistem Kütüphaneleri (`lib/`)

Hüma, işinizi kolaylaştıran bir dizi dahili modül ile gelir:

- **`matematik.hb`**: `PI`, `E`, `karesi(n)`, `küpü(n)`, `kuvvet(a, b)`, `mutlak_değer(n)`
- **`renkler.hb`**: `renkli_yaz(metin, renk)`, `başarı_yaz(metin)`, `hata_yaz(metin)`, `uyarı_yaz(metin)`
- **`zaman.hb`**: `beklet(saniye)`, `kronometre_başlat()`, `kronometre_bitir(başlangıç)`
- **`liste.hb`**: `yazdır_liste(liste)`, `iceriyor_mu(liste, eleman)`, `ters_cevir(liste)`

---

## 🤝 Katkıda Bulunma

Hüma dilini geliştirmek ve katkıda bulunmak isterseniz lütfen bir Pull Request (PR) gönderin veya hata bildirimi yapın.

---

## 📜 Lisans

Bu proje MIT Lisansı ile lisanslanmıştır.
