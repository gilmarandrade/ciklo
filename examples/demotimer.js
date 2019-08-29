import Timer from '../modules/timer.js';

const timer = new Timer('23 December 2018 23:59:59 GMT-0300');

const counterSeconds = document.querySelector('#countdown-seconds');
const counterMinutes = document.querySelector('#countdown-minutes');
const counterHours = document.querySelector('#countdown-hours');
const counterDays = document.querySelector('#countdown-days');

/**
 * Atualiza cada campo do contador (dia, hora, minuto e segundo) a cada segundo
 */
setInterval( () => {
    const time = timer.toDays();
    updateCounterView(counterSeconds, time.seconds);
    updateCounterView(counterMinutes, time.minutes);
    updateCounterView(counterHours, time.hours);
    updateCounterView(counterDays, time.days);
    
    console.log(timer.timestamp);
    // console.log( `${time.days}days ${time.hours}h ${time.minutes}m ${time.seconds}s `, countdown.timestamp);
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