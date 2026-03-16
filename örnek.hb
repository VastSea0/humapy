// Hüma Örnek Kod

fonksiyon faktoriyel(n) {
    eğer n < 2 {
        döndür 1;
    }
    döndür n * faktoriyel(n - 1);
}

değişken sayı = 5;
yazdır(sayı + " sayısının faktöriyeli: " + faktoriyel(sayı));

// Mantıksal operatörler testi
değişken hava_gunesli = 1;
değişken tatil_gunu = 0;

eğer hava_gunesli ve değil tatil_gunu {
    yazdır("Dışarı çık ama işe gitmeyi unutma!");
}
