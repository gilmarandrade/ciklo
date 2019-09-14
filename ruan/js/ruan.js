import Ciklo from '../../src/js/modules/ciklo.js';
import Countdown from '../../src/js/modules/countdown.js';
import UrlHelper from '../../src/js/utils/urlHelper.js';
import ProgressBar from '../../src/js/modules/progressBar.js';
import PixelGrid from '../../src/js/modules/pixelGrid.js';
import Statistics from '../../src/js/modules/statistics.js';

const urlHelper = new UrlHelper();
const { startDate, endDate } = urlHelper.params;

const timer = new Ciklo(startDate, endDate);

// TODO construir o HTML com javascript
const countdown = new Countdown(document.querySelector('#timer'), timer);
// TODO renomear progressBar para ProgressBar
const progressBar = new ProgressBar(document.querySelector('#progressBar'), timer);
const pixelGrid = new PixelGrid(document.querySelector('#pixel-grid'), timer);
const statistics = new Statistics(document.querySelector('#statistics'), timer);


// data inicio menor que data fim
if (timer.startDate && timer.endDate && timer.startDate.getTime() < timer.endDate.getTime()) {
  console.log('init');
  countdown.init();
  progressBar.init();
  pixelGrid.init();
  statistics.init();
}
