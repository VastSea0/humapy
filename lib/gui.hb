// Hüma Native GUI Kütüphanesi
// egui tabanlı yerel arayüz oluşturma araçları

GUI_SÜRÜM = "0.2.0" olsun

gui_sürüm_al fonksiyon olsun {
    GUI_SÜRÜM'ü döndür
}

pencere_oluştur fonksiyon olsun başlık, genişlik, yükseklik, çizim_fks alsın {
    pencere_başlat(başlık, genişlik, yükseklik, çizim_fks)
}

buton_ekle fonksiyon olsun metin alsın {
    buton(metin)'i döndür
}

yazı_ekle fonksiyon olsun metin alsın {
    etiket(metin)
}

büyük_başlık fonksiyon olsun metin alsın {
    başlık_yazısı(metin)
}

renkli_yazı_ekle fonksiyon olsun metin, r, g, b alsın {
    renkli_yazı(metin, r, g, b)
}

kalın_yazı_ekle fonksiyon olsun metin alsın {
    kalın_yazı(metin)
}

eğik_yazı_ekle fonksiyon olsun metin alsın {
    eğik_yazı(metin)
}

renkli_buton_ekle fonksiyon olsun metin, r, g, b alsın {
    renkli_buton(metin, r, g, b)'i döndür
}

tema_degistir fonksiyon olsun tema alsın {
    tema_ayarla(tema)
}

metin_kutusu_ekle fonksiyon olsun metin alsın {
    girdi_alanı(metin)'i döndür
}

büyük_metin_kutusu_ekle fonksiyon olsun metin alsın {
    büyük_girdi_alanı(metin)'i döndür
}

kaydırıcı_ekle fonksiyon olsun değer, min, max alsın {
    kaydırıcı(değer, min, max)'ı döndür
}

onay_kutusu_ekle fonksiyon olsun durum, metin alsın {
    onay_kutusu(durum, metin)'i döndür
}

yan_yana_diz fonksiyon olsun fks alsın {
    yan_yana(fks)
}

alt_alta_diz fonksiyon olsun fks alsın {
    alt_alta(fks)
}

ayraç_çiz fonksiyon olsun {
    ayraç()
}

boşluk_bırak fonksiyon olsun miktar alsın {
    boşluk(miktar)
}

// -- Sürüm 0.2.0 ile Gelen Gelişmiş Özellikler --

sekme_ekle fonksiyon olsun seçili_mi, metin alsın {
    sekme(seçili_mi, metin)'i döndür
}

yüzen_pencere_ekle fonksiyon olsun başlık, açık_mı, fks alsın {
    yüzen_pencere(başlık, açık_mı, fks)'ı döndür
}

menü_çubuğu_ekle fonksiyon olsun fks alsın {
    menü_çubuğu(fks)
}

açılır_menü_ekle fonksiyon olsun başlık, fks alsın {
    açılır_menü(başlık, fks)
}

grup_kutusu_ekle fonksiyon olsun başlık, fks alsın {
    grup_kutusu(başlık, fks)
}

grid_ekle fonksiyon olsun id, fks alsın {
    grid_oluştur(id, fks)
}

yeni_satır_ekle fonksiyon olsun {
    satır_bitir()
}

kaydırılabilir_liste_ekle fonksiyon olsun id, fks alsın {
    kaydırılabilir_alan(id, fks)
}

// Boyutlandırma ve Düzenleme (Sürüm 0.3.0)

alan_ayır_ekle fonksiyon olsun w, h, fks alsın {
    alan_ayır(w, h, fks)
}

boyutlu_buton_ekle fonksiyon olsun metin, w, h alsın {
    boyutlu_buton(metin, w, h)'i döndür
}

boyutlu_renkli_buton_ekle fonksiyon olsun metin, w, h, r, g, b alsın {
    boyutlu_renkli_buton(metin, w, h, r, g, b)'i döndür
}

boyutlu_metin_kutusu_ekle fonksiyon olsun metin, w alsın {
    boyutlu_girdi_alanı(metin, w)'i döndür
}
