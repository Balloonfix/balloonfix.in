import { addContentToTimeFieldChildElements } from "./product-page.js";



let timepicker = document.querySelector(".time-picker");
let timepickerHourColumn = document.querySelector(".time-picker__hour-column");
let timepickerMinuteColumn = document.querySelector(".time-picker__minute-column");
let timePeriodWrapper = document.querySelector(".time-picker__time-period-wrapper");
let timePeriodAM = document.querySelector(".time-picker__time-period-am");
let timePeriodPM = document.querySelector(".time-picker__time-period-pm");
let timepickerCancelButton = document.querySelector(".time-picker__cancel-button");
let timepickerOkButton = document.querySelector(".time-picker__ok-button");
let timepickerValidationMessage = document.querySelector(".time-picker__validation-message");



//custom functions
function findUserSelectedTimePeriod() {
  let userSelectedTimePeriod;
  let arrayOfTimePeriodWrapperChildElements = [...timePeriodWrapper.children];

  arrayOfTimePeriodWrapperChildElements.forEach(child => {
    let hasSelectedClassName = child.classList.contains("selected");

    if (hasSelectedClassName) {
      userSelectedTimePeriod = child.textContent;
    }

    return ;
  });
  
  return userSelectedTimePeriod;
};

function findValueOfHourColumn() {
  let distanceOfHourColumnFromWindowViewport = timepickerHourColumn.getBoundingClientRect().top
  let arrayOfChildElements = [...timepickerHourColumn.children];
  let textContentToReturn;
  let distanceOfChildElementFromWindowViewport;

  arrayOfChildElements.every(child => {
    distanceOfChildElementFromWindowViewport = child.getBoundingClientRect().top;

    if (distanceOfChildElementFromWindowViewport === distanceOfHourColumnFromWindowViewport) {
      textContentToReturn = child.textContent;

      return false;
    } else {
      return true;
    }
  });

  return textContentToReturn;
};

function findValueOfMinuteColumn() {
  let distanceOfMinuteColumnFromWindowViewport = timepickerMinuteColumn.getBoundingClientRect().top;
  let arrayOfChildElements = [...timepickerMinuteColumn.children];
  let textContentToReturn;
  let distanceOfChildElementFromWindowViewport;

  arrayOfChildElements.forEach(child => {
    distanceOfChildElementFromWindowViewport = child.getBoundingClientRect().top;

    if (distanceOfChildElementFromWindowViewport === distanceOfMinuteColumnFromWindowViewport) {
      textContentToReturn = child.textContent;

      return false;
    } else {
      return true;
    }
  });

  return textContentToReturn;
};



//event listeners
timePeriodWrapper.addEventListener("click", function(event) {
  let eventTarget = event.target;

  if (eventTarget === timePeriodPM) {
    changeClassnameOfAnElement(timePeriodPM, "unselected", "selected");
    changeClassnameOfAnElement(timePeriodAM, "selected", "unselected");
    timePeriodPM.style.backgroundColor = "orange";
    timePeriodAM.style.backgroundColor = "transparent";
  } else {
    changeClassnameOfAnElement(timePeriodAM, "unselected", "selected");
    changeClassnameOfAnElement(timePeriodPM, "selected", "unselected");
    timePeriodAM.style.backgroundColor = "orange";
    timePeriodPM.style.backgroundColor = "transparent";
  }
});

timepickerCancelButton.addEventListener("click", function () {
  changeElementDisplayProperty(timepicker, "none")
  changeClassnameOfAnElement(timepicker, "visible", "invisible");
  
});

timepickerOkButton.addEventListener("click", function () {
  let isProductPageTimepicker = timepicker.classList.contains("product-page-time-picker");
  let isAdminPageTimepicker = timepicker.classList.contains("admin-page-time-picker");
  let userSelectedHour = findValueOfHourColumn();
  let userSelectedMinutes = findValueOfMinuteColumn();
  let userSelectedTime = userSelectedHour + ":" + userSelectedMinutes;
  let userSelectedTimePeriod = findUserSelectedTimePeriod();

  if (userSelectedHour !== "00") {
    changeElementDisplayProperty(timepicker, "none")
    changeClassnameOfAnElement(timepicker, "visible", "invisible");
  } else {
    animatingElementVisibility("visible", timepickerValidationMessage, "transform", "rotateX(0deg)");
    setTimeout(function() {
      animatingElementVisibility("invisible", timepickerValidationMessage, "transform", "rotateX(90deg)");
    }, 1500);
  }

  if (/undefined/.test(userSelectedTime) === false) {
    if (isProductPageTimepicker) {
      addContentToTimeFieldChildElements(userSelectedTime, userSelectedTimePeriod);
    } else if (isAdminPageTimepicker) {
      changeTimeEditButtonTextContent(userSelectedTime + " " + userSelectedTimePeriod);
    } 
  } 
});


//exports
export { timepicker }