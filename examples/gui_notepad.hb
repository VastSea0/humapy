yükle "gui.hb";

// DURUM DEĞİŞKENLERİ
baslik = "Yeni Not" olsun
icerik = "Hüma ile not almaya başla..." olsun
kaydedilen_notlar = [] olsun
tema_modu = "koyu" olsun

not_ekle_fks fonksiyon olsun {
    kaydedilen_notlar[baslik + ": " + icerik] ekle
    baslik = "Yeni Not"
    icerik = ""
}

not_paneli_fks fonksiyon olsun {
    yazı_ekle("Not Başlığı:")
    baslik = metin_kutusu_ekle(baslik, 400.0)
    
    boşluk_bırak(10.0)
    yazı_ekle("İçerik:")
    icerik = büyük_metin_kutusu_ekle(icerik)
    
    boşluk_bırak(10.0)
    yan_yana_diz(fonksiyon olsun {
        buton_ekle("Notu Kaydet", 0, 200, 100, 200, 25) ise {
            not_ekle_fks()
        }
        buton_ekle("Tümünü Sil", 255, 100, 50, 180, 25) ise {
            kaydedilen_notlar = []
        }
    })
}

liste_fks fonksiyon olsun {
    liz = kaydedilen_notlar'nin uzunluğu olsun
    i = 0 olsun
    döngü i < liz ise {
        g_not = kaydedilen_notlar[i] olsun
        yazı_ekle(g_not, "belirgin")
        ayraç_çiz()
        i = i + 1
    }
}

ana_cizim_fks fonksiyon olsun {
    yazı_ekle("📝 HÜMA NOT DEFTERİ", "başlık")
    boşluk_bırak(15.0)
    
    yan_yana_diz(fonksiyon olsun {
        buton_ekle("Temayı Değiştir (" + tema_modu + ")") ise {
            tema_modu == "koyu" ise {
                tema_modu = "açık"
                tema_degistir("açık")
            } yoksa {
                tema_modu = "koyu"
                tema_degistir("koyu")
            }
        }
    })
    
    boşluk_bırak(10.0)
    grup_kutusu_ekle("Yeni Not Oluştur", not_paneli_fks)
    
    boşluk_bırak(20.0)
    yazı_ekle("Kayıtlı Notlar (" + kaydedilen_notlar'nin uzunluğu + ")", "kalın")
    ayraç_çiz()
    
    kaydırılabilir_liste_ekle("notlar_scrol", liste_fks)
}

pencere_oluştur("Hüma Notepad", 500.0, 600.0, ana_cizim_fks)
