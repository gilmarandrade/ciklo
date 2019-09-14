import Ciklo from './modules/ciklo.js';
import UrlHelper from './utils/urlHelper.js';
import ProgressBar from './modules/progressBar.js';

const urlHelper = new UrlHelper();
const { startDate, endDate } = urlHelper.params;

const timer = new Ciklo(startDate, endDate);
const progressBar = new ProgressBar(document.querySelector('#progressBar'), timer);

progressBar.init();
