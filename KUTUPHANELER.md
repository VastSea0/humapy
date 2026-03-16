# Hüma Sistem Kütüphaneleri

Hüma ile birlikte gelen standart kütüphanelerin detaylı kullanım rehberi.

## 1. Matematik (`matematik.hb`)

Temel matematiksel sabitler ve fonksiyonlar içerir.

- **Sabitler:** `PI`, `E`
- **`karesi(n)`**, **`küpü(n)`**: n sayısının karesini/küpünü alır.
- **`mutlak(n)`**: Sayının mutlak değerini döner.
- **`kuvvet(a, b)`**: a^b hesaplar.
- **`yuvarla(n)`**: En yakın tam sayıya yuvarlar.
- **`faktöriyel(n)`**: n! hesaplar.

## 2. Renkler (`renkler.hb`)

Terminal çıktılarını renklendirmek için kullanılır.

- **Sabitler:** `KIRMIZI`, `YESIL`, `SARI`, `MAVI`, `TURKUAZ`, `KALIN`, `SIFIR`
- **`renkli_yaz(metin, renk)`**: Belirtilen renkte metin yazdırır.
- **`başarı_yaz(metin)`**, **`hata_yaz(metin)`**, **`uyarı_yaz(metin)`**: Renkli etiketli çıktılar.

## 3. Zaman (`zaman.hb`)

- **`beklet(saniye)`**: Programı durdurur.
- **`kronometre_başlat()`**, **`kronometre_bitir(başlangıç)`**: Süre ölçümü.

## 4. Liste Araçları (`liste.hb`)

- **`yazdır_liste(liste)`**: Listeyi güzel formatta yazar.
- **`iceriyor_mu(liste, eleman)`**: Varlık kontrolü.
- **`ters_cevir(liste)`**: Listeyi tersine döndürür.
- **`eşle(liste, f)`**: Her elemana f fonksiyonunu uygular (Map).
- **`filtrele(liste, f)`**: f koşuluna uyanları seçer (Filter).
- **`indirge(liste, f, başlangıç)`**: Liste elemanlarını tek bir değere indirger (Reduce).

## 5. Dizgi (`dizgi.hb`)

- **`içeriyor_mu(dizgi, aranan)`**: Alt metin kontrolü.
- **`başıyla_mı_başlıyor(dizgi, ön_ek)`**, **`sonuyla_mı_bitiyor(dizgi, son_ek)`**: Önek/Sonek kontrolü.
- **`kırp(dizgi)`**: Kenar boşluklarını siler.

## 6. Rastgele (`rastgele.hb`)

- **`r_tamsayı(min, max)`**: Aralıklı rastgele tam sayı.
- **`r_seç(liste)`**: Listeden rastgele eleman seçer.

## 7. Dosya (`dosya.hb`)

- **`dosya_var_mı(yol)`**: Varlık kontrolü.
- **`güvenli_oku(yol)`**: Hata vermeden okumaya çalışır.
- **`satırlara_ayır(metin)`**: Metni satır listesine çevirir.

## 8. İstatistik (`istatistik.hb`)

- **`ortalama(liste)`**, **`en_büyük(liste)`**, **`en_küçük(liste)`**
- **`varyans(liste)`**, **`standart_sapma(liste)`**

## 9. Birim Test (`birim_test.hb`)

- **`test_et(ad, f)`**: Test çalıştırır.
- **`iddia_et(a, b, m)`**: Eşitlik kontrolü (assertion).
- **`test_raporu()`**: Sonuç özetini yazar.
