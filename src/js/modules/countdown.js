export default class Countdown {
  constructor(container, timer) {
    this.container = container;
    this.timer = timer;
  }

  /**
 * Timer regressivo
 * Atualiza cada campo do contador regressivo (dia, hora, minuto e segundo) a cada segundo
 */
  init() {
    this.build();
    this.boxes = {};
    this.boxes.seconds = this.container.querySelector('.countdown-seconds');
    this.boxes.minutes = this.container.querySelector('.countdown-minutes');
    this.boxes.hours = this.container.querySelector('.countdown-hours');
    this.boxes.days = this.container.querySelector('.countdown-days');

    // Anima cada campo do contador na tela (dia, hora, minuto e segundo) a cada segundo
    const interval = setInterval(() => {
      const time = this.timer.remaining.toDays();

      Object.entries(time).forEach(([unit, value]) => {
        if (+this.boxes[unit].getAttribute('data-time') !== value) {
          this.boxes[unit].setAttribute('data-time', value);
          this.boxes[unit].querySelector('span:first-child').innerText = String(value).padStart(2, '0');
          this.boxes[unit].classList.add('animate');

          setTimeout(() => {
            this.boxes[unit].querySelector('span:last-child').innerText = String(value).padStart(2, '0');
            this.boxes[unit].classList.remove('animate');
          }, 700);
        }
      });

      // fim do tempo
      if (this.timer.remaining.milliseconds < 1000) {
        this.container.classList.add('ended');
        // FIXME: verificar se isso ainda funciona
        // comente essa linha para que o timer continue a contagem como um timer progressivo
        clearInterval(interval);
      }
    }, 1000);
  }


  createCountdownBox(classNumber) {
    const countdownBox = document.createElement('div');
    countdownBox.classList.add('countdown-box', classNumber);
    countdownBox.setAttribute('data-time', 0);
    this.container.appendChild(countdownBox);

    const countdownTrack = document.createElement('div');
    countdownTrack.classList.add('countdown-track');
    countdownBox.appendChild(countdownTrack);

    const countdownNumber = document.createElement('div');
    countdownNumber.classList.add('countdown-number');
    countdownTrack.appendChild(countdownNumber);

    const span1 = document.createElement('span');
    countdownNumber.appendChild(span1);
    const conteudoSpan1 = document.createTextNode('00');
    span1.appendChild(conteudoSpan1);

    const span2 = document.createElement('span');
    countdownNumber.appendChild(span2);
    const conteudoSpan2 = document.createTextNode('00');
    span2.appendChild(conteudoSpan2);
  }

  createDivider() {
    const divider = document.createElement('div');
    divider.classList.add('countdown-divider');
    this.container.appendChild(divider);
  }

  build() {
    this.container.classList.add('countdown__regressive');
    this.createCountdownBox('countdown-days');
    this.createDivider();
    this.createCountdownBox('countdown-hours');
    this.createDivider();
    this.createCountdownBox('countdown-minutes');
    this.createDivider();
    this.createCountdownBox('countdown-seconds');
  }
}
