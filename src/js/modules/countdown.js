export default class Countdown {
  constructor(container, timer) {
    this.counterContainer = container;
    this.timer = timer;
  }

  /**
 * Caso seja necessário, atualiza a tela com os novos dados do contador
 * @param {Element} counter Elemento html que exibirá o valor
 * @param {number} indexNew Valor a ser exibido no contador
 */
  updateCounterView(counter, indexNew) {
    if (+counter.getAttribute('data-time') !== indexNew) {
      counter.setAttribute('data-time', indexNew);
      counter.querySelector('span:first-child').innerText = String(indexNew).padStart(2, '0');
      counter.classList.add('animate');

      setTimeout(() => {
        counter.querySelector('span:last-child').innerText = String(indexNew).padStart(2, '0');
        counter.classList.remove('animate');
      }, 700);
    }
  }

  /**
 * Timer regressivo
 * Atualiza cada campo do contador regressivo (dia, hora, minuto e segundo) a cada segundo
 */
  init() {
    const counterSeconds = this.counterContainer.querySelector('.countdown-seconds');
    const counterMinutes = this.counterContainer.querySelector('.countdown-minutes');
    const counterHours = this.counterContainer.querySelector('.countdown-hours');
    const counterDays = this.counterContainer.querySelector('.countdown-days');

    this.counterContainer.classList.add('countdown__regressive');

    const interval = setInterval(() => {
      const time = this.timer.remaining.toDays();
      this.updateCounterView(counterSeconds, time.seconds);
      this.updateCounterView(counterMinutes, time.minutes);
      this.updateCounterView(counterHours, time.hours);
      this.updateCounterView(counterDays, time.days);

      if (this.timer.remaining.milliseconds < 1000) { // fim do tempo
        this.counterContainer.classList.add('ended');
        // TODO verificar se isso ainda funciona
        // comente essa linha para que o timer continue a contagem como um timer progressivo
        clearInterval(interval);
      }
    }, 1000);
  }
}
