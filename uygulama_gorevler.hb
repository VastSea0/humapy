yükle "renkler.hb";
yükle "dosya.hb";
yükle "dizgi.hb";
yükle "liste.hb";

değişken DOSYA = "gorevler.txt";

fonksiyon gorevleri_oku() {
    değişken icerik = dosya_oku(DOSYA);
    eğer tipi(icerik) == "Boş" { döndür []; }
    döndür satırlara_ayır(icerik);
}

fonksiyon gorevleri_kaydet(liste) {
    değişken metin = "";
    değişken i = 0;
    döngü i < uzunluk(liste) {
        metin = metin + liste[i] + "\n";
        i = i + 1;
    }
    dosya_yaz(DOSYA, metin);
}

renkli_yaz("--- HÜMA GÖREV YÖNETİCİSİ ---", TURKUAZ + KALIN);

değişken gorevler = gorevleri_oku();

döngü 1 {
    yazdır("");
    yazdır("1. Görevleri Listele");
    yazdır("2. Yeni Görev Ekle");
    yazdır("3. Görev Sil");
    yazdır("4. Çıkış");
    
    değişken secim = oku("> Seçiminiz: ");
    
    eğer secim == "1" {
        eğer uzunluk(gorevler) == 0 {
            uyarı_yaz("Henüz görev yok.");
        } değilse {
            yazdır("--- GÖREV LİSTESİ ---");
            değişken i = 0;
            döngü i < uzunluk(gorevler) {
                yazdır((i + 1) + ". " + gorevler[i]);
                i = i + 1;
            }
        }
    } değilse eğer secim == "2" {
        değişken yeni = oku("Görev metni: ");
        gorevler = listeye_ekle(gorevler, yeni);
        gorevleri_kaydet(gorevler);
        başarı_yaz("Görev eklendi.");
    } değilse eğer secim == "3" {
        değişken no = oku("Silinecek görev no: ");
        // Basit bir silme mantığı (yeniden liste oluşturma)
        değişken yeni_liste = [];
        değişken i = 0;
        değişken hedef = no - 1; // String'den sayıya otomatik dönüşmeli
        döngü i < uzunluk(gorevler) {
            eğer i != hedef {
                yeni_liste = listeye_ekle(yeni_liste, gorevler[i]);
            }
            i = i + 1;
        }
        gorevler = yeni_liste;
        gorevleri_kaydet(gorevler);
        başarı_yaz("Görev silindi.");
    } değilse eğer secim == "4" {
        yazdır("Güle güle!");
        döndür Boş;
    } değilse {
        hata_yaz("Geçersiz seçim!");
    }
}
