import UrlHelper from '../../src/js/utils/UrlHelper';
import ProgressBar from '../../src/js/modules/ProgressBar';
import '../../src/css/style.css';

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
