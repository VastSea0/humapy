yükle "lib/nlp.hb"

"\n╔══════════════════════════════════════════════════════╗"'i yazdır
"║       HÜMA NLP v2.0.0 — TAM TEST SÜİTİ              ║"'i yazdır
"╚══════════════════════════════════════════════════════╝"'i yazdır

// ─── TEST METİNLERİ ──────────────────────────────────────────────────────────

haber_metni = "Prof. Dr. Ayşe Kaya, İstanbul Üniversitesi'nde yapay zeka üzerine önemli bir konferans verdi. Konferansa Ankara ve İzmir'den 250 katılımcı geldi. Bilim insanları yeni algoritmalar geliştiriyor ve Türkiye bu alanda hızla ilerliyor." olsun

yorum_metni = "Bu ürün gerçekten harika! Çok memnun kaldım, kesinlikle herkese tavsiye ederim." olsun
kötü_yorum  = "Berbat bir deneyimdi. Çok kötü hizmet aldım, hiç beğenmedim ve bir daha gelmeyeceğim." olsun
nötr_yorum  = "Ürünü aldım ve kullandım. Fatura kesildi." olsun

şiir = "Dağlar başı dumanlıdır. Dereler akar çağlar. Gönlüm sana doğru koşar. Sevgi bitmez tükenmez." olsun

// ─── TEST 1: TEMİZLEME VE TOKENİZASYON ──────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 1 — Temizleme ve Tokenizasyon"'u yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

"» Girdi:"'i yazdır
haber_metni'ni yazdır

temiz = nlp_temizle(haber_metni) olsun
"» Temizlenmiş metin:"'i yazdır
temiz'i yazdır

tokenler = tokenize(temiz) olsun
"» Token sayısı: " + uzunluk(tokenler)'i yazdır
"» Tokenler:"'i yazdır
tokenler'i yazdır

// ─── TEST 2: DURAK KELİME FİLTRELEME ────────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 2 — Durak Kelime Filtreleme"'yi yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

kalan = durak_kelime_filtrele(tokenler) olsun
"» Durak öncesi: " + uzunluk(tokenler) + " token"'i yazdır
"» Durak sonrası: " + uzunluk(kalan) + " token"'i yazdır
"» Kalan kelimeler:"'i yazdır
kalan'ı yazdır

// ─── TEST 3: KÖKLEŞTIRME ─────────────────────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 3 — Kökleştirme (Stemming)"'yi yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

// Tek tek stem testi
test_kelimeleri = ["geliyor", "gidiyorum", "çalışıyorlar", "koşarak", "üniversitesi", "algoritmaları", "geliştirilmiştir", "seviyorum"] olsun
"» Tek tek kök bulma:"'i yazdır
i = 0 olsun
i < uzunluk(test_kelimeleri) olduğu sürece {
    k = test_kelimeleri[i] olsun
    "  " + k + "  →  " + stem(k)'i yazdır
    i = i + 1 olsun
}

// Toplu stem
kökler = toplu_stem(kalan) olsun
"» Haber metninden bulunan kökler:"'i yazdır
kökler'i yazdır

// ─── TEST 4: FREKANS ANALİZİ VE SIRALAMA ─────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 4 — Frekans Analizi ve Sıralama"'yı yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

frekanslar = kelime_frekansları(kökler) olsun
"» Ham frekans listesi:"'i yazdır
frekanslar'ı yazdır

sıralı = frekans_sırala(frekanslar) olsun
"» Büyükten küçüğe sıralı:"'i yazdır
sıralı'yı yazdır

en_sık = en_sık_n(frekanslar, 3) olsun
"» En sık 3 kök:"'i yazdır
en_sık'ı yazdır

// ─── TEST 5: METİN İSTATİSTİĞİ ────────────────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 5 — Metin İstatistiği"'ni yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

metin_istatistik(haber_metni)

// ─── TEST 6: CÜMLE BÖLME ─────────────────────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 6 — Cümle Bölme (Kısaltma Destekli)"'yi yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

"» Girdi (kısaltmalı):"'i yazdır
haber_metni'ni yazdır
cümleler = cümle_böl(haber_metni) olsun
"» Bulunan cümle sayısı: " + uzunluk(cümleler)'i yazdır
"» Cümleler:"'i yazdır
j = 0 olsun
j < uzunluk(cümleler) olduğu sürece {
    "  [" + j + "] " + cümleler[j]'i yazdır
    j = j + 1 olsun
}

// Şiir testi
"» Şiir metni cümle bölme:"'i yazdır
şiir_cümle = cümle_böl(şiir) olsun
k = 0 olsun
k < uzunluk(şiir_cümle) olduğu sürece {
    "  [" + k + "] " + şiir_cümle[k]'i yazdır
    k = k + 1 olsun
}

// ─── TEST 7: POS ETİKETLEME ───────────────────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 7 — POS Etiketleme"'yi yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

pos_test_metni = "Hızlı kırmızı araba yolda koşarak gidiyor ama duramıyor." olsun
"» Girdi: " + pos_test_metni'ni yazdır
pos_tokenler = nlp_tokenize(pos_test_metni) olsun
etiketli = pos_etiketle(pos_tokenler) olsun
pos_yazdır(etiketli)

// Haber metninde POS
"» Haber metninde POS:"'i yazdır
haber_tokenler = nlp_tokenize(haber_metni) olsun
haber_etiketli = pos_etiketle(haber_tokenler) olsun
pos_yazdır(haber_etiketli)

// ─── TEST 8: VARLİK İSMİ TANIMA (NER) ────────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 8 — Varlık İsmi Tanıma (NER)"'yi yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

"» Haber metninde NER:"'i yazdır
ner_tokenler = tokenize(haber_metni) olsun
ner_sonuç = ner_etiketle(ner_tokenler) olsun
ner_yazdır(ner_sonuç)

ner_test2 = "Mehmet ve Zeynep, Mart 2024'te Ankara'da bir şirket kurdu." olsun
"» Test metni 2: " + ner_test2'yi yazdır
ner2_tokenler = tokenize(ner_test2) olsun
ner2_sonuç = ner_etiketle(ner2_tokenler) olsun
ner_yazdır(ner2_sonuç)

// ─── TEST 9: DUYGU ANALİZİ ────────────────────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 9 — Duygu Analizi"'ni yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

"» Pozitif yorum:"'i yazdır
yorum_metni'ni yazdır
duygu_yazdır(yorum_metni)

"» Negatif yorum:"'i yazdır
kötü_yorum'u yazdır
duygu_yazdır(kötü_yorum)

"» Nötr yorum:"'i yazdır
nötr_yorum'u yazdır
duygu_yazdır(nötr_yorum)

// Güçlendirici test
güçlendirici_test = "Bu film son derece güzeldi ve çok mutlu oldum." olsun
"» Güçlendirici kelime testi:"'i yazdır
güçlendirici_test'i yazdır
duygu_yazdır(güçlendirici_test)

// ─── TEST 10: TF-IDF ──────────────────────────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 10 — TF-IDF (Çok Belgeli)"'yi yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

belge1 = "Yapay zeka teknolojisi hızla gelişiyor ve yeni algoritmalar üretiliyor." olsun
belge2 = "Türkiye yapay zeka alanında önemli yatırımlar yapıyor." olsun
belge3 = "Algoritmalar ve veri bilimi modern teknolojinin temeli." olsun

belgeler = [belge1, belge2, belge3] olsun
tfidf_sonuç = tfidf_koleksiyon(belgeler) olsun

"» Belge 1 TF-IDF skorları:"'i yazdır
tfidf_sonuç[0]'ı yazdır
"» Belge 2 TF-IDF skorları:"'i yazdır
tfidf_sonuç[1]'i yazdır
"» Belge 3 TF-IDF skorları:"'i yazdır
tfidf_sonuç[2]'yi yazdır

// ─── TEST 11: METİN BENZERLİĞİ ────────────────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 11 — Metin Benzerliği (Jaccard)"'i yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

m1 = "Yapay zeka gelecekte çok önemli olacak." olsun
m2 = "Yapay zeka teknolojisi gelecekte kritik rol oynayacak." olsun
m3 = "Bugün hava çok güzeldi ve piknik yaptık." olsun

skor1 = metin_benzerlik(m1, m2) olsun
skor2 = metin_benzerlik(m1, m3) olsun
skor3 = metin_benzerlik(m1, m1) olsun

"» Metin 1: " + m1'i yazdır
"» Metin 2: " + m2'yi yazdır
"» Metin 3: " + m3'ü yazdır
"» Benzerlik(1,2) — benzer konu     : " + skor1'i yazdır
"» Benzerlik(1,3) — farklı konu     : " + skor2'yi yazdır
"» Benzerlik(1,1) — aynı metin (1.0): " + skor3'ü yazdır

// ─── TEST 12: N-GRAM ──────────────────────────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 12 — N-Gram Üretimi"'ni yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

ngram_metni = "Türk dili zengin ve güzel bir dildir." olsun
ngram_tokenler = nlp_tokenize(ngram_metni) olsun
"» Metin: " + ngram_metni'ni yazdır

"» Bigramlar:"'i yazdır
bigramlar = bigram(ngram_tokenler) olsun
bigramlar'ı yazdır

"» Trigramlar:"'i yazdır
trigramlar = trigram(ngram_tokenler) olsun
trigramlar'ı yazdır

"» 4-gramlar:"'i yazdır
dört_gram = ngram(ngram_tokenler, 4) olsun
dört_gram'ı yazdır

// ─── TEST 13: KARAKTER NORMALİZASYONU ────────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 13 — Karakter Normalizasyonu"'nu yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

türkçe_metin = "Şişli'deki güzel çiçekler yağmurda büyüdü." olsun
"» Özgün  : " + türkçe_metin'i yazdır
"» ASCII  : " + ascii_normalize(türkçe_metin)'i yazdır

// ─── TEST 14: ÜNLÜ UYUMU YARDIMCILARI ────────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 14 — Ünlü Uyumu Yardımcıları"'nı yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

ünlü_test_kelimeleri = ["okul", "güneş", "kitap", "ülke", "araba", "yüzük"] olsun
i = 0 olsun
i < uzunluk(ünlü_test_kelimeleri) olduğu sürece {
    kw = ünlü_test_kelimeleri[i] olsun
    ün_sayısı = kelime_ünlü_sayısı(kw) olsun
    son_ün = son_ünlü(kw) olsun
    uyum = ünlü_uyumu_türü(kw) olsun
    "  " + kw + "  →  ünlü: " + ün_sayısı + "  son: '" + son_ün + "'  uyum: " + uyum'u yazdır
    i = i + 1 olsun
}

// ─── TEST 15: TAM PIPELINE ────────────────────────────────────────────────────

"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır
"📌 TEST 15 — Tam NLP Pipeline (v2.0.0)"'u yazdır
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"'i yazdır

pipeline_metni = "Zeynep İstanbul'da yeni bir yazılım şirketi kurdu. Takımı çok başarılı çalışmalar yapıyor ve müşteriler son derece memnun." olsun
"» Pipeline girdi metni:"'i yazdır
pipeline_metni'ni yazdır
"\n"'i yazdır
sonuç = nlp_pipeline(pipeline_metni) olsun
"\n» Pipeline nihai frekans çıktısı:"'i yazdır
sonuç'u yazdır

// ─── ÖZET ─────────────────────────────────────────────────────────────────────

"╔══════════════════════════════════════════════════════╗"'i yazdır
"║  ✅  Tüm testler başarıyla tamamlandı!               ║"'i yazdır
"║                                                      ║"'i yazdır
"║  Modüller test edildi:                               ║"'i yazdır
"║   1  Temizleme & Tokenizasyon                        ║"'i yazdır
"║   2  Durak Kelime Filtreleme                         ║"'i yazdır
"║   3  Kökleştirme (Stemming)                          ║"'i yazdır
"║   4  Frekans Analizi & Sıralama                      ║"'i yazdır
"║   5  Metin İstatistiği                               ║"'i yazdır
"║   6  Cümle Bölme (Kısaltma Destekli)                 ║"'i yazdır
"║   7  POS Etiketleme                                  ║"'i yazdır
"║   8  Varlık İsmi Tanıma (NER)                        ║"'i yazdır
"║   9  Duygu Analizi                                   ║"'i yazdır
"║  10  TF-IDF                                          ║"'i yazdır
"║  11  Metin Benzerliği (Jaccard)                      ║"'i yazdır
"║  12  N-Gram Üretimi                                  ║"'i yazdır
"║  13  Karakter Normalizasyonu                         ║"'i yazdır
"║  14  Ünlü Uyumu Yardımcıları                         ║"'i yazdır
"║  15  Tam Pipeline                                    ║"'i yazdır
"╚══════════════════════════════════════════════════════╝"'i yazdır
