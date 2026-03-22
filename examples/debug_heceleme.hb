yükle "dizgi.hb";
kelime = "bilgisayar" olsun
ünlüler = "aeıioöuüAEIİOÖUÜ" olsun

i = 0 olsun
boy = uzunluk(kelime) olsun
("Kelime boyu: " + boy)'u yazdır;

i < boy olduğu sürece {
    char = kelime[i] olsun
    varmı = içeriyor_mu(ünlüler, char) olsun
    ("Karakter: " + char + " Varmı: " + varmı)'yı yazdır;
    i = i + 1 olsun
}
