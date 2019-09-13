import Ciklo from './modules/ciklo.js';
import PixelGrid from './modules/pixelGrid.js';
import UrlHelper from './utils/urlHelper.js';

const urlHelper = new UrlHelper();
const { startDate, endDate } = urlHelper.params;

const timer = new Ciklo(startDate, endDate);
const pixelGrid = new PixelGrid(document.querySelector('#pixel-grid'), timer);

pixelGrid.init();
