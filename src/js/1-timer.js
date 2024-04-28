

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const timerForm = document.querySelector("#datetime-picker");
const timerDays = document.querySelector("#data-days");
const timerHours = document.querySelector("#data-hours");
const timerMinutes = document.querySelector("#minutes-days");
const timerSeconds = document.querySelector("#data-seconds");
const btn = document.querySelector('button');
btn.addEventListener("click", setTimer);

let userSelectedDate;

let date = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: date,
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] > date) {
          userSelectedDate = selectedDates[0];
          console.log(userSelectedDate);
          btn.removeAttribute("disabled");;
        }
        else {
          iziToast.warning({
          color:'#EF4040', position: 'topRight', messageColor: '#FAFAFB', iconColor: '#FFFFFF',
          message: 'Please choose a date in the future',
        });  
          //  window.alert("Please choose a date in the future");
          // localStorage.setItem("selectedDate",selectedDates[0]); 
          btn.setAttribute('disabled', 'true');
        }
  },
};

const fp = flatpickr(timerForm, options);

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

function setTimer(event) {
  let timeRemain = userSelectedDate.getTime() - Date.now();
  console.log(userSelectedDate, timeRemain);
  const convertedTime = convertMs(timeRemain);
 // const str = convertedTime.padStart(2,'0');
  console.log(convertedTime);

}
function timer() {
     
   }


