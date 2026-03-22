// nlp_hizli_test.hb — Hüma NLP Kütüphanesi Hızlı Test (Stem hariç)
yükle "nlp.hb";

"╔════════════════════════════════════╗"'i yazdır
"║  NLP Hızlı Test (Core Modüller)   ║"'i yazdır
"╚════════════════════════════════════╝"'i yazdır

// TEST 1: Tokenizasyon
"\n🔤 TEST 1: Tokenizasyon"'u yazdır
metin = "Türkçe güzel bir dildir. Eklemeli yapısıyla zengindir." olsun
tokens = nlp_tokenize(metin) olsun
"  Token sayısı: " + uzunluk(tokens)'u yazdır
"  İlk 3: " + tokens[0] + ", " + tokens[1] + ", " + tokens[2]'yi yazdır

// TEST 2: Büyük/Küçük Harf
"\n🔠 TEST 2: Türkçe Harf Dönüşümü"'i yazdır
"  küçük_harf('İSTANBUL'): " + küçük_harf("İSTANBUL")'i yazdır
"  büyük_harf('istanbul'): " + büyük_harf("istanbul")'i yazdır

// TEST 3: Metin Built-in'leri
"\n🛠 TEST 3: Metin Araçları"'i yazdır
"  böl: " + uzunluk(böl("a,b,c", ",")) + " parça"'yı yazdır
"  birleştir: " + birleştir(böl("elma,armut", ","), " | ")'i yazdır
"  değiştir: " + değiştir("merhaba dünya", "dünya", "Hüma")'yı yazdır
"  içeriyor: " + içeriyor("programlama", "gram")'ı yazdır
"  başlıyor_mu: " + başlıyor_mu("türkçe", "türk")'ü yazdır
"  dizi_dilim: " + dizi_dilim("bilgisayar", 0, 4)'ü yazdır

// TEST 4: Durak Kelime
"\n🚫 TEST 4: Durak Kelime Filtreleme"'i yazdır
cümle = "bu güzel kitap çok faydalı" olsun
toks = nlp_tokenize(cümle) olsun
fil = durak_kelime_filtrele(toks) olsun
"  Ham: " + uzunluk(toks) + "  →  Filtreli: " + uzunluk(fil)'i yazdır
"  Kalan: " + birleştir(fil, " ")'i yazdır

// TEST 5: Ünlü Analizi
"\n🔊 TEST 5: Ünlü Uyumu"'u yazdır
"  kitap: " + ünlü_uyumu_türü("kitap")'ı yazdır
"  öğrenci: " + ünlü_uyumu_türü("öğrenci")'yi yazdır
"  araba ünlü sayısı: " + kelime_ünlü_sayısı("araba")'yı yazdır

// TEST 6: N-gram
"\n📏 TEST 6: Bigram"'i yazdır
ngram_toks = ["yapay", "zeka", "dil", "işleme"] olsun
bi = bigram(ngram_toks) olsun
"  Bigram sayısı: " + uzunluk(bi)'ni yazdır
"  İlk bigram: " + bi[0]'ı yazdır

// TEST 7: Metin İstatistik
"\n📊 TEST 7: Metin İstatistik"'i yazdır
metin_istatistik("Türkçe bir programlama dili. Hüma harika bir dildir!")

// TEST 8: ASCII Normalize
"\n🔡 TEST 8: ASCII Normalize"'i yazdır
"  " + ascii_normalize("Çiçek Öğrenci Şükrü")'yü yazdır

// TEST 9: Stem (tek kelime, kısa)
"\n🌱 TEST 9: Stem (tek kelime)"'i yazdır
"  evlerde → " + stem("evlerde")'yi yazdır
"  arabalar → " + stem("arabalar")'ı yazdır

"\n✅ Hızlı testler tamamlandı!"'ı yazdır
