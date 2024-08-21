const slider = document.getElementById("slider");
const length = document.getElementById("length");
const checks = document.querySelector(".checks");
const strength = document.querySelector(".strength");
const btnGenerate = document.querySelector(".btn-generate");
const passText = document.querySelector(".pass-text");
const copyIcon = document.querySelector(".icon-copy");

let strengthValue = 0;
const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowers = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%&*()_+{}:<>?;,./";
let all = "";

const showIndicator = () => {
  strength.querySelectorAll(".indicator").forEach((indicator, index) => {
    indicator.classList.add("hidden");
    if (index == strengthValue) indicator.classList.remove("hidden");
  });
};

const updateAll = () => {
  all = "";
  checks.querySelectorAll("input").forEach((input) => {
    if (input.checked) all += eval(input.id);
  });
  if (all.length > 0) btnGenerate.removeAttribute("disabled");
  else btnGenerate.setAttribute("disabled", true);
};

const generatePassword = (settings) => {
  let index = 0;
  let password = "";

  if (settings.uppers) {
    index = Math.floor(Math.random() * uppers.length);
    password += uppers.slice(index, index + 1);
  }

  if (settings.lowers) {
    index = Math.floor(Math.random() * lowers.length);
    password += lowers.slice(index, index + 1);
  }

  if (settings.numbers) {
    index = Math.floor(Math.random() * numbers.length);
    password += numbers.slice(index, index + 1);
  }

  if (settings.symbols) {
    index = Math.floor(Math.random() * symbols.length);
    password += symbols.slice(index, index + 1);
  }

  for (let i = password.length; i < settings.length; i++) {
    index = Math.floor(Math.random() * all.length);
    password += all.slice(index, index + 1);
  }
  var shuffledPassword = password
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");

  passText.innerText = shuffledPassword;
};

checks.addEventListener("change", (e) => {
  const checked = e.target.checked;
  if (checked) {
    strengthValue++;
    all += eval(e.target.id);
  } else {
    strengthValue--;
  }
  updateAll();
});

slider.addEventListener("input", (e) => {
  const value = e.target.value;
  length.innerHTML = value;
});

btnGenerate.addEventListener("click", () => {
  const settings = {
    length: slider.value,
    uppers: checks.querySelector('[name="uppers"]').checked,
    lowers: checks.querySelector('[name="lowers"]').checked,
    numbers: checks.querySelector('[name="numbers"]').checked,
    symbols: checks.querySelector('[name="symbols"]').checked,
  };
  generatePassword(settings);
  showIndicator();
});

copyIcon.addEventListener("click", () => {
  console.log(passText.innerText);
  navigator.clipboard.writeText(passText.innerText);
});
