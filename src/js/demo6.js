import Ciklo from './modules/ciklo.js';
import Countdown from './modules/countdown.js';
import UrlHelper from './utils/urlHelper.js';
import Timeline from './modules/timeline.js';
import PixelGrid from './modules/pixelGrid.js';
import Statistics from './modules/statistics.js';

const urlHelper = new UrlHelper();
const { startDate, endDate } = urlHelper.params;

const timer = new Ciklo(startDate, endDate);

// TODO construir o HTML com javascript
const countdown = new Countdown(document.querySelector('#timer'), timer);
// TODO renomear timeline para ProgressBar
const timeline = new Timeline(document.querySelector('#timeline'), timer);
const pixelGrid = new PixelGrid(document.querySelector('#pixel-grid'), timer);
const statistics = new Statistics(document.querySelector('#statistics'), timer);


// data inicio menor que data fim
if (timer.startDate && timer.endDate && timer.startDate.getTime() < timer.endDate.getTime()) {
  console.log('init');
  countdown.init();
  timeline.init();
  pixelGrid.init();
  statistics.init();
}
