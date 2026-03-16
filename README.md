# Hüma Programlama Dili

Hüma, Rust ile geliştirilen, Türkçe doğal dil yapısına uygun ve hızlı bir programlama dilidir.

## Hedefler

- **Performans:** Rust altyapısı ile yüksek hız.
- **Güvenlik:** Bellek güvenliği odaklı mimari.
- **Yerellik:** Tamamen Türkçe anahtar kelimeler ve hata mesajları.
- **Özellikler:** Değişkenler, Fonksiyonlar, Döngüler, Koşullar, Mantıksal Operatörler (`ve`, `veya`, `değil`).

## Örnek Kullanım

```huma
yazdır("Merhaba Hüma!")

değişken sayı = 5
eğer sayı > 3 {
    yazdır("Sayı 3'ten büyük.")
}
```

## Kurulum ve Kullanım

Projeyi derlemek için:

```bash
cargo build --release
```

### REPL Modu (Etkileşimli)

Doğrudan kod yazıp denemek için:

```bash
cargo run
```

### Dosya Çalıştırma

Bir `.hb` dosyasını çalıştırmak için:

```bash
cargo run -- örnek.hb
```
