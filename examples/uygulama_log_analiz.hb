yükle "dosya.hb";
yükle "dizgi.hb";
yükle "renkler.hb";

fonksiyon analiz_et(dosya_yolu) {
    değişken icerik = güvenli_oku(dosya_yolu);
    eğer uzunluk(icerik) == 0 { döndür Boş; }
    
    değişken satırlar = satırlara_ayır(icerik);
    değişken hata_sayisi = 0;
    değişken uyari_sayisi = 0;
    değişken bilgi_sayisi = 0;
    
    yazdır("Analiz başlatılıyor: " + dosya_yolu);
    yazdır("---------------------------------");
    
    değişken i = 0;
    döngü i < uzunluk(satırlar) {
        değişken satır = satırlar[i];
        
        eğer içeriyor_mu(satır, "HATA") {
            hata_yaz(satır);
            hata_sayisi = hata_sayisi + 1;
        } değilse eğer içeriyor_mu(satır, "UYARI") {
            uyarı_yaz(satır);
            uyari_sayisi = uyari_sayisi + 1;
        } değilse {
            bilgi_sayisi = bilgi_sayisi + 1;
        }
        
        i = i + 1;
    }
    
    yazdır("---------------------------------");
    renkli_yaz("ÖZET RAPORU:", KALIN);
    yazdır("Toplam Satır: " + uzunluk(satırlar));
    renkli_yaz("Hatalar: " + hata_sayisi, KIRMIZI);
    renkli_yaz("Uyarılar: " + uyari_sayisi, SARI);
    renkli_yaz("Bilgi: " + bilgi_sayisi, YESIL);
}

analiz_et("sistem.log");
