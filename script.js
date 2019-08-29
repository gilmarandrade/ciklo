import Countdown from './modules/countdown.js';

const tempoParaONatal = new Countdown('23 December 2019 23:59:59 GMT-0300');

const countdowDisplayMilliseconds = document.querySelector('#countdowDisplayMilliseconds');
const countdowDisplaySeconds = document.querySelector('#countdowDisplaySeconds');
const countdowDisplayMinutes = document.querySelector('#countdowDisplayMinutes');
const countdowDisplayHours = document.querySelector('#countdowDisplayHours');
const countdowDisplayDays = document.querySelector('#countdowDisplayDays');

setInterval( () => {
    countdowDisplayMilliseconds.innerHTML = `
        ${tempoParaONatal.timestamp} timestamp (milliseconds)
    `;
}, 1000);

setInterval( () => {
    const time = tempoParaONatal.toSeconds();
    countdowDisplaySeconds.innerHTML = `
        ${time.seconds} s
    `;
}, 1000);

setInterval( () => {
    const time = tempoParaONatal.toMinutes();
    countdowDisplayMinutes.innerHTML = `
        ${time.minutes} m
        ${time.seconds} s
    `;
}, 1000);

setInterval( () => {
    const time = tempoParaONatal.toHours();
    countdowDisplayHours.innerHTML = `
        ${time.hours} h
        ${time.minutes} m
        ${time.seconds} s
    `;
}, 1000);

setInterval( () => {
    const time = tempoParaONatal.toDays();
    countdowDisplayDays.innerHTML = `
        ${time.days} days
        ${time.hours} h
        ${time.minutes} m
        ${time.seconds} s
    `;
}, 1000);

console.log('_actualDate: ', tempoParaONatal._actualDate);
console.log('_targetDate: ', tempoParaONatal._targetDate);
console.log('timestamp: ', tempoParaONatal.timestamp);

console.log('seconds: ', tempoParaONatal.seconds);
console.log('minutes: ', tempoParaONatal.minutes);
console.log('hours: ', tempoParaONatal.hours);
console.log('days: ', tempoParaONatal.days);

console.log('toSeconds(): ', tempoParaONatal.toSeconds());
console.log('toMinutes(): ', tempoParaONatal.toMinutes());
console.log('toHours(): ', tempoParaONatal.toHours());
console.log('toDays(): ', tempoParaONatal.toDays());