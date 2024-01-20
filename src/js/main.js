const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

if (typeof flatpickr !== 'undefined') {
 
  const options = {
    
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();

      if (selectedDate <= currentDate) {
     
               iziToast.show({
                position: 'topCenter',
            title: 'Sorry!',
            message: 'Please choose a date in the future'
        });
      } else {
        startButton.disabled = false;
      }
    },
  };

  flatpickr(dateTimePicker, options);
}

let countdownInterval;

function updateTimer(endDate) {
  const currentDate = new Date();
  const timeDifference = endDate - currentDate;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    updateTimerDisplay(0, 0, 0, 0);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  updateTimerDisplay(days, hours, minutes, seconds);
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}


function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}


startButton.addEventListener('click', function () {
  const selectedDate = flatpickr.parseDate(dateTimePicker.value, 'Y-m-d H:i:S');
  if (selectedDate) {
    countdownInterval = setInterval(() => updateTimer(selectedDate), 1000);
    startButton.disabled = true; 
  }
});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
    const delayInput = form.querySelector('input[name="delay"]');
    const stateInputs = form.querySelectorAll('input[name="state"]');
    const submitButton = form.querySelector('button[type="submit"]');
  

    form.addEventListener('submit', function (event) {
      event.preventDefault(); 
  
    
      const delay = parseInt(delayInput.value, 10);
      const selectedState = Array.from(stateInputs).find(input => input.checked);
  
    
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (selectedState && selectedState.value === 'fulfilled') {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
      });
  
 
      promise.then(
        (resolvedDelay) => {
      
          showNotification(`✅ Fulfilled promise in ${resolvedDelay}ms`);
        },
        (rejectedDelay) => {
  
          showNotification(`❌ Rejected promise in ${rejectedDelay}ms`);
        }
      );
    });
  

    function showNotification(message) {
      iziToast.show({
        title: 'Notification',
        message: message,
        theme: 'light',
        position: 'topCenter',
        timeout: 5000,
        progressBarColor: 'rgba(255, 0, 0, 0.7)',
      });
    }
  });