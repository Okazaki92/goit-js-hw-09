function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");
const bodyColor = document.querySelector("body");
const newContainer = document.createElement("div");
let timerId = null;
newContainer.className = "container";
bodyColor.append(newContainer);
newContainer.append(startButton, stopButton);
stopButton.setAttribute("disabled", "");

startButton.addEventListener("click", (event) => {
	startButton.setAttribute("disabled", "");
	stopButton.removeAttribute("disabled");
	timerId = setInterval(() => {
		bodyColor.style.backgroundColor = getRandomHexColor();
	}, 1000);
});

stopButton.addEventListener("click", (event) => {
	startButton.removeAttribute("disabled");
	stopButton.setAttribute("disabled", "");
	clearInterval(timerId);
});
