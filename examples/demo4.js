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

const counterContainer = document.querySelector('#timeline');

//data inicio menor que data fim
if(elapsedCountdown.targetDate.getTime() < leftCountdown.targetDate.getTime()){
    console.log('init');
    initTimeline();
}


/**
 * Barra de progresso do tempo decorrido e tempo restante
 * Atualiza a cada segundo
 */
function initTimeline() {
    counterContainer.querySelector('.timeline-start').innerHTML = elapsedCountdown.targetDate.toLocaleDateString();
    counterContainer.querySelector('.timeline-end').innerHTML = leftCountdown.targetDate.toLocaleDateString();

    let loop = true;
    const interval = setInterval( () => {
        loop = updateTimelineView(counterContainer, elapsedCountdown, leftCountdown);
        if(!loop) {
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
    let percentage, elapsed, left;

    if(leftCountdown.targetDate.getTime() < leftCountdown.actualDate.getTime()){//data final já passou, ou tempo esgotado
        console.log('data final ja passou / tempo esgotado!');
        counterContainer.classList.add('ended');
        counterContainer.querySelector('.timeelapsed-tooltip .timeline-percent').innerHTML = '100.0000000000000000%';
        counterContainer.querySelector('.timeleft-tooltip .timeline-percent').innerHTML = '-0.0000000000000000%';
        const elapsed = Timer.dateDiff(leftCountdown.targetDate, elapsedCountdown.targetDate).toDays();
        counterContainer.querySelector('.timeelapsed-tooltip .timeline-days').innerHTML =  elapsed.days + 'd ' + elapsed.hours + ':' + elapsed.minutes + ':' + elapsed.seconds;
        counterContainer.querySelector('.timeleft-tooltip .timeline-days').innerHTML =  '-0d';
        counterContainer.querySelector('.timeline-bar').style.width = '100%';
        return false;
    }
    
    if(elapsedCountdown.actualDate.getTime() < elapsedCountdown.targetDate.getTime()){//data inicial ainda não chegou
        console.log('data inicial não chegou');
        counterContainer.classList.add('ended');
        counterContainer.querySelector('.timeelapsed-tooltip .timeline-percent').innerHTML = '0.0000000000000000%';
        counterContainer.querySelector('.timeleft-tooltip .timeline-percent').innerHTML = '-100.0000000000000000%';
        counterContainer.querySelector('.timeelapsed-tooltip .timeline-days').innerHTML = '0d';
        const left = Timer.dateDiff(leftCountdown.targetDate, elapsedCountdown.targetDate).toDays();
        counterContainer.querySelector('.timeleft-tooltip .timeline-days').innerHTML =  '-' + left.days + 'd ' + left.hours + ':' + left.minutes + ':' + left.seconds;
        counterContainer.querySelector('.timeline-bar').style.width = '0%';
        return false;
    }

    percentage = elapsedCountdown.timestamp.milliseconds;
    percentage /= Timer.dateDiff(leftCountdown.targetDate, elapsedCountdown.targetDate).milliseconds;
    percentage *=100;
    
    elapsed = elapsedCountdown.timestamp.toDays();
    left = leftCountdown.timestamp.toDays();
    
    counterContainer.querySelector('.timeelapsed-tooltip .timeline-percent').innerHTML = percentage + '%';
    counterContainer.querySelector('.timeleft-tooltip .timeline-percent').innerHTML = '-' + (100 - percentage) + '%';
    counterContainer.querySelector('.timeelapsed-tooltip .timeline-days').innerHTML = elapsed.days + 'd ' + elapsed.hours + ':' + elapsed.minutes + ':' + elapsed.seconds;
    counterContainer.querySelector('.timeleft-tooltip .timeline-days').innerHTML =  '-' + left.days + 'd ' + left.hours + ':' + left.minutes + ':' + left.seconds;
    counterContainer.querySelector('.timeline-bar').style.width = percentage.toFixed(2) + '%';//TODO animar a porcentagem  e o número quando a página carregar pela primeira vez

    return true;
}