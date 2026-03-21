yükle "matematik.hb";
yükle "renkler.hb";
yükle "rastgele.hb";
yükle "dizgi.hb";
yükle "dosya.hb";
yükle "istatistik.hb";

renkli_yaz("===== Hüma Gelişmiş Kütüphane Testi =====", TURKUAZ + KALIN)

// 1. Matematik ve İstatistik Testi
veriler = [10, 20, 30, 40, 50] olsun
"Veriler: " + veriler'i yazdır
"Ortalama: " + ortalama(veriler)'i yazdır
"Standart Sapma: " + standart_sapma(veriler)'i yazdır
"144'ün karekökü: " + karekök(144)'ü yazdır

// 2. Dizgi Testi
metin = "   Merhaba Hüma Dünyası!   " olsun
"Orijinal: '" + metin + "'"'yı yazdır
"Kırpılmış: '" + kırp(metin) + "'"'yı yazdır
içeriyor_mu(metin, "Hüma") ise {
    başarı_yaz("Metin 'Hüma' içeriyor.")
}

// 3. Rastgele Testi
"Rastgele Sayı (1-100): " + r_tamsayı(1, 100)'ü yazdır
sansli_meyve = r_seç(["Elma", "Armut", "Kiraz", "Karpuz"]) olsun
"Şanslı Meyveniz: " + sansli_meyve'yi yazdır

// 4. Dosya Sistem Testi
test_dosyasi = "test_gunlugu.txt" olsun
test_icerigi = "Hüma ile dosya yazma testi.\nİkinci satır.\nSon." olsun
dosya_yaz(test_dosyasi, test_icerigi) ise {
    başarı_yaz(test_dosyasi + " başarıyla oluşturuldu.")
}

okunan = güvenli_oku(test_dosyasi) olsun
"Dosya İçeriği:"'ni yazdır
okunan'ı yazdır

satırlar = satırlara_ayır(okunan) olsun
"Satır Sayısı: " + uzunluk(satırlar)'ı yazdır

// 5. Tip Kontrolü
"PI tipi: " + tipi(PI)'yi yazdır
