import Notiflix from "notiflix";

const form = document.querySelector(".form");
const inputDelay = document.querySelector("[name=delay]");
const inputStep = document.querySelector("[name=step]");
const inputAmount = document.querySelector("[name=amount]");

const onSubmit = (event) => {
	event.preventDefault();
	if (inputDelay.value < 0 || inputStep.value < 0 || inputAmount.value < 0) {
		Notiflix.Notify.warning("❗Error. Please enter number higher than 0");
	} else {
		for (let index = 0; index < inputAmount.value; index++) {
			let position = index + 1;
			const delay =
				JSON.parse(inputDelay.value) + JSON.parse(inputStep.value) * index;
			createPromise(position, delay)
				.then(({ position, delay }) => {
					Notiflix.Notify.success(
						`✅ Fulfilled promise ${position} in ${delay}ms`,
					);
				})
				.catch(({ position, delay }) => {
					Notiflix.Notify.failure(
						`❌ Rejected promise ${position} in ${delay}ms`,
					);
				});
		}
	}
};

form.addEventListener("submit", onSubmit);

function createPromise(position, delay) {
	return new Promise((resolve, reject) => {
		const shouldResolve = Math.random() > 0.3;
		setTimeout(() => {
			if (shouldResolve) {
				resolve({ position, delay });
			} else {
				reject({ position, delay });
			}
		}, delay);
	});
}
//