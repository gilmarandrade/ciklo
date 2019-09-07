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

// contador de dias passados
const elapsedCountdown = new Timer(urlParams.startDate); // 25 December 2019 00:00:00 GMT-0300
// contador de dias restantes
const leftCountdown = new Timer(urlParams.endDate); // '31 December 2019 00:00:00 GMT-0300'


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
    }, 950);
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
    const time = leftCountdown.timestamp.toDays();
    updateCounterView(counterSeconds, time.seconds);
    updateCounterView(counterMinutes, time.minutes);
    updateCounterView(counterHours, time.hours);
    updateCounterView(counterDays, time.days);

    if (leftCountdown.timestamp.milliseconds < 1000) { // fim do tempo
      counterContainer.classList.add('ended');
      // comente essa linha para que o timer continue a contagem como um timer progressivo
      clearInterval(interval);
    }
  }, 1000);
}


/**
 * Caso seja necessário, atualiza a tela com os novos dados do contador
 * @param {Element} counterContainer Elemento html que contém a linha do tempo
 * @param {Timer} elapsedCountdown contador progressivo da data incial até a data atual
 * @param {Timer} leftCountdown contador regresivo da data atual até a data final
 * @returns Retorna true para continuar a contagem, e false para parar
 */
function updateTimelineView(counterContainer, elapsedCountdown, leftCountdown) {
  let percentage;
  let elapsed;
  let left;

  if (leftCountdown.targetDate.getTime() < leftCountdown.actualDate.getTime()) {
    // data final já passou, ou tempo esgotado
    console.log('data final ja passou / tempo esgotado!');
    counterContainer.classList.add('ended');
    counterContainer.querySelector('.tooltip .left .timeline-percent').innerHTML = '100.0000000000000000%';
    counterContainer.querySelector('.tooltip .right .timeline-percent').innerHTML = '-0.0000000000000000%';
    const elapsed = Timer.dateDiff(leftCountdown.targetDate, elapsedCountdown.targetDate).toDays();
    counterContainer.querySelector('.tooltip .left .timeline-days').innerHTML = `${elapsed.days}d ${elapsed.hours}:${elapsed.minutes}:${elapsed.seconds}`;
    counterContainer.querySelector('.tooltip .right .timeline-days').innerHTML = '-0d';
    counterContainer.querySelector('.timeline-bar').style.width = '100%';

    counterContainer.querySelector('.tooltip .left').style.flexGrow = 100;
    counterContainer.querySelector('.tooltip .right').style.flexGrow = 0;
    counterContainer.querySelector('.tooltip .left').style.flexBasis = '100%';
    counterContainer.querySelector('.tooltip .right').style.flexBasis = '0%';
    return false;
  }

  if (elapsedCountdown.actualDate.getTime() < elapsedCountdown.targetDate.getTime()) {
    // data inicial ainda não chegou
    console.log('data inicial não chegou');
    counterContainer.classList.add('ended');
    counterContainer.querySelector('.tooltip .left .timeline-percent').innerHTML = '0.0000000000000000%';
    counterContainer.querySelector('.tooltip .right .timeline-percent').innerHTML = '-100.0000000000000000%';
    counterContainer.querySelector('.tooltip .left .timeline-days').innerHTML = '0d';
    const left = Timer.dateDiff(leftCountdown.targetDate, elapsedCountdown.targetDate).toDays();
    counterContainer.querySelector('.tooltip .right .timeline-days').innerHTML = `-${left.days}d ${left.hours}:${left.minutes}:${left.seconds}`;
    counterContainer.querySelector('.timeline-bar').style.width = '0%';

    counterContainer.querySelector('.tooltip .left').style.flexGrow = 0;
    counterContainer.querySelector('.tooltip .right').style.flexGrow = 100;
    counterContainer.querySelector('.tooltip .left').style.flexBasis = '0%';
    counterContainer.querySelector('.tooltip .right').style.flexBasis = '100%';
    return false;
  }

  percentage = elapsedCountdown.timestamp.milliseconds;
  percentage /= Timer.dateDiff(leftCountdown.targetDate, elapsedCountdown.targetDate).milliseconds;
  percentage *= 100;

  elapsed = elapsedCountdown.timestamp.toDays();
  left = leftCountdown.timestamp.toDays();

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
  counterContainer.querySelector('.timeline-start').innerHTML = elapsedCountdown.targetDate.toLocaleDateString();
  counterContainer.querySelector('.timeline-end').innerHTML = leftCountdown.targetDate.toLocaleDateString();

  let loop = true;
  const interval = setInterval(() => {
    loop = updateTimelineView(counterContainer, elapsedCountdown, leftCountdown);
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

  let elapsed = elapsedCountdown.timestamp.days;
  let left = leftCountdown.timestamp.days;

  if (leftCountdown.targetDate.getTime() < leftCountdown.actualDate.getTime()) {
    // data final já passou, ou tempo esgotado
    console.log('data final ja passou / tempo esgotado!');
    elapsed = Timer.dateDiff(leftCountdown.targetDate, elapsedCountdown.targetDate).days;
    left = 0;
    gridContainer.classList.add('ended');
  }

  if (elapsedCountdown.actualDate.getTime() < elapsedCountdown.targetDate.getTime()) {
    // data inicial ainda não chegou
    console.log('data inicial não chegou');
    elapsed = 0;
    left = Timer.dateDiff(leftCountdown.targetDate, elapsedCountdown.targetDate).days;
  }

  counterContainer.querySelector('.timeline-start').innerHTML = elapsedCountdown.targetDate.toLocaleDateString();
  counterContainer.querySelector('.timeline-end').innerHTML = leftCountdown.targetDate.toLocaleDateString();

  console.log(elapsed, 'dias passados');
  for (let i = 0; i < elapsed; i++) {
    const ele = document.createElement('div');
    ele.classList.add('pixel', 'active');
    gridContainer.append(ele);
  }

  console.log(left, 'dias faltantes');
  const ele = document.createElement('div');
  ele.classList.add('pixel');
  if (elapsed !== 0) {
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
  const toDays = elapsedCountdown.timestamp.toDays();

  counterContainer.innerHTML =
`{
    _timestamp: ${elapsedCountdown.timestamp._timestamp}, 
    days: ${elapsedCountdown.timestamp.days}, 
    hours: ${elapsedCountdown.timestamp.hours}, 
    minutes: ${elapsedCountdown.timestamp.minutes}, 
    seconds: ${elapsedCountdown.timestamp.seconds},
    extended: {days: ${toDays.days}, hours: ${toDays.hours}, minutes: ${toDays.minutes}, seconds: ${toDays.seconds}}
  }`;

  const interval = setInterval(() => {
    let elapsed = elapsedCountdown.timestamp;
    let left = leftCountdown.timestamp;

    if (leftCountdown.targetDate.getTime() < leftCountdown.actualDate.getTime()) {
      // data final já passou, ou tempo esgotado
      clearInterval(interval);
      elapsed = Timer.dateDiff(leftCountdown.targetDate, elapsedCountdown.targetDate);
      left = null;
    } else if (elapsedCountdown.actualDate.getTime() < elapsedCountdown.targetDate.getTime()) {
      // data inicial ainda não chegou
      clearInterval(interval);
      left = Timer.dateDiff(leftCountdown.targetDate, elapsedCountdown.targetDate);
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
if (elapsedCountdown.targetDate.getTime() < leftCountdown.targetDate.getTime()) {
  console.log('init');
  initRegressiveTimer();
  initTimeline();
  initPixelGrid();
  initStatistics();
}
