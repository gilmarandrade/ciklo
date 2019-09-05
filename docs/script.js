import Timer from '../modules/timer.js';

var i = 0;
const tempoParaONatal = new Timer('25 December ' + (new Date()).getFullYear() + ' 00:00:00 GMT-0300');

const countdowDisplayMilliseconds = document.querySelector('#countdowDisplayMilliseconds');
const countdowDisplaySeconds = document.querySelector('#countdowDisplaySeconds');
const countdowDisplayMinutes = document.querySelector('#countdowDisplayMinutes');
const countdowDisplayHours = document.querySelector('#countdowDisplayHours');
const countdowDisplayDays = document.querySelector('#countdowDisplayDays');

document.querySelector('#targetDate').innerHTML = tempoParaONatal.targetDate.toLocaleDateString();


setInterval( () => {
    countdowDisplayMilliseconds.innerHTML = `
        ${tempoParaONatal.timestamp.milliseconds} timestamp (milliseconds)
    `;
}, 1000);

setInterval( () => {
    const time = tempoParaONatal.timestamp.toSeconds();
    countdowDisplaySeconds.innerHTML = `
        ${time.seconds} s
    `;
}, 1000);

setInterval( () => {
    const time = tempoParaONatal.timestamp.toMinutes();
    countdowDisplayMinutes.innerHTML = `
        ${time.minutes} m
        ${time.seconds} s
    `;
}, 1000);

setInterval( () => {
    const time = tempoParaONatal.timestamp.toHours();
    countdowDisplayHours.innerHTML = `
        ${time.hours} h
        ${time.minutes} m
        ${time.seconds} s
    `;
}, 1000);

setInterval( () => {
    const time = tempoParaONatal.timestamp.toDays();
    countdowDisplayDays.innerHTML = `
        ${time.days} days
        ${time.hours} h
        ${time.minutes} m
        ${time.seconds} s
    `;
}, 1000);

console.log('actualDate: ', tempoParaONatal.actualDate);
console.log('targetDate: ', tempoParaONatal.targetDate);
console.log('timestamp: ', tempoParaONatal.timestamp);

console.log('seconds: ', tempoParaONatal.timestamp.seconds);
console.log('minutes: ', tempoParaONatal.timestamp.minutes);
console.log('hours: ', tempoParaONatal.timestamp.hours);
console.log('days: ', tempoParaONatal.timestamp.days);

console.log('toSeconds(): ', tempoParaONatal.timestamp.toSeconds());
console.log('toMinutes(): ', tempoParaONatal.timestamp.toMinutes());
console.log('toHours(): ', tempoParaONatal.timestamp.toHours());
console.log('toDays(): ', tempoParaONatal.timestamp.toDays());