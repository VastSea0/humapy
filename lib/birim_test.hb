// Birim Test Çerçevesi

değişken __toplam_test = 0;
değişken __başarılı_test = 0;

fonksiyon test_et(ad, f) {
    __toplam_test = __toplam_test + 1;
    yazdır("[TEST] " + ad + " ...");
    değişken sonuc = f();
    eğer sonuc {
        yazdır("  -> BAŞARILI");
        __başarılı_test = __başarılı_test + 1;
    } değilse {
        yazdır("  -> !!! HATA !!!");
    }
}

fonksiyon test_raporu() {
    yazdır("-----------------------------");
    yazdır("Toplam Test: " + __toplam_test);
    yazdır("Başarılı: " + __başarılı_test);
    yazdır("Başarısız: " + (__toplam_test - __başarılı_test));
    yazdır("-----------------------------");
}

fonksiyon iddia_et(a, b, mesaj) {
    eğer a == b { döndür 1; }
    yazdır("  Hata: " + mesaj + " (Beklenen: " + a + ", Gelen: " + b + ")");
    döndür 0;
}
