const abs = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
const cur_rotors = [
  "БРСЬЭВГДЕЖЗИЙКЛМТУФХЦЧШЩЪЫАНОПЮЯ",
  "АБВГДЬИЙЖЗТУФХЦЧКЛМНОПРЕШЩЪЫСЭЮЯ",
];
const reflector = {
  А: "В",
  Б: "Г",
  В: "А",
  Г: "Б",
  Д: "Я",
  Е: "Ж",
  Ж: "Е",
  З: "Й",
  И: "К",
  Й: "З",
  К: "И",
  Л: "Н",
  М: "О",
  Н: "Л",
  О: "М",
  П: "С",
  Р: "Т",
  С: "П",
  Т: "Р",
  У: "Х",
  Ф: "Ц",
  Х: "У",
  Ц: "Ф",
  Ч: "Щ",
  Ш: "Ъ",
  Щ: "Ч",
  Ъ: "Ш",
  Ы: "Э",
  Ь: "Ю",
  Э: "Ы",
  Ю: "Ь",
  Я: "Д",
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
const res = document.querySelector("#result");
const resultBlock = document.querySelector("#result-block");
const copyBtn = document.querySelector("#copy-btn");
const error = document.querySelector("#error");
copyBtn.addEventListener("click", () => {
  const storage = document.createElement("textarea");

  storage.value = res.innerHTML;
  res.appendChild(storage);

  storage.select();
  storage.setSelectionRange(0, 99999);
  document.execCommand("copy");
  res.removeChild(storage);
});

encode.addEventListener("click", (e) => {
  e.preventDefault();
  resultBlock.classList.remove("d-none");

  console.log(!/["A-Z"]/.test(inp.value.toUpperCase()));

  if (!/["A-Z"]/.test(inp.value.toUpperCase())) {
    error.classList.add("d-none");
    resultBlock.classList.remove("d-none");
    res.innerHTML = enigmaShifr(inp.value.toUpperCase());
  } else {
    error.classList.remove("d-none");
    resultBlock.classList.add("d-none");
  }
  if (inp.value === "") {
    resultBlock.classList.add("d-none");
  }
});
