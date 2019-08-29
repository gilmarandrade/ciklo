import Countdown from './countdown.js';

//ler os parâmetros na query string e criar um array associativo
var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

//inicializa o contador com a data recebina na query string, através dp parâmetro targetDate
const countdown = new Countdown(urlParams.targetDate);//23 December 2019 23:59:59 GMT-0300

const counterSeconds = document.querySelector('#countdown-seconds');
const counterMinutes = document.querySelector('#countdown-minutes');
const counterHours = document.querySelector('#countdown-hours');
const counterDays = document.querySelector('#countdown-days');

/**
 * Atualiza cada campo do contador (dia, hora, minuto e segundo) a cada segundo
 */
setInterval( () => {
    const time = countdown.toDays();
    updateCounterView(counterSeconds, time.seconds);
    updateCounterView(counterMinutes, time.minutes);
    updateCounterView(counterHours, time.hours);
    updateCounterView(counterDays, time.days);
    
    // console.log( `${time.days}days ${time.hours}h ${time.minutes}m ${time.seconds}s`);
}, 1000);

/**
 * Caso seja necessário, atualiza a tela com os novos dados do contador
 * @param {Element} counter Elemento html que exibirá o valor
 * @param {number} indexNew Valor a ser exibido no contador
 */
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