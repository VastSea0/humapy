use eframe::egui;
use crate::value::Deger;
use std::cell::RefCell;
use crate::interpreter::Yorumlayici;

thread_local! {
    static CURRENT_UI: RefCell<Option<*mut egui::Ui>> = RefCell::new(None);
    static GUI_REQUEST: RefCell<Option<GuiRequest>> = RefCell::new(None);
}

struct GuiRequest {
    baslik: String,
    cizim_fks: Deger,
}

pub struct HumaGuiApp {
    cizim_fks: Deger,
    interp: Yorumlayici,
}

impl HumaGuiApp {
    pub fn new(_baslik: String, cizim_fks: Deger, interp: Yorumlayici) -> Self {
        // GUI fonksiyonlarını tekrar eklememize gerek yok, zaten varlar.
        Self { cizim_fks, interp }
    }
}

impl eframe::App for HumaGuiApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        egui::CentralPanel::default().show(ctx, |ui| {
            let ui_ptr = ui as *mut egui::Ui;
            CURRENT_UI.with(|c| *c.borrow_mut() = Some(ui_ptr));

            // Hüma çizim fonksiyonunu çağır
            self.interp.fonksiyon_cagrisi(self.cizim_fks.clone(), vec![]);

            CURRENT_UI.with(|c| *c.borrow_mut() = None);
        });
    }
}

pub fn kayit_et(globals: &mut std::collections::HashMap<String, Deger>) {
    globals.insert("pencere_başlat".to_string(), Deger::DahiliFonksiyon(|args| {
        if args.len() < 2 { return Deger::Bos; }
        let baslik = args[0].to_string();
        let cizim_fks = args[1].clone();

        GUI_REQUEST.with(|r| {
            *r.borrow_mut() = Some(GuiRequest { baslik, cizim_fks });
        });
        
        Deger::Bos
    }));

    globals.insert("buton".to_string(), Deger::DahiliFonksiyon(|args| {
        if let Some(metin) = args.first() {
            let res = CURRENT_UI.with(|c| {
                if let Some(ui_ptr) = *c.borrow() {
                    let ui = unsafe { &mut *ui_ptr };
                    if ui.button(metin.to_string()).clicked() {
                        return 1.0;
                    }
                }
                0.0
            });
            return Deger::Sayi(res);
        }
        Deger::Sayi(0.0)
    }));

    globals.insert("etiket".to_string(), Deger::DahiliFonksiyon(|args| {
        if let Some(metin) = args.first() {
            CURRENT_UI.with(|c| {
                if let Some(ui_ptr) = *c.borrow() {
                    let ui = unsafe { &mut *ui_ptr };
                    ui.label(metin.to_string());
                }
            });
        }
        Deger::Bos
    }));
}

pub fn gui_istegi_var_mi() -> bool {
    GUI_REQUEST.with(|r| r.borrow().is_some())
}

pub fn gui_calistir(interp: Yorumlayici) {
    let req = GUI_REQUEST.with(|r| r.borrow_mut().take());

    if let Some(req) = req {
        let options = eframe::NativeOptions {
            viewport: egui::ViewportBuilder::default().with_inner_size([400.0, 300.0]),
            ..Default::default()
        };
        let baslik_copy = req.baslik.clone();
        let _ = eframe::run_native(
            &baslik_copy,
            options,
            Box::new(|_cc| {
                Box::new(HumaGuiApp::new(req.baslik, req.cizim_fks, interp))
            }),
        );
    }
}
