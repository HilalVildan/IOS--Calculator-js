const üstEkran = document.querySelector(".previous-display");
const altEkran = document.querySelector(".current-display");
let num1 = 0;
let num2 = 0;
let islem = "";
let sonuc = 0;

/// sayiyi ekrana yazdirma

document.querySelectorAll(".num").forEach((i) => {
  i.onclick = () => {
    if (num2 == 0) {
      num2 = i.textContent;
    } else {
      num2 += i.textContent;
      sonuc = num2;
    }

    num2 = Number(num2);
    altEkran.textContent = num2;

    document.querySelectorAll(".operator").forEach((a) => {
      a.onclick = () => {
        a = a.textContent;
        islem = a;
        // console.log(islem,"26.satir");
        if (sonuc == 0) {
          sonuc = num2;
          üstEkran.textContent = sonuc + a;
          altEkran.textContent = "";
          num2 = 0;
          num1 = 0;
        } else {
        //   console.log("else");
          sonuc = hesapla(sonuc, islem, num2);
        //   console.log(sonuc, islem, num2, "sonuc");
          üstEkran.textContent = sonuc + a;
          altEkran.textContent = "";
          num1 = 0;
          num2 = 0;
        }
      };
    });
  };
});

// document.querySelector(".equal").onclick = () => {
//   altEkran.textContent = hesapla(num1, islem, num2);
//   üstEkran.textContent = "";
//   num2 = hesapla(num1, islem, num2);
//   num1 = 0;
// };

document.querySelector(".ac").onclick = () => {
  num1 == 0;
  num2 == 0;
  altEkran.textContent = 0;
  üstEkran.textContent = "";
  islem = "";
  sonuc = 0;
};

// // hesap yapma

const hesapla = (num1, islem, num2) => {
    console.log(islem);
  if (islem == "+") {
      console.log(islem,"+");
    sonuc = num1 + num2;
  } else if (islem == "-") {
      console.log(islem,"-");
    sonuc = num1 - num2;
  } else if (islem == "x") {
      console.log(islem,"x");
    sonuc = num1 * num2;
  } else if (islem == "÷") {
    console.log(islem,"/");
    // if (num2 != 0) {
      sonuc = num1 / num2;
   // }
  }

  return sonuc;
};
