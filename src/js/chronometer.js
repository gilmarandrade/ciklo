import Ciklo from './modules/Ciklo.js';
import Chronometer from './modules/Chronometer.js';


const ciklo = new Ciklo(
  `01 January ${(new Date()).getFullYear()} 00:00:00 GMT-0300`,
);

const chronometer = new Chronometer(document.querySelector('#progressive'), ciklo);
chronometer.init();
