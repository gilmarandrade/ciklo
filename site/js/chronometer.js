import Chronometer from '../../src/js/modules/Chronometer';
import '../../src/css/style.css';

const chronometer = new Chronometer(
  document.querySelector('#progressive'),
  {
    startDate: `01 January ${(new Date()).getFullYear()} 00:00:00 GMT-0300`,
  },
);
chronometer.init();
