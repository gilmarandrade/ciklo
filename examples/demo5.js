import Timer from '../modules/timer.js';

//ler os parâmetros na query string e criar um array associativo
//TODO dava pra isolar esse código em um modulo
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
const elapsedCountdown = new Timer(urlParams.startDate);//25 December 2019 00:00:00 GMT-0300
//contador de dias restantes
const leftCountdown = new Timer(urlParams.endDate);//'31 December 2019 00:00:00 GMT-0300'

const counterContainer = document.querySelector('#pixel-grid');

//data inicio menor que data fim
if(elapsedCountdown.targetDate.getTime() < leftCountdown.targetDate.getTime()){
    console.log('init');
    initPixelGrid();
}


/**
 * Pixel grid dos dias decorridos e restantes
 */
function initPixelGrid() {
    
    const gridContainer = counterContainer.querySelector('.grid');

    let elapsed = elapsedCountdown.timestamp.days;
    let left = leftCountdown.timestamp.days;

    if(leftCountdown.targetDate.getTime() < leftCountdown.actualDate.getTime()){//data final já passou, ou tempo esgotado
        console.log('data final ja passou / tempo esgotado!');
        elapsed = Timer.dateDiff(leftCountdown.targetDate, elapsedCountdown.targetDate).days;
        left = 0;
        gridContainer.classList.add('ended');
    }

    if(elapsedCountdown.actualDate.getTime() < elapsedCountdown.targetDate.getTime()){//data inicial ainda não chegou
        console.log('data inicial não chegou');
        elapsed = 0;
        left = Timer.dateDiff(leftCountdown.targetDate, elapsedCountdown.targetDate).days;
    }

    counterContainer.querySelector('.timeline-start').innerHTML = elapsedCountdown.targetDate.toLocaleDateString();
    counterContainer.querySelector('.timeline-end').innerHTML = leftCountdown.targetDate.toLocaleDateString();

    console.log(elapsed, 'dias passados');
    for(let i = 0; i < elapsed; i++){
       const ele = document.createElement('div');
       ele.classList.add('pixel','active');
       gridContainer.append(ele);
    }

    console.log(left, 'dias faltantes');
    const ele = document.createElement('div');
    ele.classList.add('pixel');
    if(elapsed != 0) {
        ele.classList.add('today');
    }
    gridContainer.append(ele);

    for(let i = 0; i < left - 1; i++){
        const ele = document.createElement('div');
        ele.classList.add('pixel');
        gridContainer.append(ele);
    }
}