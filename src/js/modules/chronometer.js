export default class Chronometer {
  constructor(container, timer) {
    this.container = container;
    // TODO o ciklo poderia ser criado internamente
    this.timer = timer;
  }

  init() {
    this.build();
    this.boxes = {};
    this.boxes.seconds = this.container.querySelector('.countdown-seconds');
    this.boxes.minutes = this.container.querySelector('.countdown-minutes');
    this.boxes.hours = this.container.querySelector('.countdown-hours');
    this.boxes.days = this.container.querySelector('.countdown-days');

    // Anima cada campo do contador na tela (dia, hora, minuto e segundo) a cada segundo
    setInterval(() => {
      const time = this.timer.elapsed.toDays();

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
    this.createCountdownBox('countdown-days');
    this.createDivider();
    this.createCountdownBox('countdown-hours');
    this.createDivider();
    this.createCountdownBox('countdown-minutes');
    this.createDivider();
    this.createCountdownBox('countdown-seconds');
  }
}
