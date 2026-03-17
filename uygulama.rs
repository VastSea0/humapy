
// Standalone Hüma Programı
#![allow(dead_code)]
#[derive(Debug, Clone)]
enum OpCode {
    PushConstant(usize), LoadVar(String), StoreVar(String), DefineVar(String),
    Add, Sub, Mul, Div, Greater, Less, Equal, NotEqual,
    Jump(usize), JumpIfFalse(usize), Call(usize), Return, Print,
    MakeList(usize), ListAccess, Pop, Bos,
}
#[derive(Debug, Clone)]
enum Constant { Sayi(f64), Metin(String) }
#[derive(Debug, Clone)]
enum Deger { Sayi(f64), Metin(String), Liste(Vec<Deger>), Bos }

impl std::fmt::Display for Deger {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Deger::Sayi(n) => write!(f, "{}", n),
            Deger::Metin(s) => write!(f, "{}", s),
            Deger::Liste(l) => {
                let p: Vec<String> = l.iter().map(|d| d.to_string()).collect();
                write!(f, "[{}]", p.join(", "))
            },
            Deger::Bos => write!(f, "Boş"),
        }
    }
}
fn main() {
    let inst = vec![OpCode::PushConstant(0), OpCode::Print, OpCode::PushConstant(1), OpCode::Print];
    let cons = vec![Constant::Metin("selam".to_string()), Constant::Metin("merhaba dünya".to_string())];
    let mut stack: Vec<Deger> = Vec::new();
    let mut globals = std::collections::HashMap::new();
    let mut ip = 0;
    while ip < inst.len() {
        let op = &inst[ip]; ip += 1;
        match op {
            OpCode::PushConstant(i) => match &cons[*i] {
                Constant::Sayi(n) => stack.push(Deger::Sayi(*n)),
                Constant::Metin(s) => stack.push(Deger::Metin(s.clone())),
            },
            OpCode::LoadVar(a) => stack.push(globals.get(a).cloned().unwrap_or(Deger::Bos)),
            OpCode::DefineVar(a) => { let v = stack.pop().unwrap(); globals.insert(a.clone(), v); },
            OpCode::StoreVar(a) => { let v = stack.pop().unwrap(); globals.insert(a.clone(), v); },
            OpCode::Add => { let (r, l) = (stack.pop().unwrap(), stack.pop().unwrap()); if let (Deger::Sayi(a), Deger::Sayi(b)) = (l, r) { stack.push(Deger::Sayi(a+b)); } },
            OpCode::Sub => { let (r, l) = (stack.pop().unwrap(), stack.pop().unwrap()); if let (Deger::Sayi(a), Deger::Sayi(b)) = (l, r) { stack.push(Deger::Sayi(a-b)); } },
            OpCode::Mul => { let (r, l) = (stack.pop().unwrap(), stack.pop().unwrap()); if let (Deger::Sayi(a), Deger::Sayi(b)) = (l, r) { stack.push(Deger::Sayi(a*b)); } },
            OpCode::Div => { let (r, l) = (stack.pop().unwrap(), stack.pop().unwrap()); if let (Deger::Sayi(a), Deger::Sayi(b)) = (l, r) { stack.push(Deger::Sayi(a/b)); } },
            OpCode::Less => { let (r, l) = (stack.pop().unwrap(), stack.pop().unwrap()); if let (Deger::Sayi(a), Deger::Sayi(b)) = (l, r) { stack.push(Deger::Sayi(if a < b { 1.0 } else { 0.0 })); } },
            OpCode::Greater => { let (r, l) = (stack.pop().unwrap(), stack.pop().unwrap()); if let (Deger::Sayi(a), Deger::Sayi(b)) = (l, r) { stack.push(Deger::Sayi(if a > b { 1.0 } else { 0.0 })); } },
            OpCode::Print => println!("{}", stack.pop().unwrap()),
            OpCode::Jump(a) => ip = *a,
            OpCode::JumpIfFalse(a) => { 
                let v = stack.pop().unwrap(); 
                let t = match v { Deger::Sayi(n) => n != 0.0, Deger::Bos => false, _ => true };
                if !t { ip = *a; }
            },
            OpCode::Return => break,
            OpCode::Pop => { stack.pop(); },
            _ => {}
        }
    }
}
