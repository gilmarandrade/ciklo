import Ciklo from './modules/ciklo.js';
import UrlHelper from './utils/urlHelper.js';

const urlHelper = new UrlHelper();
const { targetDate } = urlHelper.params;

const counterContainer = document.querySelector('#timer');
const counterSeconds = document.querySelector('#timer .countdown-seconds');
const counterMinutes = document.querySelector('#timer .countdown-minutes');
const counterHours = document.querySelector('#timer .countdown-hours');
const counterDays = document.querySelector('#timer .countdown-days');

/**
 * Caso seja necessário, atualiza a tela com os novos dados do contador
 * @param {Element} counter Elemento html que exibirá o valor
 * @param {number} indexNew Valor a ser exibido no contador
 */
function updateCounterView(counter, indexNew) {
  if (counter.getAttribute('data-time') != indexNew) {
    counter.setAttribute('data-time', indexNew);
    counter.querySelector('span:first-child').innerText = String(indexNew).padStart(2, '0');
    counter.classList.add('animate');

    setTimeout(() => {
      counter.querySelector('span:last-child').innerText = String(indexNew).padStart(2, '0');
      counter.classList.remove('animate');
    }, 700);
  }
}

/**
 * Timer progressivo
 * Atualiza cada campo do contador (dia, hora, minuto e segundo) a cada segundo
 */
function initProgressiveTimer(timer) {
  setInterval( () => {
    const time = timer.elapsed.toDays();
    updateCounterView(counterSeconds, time.seconds);
    updateCounterView(counterMinutes, time.minutes);
    updateCounterView(counterHours, time.hours);
    updateCounterView(counterDays, time.days);
  }, 1000);
}

/**
 * Timer regressivo
 * Atualiza cada campo do contador (dia, hora, minuto e segundo) a cada segundo
 */
function initRegressiveTimer(timer) {
  counterContainer.classList.add('countdown__regressive');// TODO a nomenclatura das classes utilizadas no css não reflete corretamente as funções, precisa refatorar

  const interval = setInterval( () => {
    const time = timer.remaining.toDays();
    updateCounterView(counterSeconds, time.seconds);
    updateCounterView(counterMinutes, time.minutes);
    updateCounterView(counterHours, time.hours);
    updateCounterView(counterDays, time.days);

    if (timer.remaining.milliseconds < 1000) { // fim do tempo
      counterContainer.classList.add('ended');
      // TODO verificar se isso ainda funciona:
      // comente essa linha para que o timer continue a contagem de forma negativa (como um timer progressivo)
      // clearInterval(interval);
    }
  }, 1000);
}

//TODO dá pra transformar o timer progressivo em uma classe
(function() {
  initTimer();
})();

function initTimer() {
  // inicializa o contador com a data recebina na query string, através do parâmetro targetDate
  const timer = new Ciklo(targetDate);// targetDate=25 December 2019 00:00:00 GMT-0300
  if (timer.startDate) {
    initProgressiveTimer(timer);
  } else if (timer.endDate) {
    initRegressiveTimer(timer);
  }
}
