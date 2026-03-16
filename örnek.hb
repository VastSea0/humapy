yazdır("--- Matematik Testi ---");
yazdır("Mutlak -5: " + mutlak(-5));
yazdır("Yuvarla 3.7: " + yuvarla(3.7));
yazdır("Rastgele Sayı: " + rastgele());

yazdır("--- Metin Testi ---");
değişken isim = "  Hüma Programlama  ";
yazdır("Orijinal: '" + isim + "'");
yazdır("Kırpılmış: '" + kırp(isim) + "'");
yazdır("Küçük Harf: " + küçük_harf(kırp(isim)));
yazdır("Büyük Harf: " + büyük_harf(kırp(isim)));

yazdır("--- Liste Testi ---");
değişken sayılar = [1, 2, 3];
değişken yeni_liste = listeye_ekle(sayılar, 4);
yazdır("Eski Liste: " + sayılar);
yazdır("Yeni Liste: " + yeni_liste);

yazdır("--- Sistem Testi ---");
yazdır("Şu anki zaman (sn): " + zaman());
yazdır("1 saniye uyutuluyor...");
uyut(1000);
yazdır("Bitti!");
