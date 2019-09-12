import Timer from './modules/timer.js';

const tempoParaONatal = new Timer(
  `12 September ${ (new Date()).getFullYear() +1} 23:59:59 GMT-0300`,
  `15 September ${ (new Date()).getFullYear()  +1} 23:59:59 GMT-0300`,
);

const start_countdowDisplayMilliseconds = document.querySelector('#start_countdowDisplayMilliseconds');
const start_countdowDisplaySeconds = document.querySelector('#start_countdowDisplaySeconds');
const start_countdowDisplayMinutes = document.querySelector('#start_countdowDisplayMinutes');
const start_countdowDisplayHours = document.querySelector('#start_countdowDisplayHours');
const start_countdowDisplayDays = document.querySelector('#start_countdowDisplayDays');

const end_countdowDisplayMilliseconds = document.querySelector('#end_countdowDisplayMilliseconds');
const end_countdowDisplaySeconds = document.querySelector('#end_countdowDisplaySeconds');
const end_countdowDisplayMinutes = document.querySelector('#end_countdowDisplayMinutes');
const end_countdowDisplayHours = document.querySelector('#end_countdowDisplayHours');
const end_countdowDisplayDays = document.querySelector('#end_countdowDisplayDays');

// document.querySelector('#startDate').innerHTML = tempoParaONatal.startDate.toLocaleDateString();
// document.querySelector('#endDate').innerHTML = tempoParaONatal.endDate.toLocaleDateString();


setInterval(() => {
  start_countdowDisplayMilliseconds.innerHTML = `
        ${tempoParaONatal.elapsed.milliseconds} timestamp (milliseconds)
    `;
  end_countdowDisplayMilliseconds.innerHTML = `
        ${tempoParaONatal.remaining.milliseconds} timestamp (milliseconds)
    `;
}, 1000);

setInterval(() => {
  const start = tempoParaONatal.elapsed.toSeconds();
  start_countdowDisplaySeconds.innerHTML = `
        ${start.seconds} s
    `;

  const end = tempoParaONatal.remaining.toSeconds();
  end_countdowDisplaySeconds.innerHTML = `
        ${end.seconds} s
    `;
}, 1000);

setInterval(() => {
  const start = tempoParaONatal.elapsed.toMinutes();
  start_countdowDisplayMinutes.innerHTML = `
        ${start.minutes} m
        ${start.seconds} s
    `;

  const end = tempoParaONatal.remaining.toMinutes();
  end_countdowDisplayMinutes.innerHTML = `
        ${end.minutes} m
        ${end.seconds} s
    `;    
}, 1000);

setInterval(() => {
  const start = tempoParaONatal.elapsed.toHours();
  start_countdowDisplayHours.innerHTML = `
        ${start.hours} h
        ${start.minutes} m
        ${start.seconds} s
    `;

  const end = tempoParaONatal.remaining.toHours();
  end_countdowDisplayHours.innerHTML = `
        ${end.hours} h
        ${end.minutes} m
        ${end.seconds} s
    `;
}, 1000);

setInterval(() => {
  const start = tempoParaONatal.elapsed.toDays();
  start_countdowDisplayDays.innerHTML = `
        ${start.days} days
        ${start.hours} h
        ${start.minutes} m
        ${start.seconds} s
    `;

  const end = tempoParaONatal.remaining.toDays();
  end_countdowDisplayDays.innerHTML = `
        ${end.days} days
        ${end.hours} h
        ${end.minutes} m
        ${end.seconds} s
    `;
}, 1000);

console.log(tempoParaONatal);

console.log('actualDate: ', tempoParaONatal.actualDate);
console.log('startDate: ', tempoParaONatal.startDate);
console.log('endDate: ', tempoParaONatal.endDate);
console.log('elapsed: ', tempoParaONatal.elapsed);
console.log('remaining: ', tempoParaONatal.remaining);
console.log('total: ', tempoParaONatal.total);
