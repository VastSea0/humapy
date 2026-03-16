yükle "matematik.hb";
yükle "renkler.hb";
yükle "rastgele.hb";
yükle "dizgi.hb";
yükle "dosya.hb";
yükle "istatistik.hb";

renkli_yaz("===== Hüma Gelişmiş Kütüphane Testi =====", TURKUAZ + KALIN);

// 1. Matematik ve İstatistik Testi
değişken veriler = [10, 20, 30, 40, 50];
yazdır("Veriler: " + veriler);
yazdır("Ortalama: " + ortalama(veriler));
yazdır("Standart Sapma: " + standart_sapma(veriler));
yazdır("144'ün karekökü: " + karekök(144));

// 2. Dizgi Testi
değişken metin = "   Merhaba Hüma Dünyası!   ";
yazdır("Orijinal: '" + metin + "'");
yazdır("Kırpılmış: '" + kırp(metin) + "'");
eğer içeriyor_mu(metin, "Hüma") {
    başarı_yaz("Metin 'Hüma' içeriyor.");
}

// 3. Rastgele Testi
yazdır("Rastgele Sayı (1-100): " + r_tamsayı(1, 100));
değişken sansli_meyve = r_seç(["Elma", "Armut", "Kiraz", "Karpuz"]);
yazdır("Şanslı Meyveniz: " + sansli_meyve);

// 4. Dosya Sistem Testi
değişken test_dosyasi = "test_gunlugu.txt";
değişken test_icerigi = "Hüma ile dosya yazma testi.\nİkinci satır.\nSon.";
eğer dosya_yaz(test_dosyasi, test_icerigi) {
    başarı_yaz(test_dosyasi + " başarıyla oluşturuldu.");
}

değişken okunan = güvenli_oku(test_dosyasi);
yazdır("Dosya İçeriği:");
yazdır(okunan);

değişken satırlar = satırlara_ayır(okunan);
yazdır("Satır Sayısı: " + uzunluk(satırlar));

// 5. Tip Kontrolü
yazdır("PI tipi: " + tipi(PI));
yazdır("Meyveler tipi: " + tipi(meyveler));
yazdır("Boş tipi: " + tipi(Boş));
