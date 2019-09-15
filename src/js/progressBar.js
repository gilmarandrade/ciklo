import UrlHelper from './utils/UrlHelper.js';
import ProgressBar from './modules/ProgressBar.js';

const urlHelper = new UrlHelper();
const { startDate, endDate } = urlHelper.params;

const progressBar = new ProgressBar(
  document.querySelector('#progressBar'),
  {
    startDate,
    endDate,
  },
);

progressBar.init();
