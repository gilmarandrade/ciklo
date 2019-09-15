import Countdown from '../../src/js/modules/Countdown';
import UrlHelper from '../../src/js/utils/UrlHelper';
import ProgressBar from '../../src/js/modules/ProgressBar';
import PixelGrid from '../../src/js/modules/PixelGrid';
import Statistics from '../../src/js/modules/Statistics';

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
