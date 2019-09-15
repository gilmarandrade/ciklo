import Ciklo from './Ciklo';

export default class PixelGrid {
  constructor(container, options) {
    this.container = container;
    this.timer = new Ciklo(options);
  }

  /**
 * Pixel grid dos dias decorridos e restantes
 */
  // TODO: refatorar este metodo
  init() {
    this.build();
    const gridContainer = this.container.querySelector('.pixelgrid__grid');

    let elapsed = this.timer.elapsed.days;
    let left = this.timer.remaining.days;

    if (this.timer.endDate.getTime() < this.timer.actualDate.getTime()) {
      // data final já passou, ou tempo esgotado
      console.log('data final ja passou / tempo esgotado!');
      elapsed = this.timer.total.days;
      left = 0;
      this.container.classList.add('pixel-grid--ended');
    }

    if (this.timer.actualDate.getTime() < this.timer.startDate.getTime()) {
      // data inicial ainda não chegou
      console.log('data inicial não chegou');
      elapsed = 0;
      left = this.timer.total.days;
    }

    this.container.querySelector('.pixel-grid__start-date').innerHTML = this.timer.startDate.toLocaleDateString();
    this.container.querySelector('.pixel-grid__end-date').innerHTML = this.timer.endDate.toLocaleDateString();

    for (let i = 0; i < elapsed; i += 1) {
      const ele = document.createElement('div');
      ele.classList.add('pixel-grid__pixel', 'pixel-grid__pixel--elapsed');
      gridContainer.append(ele);
    }


    const ele = document.createElement('div');
    ele.classList.add('pixel-grid__pixel');
    if (elapsed !== 0) {
      ele.classList.add('pixel-grid__pixel--today');
    }
    gridContainer.append(ele);

    for (let i = 0; i < left - 1; i += 1) {
      const element = document.createElement('div');
      element.classList.add('pixel-grid__pixel');
      gridContainer.append(element);
    }
  }

  build() {
    this.container.classList.add('pixel-grid');
    const start = document.createElement('span');
    start.classList.add('pixel-grid__start-date');
    this.container.appendChild(start);

    const grid = document.createElement('div');
    grid.classList.add('pixelgrid__grid');
    this.container.appendChild(grid);

    const end = document.createElement('span');
    end.classList.add('pixel-grid__end-date');
    this.container.appendChild(end);
  }
}
