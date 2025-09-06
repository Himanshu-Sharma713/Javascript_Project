const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "1234567890";
const symbolSet = "~!@#$%^&*()_+/";

const passBox = document.getElementById("pass-box");
const totalChar = document.getElementById("total-char");
const upperInput = document.getElementById("upper-case");
const lowerInput = document.getElementById("lower-case");
const numberInput = document.getElementById("numbers");
const symbolInput = document.getElementById("symbols");

const getRandomData = (dataSet) => {
  return dataSet[Math.floor(Math.random() * dataSet.length)];
};

function generatePassword(password = "") {
  if (upperInput.checked) password += getRandomData(upperSet);
  if (lowerInput.checked) password += getRandomData(lowerSet);
  if (numberInput.checked) password += getRandomData(numberSet);
  if (symbolInput.checked) password += getRandomData(symbolSet);

  if (password.length < totalChar.value) {
    return generatePassword(password);
  }

  const finalPass = truncateString(password, totalChar.value);
  passBox.innerText = finalPass;
  checkStrength(finalPass);
}

function truncateString(str, num) {
  return str.length > num ? str.substring(0, num) : str;
}

document.getElementById("btn").addEventListener("click", () => {
  generatePassword();
});

document.getElementById("copy").addEventListener("click", () => {
  navigator.clipboard.writeText(passBox.innerText);
  alert("Password copied to clipboard! ✅");
});

// Password Strength Checker
function checkStrength(password) {
  let strengthBar = document.getElementById("strength-bar");
  let strength = 0;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  if (password.length >= 12) strength++;

  strengthBar.className = "strength"; // reset
  if (strength <= 2) strengthBar.classList.add("weak");
  else if (strength === 3) strengthBar.classList.add("medium");
  else strengthBar.classList.add("strong");
}

// Generate first password on load
generatePassword();
