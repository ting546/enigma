const abs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const cur_rotors = ["ZYXWVUTSRQPONMLKJIHGFEDCBA", "SRQPONMCBALKJIHGFEZYXWVUTD"];
const reflector = {
  A: "Y",
  B: "R",
  C: "U",
  D: "H",
  E: "Q",
  F: "S",
  G: "L",
  H: "D",
  I: "P",
  J: "X",
  K: "N",
  L: "G",
  M: "O",
  N: "K",
  O: "M",
  P: "I",
  Q: "E",
  R: "B",
  S: "F",
  T: "Z",
  U: "C",
  V: "W",
  W: "V",
  X: "J",
  Y: "A",
  Z: "T",
};

function enigmaShifr(str) {
  let shifr = "";
  let rtCount = 0;
  let c = 0;
  let rotors = [...cur_rotors];
  for (let i = 0; i < str.length; i++) {
    const a = str[i];
    let roterVal = a;
    if (a === " ") {
      shifr += a;
      continue;
    }
    for (let r1Idx = 0; r1Idx < rotors.length; r1Idx++) {
      const rotor = rotors[r1Idx];
      const refStr = abs[rotor.indexOf(roterVal)];
      roterVal = refStr;
    }
    let roter2Val = reflector[roterVal];

    for (let r2Idx = rotors.length - 1; r2Idx >= 0; r2Idx--) {
      const rotor = rotors[r2Idx];
      const refStr = rotor[abs.indexOf(roter2Val)];
      roter2Val = refStr;
    }

    shifr += roter2Val;
    c += 1;
    if (c === 27) {
      if (rtCount === rotors.length - 1) {
        rtCount -= 1;
      } else {
        rtCount += 1;
      }
      rotors[rtCount] = rotorMove(rotors[rtCount]);
      rtCount = 0;
      c = 0;
    } else {
      rotors[rtCount] = rotorMove(rotors[rtCount]);
    }
  }
  return shifr;
}

function rotorMove(str) {
  const arr = str.split("");
  const last = arr.splice(str.length - 1, 1);
  arr.unshift(last[0]);
  return arr.join("");
}

const inp = document.querySelector("#input");
const encode = document.querySelector("#encode");
const decode = document.querySelector("#decode");
const res = document.querySelector("#result");
const resultBlock = document.querySelector("#result-block");

encode.addEventListener("click", (e) => {
  e.preventDefault();
  resultBlock.classList.remove("d-none");

  // Create a fake `textarea` and set the contents to the text
  // you want to copy

  const storage = document.createElement("textarea");
  if (inp.value === "") {
    resultBlock.classList.add("d-none");
  }
  res.innerHTML = enigmaShifr(inp.value.toUpperCase());

  storage.value = res.innerHTML;
  res.appendChild(storage);

  // Copy the text in the fake `textarea` and remove the `textarea`
  storage.select();
  storage.setSelectionRange(0, 99999);
  document.execCommand("copy");
  res.removeChild(storage);
});
