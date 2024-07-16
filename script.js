const tipPercentage = document.getElementById("tip-percentage");
const buttons = document.querySelectorAll(".tip-percentage-btn");
const tipAmount = document.querySelector("#tip-amount");
const numberOfPeople = document.querySelector("#number-of-people");
const tipPerPerson = document.getElementById("tip-per-person");
const totalPerPerson = document.getElementById("total-per-person");
const resetBtn = document.getElementById("reset-btn");
const custom = document.querySelector(".custom");
const errorMessageBill = document.querySelector("#error-message-bill");
const errorMessagePeople = document.querySelector("#error-message-people");
let text;

function resetStyles() {
  buttons.forEach((button) => {
    button.style.background = "hsl(183, 100%, 15%)";
    button.style.color = "white";
  });
  custom.style.border = "none";
  custom.style.color = "hsl(186, 14%, 43%)";
}

function styleCustom() {
  custom.style.border = "2px solid hsl(172, 67%, 45%)";
  custom.style.color = "black";
}

function checkForNull() {
  if (!tipAmount.value) {
    errorMessageBill.style.display = "block";
    tipAmount.style.border = "2px solid rgb(225, 130, 130)";
  } else {
    errorMessageBill.style.display = "none";
    tipAmount.style.border = "2px solid hsl(172, 67%, 45%)";
  }

  if (!numberOfPeople.value) {
    errorMessagePeople.style.display = "block";
    numberOfPeople.style.border = "2px solid rgb(225, 130, 130)";
  } else {
    errorMessagePeople.style.display = "none";
    numberOfPeople.style.border = "2px solid hsl(172, 67%, 45%)";
  }
}

function calculateTip() {
  if (tipAmount.value && numberOfPeople.value) {
    let tipAmountValue = parseFloat(tipAmount.value);
    let numberOfPeopleValue = parseInt(numberOfPeople.value, 10);
    let tipPercentageValue = parseFloat(text);

    if (
      !isNaN(tipAmountValue) &&
      !isNaN(numberOfPeopleValue) &&
      !isNaN(tipPercentageValue)
    ) {
      let tipPerPersonValue =
        (tipPercentageValue * (tipAmountValue / 100)) / numberOfPeopleValue;
      let totalPerPersonValue =
        tipAmountValue / numberOfPeopleValue + tipPerPersonValue;

      tipPerPerson.textContent = `$${tipPerPersonValue.toFixed(2)}`;
      totalPerPerson.textContent = `$${totalPerPersonValue.toFixed(2)}`;
    }
  } else {
    tipPerPerson.textContent = `$0.00`;
    totalPerPerson.textContent = `$0.00`;
  }

  checkForNull();
}

function handleClick(e) {
  resetStyles();

  if (e.target.classList.contains("tip-percentage-btn")) {
    text = e.target.textContent.replace("$", "");
    e.target.style.background = "hsl(172, 67%, 45%)";
    e.target.style.color = "hsl(183, 100%, 15%)";
    custom.value = "";
  } else if (e.target === custom) {
    text = custom.value;
  }

  calculateTip();
}

function handleReset() {
  tipPerPerson.textContent = `$0.00`;
  totalPerPerson.textContent = `$0.00`;
  tipAmount.value = "";
  numberOfPeople.value = "";
  custom.value = "";
  tipAmount.style.border = "none"
  numberOfPeople.style.border = "none"
  resetStyles();
  
}

buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

custom.addEventListener("input", handleClick);
custom.addEventListener("input", styleCustom);
tipAmount.addEventListener("input", calculateTip);
numberOfPeople.addEventListener("input", calculateTip);
resetBtn.addEventListener("click", handleReset);
