import Ciklo from '../../src/js/modules/Ciklo';

const tempoParaONatal = new Ciklo(
  {
    startDate: `12 September ${(new Date()).getFullYear() - 1} 23:59:59 GMT-0300`,
    endDate: `15 September ${(new Date()).getFullYear()} 23:59:59 GMT-0300`,
  },
);

const startCountdowDisplayMilliseconds = document.querySelector('#start_countdowDisplayMilliseconds');
const startCountdowDisplaySeconds = document.querySelector('#start_countdowDisplaySeconds');
const startCountdowDisplayMinutes = document.querySelector('#start_countdowDisplayMinutes');
const startCountdowDisplayHours = document.querySelector('#start_countdowDisplayHours');
const startCountdowDisplayDays = document.querySelector('#start_countdowDisplayDays');

const endCountdowDisplayMilliseconds = document.querySelector('#end_countdowDisplayMilliseconds');
const endCountdowDisplaySeconds = document.querySelector('#end_countdowDisplaySeconds');
const endCountdowDisplayMinutes = document.querySelector('#end_countdowDisplayMinutes');
const endCountdowDisplayHours = document.querySelector('#end_countdowDisplayHours');
const endCountdowDisplayDays = document.querySelector('#end_countdowDisplayDays');

document.querySelector('#startDate').innerHTML = tempoParaONatal.startDate.toLocaleDateString();
document.querySelector('#endDate').innerHTML = tempoParaONatal.endDate.toLocaleDateString();


setInterval(() => {
  startCountdowDisplayMilliseconds.innerHTML = `
        ${tempoParaONatal.elapsed.milliseconds} timestamp (milliseconds)
    `;
  endCountdowDisplayMilliseconds.innerHTML = `
        ${tempoParaONatal.remaining.milliseconds} timestamp (milliseconds)
    `;
}, 1000);

setInterval(() => {
  const start = tempoParaONatal.elapsed.toSeconds();
  startCountdowDisplaySeconds.innerHTML = `
        ${start.seconds} s
    `;

  const end = tempoParaONatal.remaining.toSeconds();
  endCountdowDisplaySeconds.innerHTML = `
        ${end.seconds} s
    `;
}, 1000);

setInterval(() => {
  const start = tempoParaONatal.elapsed.toMinutes();
  startCountdowDisplayMinutes.innerHTML = `
        ${start.minutes} m
        ${start.seconds} s
    `;

  const end = tempoParaONatal.remaining.toMinutes();
  endCountdowDisplayMinutes.innerHTML = `
        ${end.minutes} m
        ${end.seconds} s
    `;
}, 1000);

setInterval(() => {
  const start = tempoParaONatal.elapsed.toHours();
  startCountdowDisplayHours.innerHTML = `
        ${start.hours} h
        ${start.minutes} m
        ${start.seconds} s
    `;

  const end = tempoParaONatal.remaining.toHours();
  endCountdowDisplayHours.innerHTML = `
        ${end.hours} h
        ${end.minutes} m
        ${end.seconds} s
    `;
}, 1000);

setInterval(() => {
  const start = tempoParaONatal.elapsed.toDays();
  startCountdowDisplayDays.innerHTML = `
        ${start.days} days
        ${start.hours} h
        ${start.minutes} m
        ${start.seconds} s
    `;

  const end = tempoParaONatal.remaining.toDays();
  endCountdowDisplayDays.innerHTML = `
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
