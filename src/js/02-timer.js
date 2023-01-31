"use strict"
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputFlatpickr = document.querySelector('#datetime-picker');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');
const btn = document.querySelector('button');
btn.classList.add('btn');
let timer = null;

btn.addEventListener('click', start);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);

      if(selectedDates[0] > Date.now()){
        btn.disabled = false;
      }
      else{
        alert("Please choose a date in the future");
        btn.disabled = true;
      }
    },
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function start(e) {
    let timeEnd = new Date(inputFlatpickr.value).getTime();

    clearInterval(timer);

    timer = setInterval(() => {
        let timeStart = Date.now();
        let timeLeft = convertMs(timeEnd - timeStart);
    
        if (timeEnd - timeStart <= 0) {
          clearInterval(timer);
        } 
        else {
          spanDays.textContent = addLeadingZero(timeLeft.days);
          spanHours.textContent = addLeadingZero(timeLeft.hours);
          spanMinutes.textContent = addLeadingZero(timeLeft.minutes);
          spanSeconds.textContent = addLeadingZero(timeLeft.seconds);
        }
      }, 1000);
}

flatpickr(inputFlatpickr, options);