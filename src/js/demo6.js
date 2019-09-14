import Ciklo from './modules/Ciklo.js';
import Countdown from './modules/Countdown.js';
import UrlHelper from './utils/UrlHelper.js';
import ProgressBar from './modules/ProgressBar.js';
import PixelGrid from './modules/PixelGrid.js';
import Statistics from './modules/Statistics.js';

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
