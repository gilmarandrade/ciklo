import Timer from '../modules/timer.js';

function initProgressiveTimer(){
    const progressiveTimer = new Timer('24 December ' + ((new Date()).getFullYear()-1) + ' 23:59:59 GMT-0300');//TODO essa lógica dá erro se o script for exeutado entre o natal e o ano novo
    
    const counterSeconds = document.querySelector('#progressive .countdown-seconds');
    const counterMinutes = document.querySelector('#progressive .countdown-minutes');
    const counterHours = document.querySelector('#progressive .countdown-hours');
    const counterDays = document.querySelector('#progressive .countdown-days');
    
    /**
     * Atualiza cada campo do contador (dia, hora, minuto e segundo) a cada segundo
     */
    setInterval( () => {
        const time = progressiveTimer.timestamp.toDays();
        updateCounterView(counterSeconds, time.seconds);
        updateCounterView(counterMinutes, time.minutes);
        updateCounterView(counterHours, time.hours);
        updateCounterView(counterDays, time.days);
        
        // console.log(progressiveTimer.timestamp);
        // console.log( `${time.days}days ${time.hours}h ${time.minutes}m ${time.seconds}s `, countdown.timestamp);
    }, 1000);
}

function initRegressiveTimer(){
    const regressiveTimer = new Timer('25 December ' + (new Date()).getFullYear() + ' 00:00:00 GMT-0300');
    
    const counterSeconds = document.querySelector('#regressive .countdown-seconds');
    const counterMinutes = document.querySelector('#regressive .countdown-minutes');
    const counterHours = document.querySelector('#regressive .countdown-hours');
    const counterDays = document.querySelector('#regressive .countdown-days');
    
    /**
     * Atualiza cada campo do contador (dia, hora, minuto e segundo) a cada segundo
     */
    setInterval( () => {
        const time = regressiveTimer.timestamp.toDays();
        updateCounterView(counterSeconds, time.seconds);
        updateCounterView(counterMinutes, time.minutes);
        updateCounterView(counterHours, time.hours);
        updateCounterView(counterDays, time.days);
        
        // console.log( `${time.days}days ${time.hours}h ${time.minutes}m ${time.seconds}s `, countdown.timestamp);
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

(function(){
    initProgressiveTimer();
    initRegressiveTimer();
})();