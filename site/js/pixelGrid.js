import PixelGrid from '../../src/js/modules/PixelGrid';
import UrlHelper from '../../src/js/utils/UrlHelper';

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
