import Ciklo from "./Ciklo";

// TODO: refatorar estatísticas para usar o toString()
export default class Statistics {
  constructor(container, options) {
    this.container = container;
    this.timer = new Ciklo(options);
  }

  /**
 * Atualiza as estatísticas para nerds a cada segundo
 */
  init() {
    const toDays = this.timer.elapsed.toDays();

    this.container.innerHTML = `{
    _timestamp: ${this.timer.elapsed._timestamp}, 
    days: ${this.timer.elapsed.days}, 
    hours: ${this.timer.elapsed.hours}, 
    minutes: ${this.timer.elapsed.minutes}, 
    seconds: ${this.timer.elapsed.seconds},
    extended: {days: ${toDays.days}, hours: ${toDays.hours}, minutes: ${toDays.minutes}, seconds: ${toDays.seconds}}
  }`;

    const interval = setInterval(() => {
      let { elapsed } = this.timer;
      let left = this.timer.remaining;

      if (this.timer.endDate.getTime() < this.timer.actualDate.getTime()) {
      // data final já passou, ou tempo esgotado
        clearInterval(interval);
        elapsed = this.timer.total;
        left = null;
      } else if (this.timer.actualDate.getTime() < this.timer.startDate.getTime()) {
      // data inicial ainda não chegou
        clearInterval(interval);
        left = this.timer.total;
        elapsed = null;
      }

      if (elapsed != null) {
        const elapsedDays = elapsed.toDays();
        this.container.innerHTML = `elapsed \n{
        _timestamp: ${elapsed._timestamp}, 
        days: ${elapsed.days}, 
        hours: ${elapsed.hours}, 
        minutes: ${elapsed.minutes}, 
        seconds: ${elapsed.seconds},
        extended: {
          days: ${elapsedDays.days}, 
          hours: ${elapsedDays.hours}, 
          minutes: ${elapsedDays.minutes}, 
          seconds: ${elapsedDays.seconds}
        }\n}\n\n`;
      }
      if (left != null) {
        const leftDays = left.toDays();
        this.container.innerHTML
        += `remaining \n{
        _timestamp: ${left._timestamp}, 
        days: ${left.days}, 
        hours: ${left.hours}, 
        minutes: ${left.minutes}, 
        seconds: ${left.seconds},
        extended: {
          days: ${leftDays.days}, 
          hours: ${leftDays.hours}, 
          minutes: ${leftDays.minutes}, 
          seconds: ${leftDays.seconds}
        }\n}`;
      }
      this.container.innerHTML += `\nwindow: ${window.innerWidth } x ${window.innerHeight}`;
    }, 1000);
  }
}
