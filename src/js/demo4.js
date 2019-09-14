import Ciklo from './modules/ciklo.js';
import UrlHelper from './utils/urlHelper.js';
import ProgressBar from './modules/timeline.js';

const urlHelper = new UrlHelper();
const { startDate, endDate } = urlHelper.params;

const timer = new Ciklo(startDate, endDate);
const timeline = new ProgressBar(document.querySelector('#timeline'), timer);

timeline.init();
