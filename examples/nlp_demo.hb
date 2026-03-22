// ══════════════════════════════════════════════════════════════════════════════
// nlp_demo.hb — Hüma Dili Türkçe NLP Kütüphanesi Demo Programı
// Bu program nlp.hb kütüphanesinin tüm modüllerini test eder.
// ══════════════════════════════════════════════════════════════════════════════

yükle "nlp.hb";

"╔════════════════════════════════════════╗"'i yazdır
"║   Hüma NLP Kütüphanesi Demo v1.0      ║"'i yazdır
"╚════════════════════════════════════════╝"'i yazdır

// ────────────────────────────────────────────────────────────
// TEST 1: Metin Temizleme ve Tokenizasyon
// ────────────────────────────────────────────────────────────
"\n🔤 TEST 1: Tokenizasyon"'u yazdır

metin = "Türkiye, çok dilli ve kültürel açıdan zengin bir ülkedir. Dili Türkçe'dir." olsun
"Girdi: " + metin'i yazdır

tokens = nlp_tokenize(metin) olsun
"Tokenlar: " + uzunluk(tokens) + " adet"'i yazdır

// İlk 5 tokeni göster
i = 0 olsun
i < 5 olduğu sürece {
    "  [" + i + "] " + tokens[i]'ni yazdır
    i = i + 1 olsun
}

// ────────────────────────────────────────────────────────────
// TEST 2: Büyük/Küçük Harf — Türkçe Farkında
// ────────────────────────────────────────────────────────────
"\n🔠 TEST 2: Türkçe Büyük/Küçük Harf Dönüşümü"'ü yazdır

test_kel = "İstanbul ŞIŞLI ÇOK güzel" olsun
"Girdi    : " + test_kel'i yazdır
"Küçük    : " + küçük_harf(test_kel)'i yazdır
"Büyük    : " + büyük_harf(test_kel)'i yazdır

// ────────────────────────────────────────────────────────────
// TEST 3: Durak Kelime Filtreleme
// ────────────────────────────────────────────────────────────
"\n🚫 TEST 3: Durak Kelime Filtreleme"'i yazdır

cümle = "bu kitap çok güzel ve faydalı bir eser" olsun
"Girdi    : " + cümle'yi yazdır

toks = nlp_tokenize(cümle) olsun
"Ham token: " + uzunluk(toks) + " adet"'i yazdır

filtrelenmis = durak_kelime_filtrele(toks) olsun
"Filtreli : " + uzunluk(filtrelenmis) + " adet"'i yazdır
"Kelimeler: " + birleştir(filtrelenmis, ", ")'i yazdır

// ────────────────────────────────────────────────────────────
// TEST 4: Ünlü Uyumu Analizi
// ────────────────────────────────────────────────────────────
"\n🔊 TEST 4: Ünlü Uyumu Analizi"'i yazdır

kelimeler = ["kitap", "öğrenci", "araba", "gökyüzü", "bilgisayar"] olsun
i = 0 olsun
i < uzunluk(kelimeler) olduğu sürece {
    kel = kelimeler[i] olsun
    tür = ünlü_uyumu_türü(kel) olsun
    ünlü_s = kelime_ünlü_sayısı(kel) olsun
    "  " + kel + " → ünlü uyumu: " + tür + " (" + ünlü_s + " ünlü)"'i yazdır
    i = i + 1 olsun
}

// ────────────────────────────────────────────────────────────
// TEST 5: Stemming (Kök Bulma)
// ────────────────────────────────────────────────────────────
"\n🌱 TEST 5: Kök Bulma (Stemming)"'i yazdır

çekimli_kelimeler = [
    "evlerde", "arabalar", "kitaplara", "çalışıyorum",
    "gideceklerdi", "öğrencilerin", "bilgisayarlardan"
] olsun

i = 0 olsun
i < uzunluk(çekimli_kelimeler) olduğu sürece {
    kel = çekimli_kelimeler[i] olsun
    kök = stem(kel) olsun
    "  " + kel + " → " + kök'ü yazdır
    i = i + 1 olsun
}

// ────────────────────────────────────────────────────────────
// TEST 6: N-Gram Üretimi
// ────────────────────────────────────────────────────────────
"\n📏 TEST 6: N-Gram Üretimi"'i yazdır

ngram_metin = "yapay zeka dil işleme modeli" olsun
ngram_toks = tokenize(ngram_metin) olsun

bigramlar = bigram(ngram_toks) olsun
"Bigramlar: " + uzunluk(bigramlar) + " adet"'i yazdır
i = 0 olsun
i < uzunluk(bigramlar) olduğu sürece {
    "  [" + bigramlar[i] + "]"'i yazdır
    i = i + 1 olsun
}

trigramlar = trigram(ngram_toks) olsun
"Trigramlar: " + uzunluk(trigramlar) + " adet"'i yazdır
i = 0 olsun
i < uzunluk(trigramlar) olduğu sürece {
    "  [" + trigramlar[i] + "]"'i yazdır
    i = i + 1 olsun
}

// ────────────────────────────────────────────────────────────
// TEST 7: Metin İstatistiği
// ────────────────────────────────────────────────────────────
"\n📊 TEST 7: Metin İstatistiği"'i yazdır

uzun_metin = "Türkçe, dünyada en çok konuşulan diller arasında yer almaktadır. Eklemeli bir dil olan Türkçe, sözcük yapısı bakımından çok zengindir. Her kök birçok ek alarak farklı anlamlar kazanabilir. Bu özellik Türkçeyi hesaplamalı dilbilim açısından ilginç kılmaktadır." olsun

metin_istatistik(uzun_metin)

// ────────────────────────────────────────────────────────────
// TEST 8: Tam NLP Boru Hattı
// ────────────────────────────────────────────────────────────
"\n🚀 TEST 8: Tam NLP Boru Hattı"'i yazdır

boru_metni = "Türk dili, Altay dilleri ailesine mensuptur. Bu dil ailesi çok geniş bir coğrafyaya yayılmıştır. Türkçe eklemeli yapısıyla çok sayıda sözcük türetebilir." olsun

sonuçlar = nlp_pipeline(boru_metni) olsun
"\nEn sık kökler (ilk 5):"'i yazdır
i = 0 olsun
i < 5 olduğu sürece {
    i < uzunluk(sonuçlar) ise {
        çift = sonuçlar[i] olsun
        "  " + çift[0] + " → " + çift[1] + " kez"'i yazdır
    }
    i = i + 1 olsun
}

// ────────────────────────────────────────────────────────────
// TEST 9: ASCII Normalizasyon
// ────────────────────────────────────────────────────────────
"\n🔡 TEST 9: ASCII Normalizasyon"'u yazdır

türkçe = "Çiçek Öğrencisi Şükrü Üzüm Bağı" olsun
"Türkçe : " + türkçe'yi yazdır
"ASCII  : " + ascii_normalize(türkçe)'yi yazdır

// ────────────────────────────────────────────────────────────
// TEST 10: Metin Manipülasyon Built-in'leri
// ────────────────────────────────────────────────────────────
"\n🛠 TEST 10: Metin Manipülasyon Fonksiyonları"'u yazdır

deneme = "  Merhaba Dünya! NLP harika.  " olsun
"Ham    : [" + deneme + "]"'i yazdır
"Kırpılmış: [" + kırp(deneme) + "]"'i yazdır

b = böl("elma,armut,kiraz", ",") olsun
"Böl    : " + uzunluk(b) + " parça"'yı yazdır

j = birleştir(b, " | ") olsun
"Birleş : " + j'yi yazdır

"değiştir: " + değiştir("merhaba dünya", "dünya", "hüma")'yı yazdır

"içeriyor? " + içeriyor("bilgisayar", "bil")'i yazdır
"başlıyor? " + başlıyor_mu("hüma dili", "hüma")'yı yazdır
"bitiyor?  " + bitiyor_mu("hüma dili", "dili")'ni yazdır

"dizi_dilim: " + dizi_dilim("bilgisayar", 0, 6)'yı yazdır

"\n✅ Tüm testler tamamlandı!"'ı yazdır
