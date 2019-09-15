// TODO: fazer rebuild do código atualizado
import Ciklo from '../../src/js/modules/Ciklo.js';
import Countdown from '../../src/js/modules/Countdown.js';
import UrlHelper from '../../src/js/utils/UrlHelper.js';
import ProgressBar from '../../src/js/modules/ProgressBar.js';
import PixelGrid from '../../src/js/modules/PixelGrid.js';
import Statistics from '../../src/js/modules/Statistics.js';

const urlHelper = new UrlHelper();
const { startDate, endDate } = urlHelper.params;

const timer = new Ciklo(startDate, endDate);

const countdown = new Countdown(document.querySelector('#timer'), timer);
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
