import Timer from './modules/timer.js';

// ler os parâmetros na query string e criar um array associativo
// TODO dava pra isolar esse código em um modulo
let urlParams;
(window.onpopstate = function () {
  let match;
    var pl     = /\+/g;  // Regex for replacing addition symbol with a space
    var search = /([^&=]+)=?([^&]*)/g;
    var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
    var query = window.location.search.substring(1);

  urlParams = {};
  while (match = search.exec(query)) {urlParams[decode(match[1])] = decode(match[2]);}
})();

const timer = new Timer(urlParams.startDate, urlParams.endDate);

const counterContainer = document.querySelector('#pixel-grid');

initPixelGrid();


/**
 * Pixel grid dos dias decorridos e restantes
 */
function initPixelGrid() {
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
