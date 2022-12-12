//* ======================================================
//*                     IOS CALCULATOR
//* ======================================================

const numberButtons = document.querySelectorAll(".num");
const operationButtons = document.querySelectorAll(".operator");
const equalButtons = document.querySelector(".equal");
const acButtons = document.querySelector(".ac");
const pmButtons = document.querySelector(".pm");
const percentButtons = document.querySelector(".percent");
const topScreen = document.querySelector(".previous-display");
const bottomScreen = document.querySelector(".current-display");

//?operator değişkenleri
let topScreencaption = "";
let bottomScreencaption = "";
let operator = "";
let equalOrPercentPressed = false;

//!target kullanmak calculator da bug a sebep oluyor. o da şu ki mesela 7 ye bastığımızda hep 7 ye basılabiliyor, 8 e geçilmiyor
// document.querySelector(".num").onclick=(number)=>{
//  bottomScreencaption+=number.target.textContent
// bottomScreen.textContent=bottomScreencaption

// }

numberButtons.forEach((number) => {
  number.onclick = () => {
    //!ekrana hazırlık, bütün bug ları kontrol fonksiyonu
    screen(number.textContent);
    //!ekrana bastır
    updateScreen();
  };
});

const screen = (num) => {
  //?ekranda = 0 varken, kullanıcı 0 Or . giremesin, bunların dışında bişey girerse o görünsün
  if (num != "0" && num != "." && bottomScreencaption == "0") {
    bottomScreencaption = num;
    //! 0 girersen üstüne sayı girersen o görünsün, yani 0 girdiğimde boş dön, bu return ü yazmazsak ve 0 a basarsak 0 dan eli boş dönmüyor, 0 ve . dışında bir sayıya bastığımızda onu 2 kere yazdırıyor, bir sefer 0 için 1 sefer sayının kendi için, çünkü biz ekranda 0 ve . dışındaki girişler görünsün ama basılmasın demedik, basılmasın komutunu return yaptı
    return;
  }

  //?ekran boşken . girilmesin
  if (num === "." && bottomScreencaption == "") return;

  //?kullanıcı herhangi bir yerde . girmişken , tekrar . girmeye kalkarsa girilmesin

  if (num === "." && bottomScreencaption.includes(".")) return;

  //?kullanıcı ilk başta 0 girer ardından tekrar 0 girerse, girilmesin ekranda 1 tane 0 görünsün

  if (num === "0" && bottomScreencaption === "0") return;

  //*eşittire basılınca if içi true olur ve bottomScreenda sadece o an girilen sayı gözükür, sonrasında işleme normal devam etmek istediğim için, fabrika ayarlarına geri döndüm, yani equalOrPercentPressed değişkenini false yaptım ki bu if e giremesin
  if (equalOrPercentPressed) {
    equalOrPercentPressed = false;
    bottomScreencaption = num;
    //!çok fazla if varsa, oralardan veri gelebilir hata alırım, tek benim dediğimi yap farklı bişey varsa boş dön return diyoruz
    return;
  }

  //?bütün şartları başarıyla geçtikten sonra, basılan numaraları ardarda ekranda göster
  bottomScreencaption = bottomScreencaption + num;
};

//? javascriptt te yapılanlar ekrana DOM a bastırılacak

const updateScreen = () => {
  //!ekranda 9 basamaktan fazlası görünmesin
  //*toString() eklememin nedeni 4 işlemden sonra bottomScreencaption number a dönüşür, ve stringlerde geçerli slice metodu çalışmaz, bu yüzden tekrar string e çevirdik

  if (bottomScreencaption.toString().length > 9) {
    bottomScreencaption = bottomScreencaption.toString().slice(0, 9);
  }

  bottomScreen.textContent = bottomScreencaption;
  //?işlem null dışında ne girilirse (+,- ,"") alttaki çalışsın
  if (operator != null) {
    topScreen.textContent = `${topScreencaption} ${operator}`; //backtick ekrana kolay ve boşluklu basmamıza yaradı, şart değil
  }
};

operationButtons.forEach((op) => {
  op.onclick = () => {
    //?herhangi bir işleme basıldıktan sonra (topScreen dolu bottomScreen boşken), işlemi değiştirmek istersek
    if (topScreencaption && bottomScreencaption == "") {
      operator = op.textContent;
      updateScreen();
    }

    //?ekran boşken işleme basılmasın
    if (bottomScreencaption === "") return;

    //? eşittire basılmadan arka arkaya işleme basılırsa (bottomScreen ve topScreen doluyken işleme basılırsa)
    if (bottomScreencaption && topScreencaption) {
      calculate();
    }

    operator = op.textContent;
    topScreencaption = bottomScreencaption;
    bottomScreencaption = "";
    updateScreen();
  };
});

equalButtons.onclick = () => {
  calculate();
  updateScreen();
  equalOrPercentPressed = true;
};

const calculate = () => {
  let result;
  switch (operator) {
    case "+":
      result = +topScreencaption + Number(bottomScreencaption);
      break;

    case "-":
      result = topScreencaption - bottomScreencaption;
      break;

    case "x":
      result = topScreencaption * bottomScreencaption;
      break;

    case "÷":
      result = topScreencaption / bottomScreencaption;
      break;

    default:
      break;
  }
  bottomScreencaption = result;
  topScreencaption = "";
  operator = "";
};

//?AC butonuna basıldığında

acButtons.addEventListener("click", () => {
  operator = "";
  bottomScreencaption = "";
  topScreencaption = "";
  updateScreen();
});

//? PM butonuna basıldığında

pmButtons.onclick = () => {
  //*ekran boşken pm butonu çalışmasın, yoksa ekran boşken pm e basıldığında updateScreen yüzünden, ekranda 0 baslıyor
  if (!bottomScreencaption) return;

  bottomScreencaption = bottomScreencaption * -1;
  updateScreen();
};

percentButtons.onclick = () => {
  if (!bottomScreencaption) return;

  bottomScreencaption = bottomScreencaption / 100;

  updateScreen();
  equalOrPercentPressed = true;
};
