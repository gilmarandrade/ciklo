import Timer from '../modules/timer.js';

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

//contador de dias passados
const elapsedCountdown = new Timer(urlParams.targetDate);//25 December 2019 00:00:00 GMT-0300
//contador de dias restantes
const leftCountdown = new Timer('31 December 2019 00:00:00 GMT-0300');//'31 December 2019 00:00:00 GMT-0300'

const counterContainer = document.querySelector('#timeline');

if(elapsedCountdown._actualDate.getTime() >= elapsedCountdown._targetDate.getTime()) {
    //timer progressivo
    initProgressiveTimer();
}

/**
 * Timer progressivo
 * Atualiza cada campo do contador (dia, hora, minuto e segundo) a cada segundo
 */
function initProgressiveTimer() {
    counterContainer.querySelector('.timeline-start').innerHTML = elapsedCountdown._targetDate.toLocaleDateString();
    counterContainer.querySelector('.timeline-end').innerHTML = leftCountdown._targetDate.toLocaleDateString();
    setInterval( () => {
        updateTimelineView(counterContainer, elapsedCountdown, leftCountdown);
    }, 1000);
}


/**
 * Caso seja necessário, atualiza a tela com os novos dados do contador
 * @param {Element} counter Elemento html que exibirá o valor
 * @param {number} indexNew Valor a ser exibido no contador
 */
function updateTimelineView(counterContainer, elapsedCountdown, leftCountdown) {
    // console.log(countdown._targetDate.getTime(), countdown._actualDate.getTime(), leftCountdown._targetDate.getTime());

    let percentage = elapsedCountdown._actualDate.getTime() - elapsedCountdown._targetDate.getTime();
    percentage /= (leftCountdown._targetDate.getTime() - elapsedCountdown._targetDate.getTime());
    percentage *=100;
    percentage = percentage.toFixed(2);
    counterContainer.querySelector('.timeline-bar').style.width = percentage + '%';


    
    counterContainer.querySelector('.timeelapsed-tooltip .timeline-timestamp').innerHTML = elapsedCountdown.timestamp;
    counterContainer.querySelector('.timeelapsed-tooltip .timeline-days').innerHTML = String(elapsedCountdown.days).padStart(4, '0');

    counterContainer.querySelector('.timeleft-tooltip .timeline-timestamp').innerHTML = leftCountdown.timestamp;
    counterContainer.querySelector('.timeleft-tooltip .timeline-days').innerHTML = String(leftCountdown.days).padStart(4, '0');
}