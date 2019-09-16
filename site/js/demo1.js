import Ciklo from '../../src/js/modules/Ciklo';
import Countdown from '../../src/js/modules/Countdown';
import Chronometer from '../../src/js/modules/Chronometer';
import '../../src/css/style.css';

function initTimer() {
  // TODO essa lógica dá erro se o script for exeutado entre o natal e o ano novo
  const timer = new Ciklo(
    `24 December ${(new Date()).getFullYear() - 1} 23:59:59 GMT-0300`,
    `25 December ${(new Date()).getFullYear()} 00:00:00 GMT-0300`,
  );

  const countdown = new Countdown(document.querySelector('#regressive'), timer);
  countdown.init();

  const chronometer = new Chronometer(document.querySelector('#progressive'), timer);
  chronometer.init();
}

(function () {
  initTimer();
}());
