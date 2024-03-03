const keys = [
  [
    ["1", "!"],
    ["2", '"'],
    ["3", "#"],
    ["4", "!"],
    ["5", "!"],
    ["6", "!"],
    ["7", "!"],
    ["8", "!"],
    ["9", "!"],
    ["0", "!"],
    ["'", "?"],
    ["BACK", "BACK"],
  ], //primera fila
  [
    ["q", "Q"],
    ["w", "W"],
    ["e", "E"],
    ["r", "R"],
    ["t", "T"],
    ["y", "Y"],
    ["u", "U"],
    ["i", "I"],
    ["o", "O"],
    ["p", "P"],
    ["´", "¨"],
    ["+", "*"],
  ],
  [
    ["MAYUS", "MAYUS"],
    ["a", "A"],
    ["s", "S"],
    ["d", "D"],
    ["f", "F"],
    ["g", "G"],
    ["h", "H"],
    ["j", "J"],
    ["k", "K"],
    ["l", "L"],
    ["ñ", "Ñ"],
    ["{", "["],
    ["}", "]"],
  ],
  [
    ["SHIFT", "SHIFT"],
    ["z", "Z"],
    ["x", "X"],
    ["c", "C"],
    ["v", "V"],
    ["b", "B"],
    ["n", "N"],
    ["m", "M"],
    [",", ";"],
    [".", ":"],
    ["-", "_"],
  ],
  [["SPACE", "SPACE"]], //ultima fila
];

let mayus = false;
let shift = false;
var output = [];
var notPrintigKey = true;
var lasCaracterGuion = false;
const keyboardContainer = document.querySelector(".keyboardContainer");
const inputLabel = document.querySelector("input");
let keyHtml = "";
printKeys();
initCursor();

function printKeys() {
  let filaKey = []; //aqui se guardara las filas de teclas
  keyHtml = ""; //aque se guardara el html para el div

  //primero recorro las filas
  for (let filaInd = 0; filaInd < keys.length; filaInd++) {
    //para cada fila anado un div identificandola.
    keyHtml += `<div class="fila" data-fila="${filaInd + 1}">`;
    //recorro tods las teclas dentro de la fila actual.
    filaKey = keys[filaInd].map((key, ind, fila) => {
      const activeMode = mayus ? 1 : 0 || shift ? 1 : 0;
      return `<div class="key ${key[1]}" id="${key[0]}" data-key="${
        key[0]
      }" data-id="${(Math.random() * 100).toString(36).slice("3")}">${
        key[activeMode]
      }</div>`;
    });
    keyHtml += filaKey.join("");
    keyHtml += `</div>`;
  }
  keyboardContainer.innerHTML = keyHtml;
  if (mayus) {
    const mayusBut = document.getElementById("MAYUS");
    console.log(mayusBut);
    mayusBut.classList.add("buttonActive");
  } else if (shift) {
    const shiftBut = document.querySelector("#SHIFT");
    shiftBut.classList.add("buttonActive");
  }
  initEvent();
}
function initEvent() {
  //guardo todos los teclas
  const buttonKeys = document.querySelectorAll(".key");

  //a cada tecla le agrego un eventListener
  buttonKeys.forEach((key) => {
    notPrintigKey = false;

    key.addEventListener("click", (e) => {
      //si esta visible el cursor lo elimino

      //obtengo el id de la tecla presionada
      const id = e.target.getAttribute("data-id");
      //obtengo el valor de la tecla presionada los da en mini¿uscula
      const data_key = e.target.getAttribute("data-key");
      if (data_key === "MAYUS") {
        //si fue mayus
        mayus = !mayus; //cambia su estado
        printKeys(); //repinta las teclas
        return;
        //lo mismo  para shift
      } else if (data_key == "SHIFT") {
        shift = !shift;
        console.log("shift", shift);
        printKeys();
        return;
      } else if (data_key === "SPACE") {
        output.push(" ");
      } else if (data_key === "BACK") {
        output.pop();
      } else {
        //Aqui se guardara la tecla presionada
        let keyPressed = "";

        //busco en cada fila del teclado
        for (fila of keys) {
          //dentro de cada fila se busca la tecla que
          for (tecla of fila) {
            //cuando se encuentre segun mayus devuelve minuscula o mayuscula
            if (tecla[0] === data_key) {
              if (mayus || shift) {
                keyPressed = tecla[1];
              } else {
                keyPressed = tecla[0];
              }
            }
          }
        }
        console.log(keyPressed);
        if (keyPressed === "_") {
          lasCaracterGuion = true;
        } else {
          lasCaracterGuion = false;
        }
        if (output[output.length - 1] === "_" && keyPressed !== "_") {
          output.pop();
        }
        output.push(keyPressed);
      }

      inputLabel.value = output.join("");
      if (shift) {
        shift = false;
        printKeys();
      }
    });
  });
  notPrintigKey = true;
}

function initCursor() {
  const timer = setInterval(() => {
    if (notPrintigKey) {
      if (output[output.length - 1] === "_") {
        if (!lasCaracterGuion) output.pop();
      } else {
        output.push("_");
      }
      inputLabel.value = output.join("");
    }
  }, 500);
}
