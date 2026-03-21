yükle "dosya.hb";
yükle "dizgi.hb";
yükle "renkler.hb";

analiz_et fonksiyon olsun dosya_yolu alsın {
    icerik = güvenli_oku(dosya_yolu) olsun
    uzunluk(icerik) = 0 ise { 0'ı döndür }
    
    satırlar = satırlara_ayır(icerik) olsun
    hata_sayisi = 0 olsun
    uyari_sayisi = 0 olsun
    bilgi_sayisi = 0 olsun
    
    "Analiz başlatılıyor: " + dosya_yolu'nu yazdır
    "---------------------------------"'ı yazdır
    
    i = 0 olsun
    i < uzunluk(satırlar) olduğu sürece {
        satır = satırlar[i] olsun
        
        içeriyor_mu(satır, "HATA") ise {
            hata_yaz(satır)
            hata_sayisi = hata_sayisi + 1 olsun
        } yoksa içeriyor_mu(satır, "UYARI") ise {
            uyarı_yaz(satır)
            uyari_sayisi = uyari_sayisi + 1 olsun
        } yoksa {
            bilgi_sayisi = bilgi_sayisi + 1 olsun
        }
        
        i = i + 1 olsun
    }
    
    "---------------------------------"'ı yazdır
    renkli_yaz("ÖZET RAPORU:", KALIN)
    "Toplam Satır: " + uzunluk(satırlar)'ı yazdır
    renkli_yaz("Hatalar: " + hata_sayisi, KIRMIZI)
    renkli_yaz("Uyarılar: " + uyari_sayisi, SARI)
    renkli_yaz("Bilgi: " + bilgi_sayisi, YESIL)
}

analiz_et("sistem.log")
