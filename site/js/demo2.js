import Ciklo from '../../src/js/modules/Ciklo';
import UrlHelper from '../../src/js/utils/UrlHelper';
import Chronometer from '../../src/js/modules/Chronometer';
import Countdown from '../../src/js/modules/Countdown';
import '../../src/css/style.css';

const urlHelper = new UrlHelper();
const { targetDate } = urlHelper.params;

/**
 * Recebe uma unica data de referencia e cria um chronometro ou contador regressivo
 * dependendo se a data já passou ou está no futuro
 */
function initTimer() {
  // inicializa o contador com a data recebina na query string, através do parâmetro targetDate
  const timer = new Ciklo(targetDate);// targetDate=25 December 2019 00:00:00 GMT-0300

  if (timer.startDate) {
    const chronometer = new Chronometer(document.querySelector('#timer'), timer);
    chronometer.init();
  } else if (timer.endDate) {
    const countdown = new Countdown(document.querySelector('#timer'), timer);
    countdown.init();
  }
}

(function () {
  initTimer();
}());