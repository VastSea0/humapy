sınıf Köpek {
    fonksiyon havla() {
        yazdır(bu.ad + " havlıyor: Hav Hav!");
    }

    fonksiyon yaş_söyle() {
        yazdır(bu.ad + " " + bu.yaş + " yaşında.");
    }
}

değişken karabaş = Köpek();
karabaş.ad = "Karabaş";
karabaş.yaş = 3;

karabaş.havla();
karabaş.yaş_söyle();

değişken boncuk = Köpek();
boncuk.ad = "Boncuk";
boncuk.yaş = 5;

boncuk.havla();
boncuk.yaş_söyle();
