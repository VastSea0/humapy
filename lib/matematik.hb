değişken PI = 3.141592653589793;
değişken E = 2.718281828459045;

fonksiyon karesi(n) { döndür n * n; }
fonksiyon küpü(n) { döndür n * n * n; }
fonksiyon mutlak_değer(n) { eğer n < 0 { döndür n * -1; } döndür n; }

fonksiyon kuvvet(taban, us) {
    değişken sonuc = 1;
    değişken i = 0;
    döngü i < us {
        sonuc = sonuc * taban;
        i = i + 1;
    }
    döndür sonuc;
}
