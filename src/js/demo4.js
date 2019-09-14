import Ciklo from './modules/Ciklo.js';
import UrlHelper from './utils/UrlHelper.js';
import ProgressBar from './modules/ProgressBar.js';

const urlHelper = new UrlHelper();
const { startDate, endDate } = urlHelper.params;

const timer = new Ciklo(startDate, endDate);
const progressBar = new ProgressBar(document.querySelector('#progressBar'), timer);

progressBar.init();
