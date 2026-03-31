// huma_sunucu.hb - Hüma Sunucu Kütüphanesi

Yanıt sınıf olsun {
    istek_id = 0 olsun
    
    metin fonksiyon olsun içerik alsın {
        dahili_sunucu_yanitla(kendisi'nin istek_id, içerik, 200, "text/plain")
    }

    html fonksiyon olsun içerik alsın {
        dahili_sunucu_yanitla(kendisi'nin istek_id, içerik, 200, "text/html; charset=utf-8")
    }
    
    json fonksiyon olsun nesne alsın {
        dahili_sunucu_yanitla(kendisi'nin istek_id, nesneden_metine(nesne), 200, "application/json")
    }

    durum fonksiyon olsun kod alsın {
        dahili_sunucu_yanitla(kendisi'nin istek_id, "", kod, "text/plain")
    }
}

Sunucu sınıf olsun {
    port = 8080 olsun
    _get_rotalari = metinden_nesneye("{}") olsun
    _post_rotalari = metinden_nesneye("{}") olsun

    kur fonksiyon olsun p alsın {
        kendisi'nin port = p olsun
        kendisi'nin _get_rotalari = metinden_nesneye("{}") olsun
        kendisi'nin _post_rotalari = metinden_nesneye("{}") olsun
    }

    getir fonksiyon olsun yol, islem alsın {
        değer_ata(kendisi'nin _get_rotalari, yol, islem)
    }

    gönder fonksiyon olsun yol, islem alsın {
        değer_ata(kendisi'nin _post_rotalari, yol, islem)
    }

    baslat fonksiyon olsun {
        sid = dahili_sunucu_baslat(kendisi'nin port)
        sid == boş ise {
            "Hata: Sunucu başlatılamadı!"'ı yazdır
            döndür 0
        }
        
        "Hüma Backend Sunucusu " + (kendisi'nin port) + " portunda aktif!"'ı yazdır
        
        1 olduğu sürece {
            istek = dahili_sunucu_bekle(sid)
            
            istek != boş ise {
                url = (istek'in url)
                metot = (istek'in metot)
                
                yanit = Yanıt()
                yanit'ın istek_id = (istek'in id) olsun
                
                metot == "GET" ise {
                    içeriyor(kendisi'nin _get_rotalari, url) ise {
                        islem = değer_al(kendisi'nin _get_rotalari, url)
                        islem(istek, yanit)
                    } yoksa {
                        dahili_sunucu_yanitla((istek'in id), "404 Sayfa Bulunamadı", 404, "text/plain")
                    }
                }
                
                metot == "POST" ise {
                    içeriyor(kendisi'nin _post_rotalari, url) ise {
                        islem = değer_al(kendisi'nin _post_rotalari, url)
                        islem(istek, yanit)
                    } yoksa {
                        dahili_sunucu_yanitla((istek'in id), "404 Sayfa Bulunamadı", 404, "text/plain")
                    }
                }
            }
        }
    }
}
