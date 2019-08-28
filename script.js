import Countdown from './countdown.js';

const tempoParaONatal = new Countdown('23 December 2019 23:59:59 GMT-0300');

const countdowDisplaySeconds = document.querySelector('#countdowDisplaySeconds');
const countdowDisplayMinutes = document.querySelector('#countdowDisplayMinutes');
const countdowDisplayHours = document.querySelector('#countdowDisplayHours');
const countdowDisplayDays = document.querySelector('#countdowDisplayDays');
const countdowDisplayFull = document.querySelector('#countdowDisplayFull');


setInterval( () => {
    countdowDisplaySeconds.innerHTML = `
    ${tempoParaONatal.seconds} seconds
    `;
}, 1000);

setInterval( () => {
    countdowDisplayMinutes.innerHTML = `
    ${tempoParaONatal.minutes} minutes
    `;
}, 1000);

setInterval( () => {
    countdowDisplayHours.innerHTML = `
    ${tempoParaONatal.hours} hours
    `;
}, 1000);

setInterval( () => {
    countdowDisplayDays.innerHTML = `
        ${tempoParaONatal.days} days
        `;
}, 1000);

setInterval( () => {
    countdowDisplayFull.innerHTML = `
        ${tempoParaONatal.fullDiff.days} days
        ${tempoParaONatal.fullDiff.hours} h
        ${tempoParaONatal.fullDiff.minutes} m
        ${tempoParaONatal.fullDiff.seconds} s
    `;
}, 1000);