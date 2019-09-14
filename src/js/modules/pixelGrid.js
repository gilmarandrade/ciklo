export default class PixelGrid {
  constructor(counterContainer, timer) {
    this.counterContainer = counterContainer;
    this.timer = timer;
  }

  /**
 * Pixel grid dos dias decorridos e restantes
 */
  init() {
    const gridContainer = this.counterContainer.querySelector('.grid');

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

    this.counterContainer.querySelector('.progressBar-start').innerHTML = this.timer.startDate.toLocaleDateString();
    this.counterContainer.querySelector('.progressBar-end').innerHTML = this.timer.endDate.toLocaleDateString();

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
}
