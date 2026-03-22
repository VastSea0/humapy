// minimal_test.hb — minimal durak test
yükle "nlp.hb";

"İçeriyor testi:"'i yazdır
metin = " | bir | bu | " olsun
arama = " | bir | " olsun
sonuç = içeriyor(metin, arama) olsun
"içeriyor: " + sonuç'u yazdır

arama2 = " | xyz | " olsun
sonuç2 = içeriyor(metin, arama2) olsun
"içeriyor yok: " + sonuç2'yi yazdır

"durak_mı testi:"'i yazdır
d1 = durak_mı("bir") olsun
"bir durak mı: " + d1'i yazdır
d2 = durak_mı("kitap") olsun
"kitap durak mı: " + d2'yi yazdır

"filtreleme testi:"'i yazdır
liste = ["bir", "kitap", "bu", "güzel"] olsun
sonuc = [] olsun
i = 0 olsun
i < uzunluk(liste) olduğu sürece {
    durum = durak_mı(liste[i]) olsun
    "  " + liste[i] + " → durak: " + durum'u yazdır
    durum = 0 ise {
        sonuc'a [liste[i]]'ni ekle
    }
    i = i + 1 olsun
}
"Kalan: " + birleştir(sonuc, " ")'i yazdır
"Bitti!"'i yazdır
