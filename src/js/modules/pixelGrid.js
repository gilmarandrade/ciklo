import Ciklo from "./Ciklo.js";

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
    const gridContainer = this.container.querySelector('.grid');

    let elapsed = this.timer.elapsed.days;
    let left = this.timer.remaining.days;

    if (this.timer.endDate.getTime() < this.timer.actualDate.getTime()) { 
      // data final já passou, ou tempo esgotado
      console.log('data final ja passou / tempo esgotado!');
      elapsed = this.timer.total.days;
      left = 0;
      gridContainer.classList.add('ended');
    }

    if (this.timer.actualDate.getTime() < this.timer.startDate.getTime()) { 
      // data inicial ainda não chegou
      console.log('data inicial não chegou');
      elapsed = 0;
      left = this.timer.total.days;
    }

    this.container.querySelector('.progressBar-start').innerHTML = this.timer.startDate.toLocaleDateString();
    this.container.querySelector('.progressBar-end').innerHTML = this.timer.endDate.toLocaleDateString();

    for (let i = 0; i < elapsed; i++) {
      const ele = document.createElement('div');
      ele.classList.add('pixel', 'active');
      gridContainer.append(ele);
    }


    const ele = document.createElement('div');
    ele.classList.add('pixel');
    if (elapsed != 0) {
      ele.classList.add('today');
    }
    gridContainer.append(ele);

    for (let i = 0; i < left - 1; i++) {
      const ele = document.createElement('div');
      ele.classList.add('pixel');
      gridContainer.append(ele);
    }
  }

  build() {
    const start = document.createElement('span');
    start.classList.add('progressBar-start');
    this.container.appendChild(start);

    const grid = document.createElement('div');
    grid.classList.add('grid');
    this.container.appendChild(grid);

    const end = document.createElement('span');
    end.classList.add('progressBar-end');
    this.container.appendChild(end);
  }
}
