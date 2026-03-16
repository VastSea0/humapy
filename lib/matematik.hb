değişken PI = 3.141592653589793;
değişken E = 2.718281828459045;

fonksiyon karesi(n) { döndür n * n; }
fonksiyon küpü(n) { döndür n * n * n; }
fonksiyon mutlak(n) { eğer n < 0 { döndür n * -1; } döndür n; }

fonksiyon kuvvet(a, b) {
    değişken sonuc = 1;
    değişken i = 0;
    döngü i < b {
        sonuc = sonuc * a;
        i = i + 1;
    }
    döndür sonuc;
}

fonksiyon yuvarla(n) {
    değişken tam = n - (n % 1);
    eğer (n % 1) >= 0.5 { döndür tam + 1; }
    döndür tam;
}

fonksiyon faktöriyel(n) {
    eğer n <= 1 { döndür 1; }
    döndür n * faktöriyel(n - 1);
}
