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
    ["¿", "¡"],
  ], //primera fila
  [
    ["q", "Q"],
    ["w", "W"],
    ["e", "E"],
    ["r", "R"],
    ["t", "T"],
    ["y", "y"],
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
    ["SHIFT", "SHIFT"],
  ],
  [["SPACE", "SPACE"]], //ultima fila
];

let mayus = false;
let shift = false;
const keyboardContainer = document.querySelector(".keyboardContainer");
let keyHtml = "";
printKeys();

function printKeys() {
  let filaKey = [];

  // console.log(keys.map((key, ind, fila) => key));
  for (let i = 0; i < keys.length; i++) {
    keyHtml += `<div class="fila" data-fila="${i + 1}">`;
    filaKey = keys[i].map((key, ind, fila) => {
      // console.log(keyboard);
      return `<div class="key key-${key}" data-key="${key[0]}">${key[0]}</div>`;
    });
    keyHtml += filaKey.join("");
    keyHtml += `</div>`;
  }
  keyboardContainer.innerHTML = keyHtml;
}
