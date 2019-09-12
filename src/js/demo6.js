import Timer from './modules/timer.js';

// ler os parâmetros na query string e criar um array associativo
// TODO dava pra isolar esse código em um modulo
let urlParams;
(window.onpopstate = function () {
  let match;
  const pl = /\+/g; // Regex for replacing addition symbol with a space
  const search = /([^&=]+)=?([^&]*)/g;
  const decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); };
  const query = window.location.search.substring(1);

  urlParams = {};
  while (match = search.exec(query)) {
    urlParams[decode(match[1])] = decode(match[2]);
  }
})();

const timer = new Timer(urlParams.startDate, urlParams.endDate);

/**
 * Caso seja necessário, atualiza a tela com os novos dados do contador
 * @param {Element} counter Elemento html que exibirá o valor
 * @param {number} indexNew Valor a ser exibido no contador
 */
function updateCounterView(counter, indexNew) {
  if (+counter.getAttribute('data-time') !== indexNew) {
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
 * Timer regressivo
 * Atualiza cada campo do contador regressivo (dia, hora, minuto e segundo) a cada segundo
 */
function initRegressiveTimer() {
  const counterContainer = document.querySelector('#timer');
  const counterSeconds = counterContainer.querySelector('.countdown-seconds');
  const counterMinutes = counterContainer.querySelector('.countdown-minutes');
  const counterHours = counterContainer.querySelector('.countdown-hours');
  const counterDays = counterContainer.querySelector('.countdown-days');

  counterContainer.classList.add('countdown__regressive');

  const interval = setInterval(() => {
    const time = timer.remaining.toDays();
    updateCounterView(counterSeconds, time.seconds);
    updateCounterView(counterMinutes, time.minutes);
    updateCounterView(counterHours, time.hours);
    updateCounterView(counterDays, time.days);

    if (timer.remaining.milliseconds < 1000) { // fim do tempo
      counterContainer.classList.add('ended');
      // comente essa linha para que o timer continue a contagem como um timer progressivo
      clearInterval(interval);
    }
  }, 1000);
}


/**
 * Caso seja necessário, atualiza a tela com os novos dados do contador
 * @param {Element} counterContainer Elemento html que contém a linha do tempo
 * @param {Timer} timer contador progressivo
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

/**
 * Barra de progresso do tempo decorrido e tempo restante
 * Atualiza a cada segundo
 */
function initTimeline() {
  const counterContainer = document.querySelector('#timeline');
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
 * Pixel grid dos dias decorridos e restantes
 */
function initPixelGrid() {
  const counterContainer = document.querySelector('#pixel-grid');
  const gridContainer = counterContainer.querySelector('.grid');

  let elapsed = timer.elapsed.days;
  let left = timer.remaining.days;

  if (timer.endDate.getTime() < timer.actualDate.getTime()) { // data final já passou, ou tempo esgotado
    console.log('data final ja passou / tempo esgotado!');
    elapsed = timer.total.days;
    left = 0;
    gridContainer.classList.add('ended');
  }

  if (timer.actualDate.getTime() < timer.startDate.getTime()) { // data inicial ainda não chegou
    console.log('data inicial não chegou');
    elapsed = 0;
    left = timer.total.days;
  }

  counterContainer.querySelector('.timeline-start').innerHTML = timer.startDate.toLocaleDateString();
  counterContainer.querySelector('.timeline-end').innerHTML = timer.endDate.toLocaleDateString();

  console.log(elapsed, 'dias passados');
  for (let i = 0; i < elapsed; i++) {
    const ele = document.createElement('div');
    ele.classList.add('pixel', 'active');
    gridContainer.append(ele);
  }

  console.log(left, 'dias faltantes');
  const ele = document.createElement('div');
  ele.classList.add('pixel');
  if (elapsed != 0) {
    ele.classList.add('today');
  }
  gridContainer.append(ele);

  for (let i = 0; i < left - 1; i++) {
    const ele = document.createElement('div');
    ele.classList.add('pixel');
    gridContainer.append(ele);
  }
}


/**
 * Atualiza as estatísticas para nerds a cada segundo
 */
function initStatistics() {
  const counterContainer = document.querySelector('#statistics');
  const toDays = timer.elapsed.toDays();

  counterContainer.innerHTML =
`{
    _timestamp: ${timer.elapsed._timestamp}, 
    days: ${timer.elapsed.days}, 
    hours: ${timer.elapsed.hours}, 
    minutes: ${timer.elapsed.minutes}, 
    seconds: ${timer.elapsed.seconds},
    extended: {days: ${toDays.days}, hours: ${toDays.hours}, minutes: ${toDays.minutes}, seconds: ${toDays.seconds}}
  }`;

  const interval = setInterval(() => {
    let elapsed = timer.elapsed;
    let left = timer.remaining;

    if (timer.endDate.getTime() < timer.actualDate.getTime()) {
      // data final já passou, ou tempo esgotado
      clearInterval(interval);
      elapsed = timer.total;
      left = null;
    } else if (timer.actualDate.getTime() < timer.startDate.getTime()) {
      // data inicial ainda não chegou
      clearInterval(interval);
      left = timer.total;
      elapsed = null;
    }

    if (elapsed != null) {
      const elapsedDays = elapsed.toDays();
      counterContainer.innerHTML =
        `elapsed \n{
        _timestamp: ${elapsed._timestamp}, 
        days: ${elapsed.days}, 
        hours: ${elapsed.hours}, 
        minutes: ${elapsed.minutes}, 
        seconds: ${elapsed.seconds},
        extended: {
          days: ${elapsedDays.days}, 
          hours: ${elapsedDays.hours}, 
          minutes: ${elapsedDays.minutes}, 
          seconds: ${elapsedDays.seconds}
        }\n}\n\n`;
    }
    if (left != null) {
      const leftDays = left.toDays();
      counterContainer.innerHTML +=
        `remaining \n{
        _timestamp: ${left._timestamp}, 
        days: ${left.days}, 
        hours: ${left.hours}, 
        minutes: ${left.minutes}, 
        seconds: ${left.seconds},
        extended: {
          days: ${leftDays.days}, 
          hours: ${leftDays.hours}, 
          minutes: ${leftDays.minutes}, 
          seconds: ${leftDays.seconds}
        }\n}`;
    }
    counterContainer.innerHTML += '\nwindow: ' + window.innerWidth + ' x '+ window.innerHeight;
  }, 1000);
}

// data inicio menor que data fim
// if (elapsedCountdown.targetDate.getTime() < leftCountdown.targetDate.getTime()) {
  console.log('init');
  initRegressiveTimer();
  initTimeline();
  initPixelGrid();
  initStatistics();
// }
