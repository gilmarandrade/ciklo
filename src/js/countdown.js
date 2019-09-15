import Countdown from './modules/Countdown.js';

const countdown = new Countdown(
  document.querySelector('#regressive'), 
  {
    endDate: `01 January ${(new Date()).getFullYear() + 1} 00:00:00 GMT-0300`,
  },
);
countdown.init();
