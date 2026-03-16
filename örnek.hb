değişken listem = [10, 20, 30, "Hüma"];
yazdır("Liste: " + listem);
yazdır("Listenin 0. elemanı: " + listem[0]);
yazdır("Listenin uzunluğu: " + uzunluk(listem));

değişken x = 10;
eğer x >= 10 ve x != 5 {
    yazdır("x, 10'dan büyük eşit ve 5'e eşit değil.");
}

değişken metin = "Merhaba";
yazdır("Metnin ilk harfi: " + metin[0]);
yazdır("Metnin uzunluğu: " + uzunluk(metin));

// Fonksiyon içinde liste kullanımı
fonksiyon liste_yazdır(l) {
    değişken i = 0;
    döngü i < uzunluk(l) {
        yazdır("Eleman " + i + ": " + l[i]);
        i = i + 1;
    }
}

liste_yazdır([1, "iki", 3.0]);
