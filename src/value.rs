use crate::ast::{Ifade, Komut};
use std::collections::{HashMap};
use std::rc::Rc;
use std::cell::RefCell;

#[allow(unpredictable_function_pointer_comparisons)]
#[derive(Debug, Clone, PartialEq)]
pub enum Deger {
    Sayi(f64),
    Metin(String),
    Liste(Rc<RefCell<Vec<Deger>>>),
    Bos,
    Fonksiyon {
        parametreler: Vec<String>,
        govde: Vec<Komut>,
    },
    DahiliFonksiyon(fn(Vec<Deger>) -> Deger),
    Sinif {
        ad: String,
        metotlar: HashMap<String, (Vec<String>, Vec<Komut>)>,
        alan_baslangic: Vec<(String, Ifade)>,
    },
    Nesne {
        sinif_adi: String,
        alanlar: Rc<RefCell<HashMap<String, Deger>>>,
    },
}

impl std::fmt::Display for Deger {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Deger::Sayi(n) => {
                if *n == (*n as i64) as f64 {
                    write!(f, "{}", *n as i64)
                } else {
                    write!(f, "{}", n)
                }
            },
            Deger::Metin(s) => write!(f, "{}", s),
            Deger::Liste(l) => {
                let l_borrow = l.borrow();
                let p: Vec<String> = l_borrow.iter().map(|d| d.to_string()).collect();
                write!(f, "[{}]", p.join(", "))
            }
            Deger::Bos => write!(f, "Boş"),
            Deger::Nesne { sinif_adi, .. } => write!(f, "<{} nesnesi>", sinif_adi),
            _ => write!(f, "<dahili>"),
        }
    }
}
