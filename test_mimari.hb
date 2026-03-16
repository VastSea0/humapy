yükle "liste.hb";
yükle "birim_test.hb";
yükle "matematik.hb";

fonksiyon test_matematik() {
    döndür iddia_et(25, karesi(5), "5'in karesi 25 olmalı");
}

fonksiyon test_liste_esle() {
    değişken l = [1, 2, 3];
    fonksiyon iki_kati(n) { döndür n * 2; }
    değişken sonuc = eşle(l, iki_kati);
    döndür iddia_et([2, 4, 6], sonuc, "Eşleme fonksiyonu hatalı");
}

fonksiyon test_liste_filtrele() {
    değişken l = [1, 2, 3, 4, 5, 6];
    fonksiyon çift_mi(n) { döndür (n % 2) == 0; }
    değişken sonuc = filtrele(l, çift_mi);
    döndür iddia_et([2, 4, 6], sonuc, "Filtreleme fonksiyonu hatalı");
}

test_et("Kare Testi", test_matematik);
test_et("Liste Eşleme Testi", test_liste_esle);
test_et("Liste Filtreleme Testi", test_liste_filtrele);

test_raporu();
