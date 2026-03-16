fonksiyon yazdır_liste(liste) {
    yazdır("[");
    değişken i = 0;
    değişken boy = uzunluk(liste);
    döngü i < boy {
        yazdır("  " + liste[i]);
        i = i + 1;
    }
    yazdır("]");
}

fonksiyon iceriyor_mu(liste, aranan) {
    değişken i = 0;
    değişken boy = uzunluk(liste);
    döngü i < boy {
        eğer liste[i] == aranan { döndür 1; }
        i = i + 1;
    }
    döndür 0;
}

fonksiyon ters_cevir(liste) {
    değişken yeni = [];
    değişken i = uzunluk(liste) - 1;
    döngü i >= 0 {
        yeni = listeye_ekle(yeni, liste[i]);
        i = i - 1;
    }
    döndür yeni;
}
