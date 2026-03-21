# Hüma-Lang: Tamamen Doğal Türkçe Söz Dizimi Rehberi

Hüma-lang, programlama mantığını Türkçe konuşma dilinin akışıyla birleştiren, öğrenmesi kolay ve yüksek okunabilirliğe sahip bir programlama dilidir.

---

## 1. Temel Yapı ve Değişkenler

Hüma-lang'da değişken tanımlamak için `olsun` anahtar kelimesi kullanılır. Yazdırma işlemi için ise tanımlayıcıdan sonra eklenen eklerle birlikte `yazdır` komutu tetiklenir.

- **Tanımlama:** `isim = "Hüma" olsun`
- **Yazdırma:** `isim'i yazdır;` (Veya `isim'i ekrana yazdır;`)
- **Sayılar:** `sayı = 10 olsun`

---

## 2. Ek Yönetimi (Esnek Suffix Sistemi)

Hüma-lang, Türkçe'nin sondan eklemeli yapısını destekler. Kesme işareti (`'`) ile başlayan ekler lexer tarafından otomatik olarak ayıklanır.

- `x'i yazdır` → `x yazdır`
- `liste'ye ekle` → `liste ekle`
- `hesaplama'dan` → `hesaplama`

Bu özellik sayesinde kodu en doğal Türkçe haliyle yazabilirsiniz: `x'i yazdır`, `x'i ekrana yazdır`, `x'i terminale yazdır` ifadelerinin tamamı aynı sonucu verir.

---

## 3. Karşılaştırma ve Mantıksal Operatörler

Koşul bloklarında `=` operatörü eşitlik kontrolü yapar.

- **Eşitlik:** `x = 10 ise { ... }`
- **Eşit Değil:** `x = 10 değil ise { ... }`
- **Doğruluk Değerleri:** `doğru`, `yanlış`
- **Bağlaçlar:** `ve`, `veya`, `değil`

---

## 4. Kontrol Yapıları (Koşul ve Döngü)

### Koşul Blokları (ise / yoksa)

```huma
puan = 85 olsun
puan > 50 ise {
    "Başarılı!"'yı yazdır;
} yoksa {
    "Başarısız!"'ı yazdır;
}
```

### Döngüler (olduğu sürece)

```huma
sayaç = 0 olsun
sayaç < 5 olduğu sürece {
    "Sıra: " + sayaç'ı yazdır;
    sayaç = sayaç + 1 olsun
}
```

---

## 5. Fonksiyonlar ve Sınıflar

### Fonksiyon Tanımı

Fonksiyonlar `isim fonksiyon olsun ... alsın` kalıbıyla tanımlanır. Çağrı her zaman parantezle yapılır.

```huma
topla fonksiyon olsun a, b alsın {
    a + b'yi döndür
}
sonuç = topla(5, 10)
```

### Sınıf ve Metot Tanımı

Sınıf metotları da aynı `fonksiyon olsun` kalıbını izler. Nesne örneği `isim = SınıfAdı() olsun` ile oluşturulur. Nesnenin kendi özelliklerine erişmek için `kendisi` anahtar kelimesi kullanılır.

```huma
araç sınıf olsun {
    hız = 0 olsun
    hızlan fonksiyon olsun miktar alsın {
        kendisi'nin hız = kendisi'nin hız + miktar olsun
    }
}
araba = araç() olsun
araba.hızlan(10)
```

---

## 6. Veri Yapıları ve Hata Yönetimi

### Listeler

- `sayılar liste olsun`
- `sayılar'a [5]'i ekle`
- `sayılar'dan [0]'ı çıkar` (indeks bazlı — 0. konumdaki elemanı siler)
- `sayılar'ın uzunluğu`

### Hata Yönetimi (dene / hata var ise)

```huma
dene {
    sonuç = 10 / 0
} hata var ise {
    "Sıfıra bölünme hatası!"'nı yazdır
}
```

---

## 7. Program Örnekleri

### Örnek 1: Faktöriyel Hesaplayıcı

```huma
faktöriyel fonksiyon olsun n alsın {
    n = 0 veya n = 1 ise {
        1'i döndür
    } yoksa {
        n * faktöriyel(n - 1)'i döndür
    }
}
"Sayı giriniz: "'yi yazdır;
girdi = girdi'den oku;
sonuç = faktöriyel(girdi)
"Sonuç: " + sonuç'u yazdır;
```

### Örnek 2: Meyve Sepeti Uygulaması (Liste ve Döngü)

```huma
sepet liste olsun
sepet = ["elma", "armut"] olsun
"Sepete eklenecek meyve: "'yi yazdır;
yeniMeyve = girdi'den oku;
yeniMeyve = "armut" değil ise {
    sepet'e [yeniMeyve]'yi ekle;
} yoksa {
    "Zaten sepette armut var!"'ı yazdır;
}
"Sepetinizdeki meyveler: "'ni yazdır;
i = 0 olsun
i < sepet'in uzunluğu olduğu sürece {
    sepet'ten [i]'yi yazdır;
    i = i + 1 olsun
}
```

### Örnek 3: Basit Hesap Makinesi (Sınıf Yapısı)

```huma
islem sınıf olsun {
    toplama fonksiyon olsun a, b alsın {
        a + b'yi döndür
    }
    cikarma fonksiyon olsun a, b alsın {
        a - b'yi döndür
    }
}
hesap = islem() olsun
"Toplama Sonucu: " + hesap.toplama(10, 20)'yı yazdır;
```

---

**Hüma-lang — Geleceğin Türkçe Programlama Dili**