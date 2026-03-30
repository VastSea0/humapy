yükle "gui.hb";

// DURUM DEĞİŞKENLERİ
secilen_birim = "USD" olsun
para_miktarı = 100.0 olsun
oran_usd = 32.5 olsun
oran_eur = 35.1 olsun
hesap_sonucu = 3250.0 olsun

hesapla_fks fonksiyon olsun {
    secilen_birim == "USD" ise {
        hesap_sonucu = para_miktarı * oran_usd
    } yoksa {
        hesap_sonucu = para_miktarı * oran_eur
    }
}

secim_fks fonksiyon olsun {
    sekme_ekle(secilen_birim == "USD", "USD") == 1 ise {
        secilen_birim = "USD"
    }
    sekme_ekle(secilen_birim == "EUR", "EUR") == 1 ise {
        secilen_birim = "EUR"
    }
}

miktar_giris_fks fonksiyon olsun {
    yazı_ekle("Para miktarını girin:")
    para_miktarı = kaydırıcı_ekle(para_miktarı, 0, 5000)
    
    boşluk_bırak(10.0)
    yan_yana_diz(secim_fks)
}

sonuc_goruntule_fks fonksiyon olsun {
    // String birleştirme hata riskini azaltmak için parçalı yazdırıyoruz
    yazı_ekle("Sonuç:")
    metin1 = "" + para_miktarı olsun
    metin2 = " " + secilen_birim olsun
    metin3 = " karşılığı: " olsun
    cümle1 = metin1 + metin2 olsun
    cümle2 = cümle1 + metin3 olsun
    yazı_ekle(cümle2, "kalın")
    
    metin_sonuc = "" + hesap_sonucu olsun
    son_cümle = metin_sonuc + " TL" olsun
    yazı_ekle(son_cümle, 0, 200, 50)
}

ana_dongu_fks fonksiyon olsun {
    hesapla_fks()
    yazı_ekle("💰 HÜMA DÖVİZ HESAPLAYICI", "başlık")
    boşluk_bırak(15.0)
    
    grup_kutusu_ekle("Girdi Alanı", miktar_giris_fks)
    boşluk_bırak(10.0)
    ayraç_çiz()
    boşluk_bırak(10.0)
    grup_kutusu_ekle("Hesaplama", sonuc_goruntule_fks)
}

pencere_oluştur("Döviz Hesaplayıcı V2", 450.0, 450.0, ana_dongu_fks)
