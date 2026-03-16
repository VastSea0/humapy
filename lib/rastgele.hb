// Rastgele İşlemler

fonksiyon r_tamsayı(min, max) {
    değişken r = rastgele(); // 0 ile 1 arası
    değişken sonuc = min + (r * (max - min + 1));
    döndür sonuc - (sonuc % 1); // Tam sayı yap
}

fonksiyon r_seç(liste) {
    değişken boy = uzunluk(liste);
    eğer boy == 0 { döndür Boş; }
    değişken idx = r_tamsayı(0, boy - 1);
    döndür liste[idx];
}

fonksiyon r_karıştır(liste) {
    değişken yeni = liste;
    değişken boy = uzunluk(liste);
    değişken i = 0;
    döngü i < boy {
        değişken j = r_tamsayı(0, boy - 1);
        değişken gecici = yeni[i];
        yeni[i] = yeni[j];
        yeni[j] = gecici;
        i = i + 1;
    }
    döndur yeni; // Not: listeler şu an referansla değişiyor mu? Evet.
}
