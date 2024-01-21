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

function updateTimerDisplay(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
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
          title: 'Sorry!',
          message: 'Please choose a date in the future',
        });
        startButton.disabled = true; // Зробив зміну тут, якщо вибрана минула дата
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
    startButton.disabled = true;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  updateTimerDisplay(days, hours, minutes, seconds);
}

startButton.addEventListener('click', function () {
  const selectedDate = flatpickr.parseDate(dateTimePicker.value, 'Y-m-d H:i:S');
  if (selectedDate && selectedDate > new Date()) {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => updateTimer(selectedDate), 1000);
    startButton.disabled = true;
  } else {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a valid date in the future',
    });
    startButton.disabled = true;
  }
});

dateTimePicker.addEventListener('change', function () {
  startButton.disabled = false;
});
