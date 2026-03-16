yükle "matematik.hb";

yazdır("PI değeri: " + PI);
yazdır("12'nin karesi: " + karesi(12));

değişken isim = "Hüma Testi"; // REPL veya Dosya modunda 'oku' için manuel test
yazdır("İsim: " + isim);
yazdır("İsim uzunluğu: " + uzunluk(isim));

değişken yaş = 20;
yazdır("Yaş: " + yaş);
eğer yaş >= 18 {
    yazdır("Hüma dünyasında özgürsün!");
} değilse {
    yazdır("Biraz daha büyümen lazım :)");
}

değişken liste = [1, 2, 3];
yazdır("Liste Tipi: " + tipini_ver(liste));
yazdır("Sayı Tipi: " + tipini_ver(42));
