import PixelGrid from './modules/PixelGrid.js';
import UrlHelper from './utils/UrlHelper.js';

const urlHelper = new UrlHelper();
const { startDate, endDate } = urlHelper.params;

const pixelGrid = new PixelGrid(
  document.querySelector('#pixel-grid'),
  {
    startDate,
    endDate,
  },
);

pixelGrid.init();
