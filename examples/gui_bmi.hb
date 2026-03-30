yükle "gui.hb";

// DURUM DEĞİŞKENLERİ
kilo = 70.0 olsun
boy = 175.0 olsun
vki_sonuc = 0.0 olsun
durum_metni = "Hesaplamak için butona basın" olsun

hesapla_fks fonksiyon olsun {
    // VKI Formula: kilo / (boy/100 * boy/100)
    boy_metre = boy / 100.0 olsun
    payda = boy_metre * boy_metre olsun
    vki_sonuc = kilo / payda
    
    vki_sonuc < 18.5 ise {
        durum_metni = "Zayıf"
    } yoksa {
        vki_sonuc < 25.0 ise {
            durum_metni = "Normal Kilolu"
        } yoksa {
            vki_sonuc < 30.0 ise {
                durum_metni = "Fazla Kilolu"
            } yoksa {
                durum_metni = "Obez"
            }
        }
    }
}

girdi_alani_fks fonksiyon olsun {
    yazı_ekle("Kilo (kg):")
    kilo = kaydırıcı_ekle(kilo, 30, 200)
    
    boşluk_bırak(10.0)
    yazı_ekle("Boy (cm):")
    boy = kaydırıcı_ekle(boy, 100, 250)
    
    boşluk_bırak(15.0)
    buton_ekle("HESAPLA", 0, 150, 0, 400, 30) ise {
        hesapla_fks()
    }
}

sonuc_alani_fks fonksiyon olsun {
    vki_metni = "VKI Değeriniz: " + vki_sonuc olsun
    yazı_ekle(vki_metni, "başlık")
    
    yazı_ekle("Durum:", "kalın")
    
    durum_metni == "Normal Kilolu" ise {
        yazı_ekle(durum_metni, 0, 100, 255)
    } yoksa {
        yazı_ekle(durum_metni, 255, 100, 0)
    }
}

ana_cizim_fks fonksiyon olsun {
    yazı_ekle("🥗 HÜMA SAĞLIK ASİSTANI", "başlık")
    boşluk_bırak(20.0)
    
    grup_kutusu_ekle("Vücut Ölçüleri", girdi_alani_fks)
    
    boşluk_bırak(30.0)
    ayraç_çiz()
    boşluk_bırak(10.0)
    
    vki_sonuc > 0 ise {
        grup_kutusu_ekle("Analiz Sonucu", sonuc_alani_fks)
    }
}

pencere_oluştur("Hüma BMI Calculator", 450.0, 500.0, ana_cizim_fks)
