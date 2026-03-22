kelime = "bilgisayar" olsun
ünlüler = "aeıioöuüAEIİOÖUÜ" olsun
konumlar = [] olsun
i = 0 olsun
boy = kelime'nin uzunluğu olsun

i < boy olduğu sürece {
    char = kelime[i] olsun
    
    // Inline içeriyor_mu logic
    bulundu = 0 olsun
    j = 0 olsun
    uzunluk(ünlüler) olduğu sürece {
        j < uzunluk(ünlüler) ise {
            ünlüler[j] = char ise {
                bulundu = 1 olsun
                j = uzunluk(ünlüler) olsun
            }
            j = j + 1 olsun
        } yoksa {
            j = uzunluk(ünlüler) olsun
        }
    }

    ("i=" + i + " char=" + char + " bulundu=" + bulundu) yazdır
    bulundu ise {
        konumlar'a [i]'yi ekle
    }
    i = i + 1 olsun
}

"Konumlar: " + konumlar'ı yazdır
