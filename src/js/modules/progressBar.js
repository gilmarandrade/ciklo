import Ciklo from "./Ciklo";

// TODO renomear progress-bar para progress bar
export default class ProgressBar {
  constructor(container, options) {
    this.container = container;
    this.timer = new Ciklo(options);
  }

  /**
 * Caso seja necessário, atualiza a tela com os novos dados do contador
 * @param {Element} counterContainer Elemento html que contém a linha do tempo
 * @param {Timer} timer contador progressivo
 * @returns Retorna true para continuar a contagem, e false para parar
 */
  // FIXME: refatorar e otimizar este método
  updateProgressBarView() {
    let percentage; let elapsed; let left;

    if (this.timer.endDate.getTime() < this.timer.actualDate.getTime()) { // data final já passou, ou tempo esgotado
      console.log('data final ja passou / tempo esgotado!');
      this.container.classList.add('progress-bar--ended');
      this.container.querySelector('.progress-bar__clock-elapsed .progress-bar__percentage').innerHTML = '100.0000000000000000%';
      this.container.querySelector('.progress-bar__clock-remaining .progress-bar__percentage').innerHTML = '-0.0000000000000000%';
      const elapsed = this.timer.total.toDays();
      this.container.querySelector('.progress-bar__clock-elapsed .progress-bar__days').innerHTML = `${elapsed.days}d ${elapsed.hours}:${elapsed.minutes}:${elapsed.seconds}`;
      this.container.querySelector('.progress-bar__clock-remaining .progress-bar__days').innerHTML = '-0d';
      this.container.querySelector('.progress-bar__progression').style.width = '100%';

      this.container.querySelector('.progress-bar__clock-elapsed').style.flexGrow = 100;
      this.container.querySelector('.progress-bar__clock-remaining').style.flexGrow = 0;
      this.container.querySelector('.progress-bar__clock-elapsed').style.flexBasis = '100%';
      this.container.querySelector('.progress-bar__clock-remaining').style.flexBasis = '0%';
      return false;
    }

    if (this.timer.actualDate.getTime() < this.timer.startDate.getTime()) { // data inicial ainda não chegou
      console.log('data inicial não chegou');
      this.container.classList.add('progress-bar--ended');
      this.container.querySelector('.progress-bar__clock-elapsed .progress-bar__percentage').innerHTML = '0.0000000000000000%';
      this.container.querySelector('.progress-bar__clock-remaining .progress-bar__percentage').innerHTML = '-100.0000000000000000%';
      this.container.querySelector('.progress-bar__clock-elapsed .progress-bar__days').innerHTML = '0d';
      const left = this.timer.total.toDays();
      this.container.querySelector('.progress-bar__clock-remaining .progress-bar__days').innerHTML = `-${left.days}d ${left.hours}:${left.minutes}:${left.seconds}`;
      this.container.querySelector('.progress-bar__progression').style.width = '0%';

      this.container.querySelector('.progress-bar__clock-elapsed').style.flexGrow = 0;
      this.container.querySelector('.progress-bar__clock-remaining').style.flexGrow = 100;
      this.container.querySelector('.progress-bar__clock-elapsed').style.flexBasis = '0%';
      this.container.querySelector('.progress-bar__clock-remaining').style.flexBasis = '100%';
      return false;
    }

    percentage = this.timer.elapsed.milliseconds;
    percentage /= this.timer.total.milliseconds;
    percentage *= 100;

    elapsed = this.timer.elapsed.toDays();
    left = this.timer.remaining.toDays();

    this.container.querySelector('.progress-bar__clock--elapsed .progress-bar__percentage').innerHTML = `${percentage}%`;
    this.container.querySelector('.progress-bar__clock--remaining .progress-bar__percentage').innerHTML = `-${100 - percentage}%`;
    this.container.querySelector('.progress-bar__clock--elapsed .progress-bar__days').innerHTML = `${elapsed.days}d ${elapsed.hours}:${elapsed.minutes}:${elapsed.seconds}`;
    this.container.querySelector('.progress-bar__clock--remaining .progress-bar__days').innerHTML = `-${left.days}d ${left.hours}:${left.minutes}:${left.seconds}`;
    this.container.querySelector('.progress-bar__progression').style.width = `${percentage.toFixed(2)}%`;// TODO animar a porcentagem  e o número quando a página carregar pela primeira vez

    this.container.querySelector('.progress-bar__clock--elapsed').style.flexGrow = percentage.toFixed(0);
    this.container.querySelector('.progress-bar__clock--remaining').style.flexGrow = 100 - percentage.toFixed(0);
    this.container.querySelector('.progress-bar__clock--elapsed').style.flexBasis = `${percentage.toFixed(0)}%`;
    this.container.querySelector('.progress-bar__clock--remaining').style.flexBasis = `${100 - percentage.toFixed(0)}%`;
    return true;
  }

  /**
 * Barra de progresso do tempo decorrido e tempo restante
 * Atualiza a cada segundo
 */
  init() {
    this.build();
    this.container.querySelector('.progress-bar__start').innerHTML = this.timer.startDate.toLocaleDateString();
    this.container.querySelector('.progress-bar__end').innerHTML = this.timer.endDate.toLocaleDateString();

    let loop = true;
    const interval = setInterval(() => {
      loop = this.updateProgressBarView();
      if (!loop) {
        clearInterval(interval);
      }
    }, 1000);
  }

  createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.classList.add('progress-bar__clock-box');
    this.container.appendChild(tooltip);

    const left = document.createElement('span');
    left.classList.add('progress-bar__clock', 'progress-bar__clock--elapsed');
    tooltip.appendChild(left);

    const percentLeft = document.createElement('span');
    percentLeft.classList.add('progress-bar__percentage');
    left.appendChild(percentLeft);

    const daysLeft = document.createElement('h2');
    daysLeft.classList.add('progress-bar__days');
    left.appendChild(daysLeft);

    const decorridos = document.createElement('span');
    decorridos.classList.add('progress-bar__label');
    left.appendChild(decorridos);
    const text = document.createTextNode('decorridos');
    decorridos.appendChild(text);


    const right = document.createElement('span');
    right.classList.add('progress-bar__clock', 'progress-bar__clock--remaining');
    tooltip.appendChild(right);

    const percentRight = document.createElement('span');
    percentRight.classList.add('progress-bar__percentage');
    right.appendChild(percentRight);

    const daysRight = document.createElement('h2');
    daysRight.classList.add('progress-bar__days');
    right.appendChild(daysRight);

    const restantes = document.createElement('span');
    restantes.classList.add('progress-bar__label');
    right.appendChild(restantes);
    const text2 = document.createTextNode('restantes');
    restantes.appendChild(text2);
  }

  createBar() {
    const track = document.createElement('div');
    track.classList.add('progress-bar__full-bar');
    this.container.appendChild(track);

    const bar = document.createElement('div');
    bar.classList.add('progress-bar__progression', 'stripes');
    track.appendChild(bar);

    const hint = document.createElement('div');
    hint.classList.add('progress-bar__dates');
    this.container.appendChild(hint);

    const start = document.createElement('div');
    start.classList.add('progress-bar__start');
    hint.appendChild(start);

    const end = document.createElement('div');
    end.classList.add('progress-bar__end');
    hint.appendChild(end);
  }

  // FIXME: todas as criações de componente dão erro se o container for null
  build() {
    this.container.classList.add('progress-bar');
    this.createTooltip();
    this.createBar();
  }
}
