import Timer from './modules/timer.js';

// ler os parâmetros na query string e criar um array associativo
// TODO dava pra isolar esse código em um modulo
var urlParams;
(window.onpopstate = function () {
  var match,
    pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    query = window.location.search.substring(1);

  urlParams = {};
  while (match = search.exec(query))
    urlParams[decode(match[1])] = decode(match[2]);
})();

const timer = new Timer(urlParams.startDate, urlParams.endDate);

const counterContainer = document.querySelector('#timeline');

initTimeline();

/**
 * Barra de progresso do tempo decorrido e tempo restante
 * Atualiza a cada segundo
 */
function initTimeline() {
  counterContainer.querySelector('.timeline-start').innerHTML = timer.startDate.toLocaleDateString();
  counterContainer.querySelector('.timeline-end').innerHTML = timer.endDate.toLocaleDateString();

  let loop = true;
  const interval = setInterval( () => {
    loop = updateTimelineView(counterContainer, timer);
    if (!loop) {
      clearInterval(interval);
    }
  }, 1000);
}


/**
 * Caso seja necessário, atualiza a tela com os novos dados do contador
 * @param {Element} counterContainer Elemento html que contém a linha do tempo
 * @param {Timer} timer contador
 * @returns Retorna true para continuar a contagem, e false para parar
 */
function updateTimelineView(counterContainer, timer) {
  let percentage, elapsed, left;

  if (timer.endDate.getTime() < timer.actualDate.getTime()) { // data final já passou, ou tempo esgotado
    console.log('data final ja passou / tempo esgotado!');
    counterContainer.classList.add('ended');
    counterContainer.querySelector('.tooltip .left .timeline-percent').innerHTML = '100.0000000000000000%';
    counterContainer.querySelector('.tooltip .right .timeline-percent').innerHTML = '-0.0000000000000000%';
    const elapsed = timer.total.toDays();
    counterContainer.querySelector('.tooltip .left .timeline-days').innerHTML = `${elapsed.days}d ${elapsed.hours}:${elapsed.minutes}:${elapsed.seconds}`;
    counterContainer.querySelector('.tooltip .right .timeline-days').innerHTML = '-0d';
    counterContainer.querySelector('.timeline-bar').style.width = '100%';

    counterContainer.querySelector('.tooltip .left').style.flexGrow = 100;
    counterContainer.querySelector('.tooltip .right').style.flexGrow = 0;
    counterContainer.querySelector('.tooltip .left').style.flexBasis = '100%';
    counterContainer.querySelector('.tooltip .right').style.flexBasis = '0%';
    return false;
  }

  if (timer.actualDate.getTime() < timer.startDate.getTime()) { // data inicial ainda não chegou
    console.log('data inicial não chegou');
    counterContainer.classList.add('ended');
    counterContainer.querySelector('.tooltip .left .timeline-percent').innerHTML = '0.0000000000000000%';
    counterContainer.querySelector('.tooltip .right .timeline-percent').innerHTML = '-100.0000000000000000%';
    counterContainer.querySelector('.tooltip .left .timeline-days').innerHTML = '0d';
    const left = timer.total.toDays();
    counterContainer.querySelector('.tooltip .right .timeline-days').innerHTML = `-${left.days}d ${left.hours}:${left.minutes}:${left.seconds}`;
    counterContainer.querySelector('.timeline-bar').style.width = '0%';

    counterContainer.querySelector('.tooltip .left').style.flexGrow = 0;
    counterContainer.querySelector('.tooltip .right').style.flexGrow = 100;
    counterContainer.querySelector('.tooltip .left').style.flexBasis = '0%';
    counterContainer.querySelector('.tooltip .right').style.flexBasis = '100%';
    return false;
  }

  percentage = timer.elapsed.milliseconds;
  percentage /= timer.total.milliseconds;
  percentage *= 100;

  elapsed = timer.elapsed.toDays();
  left = timer.remaining.toDays();

  counterContainer.querySelector('.tooltip .left .timeline-percent').innerHTML = `${percentage}%`;
  counterContainer.querySelector('.tooltip .right .timeline-percent').innerHTML = `-${100 - percentage}%`;
  counterContainer.querySelector('.tooltip .left .timeline-days').innerHTML = `${elapsed.days}d ${elapsed.hours}:${elapsed.minutes}:${elapsed.seconds}`;
  counterContainer.querySelector('.tooltip .right .timeline-days').innerHTML = `-${left.days}d ${left.hours}:${left.minutes}:${left.seconds}`;
  counterContainer.querySelector('.timeline-bar').style.width = `${percentage.toFixed(2)}%`;// TODO animar a porcentagem  e o número quando a página carregar pela primeira vez

  counterContainer.querySelector('.tooltip .left').style.flexGrow = percentage.toFixed(0);
  counterContainer.querySelector('.tooltip .right').style.flexGrow = 100 - percentage.toFixed(0);
  counterContainer.querySelector('.tooltip .left').style.flexBasis = `${percentage.toFixed(0)}%`;
  counterContainer.querySelector('.tooltip .right').style.flexBasis = `${100 - percentage.toFixed(0)}%`;
  return true;
}
