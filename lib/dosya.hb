yükle "renkler.hb";

fonksiyon dosya_var_mı(yol) {
    değişken icerik = dosya_oku(yol);
    eğer tipi(icerik) == "Metin" { döndür 1; }
    döndür 0;
}

fonksiyon güvenli_oku(yol) {
    değişken icerik = dosya_oku(yol);
    eğer tipi(icerik) == "Boş" {
        hata_yaz("Dosya okunamadı: " + yol);
        döndür "";
    }
    döndür icerik;
}

fonksiyon satırlara_ayır(metin) {
    değişken satırlar = [];
    değişken gecici = "";
    değişken i = 0;
    değişken boy = uzunluk(metin);
    
    döngü i < boy {
        değişken c = metin[i];
        eğer (c == "\n") {
            satırlar = listeye_ekle(satırlar, gecici);
            gecici = "";
        } değilse {
            gecici = gecici + c;
        }
        i = i + 1;
    }
    eğer uzunluk(gecici) > 0 {
        satırlar = listeye_ekle(satırlar, gecici);
    }
    döndür satırlar;
}
