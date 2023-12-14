let timepicker = document.querySelector(".time-picker");
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
  let arrayOfHourColumnNumber = [...document.querySelectorAll(".time-picker__hour-column-number")];
  let IntersectionObserverOptions = {
    root: document.querySelector(".time-picker__hour-column"),
    threshold: 1.0
  };
  let observer = new IntersectionObserver(observerCallback, IntersectionObserverOptions);
  let userSelectedHour;

  function observerCallback (entryObject) {
    entryObject.forEach(entry => {
      let intersectingTarget = entry.target;
      let timeFieldHour = document.querySelector(".time-field__hour");

      if (entry.isIntersecting) {
        userSelectedHour = intersectingTarget.textContent;

        timeFieldHour.textContent = userSelectedHour;        
      }
    });
  };
  
  //observing every hour element from the hour column in the time-picker to find the one that the user selects
  arrayOfHourColumnNumber.forEach(element => {
    let observerTarget = element;

    observer.observe(observerTarget);
  });
};

function findValueOfMinuteColumn() {
  let arrayOfMinuteColumnNumber = [...document.querySelectorAll(".time-picker__minute-column-number")];
  let IntersectionObserverOptions = {
    root: document.querySelector(".time-picker__minute-column"),
    threshold: 1.0
  };
  let observer = new IntersectionObserver(observerCallback, IntersectionObserverOptions);
  let userSelectedMinute;

  function observerCallback (entryObject) {
    entryObject.forEach(entry => {
      let intersectingTarget = entry.target;
      let timeFieldMinute = document.querySelector(".time-field__min");

      if (entry.isIntersecting) {
        userSelectedMinute = intersectingTarget.textContent;

        timeFieldMinute.textContent = userSelectedMinute;   
      }
    });
  };

  //observing every minute element from the minute column in the time-picker to find the one that the user selects
  arrayOfMinuteColumnNumber.forEach(element => {
    let observerTarget = element;

    observer.observe(observerTarget);
  });
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
  let userSelectedHour = document.querySelector(".time-field__hour").textContent;
  let userSelectedTimePeriod = findUserSelectedTimePeriod();
  let timePeriod = document.querySelector(".time-field__time-period");

  if (userSelectedHour !== "00") {
    changeElementDisplayProperty(timepicker, "none")
    changeClassnameOfAnElement(timepicker, "visible", "invisible");
    timePeriod.textContent = userSelectedTimePeriod;
  } else {
    animatingElementVisibility("visible", timepickerValidationMessage, "transform", "rotateX(0deg)");
    setTimeout(function() {
      animatingElementVisibility("invisible", timepickerValidationMessage, "transform", "rotateX(90deg)");
    }, 1500);
  }
});


//exports
export { timepicker, findValueOfHourColumn, findValueOfMinuteColumn}