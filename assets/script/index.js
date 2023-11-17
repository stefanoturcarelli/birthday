"use strict";

const input = document.querySelector("#input");
const checkBtn = document.querySelector("#check-btn");
const output = document.querySelector("#output");

function validateInput() {
  const trimmedInput = input.value.trim();
  return trimmedInput !== "" && trimmedInput.includes("-");
}

function getTodayDate() {
  return new Date();
}

function formatDate(inputDate) {
  const [day, month, year] = inputDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function displayText(text) {
  let newParagraph = document.createElement("p");
  newParagraph.appendChild(document.createTextNode(text));
  output.appendChild(newParagraph);
}

function displayDateLongForm() {
  const formattedDate = formatDate(input.value);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  displayText(formattedDate.toLocaleDateString(undefined, options));
}

function displayYearsOld() {
  const todayYear = getTodayDate().getFullYear();
  const birthYear = formatDate(input.value).getFullYear();
  displayText(`You are ${todayYear - birthYear} years old`);
}

function displayDays() {
  const formattedDate = formatDate(input.value);
  const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
  const days = Math.trunc(
    (getTodayDate() - formattedDate) / DAY_IN_MILLISECONDS
  );
  displayText(`You are ${days} days old`);
}

function getDaysUntilBirthday() {
  const formattedDate = formatDate(input.value);
  let nextBirthdayThisYear = new Date(
    getTodayDate().getFullYear(),
    formattedDate.getMonth(),
    formattedDate.getDate()
  );

  if (nextBirthdayThisYear < getTodayDate()) {
    nextBirthdayThisYear.setFullYear(nextBirthdayThisYear.getFullYear() + 1);
  }

  while (
    !(
      nextBirthdayThisYear.getFullYear() % 4 === 0 &&
      (nextBirthdayThisYear.getFullYear() % 100 !== 0 ||
        nextBirthdayThisYear.getFullYear() % 400 === 0)
    )
  ) {
    nextBirthdayThisYear.setFullYear(nextBirthdayThisYear.getFullYear() + 1);
  }

  const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
  const diffInDays = Math.ceil(
    (nextBirthdayThisYear - getTodayDate()) / DAY_IN_MILLISECONDS
  );
  displayText(`Days until next birthday: ${diffInDays}`);
}

function cleanOutput() {
  output.innerHTML = "";
}

checkBtn.addEventListener("click", () => {
  if (validateInput()) {
    cleanOutput();
    displayDateLongForm();
    displayYearsOld();
    displayDays();
    getDaysUntilBirthday();
  } else {
    cleanOutput();
    displayText("Please enter a date in this format dd-mm-yyyy");
  }
});
