import Timer from './modules/timer.js';

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

//inicializa o contador com a data recebina na query string, através do parâmetro targetDate
const countdown = new Timer(urlParams.targetDate);//25 December 2019 00:00:00 GMT-0300

const counterContainer = document.querySelector('#timer');
const counterSeconds = document.querySelector('#timer .countdown-seconds');
const counterMinutes = document.querySelector('#timer .countdown-minutes');
const counterHours = document.querySelector('#timer .countdown-hours');
const counterDays = document.querySelector('#timer .countdown-days');

if(countdown.actualDate.getTime() < countdown.targetDate.getTime()) {
    //timer regressivo
    initRegressiveTimer();
} else {
    //timer progressivo
    initProgressiveTimer();
}

/**
 * Timer progressivo
 * Atualiza cada campo do contador (dia, hora, minuto e segundo) a cada segundo
 */
function initProgressiveTimer() {
    setInterval( () => {
        const time = countdown.timestamp.toDays();
        updateCounterView(counterSeconds, time.seconds);
        updateCounterView(counterMinutes, time.minutes);
        updateCounterView(counterHours, time.hours);
        updateCounterView(counterDays, time.days);
        
        // console.log( `${time.days}days ${time.hours}h ${time.minutes}m ${time.seconds}s `, countdown.timestamp);
    }, 1000);
}

/**
 * Timer regressivo
 * Atualiza cada campo do contador (dia, hora, minuto e segundo) a cada segundo
 */
function initRegressiveTimer() {
    counterContainer.classList.add('countdown__regressive');//TODO a nomenclatura das classes utilizadas no css não reflete corretamente as funções, precisa refatorar

    const interval = setInterval( () => {
        const time = countdown.timestamp.toDays();
        updateCounterView(counterSeconds, time.seconds);
        updateCounterView(counterMinutes, time.minutes);
        updateCounterView(counterHours, time.hours);
        updateCounterView(counterDays, time.days);
        
        if(countdown.timestamp.milliseconds < 1000) {//fim do tempo
            counterContainer.classList.add('ended');
            //comente essa linha para que o timer continue a contagem de forma negativa (como um timer progressivo)
            //clearInterval(interval);
        }
        //console.log( `${time.days}days ${time.hours}h ${time.minutes}m ${time.seconds}s `, countdown.timestamp);
    }, 1000);
}

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