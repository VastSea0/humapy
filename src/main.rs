mod token;
mod lexer;
mod ast;
mod parser;
mod value;
mod interpreter;
mod bytecode;
mod compiler;
mod vm;

use lexer::Lexer;
use parser::Parser;
use interpreter::Yorumlayici;
use bytecode::{OpCode, Constant};
use compiler::Derleyici;
use vm::VM;
use std::io::{self, Write};
use std::fs;
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() > 1 {
        match args[1].as_str() {
            "--ide" => {
                ide_baslat();
            }
            "--repl" | "-r" => {
                repl_baslat();
            }
            "--derle" | "-d" => {
                if args.len() > 2 {
                    derle_ve_kaydet(&args[2], args.get(3).map(|s| s.as_str()).unwrap_or("cikti.hbc"));
                } else {
                    println!("Kullanım: huma --derle <dosya.hb> [cikti.hbc]");
                }
            }
            "--yürüt" | "-y" => {
                if args.len() > 2 {
                    bytecode_yurut(&args[2]);
                } else {
                    println!("Kullanım: huma --yürüt <dosya.hbc>");
                }
            }
            "--inşa-et" | "-i" => {
                if args.len() > 2 {
                    ikili_dosya_olustur(&args[2], args.get(3).map(|s| s.as_str()).unwrap_or("program"));
                } else {
                    println!("Kullanım: huma --inşa-et <dosya.hb> [çıktı_adı]");
                }
            }
            _ => dosya_calistir(&args[1]),
        }
    } else {
        // Argüman yoksa her zaman REPL başlat (Standart yorumlayıcı davranışı)
        repl_baslat();
    }
}

fn ide_baslat() {
    println!("🐦 Hüma Modern IDE (Web Tabanlı + Tauri) başlatılıyor...");
    
    // Eğer Huma IDE sistemde kurulu bir binary ise onu çalıştır (Örn: /usr/bin/huma-ide)
    let installed_app = std::process::Command::new("huma-ide").spawn();
    
    // Yüklü değilse, belki projenin kaynak kod dizinindeyizdir (Geliştirici modu)
    if installed_app.is_err() {
        if std::path::Path::new("src-tauri/tauri.conf.json").exists() {
            println!("Proje dizinindesiniz. Geliştirici modunda başlanıyor...");
            let status = std::process::Command::new("npx")
                .args(["--yes", "@tauri-apps/cli@latest", "dev"])
                .status();
            
            if let Err(e) = status {
                eprintln!("HATA: Geliştirici IDE'si başlatılamadı! Lütfen npm'in yüklü olduğunu doğrulayın.\n({})", e);
            }
        } else {
            eprintln!("HATA: Hüma IDE sisteminizde kurulu değil. Lütfen 'huma-ide' paketini (örn. .deb veya AppImage) kurun.");
        }
    } else {
        let mut app = installed_app.unwrap();
        let _ = app.wait();
    }
}

fn ikili_dosya_olustur(girdi: &str, cikti: &str) {
    let icerik = fs::read_to_string(girdi).expect("Dosya okunamadı");
    let mut parser = Parser::new(Lexer::new(&icerik));
    let program = parser.parse_program();
    let mut derleyici = Derleyici::new();
    let b_prog = derleyici.derle(program);

    let mut inst_items = Vec::new();
    for op in &b_prog.instructions {
        let s = match op {
            OpCode::PushConstant(n) => format!("OpCode::PushConstant({})", n),
            OpCode::LoadVar(n) => format!("OpCode::LoadVar(\"{}\".to_string())", n),
            OpCode::StoreVar(n) => format!("OpCode::StoreVar(\"{}\".to_string())", n),
            OpCode::DefineVar(n) => format!("OpCode::DefineVar(\"{}\".to_string())", n),
            OpCode::Add => "OpCode::Add".to_string(),
            OpCode::Sub => "OpCode::Sub".to_string(),
            OpCode::Mul => "OpCode::Mul".to_string(),
            OpCode::Div => "OpCode::Div".to_string(),
            OpCode::Greater => "OpCode::Greater".to_string(),
            OpCode::Less => "OpCode::Less".to_string(),
            OpCode::Equal => "OpCode::Equal".to_string(),
            OpCode::NotEqual => "OpCode::NotEqual".to_string(),
            OpCode::Jump(n) => format!("OpCode::Jump({})", n),
            OpCode::JumpIfFalse(n) => format!("OpCode::JumpIfFalse({})", n),
            OpCode::Call(n) => format!("OpCode::Call({})", n),
            OpCode::Return => "OpCode::Return".to_string(),
            OpCode::Print => "OpCode::Print".to_string(),
            OpCode::MakeList(n) => format!("OpCode::MakeList({})", n),
            OpCode::ListAccess => "OpCode::ListAccess".to_string(),
            OpCode::Pop => "OpCode::Pop".to_string(),
            OpCode::Bos => "OpCode::Bos".to_string(),
        };
        inst_items.push(s);
    }
    let inst_str = format!("vec![{}]", inst_items.join(", "));

    let mut const_items = Vec::new();
    for c in &b_prog.constants {
        let s = match c {
            Constant::Sayi(n) => format!("Constant::Sayi({:?})", n),
            Constant::Metin(m) => format!("Constant::Metin(\"{}\".to_string())", m),
        };
        const_items.push(s);
    }
    let const_str = format!("vec![{}]", const_items.join(", "));

    let rust_kodu = format!(r#"
// Standalone Hüma Programı
#![allow(dead_code)]
#[derive(Debug, Clone)]
enum OpCode {{
    PushConstant(usize), LoadVar(String), StoreVar(String), DefineVar(String),
    Add, Sub, Mul, Div, Greater, Less, Equal, NotEqual,
    Jump(usize), JumpIfFalse(usize), Call(usize), Return, Print,
    MakeList(usize), ListAccess, Pop, Bos,
}}
#[derive(Debug, Clone)]
enum Constant {{ Sayi(f64), Metin(String) }}
#[derive(Debug, Clone)]
enum Deger {{ Sayi(f64), Metin(String), Liste(Vec<Deger>), Bos }}

impl std::fmt::Display for Deger {{
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {{
        match self {{
            Deger::Sayi(n) => write!(f, "{{}}", n),
            Deger::Metin(s) => write!(f, "{{}}", s),
            Deger::Liste(l) => {{
                let p: Vec<String> = l.iter().map(|d| d.to_string()).collect();
                write!(f, "[{{}}]", p.join(", "))
            }},
            Deger::Bos => write!(f, "Boş"),
        }}
    }}
}}
fn main() {{
    let inst = {};
    let cons = {};
    let mut stack: Vec<Deger> = Vec::new();
    let mut globals = std::collections::HashMap::new();
    let mut ip = 0;
    while ip < inst.len() {{
        let op = &inst[ip]; ip += 1;
        match op {{
            OpCode::PushConstant(i) => match &cons[*i] {{
                Constant::Sayi(n) => stack.push(Deger::Sayi(*n)),
                Constant::Metin(s) => stack.push(Deger::Metin(s.clone())),
            }},
            OpCode::LoadVar(a) => stack.push(globals.get(a).cloned().unwrap_or(Deger::Bos)),
            OpCode::DefineVar(a) => {{ let v = stack.pop().unwrap(); globals.insert(a.clone(), v); }},
            OpCode::StoreVar(a) => {{ let v = stack.pop().unwrap(); globals.insert(a.clone(), v); }},
            OpCode::Add => {{ let (r, l) = (stack.pop().unwrap(), stack.pop().unwrap()); if let (Deger::Sayi(a), Deger::Sayi(b)) = (l, r) {{ stack.push(Deger::Sayi(a+b)); }} }},
            OpCode::Sub => {{ let (r, l) = (stack.pop().unwrap(), stack.pop().unwrap()); if let (Deger::Sayi(a), Deger::Sayi(b)) = (l, r) {{ stack.push(Deger::Sayi(a-b)); }} }},
            OpCode::Mul => {{ let (r, l) = (stack.pop().unwrap(), stack.pop().unwrap()); if let (Deger::Sayi(a), Deger::Sayi(b)) = (l, r) {{ stack.push(Deger::Sayi(a*b)); }} }},
            OpCode::Div => {{ let (r, l) = (stack.pop().unwrap(), stack.pop().unwrap()); if let (Deger::Sayi(a), Deger::Sayi(b)) = (l, r) {{ stack.push(Deger::Sayi(a/b)); }} }},
            OpCode::Less => {{ let (r, l) = (stack.pop().unwrap(), stack.pop().unwrap()); if let (Deger::Sayi(a), Deger::Sayi(b)) = (l, r) {{ stack.push(Deger::Sayi(if a < b {{ 1.0 }} else {{ 0.0 }})); }} }},
            OpCode::Greater => {{ let (r, l) = (stack.pop().unwrap(), stack.pop().unwrap()); if let (Deger::Sayi(a), Deger::Sayi(b)) = (l, r) {{ stack.push(Deger::Sayi(if a > b {{ 1.0 }} else {{ 0.0 }})); }} }},
            OpCode::Print => println!("{{}}", stack.pop().unwrap()),
            OpCode::Jump(a) => ip = *a,
            OpCode::JumpIfFalse(a) => {{ 
                let v = stack.pop().unwrap(); 
                let t = match v {{ Deger::Sayi(n) => n != 0.0, Deger::Bos => false, _ => true }};
                if !t {{ ip = *a; }}
            }},
            OpCode::Return => break,
            OpCode::Pop => {{ stack.pop(); }},
            _ => {{}}
        }}
    }}
}}
"#, inst_str, const_str);

    let rs_file = format!("{}.rs", cikti);
    fs::write(&rs_file, rust_kodu).expect("Yazılamadı");
    println!("[Başarı] {} oluşturuldu. Derlemek için: rustc {}", rs_file, rs_file);
}

fn derle_ve_kaydet(girdi: &str, cikti: &str) {
    let icerik = fs::read_to_string(girdi).expect("Dosya okunamadı");
    let mut parser = Parser::new(Lexer::new(&icerik));
    let program = parser.parse_program();
    
    let mut derleyici = Derleyici::new();
    let bytecode_prog = derleyici.derle(program);
    
    let encoded: Vec<u8> = bincode::serialize(&bytecode_prog).expect("Serileştirme hatası");
    fs::write(cikti, encoded).expect("Dosya yazılamadı");
    println!("[Başarı] {} dosyası {} olarak derlendi.", girdi, cikti);
}

fn bytecode_yurut(yol: &str) {
    let icerik = fs::read(yol).expect("Bytecode dosyası okunamadı");
    let program: bytecode::Program = bincode::deserialize(&icerik).expect("Bytecode okuma hatası");
    
    let mut sanal_makine = VM::new(program);
    sanal_makine.run();
}

fn dosya_calistir(yol: &str) {
    let icerik = match fs::read_to_string(yol) {
        Ok(s) => s,
        Err(e) => {
            eprintln!("Dosya okunamadı: {}", e);
            return;
        }
    };

    let mut yorumlayici = Yorumlayici::new();
    calistir(&icerik, &mut yorumlayici);
}

fn repl_baslat() {
    println!("Hüma Programlama Dili [REPL]");
    println!("Çıkmak için 'çıkış' yazın.");
    
    let mut yorumlayici = Yorumlayici::new();
    let mut input = String::new();

    loop {
        print!("hüma > ");
        io::stdout().flush().unwrap();
        
        input.clear();
        if io::stdin().read_line(&mut input).is_err() {
            break;
        }

        let trim_input = input.trim();
        if trim_input == "çıkış" {
            break;
        }

        calistir(trim_input, &mut yorumlayici);
    }
}

fn calistir(kod: &str, yorumlayici: &mut Yorumlayici) {
    let tarayici = Lexer::new(kod);
    let mut ayristirici = Parser::new(tarayici);
    let program = ayristirici.parse_program();
    yorumlayici.yorumla(program);
}
