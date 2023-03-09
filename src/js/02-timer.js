import flatpickr from "flatpickr";
import Notiflix from "notiflix";
import "flatpickr/dist/flatpickr.min.css";

const date = document.querySelector("#datetime-picker");
const button = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHrs = document.querySelector("[data-hours]");
const dataMin = document.querySelector("[data-minutes]");
const dataSec = document.querySelector("[data-seconds]");

let timerId = null;

button.setAttribute("disabled", "");

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		console.log(selectedDates[0]);
		selectedDates[0] >= Date.now()
			? button.removeAttribute("disabled")
			: Notiflix.Notify.failure("Please choose a date in the future");
	},
};

flatpickr(date, options);

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const addLeadingZero = (value) => value.toString().padStart(2, "0");

button.addEventListener("click", (event) => {
	button.setAttribute("disabled", "");
	const timerId = setInterval(() => {
		date.setAttribute("disabled", "");
		const pickedDate = new Date(date.value);
		const timeToEnd = pickedDate - Date.now();
		const { days, hours, minutes, seconds } = convertMs(timeToEnd);

		dataDays.innerHTML = addLeadingZero(days);
		dataHrs.innerHTML = addLeadingZero(hours);
		dataMin.innerHTML = addLeadingZero(minutes);
		dataSec.innerHTML = addLeadingZero(seconds);

		if (timeToEnd < 1000) {
			date.removeAttribute("disabled");
			clearInterval(timerId);
		}
	}, 1000);
});
