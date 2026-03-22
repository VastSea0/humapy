yükle "dizgi.hb";
kelime = "bilgisayar" olsun
ünlüler = "aeıioöuüAEIİOÖUÜ" olsun
konumlar = [] olsun
i = 0 olsun
boy = kelime'nin uzunluğu olsun

i < boy olduğu sürece {
    char = kelime[i] olsun
    var_mi = içeriyor_mu(ünlüler, char) olsun
    ("i=" + i + " char=" + char + " var=" + var_mi) yazdır
    var_mi ise {
        konumlar'a [i]'yi ekle
    }
    i = i + 1 olsun
}

"Konumlar: " + konumlar'ı yazdır
