import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const timerForm = document.querySelector("#datetime-picker");
const timerDays= document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');
const btn = document.querySelector('button');
let userSelectedDate;
let timerId;

const addLeadingZero = value => 
 String(value).padStart(2, '0');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
  }

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
          if (selectedDates[0] > options.defaultDate) {
          userSelectedDate = selectedDates[0];
          btn.removeAttribute("disabled");
        }
        else {
          iziToast.warning({
          color:'#EF4040', position: 'topRight', messageColor: '#FAFAFB', iconColor: '#FFFFFF',
          message: 'Please choose a date in the future',
        });  
          btn.setAttribute('disabled', 'true');
        }
  },
};


const fp = flatpickr(timerForm, options);

function countdownTimer() {
  const ms = userSelectedDate.getTime() - Date.now();
  if (ms <= 0) {
    clearInterval(timerId);
timerForm.removeAttribute("disabled");
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(ms);
  timerDays.textContent = days;
  timerHours.textContent = hours;
  timerMinutes.textContent = minutes;
  timerSeconds.textContent = seconds;
}

btn.addEventListener("click", setTimer);
 
function setTimer(event) {
  btn.setAttribute('disabled', 'true');
  timerForm.setAttribute('disabled', 'true');
 if (userSelectedDate.getTime() - Date.now() <= 0) {
 clearInterval(timerId);  
  }
else {
  timerId = setInterval(countdownTimer, 1000);
  } 
  };


