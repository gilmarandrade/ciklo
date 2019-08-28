import Countdown from './countdown.js';

const countdown = new Countdown('23 December 2019 23:59:59 GMT-0300');

const container = document.querySelector('#countdow');

// setInterval( () => {
//     const time = countdown.toDays();
//     container.innerHTML = `
//         ${time.days} days
//         ${time.hours} h
//         ${time.minutes} m
//         ${time.seconds} s
//     `;
// }, 1000);



setInterval( () => {
    const counter = document.querySelector('#countdown-seconds'); 
   updateCounterView(counter);
}, 1000);

setInterval( () => {
    const counter = document.querySelector('#countdown-minutes');
    updateCounterView(counter);
 }, 2000);

 setInterval( () => {
    const counter = document.querySelector('#countdown-hours');
    updateCounterView(counter);
 }, 3000);

 setInterval( () => {
    const counter = document.querySelector('#countdown-days');
    updateCounterView(counter);
 }, 4000);

function updateCounterView(counter) {
    let index = +counter.dataset.time - 1;
    counter.setAttribute('data-time', index);

    counter.querySelector('span:first-child').innerText = index;
    counter.classList.add('animate');

    setTimeout(() => {
        counter.querySelector('span:last-child').innerText = index;
        //console.log(index);
        counter.classList.remove('animate');
        
    }, 950);
}