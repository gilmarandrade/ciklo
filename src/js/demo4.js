import Ciklo from './modules/ciklo.js';
import UrlHelper from './utils/urlHelper.js';
import Timeline from './modules/timeline.js';

const urlHelper = new UrlHelper();
const { startDate, endDate } = urlHelper.params;

const timer = new Ciklo(startDate, endDate);
const timeline = new Timeline(document.querySelector('#timeline'), timer);

timeline.init();
