export default class Chronometer {
  constructor(counterContainer, timer) {
    this.counterContainer = counterContainer;
    this.timer = timer;
  }

  /**
 * Caso seja necessário, atualiza a tela com os novos dados do contador
 * @param {Element} counter Elemento html que exibirá o valor
 * @param {number} indexNew Valor a ser exibido no contador
 */
  updateCounterView(counter, indexNew) {
    if (counter.getAttribute('data-time') != indexNew) {
      counter.setAttribute('data-time', indexNew);
      counter.querySelector('span:first-child').innerText = String(indexNew).padStart(2, '0');
      counter.classList.add('animate');

      setTimeout(() => {
        counter.querySelector('span:last-child').innerText = String(indexNew).padStart(2, '0');
        counter.classList.remove('animate');
      }, 700);
    }
  }

  init() {
    const counterSeconds = this.counterContainer.querySelector('.countdown-seconds');
    const counterMinutes = this.counterContainer.querySelector('.countdown-minutes');
    const counterHours = this.counterContainer.querySelector('.countdown-hours');
    const counterDays = this.counterContainer.querySelector('.countdown-days');
    /**
   * Atualiza cada campo do contador (dia, hora, minuto e segundo) a cada segundo
     */
    setInterval(() => {
      const time = this.timer.elapsed.toDays();
      this.updateCounterView(counterSeconds, time.seconds);
      this.updateCounterView(counterMinutes, time.minutes);
      this.updateCounterView(counterHours, time.hours);
      this.updateCounterView(counterDays, time.days);
    }, 1000);
  }
}
