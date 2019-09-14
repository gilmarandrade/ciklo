import Ciklo from './modules/Ciklo.js';
import PixelGrid from './modules/PixelGrid.js';
import UrlHelper from './utils/UrlHelper.js';

const urlHelper = new UrlHelper();
const { startDate, endDate } = urlHelper.params;
// startDate=10 September 2019 00:00:00 GMT-0300&endDate=31 September 2019 00:00:00 GMT-0300

const timer = new Ciklo(startDate, endDate);
const pixelGrid = new PixelGrid(document.querySelector('#pixel-grid'), timer);

pixelGrid.init();
