# Hüma Sözdizimi ve Özellikleri

Bu belge, Hüma programlama dilinin teknik detaylarını ve dil kurallarını içermektedir.

## 1. Değişkenler

Değişkenler `değişken` (veya `degisken`) anahtar kelimesi ile tanımlanır. Hüma'da tüm anahtar kelimeler hem aksanlı hem de aksansız (ASCII) yazımı destekler (örneğin: `yazdır`/`yazdir`, `eğer`/`eger`). Hüma dinamik tipli bir dildir.

```huma
değişken a = 5;         // Sayı
değişken b = "Metin";   // Metin
değişken c = [1, 2, 3]; // Liste
değişken d = Boş;       // Boş değer
```

## 2. Operatörler

### Matematiksel

- `+` : Toplama / Metin Birleştirme
- `-` : Çıkarma
- `*` : Çarpma
- `/` : Bölme

### Karşılaştırma

- `==` : Eşittir
- `!=` : Eşit değildir
- `>` : Büyüktür
- `<` : Küçüktür
- `>=` : Büyük eşittir
- `<=` : Küçük eşittir

### Mantıksal

- `ve` : Mantıksal VE
- `veya` : Mantıksal VEYA
- `değil`: Mantıksal DEĞİL

## 3. Kontrol Yapıları

### Koşul (eğer)

```huma
eğer puan > 50 {
    yazdır("Geçti");
} değilse eğer puan > 40 {
    yazdır("Kıl payı kaldı");
} değilse {
    yazdır("Kaldı");
}
```

### Döngü (döngü)

Hüma'da temel döngü `döngü` (while eşdeğeri) yapısıdır.

```huma
değişken sayac = 0;
döngü sayac < 10 {
    yazdır(sayac);
    sayac = sayac + 1;
}
```

## 4. Fonksiyonlar

Fonksiyonlar `fonksiyon` anahtar kelimesi ile tanımlanır ve `döndür` ile değer dönebilir.

```huma
fonksiyon topla(x, y) {
    döndür x + y;
}

değişken sonuc = topla(10, 20);
```

## 5. Nesne Yönelimli Programlama (OOP)

Hüma sınıfları ve nesne tabanlı yapıyı destekler.

```huma
sınıf Araba {
    fonksiyon sür(hiz) {
        yazdır("Araba " + hiz + " ile gidiyor.");
    }
}

değişken Arabam = Araba();
Arabam.sür(100);
```

## 6. Dahili Fonksiyonlar

- `yazdır(obj)` : Ekrana çıktı verir.
- `uzunluk(obj)` : Metin veya listenin uzunluğunu döner.
- `oku(mesaj)` : Kullanıcıdan girdi alır.
- `uyut(ms)` : Programı milisaniye cinsinden bekeltir.
- `zaman()` : Unix zaman damgasını döner.
- `listeye_ekle(liste, eleman)` : Listeye yeni bir eleman ekler.
- `karekök(n)` : Sayının karekökünü alır.
- `rastgele()` : 0-1 arası rastgele bir sayı döner.
- `dosya_oku(yol)` : Belirtilen dosyayı okur.
- `dosya_yaz(yol, icerik)` : Dosyaya yazma işlemi yapar.
- `tipi(obj)` : Nesnenin tipini döner (Sayı, Metin, Liste vb.).
- `argümanlar` : CLI argümanlarını liste olarak tutar.

---

## Modül Sistemi

`yükle` komutu ile başka dosyaları projenize dahil edebilirsiniz. Hüma, dosyayı önce çalışma dizininde, sonra `lib/` klasöründe arar.

```huma
yükle "matematik.hb";
```
