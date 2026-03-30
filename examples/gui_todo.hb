yükle "gui.hb";

// DURUM DEĞİŞKENLERİ
gorev_metni = "" olsun
gorev_listesi = ["İlk görevini ekle!"] olsun
tamamlanan_sayisi = 0 olsun

// DÖNGÜ İÇİN GEÇİCİ DEĞİŞKENLER (Global)
akf_gorev = "" olsun
akf_idx = 0 olsun

gorev_ekle_fks fonksiyon olsun {
    gorev_metni == "" ise {
        yaz("Görev metni boş olamaz!")
    } yoksa {
        gorev_listesi[gorev_metni] ekle
        gorev_metni = ""
    }
}

ekle_buton_fks fonksiyon olsun {
    buton_ekle("Ekle", 100.0, 25.0) ise {
        gorev_ekle_fks()
    }
}

yeni_gorev_alanı_fks fonksiyon olsun {
    gorev_metni = metin_kutusu_ekle(gorev_metni, 300.0)
    boşluk_bırak(10.0)
    yan_yana_diz(ekle_buton_fks)
}

gorev_satiri_fks fonksiyon olsun {
        yaz("Döngü i: " + i)
    // Global geçici değişkenleri kullanıyoruz
    i_no = "" + (akf_idx + 1) olsun
    yazı_ekle(i_no + ". ", "kalın")
    yazı_ekle(akf_gorev)
    
    // Silme butonu
    buton_ekle("Sil", 255, 60, 60, 40, 20) ise {
        gorev_listesi[akf_idx] çıkar
        tamamlanan_sayisi = tamamlanan_sayisi + 1
    }
}

kaydirilan_icerik_fks fonksiyon olsun {
    l_uz = gorev_listesi'nin uzunluğu olsun
    i = 0 olsun
    döngü i < l_uz ise {
        akf_idx = i
        akf_gorev = gorev_listesi[i]
        
        yan_yana_diz(gorev_satiri_fks)
        
        boşluk_bırak(5.0)
        i = i + 1
    }
}

ana_cizim_fks fonksiyon olsun {
    yazı_ekle("HÜMA YAPILACAKLAR (ToDo)", "başlık")
    boşluk_bırak(10.0)
    
    grup_kutusu_ekle("Yeni Görev", yeni_gorev_alanı_fks)
    
    boşluk_bırak(15.0)
    uz = gorev_listesi'nin uzunluğu olsun
    metin_uz = "Aktif Görevler (" + uz + ")" olsun
    yazı_ekle(metin_uz, "kalın")
    ayraç_çiz()
    boşluk_bırak(5.0)
    
    uz > 0 ise {
        kaydırılabilir_liste_ekle("todo_scroll", kaydirilan_icerik_fks)
    } yoksa {
        yazı_ekle("Tebrikler! Yapılacak iş kalmadı. 🎉", 0, 180, 100)
    }
    
    boşluk_bırak(15.0)
    ayraç_çiz()
    toplam_metin = "Tamamlanan Toplam: " + tamamlanan_sayisi olsun
    yazı_ekle(toplam_metin, 0, 100, 200)
}

pencere_oluştur("Hüma ToDo", 500.0, 450.0, ana_cizim_fks)
