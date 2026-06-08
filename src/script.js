const input = document.getElementById("character-range");
const output = document.getElementById("character-length");
// const thumb = document.getElementById("thumb"); ------ non serve a niente perche e qui

/* --------- Managing input range and changing the color of the bar. --------- */
let val = parseFloat(input.value);
let min = parseFloat(input.min) || 1;
let max = parseFloat(input.max) || 20;

output.textContent = val;

/* --------- Function for input range and color change. --------- */
function handleInput() {
  let val = parseFloat(input.value);
  let fillPercent = ((val - min) / (max - min)) * 100;
  input.style.background =
    "linear-gradient(to right, #A4FFAF 0%, #A4FFAF " +
    fillPercent +
    "%, rgb(15, 23, 42) " +
    fillPercent +
    "%)";
  output.textContent = val;
}

input.addEventListener("input", handleInput);
input.addEventListener("change", handleInput);

handleInput();
/* ---------- End of function for input range. ---------- */

/* --------- Managing addition of letters and characters. --------- */

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const group = document.getElementById("checkbox-group");

const include = [];

group.addEventListener("click", function (e) {
  const selected = e.target.id;

  // Controllo se l'elemento è già presente nell'array
  if (include.includes(selected)) {
    rimuoviInutili(selected);
  } else if (selected !== "checkbox-group" && selected !== "") {
    include.push(selected);
    console.log(include);
  } else {
    return;
  }
});

// Remove element if already included in the array
function rimuoviInutili(selected) {
  const index = include.indexOf(selected);
  if (index !== -1) {
    include.splice(index, 1);
    console.log(include);
  }
}
/* --------- End of handling addition of letters and characters. --------- */

/* --------- Generate password--------- */

const buttonGenerate = document.getElementById("generate");
const password = document.getElementById("password");

buttonGenerate.addEventListener("click", function () {
  generatePassword();
  controlStrength();
});

function generatePassword() {
  let length = output.textContent,
    charset = "",
    retVal = "";

  // ricordati se riesci a fare il refactoring di questa parte
  if (include.includes("uppercase")) {
    charset = charset + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (include.includes("lowercase")) {
    charset = charset + "abcdefghijklmnopqrstuvwxyz";
  }
  if (include.includes("numbers")) {
    charset = charset + "0123456789";
  }
  if (include.includes("symbols")) {
    charset = charset + "!@#$%^&*()_+{}[]|\\:;'<>,.?/~`";
  }

  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  password.value = retVal;
  // console.log(retVal);
  return retVal;
}

/* --------- End Generate password --------- */

/* --------- Managing copy password --------- */

const copy = document.getElementById("copy");

copy.addEventListener("click", function () {
  copyToClipboard();
});

function copyToClipboard() {
  // Select the text field
  password.select();

  // Copia il testo all'interno del campo di testo negli appunti
  navigator.clipboard
    .writeText(password.value)
    .then(() => {
      // Alert che il testo è stato copiato con successo
      alert("Copied the text: " + password.value);
    })
    .catch((error) => {
      // Gestione degli errori
      console.error("Unable to copy text: ", error);
      alert("Unable to copy text: " + error);
    });
}

/* --------- End Managing copy password --------- */

/* --------- Managing password strength --------- */

const strength = document.getElementById("strength");
const bar1 = document.getElementById("bar-1");
const bar2 = document.getElementById("bar-2");
const bar3 = document.getElementById("bar-3");
const bar4 = document.getElementById("bar-4");

function controlStrength() {
  strengthValue = password.value.length;

  const cls = [ "bg-yellow-300", "border-yellow-300" ];

  if (strengthValue <= 5) {
    strength.textContent = "Very Weak";
    bar1.classList.add(...cls)
    bar2.classList.remove(...cls)
    bar3.classList.remove(...cls)
    bar4.classList.remove(...cls)
  }
  if (strengthValue > 5 && strengthValue <= 8) {
    strength.textContent = "Weak";
    bar1.classList.add(...cls)
    bar2.classList.add(...cls)
    bar3.classList.remove(...cls)
    bar4.classList.remove(...cls)
  }
  if (strengthValue > 8) {
    strength.textContent = "Medium";
    bar1.classList.add(...cls)
    bar2.classList.add(...cls)
    bar3.classList.add(...cls)
    bar4.classList.remove(...cls)
  }
  if (strengthValue >= 14) {
    strength.textContent = "Strong";
    bar1.classList.add(...cls)
    bar2.classList.add(...cls)
    bar3.classList.add(...cls)
    bar4.classList.add(...cls)
  }

}

/* --------- End Managing password strength --------- */
