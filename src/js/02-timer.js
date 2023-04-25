import { convertMs, addLeadingZero } from "../js/functions";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const inputEl = document.querySelector("#datetime-picker");
console.log("🚀 ~ file: 02-timer.js:5 ~ inputEl", inputEl)
const timerBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector(`[data-days]`);
const hoursEl = document.querySelector(`[data-hours]`);
const minutesEl = document.querySelector(`[data-minutes]`);
const secondsEl = document.querySelector(`[data-seconds]`);
let timerId = null;

timerBtn.setAttribute('disabled', 'true');


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if(selectedDates[0] < options.defaultDate) {
        Notify.failure("Please choose a date in the future", {
          width: '300px', 
          position: 'center-top',
          fontFamily: 'Roboto',
          fontSize: '20px',
          cssAnimationStyle:'from-top'
        });
        return;
                  
    } 
     timerBtn.removeAttribute('disabled');
     inputEl.setAttribute('disabled', 'true');
     options.defaultDate = selectedDates[0];
    },
  };

flatpickr(inputEl, options);

timerBtn.addEventListener(`click`, setTimerOnBtnClick);

function setTimerOnBtnClick () {
  timerBtn.setAttribute('disabled', 'true');
  
  
  timerId = setInterval(()=> {
    const delta = options.defaultDate - Date.now() ;
    if (delta < 1000) {
      clearInterval(timerId);
      }
    const time = convertMs(delta);
    updateMarkup(time);
  }, 1000);
  }
  

  function updateMarkup ({days, hours, minutes, seconds}) {
    // daysEl.textContent = addLeadingZero(days);
    if (days.toString().length >= 2) {
      daysEl.textContent = days.toString();
    } else {
      daysEl.textContent = addLeadingZero(days);
    }
    
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }
