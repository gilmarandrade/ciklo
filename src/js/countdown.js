import Ciklo from './modules/Ciklo.js';
import Countdown from './modules/Countdown.js';


const ciklo = new Ciklo(
  `01 January ${(new Date()).getFullYear() + 1} 00:00:00 GMT-0300`,
);

const countdown = new Countdown(document.querySelector('#regressive'), ciklo);
countdown.init();
