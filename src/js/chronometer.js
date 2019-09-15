import Chronometer from './modules/Chronometer.js';

const chronometer = new Chronometer(
  document.querySelector('#progressive'),
  {
    startDate: `01 January ${(new Date()).getFullYear()} 00:00:00 GMT-0300`,
  },
);
chronometer.init();
