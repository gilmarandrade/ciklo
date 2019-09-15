import Countdown from './modules/Countdown.js';
import UrlHelper from './utils/UrlHelper.js';
import ProgressBar from './modules/ProgressBar.js';
import PixelGrid from './modules/PixelGrid.js';
import Statistics from './modules/Statistics.js';

const urlHelper = new UrlHelper();
const { startDate, endDate } = urlHelper.params;

const countdown = new Countdown(
  document.querySelector('#timer'),
  { endDate },
);
const progressBar = new ProgressBar(
  document.querySelector('#progressBar'),
  { startDate, endDate },
);
const pixelGrid = new PixelGrid(
  document.querySelector('#pixel-grid'),
  { startDate, endDate },
);
const statistics = new Statistics(
  document.querySelector('#statistics'),
  { startDate, endDate },
);

countdown.init();
progressBar.init();
pixelGrid.init();
statistics.init();
