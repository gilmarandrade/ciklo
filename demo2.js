import Countdown from './countdown.js';

const countdown = new Countdown('23 December 2019 23:59:59 GMT-0300');

const counterSeconds = document.querySelector('#countdown-seconds');
const counterMinutes = document.querySelector('#countdown-minutes');
const counterHours = document.querySelector('#countdown-hours');
const counterDays = document.querySelector('#countdown-days');

setInterval( () => {
    const time = countdown.toDays();
    updateCounterView(counterSeconds, time.seconds);
    updateCounterView(counterMinutes, time.minutes);
    updateCounterView(counterHours, time.hours);
    updateCounterView(counterDays, time.days);
    
    // console.log( `${time.days}days ${time.hours}h ${time.minutes}m ${time.seconds}s`);
}, 1000);

function updateCounterView(counter, indexNew) {
    if(counter.getAttribute('data-time') != indexNew) {
        counter.setAttribute('data-time', indexNew);
        counter.querySelector('span:first-child').innerText = String(indexNew).padStart(2, '0');
        counter.classList.add('animate');
    
        setTimeout(() => {
            counter.querySelector('span:last-child').innerText = String(indexNew).padStart(2, '0');
            counter.classList.remove('animate');
        }, 950);
    }
}