yükle "renkler.hb";

fonksiyon beklet(saniye) {
    uyut(saniye * 1000);
}

fonksiyon kronometre_başlat() {
    döndür zaman();
}

fonksiyon kronometre_bitir(başlangıç) {
    değişken bitiş = zaman();
    değişken fark = bitiş - başlangıç;
    renkli_yaz("Geçen süre: " + fark + " saniye", TURKUAZ);
    döndür fark;
}
