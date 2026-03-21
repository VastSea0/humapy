use gtk::prelude::*;
use gtk::{
    Application, ApplicationWindow, Button, HeaderBar, Orientation, Paned, ScrolledWindow, TextView,
};
use std::process::Command;
use std::fs;

fn main() {
    let app = Application::builder()
        .application_id("com.huma.nativeide")
        .build();

    app.connect_activate(|app| {
        let window = ApplicationWindow::builder()
            .application(app)
            .title("Hüma Native IDE")
            .default_width(1000)
            .default_height(700)
            .build();

        let header = HeaderBar::new();
        header.set_show_close_button(true);
        header.set_title(Some("🐦 Hüma Native IDE"));
        window.set_titlebar(Some(&header));

        let run_button = Button::with_label("▶ Çalıştır");
        run_button.style_context().add_class("suggested-action");
        header.pack_start(&run_button);

        let main_box = gtk::Box::new(Orientation::Vertical, 0);
        window.add(&main_box);

        let paned = Paned::new(Orientation::Vertical);
        main_box.pack_start(&paned, true, true, 0);

        // Editor
        let editor_scroll = ScrolledWindow::new(gtk::Adjustment::NONE, gtk::Adjustment::NONE);
        let editor_view = TextView::new();
        editor_view.set_monospace(true);
        editor_view.set_top_margin(8);
        editor_view.set_bottom_margin(8);
        editor_view.set_left_margin(8);
        editor_view.set_right_margin(8);
        editor_view.buffer().expect("No buffer").set_text("// Merhaba Hüma Native!\n\"Merhaba GTK!\"'yı yazdır;\n");
        editor_scroll.add(&editor_view);
        paned.pack1(&editor_scroll, true, false);

        // Output
        let output_scroll = ScrolledWindow::new(gtk::Adjustment::NONE, gtk::Adjustment::NONE);
        let output_view = TextView::new();
        output_view.set_monospace(true);
        output_view.set_editable(false);
        output_view.set_cursor_visible(false);
        output_view.style_context().add_class("view");
        output_scroll.add(&output_view);
        paned.pack2(&output_scroll, false, false);
        paned.set_position(450);

        // Run Logic
        run_button.connect_clicked(move |_| {
            let buffer = editor_view.buffer().expect("No buffer");
            let start = buffer.start_iter();
            let end = buffer.end_iter();
            let code = buffer.text(&start, &end, false).expect("No text").to_string();

            let output_buffer = output_view.buffer().expect("No buffer");
            output_buffer.set_text("▶ Çalıştırılıyor...\n");

            // Execute
            match execute_huma(code) {
                Ok(out) => {
                    output_buffer.set_text(&format!("{}\n--- Tamamlandı ---", out));
                }
                Err(e) => {
                    output_buffer.set_text(&format!("HATA: {}", e));
                }
            }
        });

        window.show_all();
    });

    app.run();
}

fn execute_huma(code: String) -> Result<String, String> {
    let tmp_file = "tmp_native_ide.hb";
    fs::write(tmp_file, code).map_err(|e| e.to_string())?;

    let output = Command::new("cargo")
        .args(["run", "--bin", "huma", "--", tmp_file])
        .output()
        .map_err(|e| e.to_string())?;

    let _ = fs::remove_file(tmp_file);

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr).to_string();

    if !stderr.is_empty() && output.status.code() != Some(0) {
        Ok(format!("{}\n{}", stdout, stderr))
    } else {
        Ok(stdout)
    }
}
