"use strict"

const form = document.querySelector('.form');
const btn = document.querySelector('button');

const inputDelay = form.elements.delay;
const inputStep = form.elements.step;
const inputAmount = form.elements.amount;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const promises = createPromises();
});

function createPromises() {
  
  const delay = Number(inputDelay.value);
  const step = Number(inputStep.value);
  const amount = Number(inputAmount.value);

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position: position, delay: delay });
        } else {
          reject({ position: position, delay: delay });
        }
      }, delay);
    });

    return promise;
  }

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + i * step)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}