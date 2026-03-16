yükle "matematik.hb";
yükle "renkler.hb";
yükle "zaman.hb";
yükle "liste.hb";

renkli_yaz("--- Hüma Sistem Kütüphaneleri Testi ---", TURKUAZ + KALIN);

// Matematik
yazdır("PI: " + PI);
yazdır("5'in küpü: " + küpü(5));
yazdır("2'nin 10. kuvveti: " + kuvvet(2, 10));

// Renkler
uyarı_yaz("Bu bir sistem uyarısıdır.");
başarı_yaz("Sistem kütüphaneleri başarıyla yüklendi.");

// Liste
değişken meyveler = ["Elma", "Armut", "Muz"];
yazdır("Meyveler:");
yazdır_liste(meyveler);

eğer iceriyor_mu(meyveler, "Muz") {
    başarı_yaz("Listede Muz bulundu!");
}

yazdır("Ters Liste: " + ters_cevir(meyveler));

// Zaman
değişken baslangic = kronometre_başlat();
yazdır("Yarım saniye bekleniyor...");
beklet(0.5);
kronometre_bitir(baslangic);
