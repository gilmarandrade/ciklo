import Ciklo from "./Ciklo.js";

// TODO renomear progressBar para progress bar
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
      this.container.classList.add('ended');
      this.container.querySelector('.tooltip .left .progressBar-percent').innerHTML = '100.0000000000000000%';
      this.container.querySelector('.tooltip .right .progressBar-percent').innerHTML = '-0.0000000000000000%';
      const elapsed = this.timer.total.toDays();
      this.container.querySelector('.tooltip .left .progressBar-days').innerHTML = `${elapsed.days}d ${elapsed.hours}:${elapsed.minutes}:${elapsed.seconds}`;
      this.container.querySelector('.tooltip .right .progressBar-days').innerHTML = '-0d';
      this.container.querySelector('.progressBar-bar').style.width = '100%';

      this.container.querySelector('.tooltip .left').style.flexGrow = 100;
      this.container.querySelector('.tooltip .right').style.flexGrow = 0;
      this.container.querySelector('.tooltip .left').style.flexBasis = '100%';
      this.container.querySelector('.tooltip .right').style.flexBasis = '0%';
      return false;
    }

    if (this.timer.actualDate.getTime() < this.timer.startDate.getTime()) { // data inicial ainda não chegou
      console.log('data inicial não chegou');
      this.container.classList.add('ended');
      this.container.querySelector('.tooltip .left .progressBar-percent').innerHTML = '0.0000000000000000%';
      this.container.querySelector('.tooltip .right .progressBar-percent').innerHTML = '-100.0000000000000000%';
      this.container.querySelector('.tooltip .left .progressBar-days').innerHTML = '0d';
      const left = this.timer.total.toDays();
      this.container.querySelector('.tooltip .right .progressBar-days').innerHTML = `-${left.days}d ${left.hours}:${left.minutes}:${left.seconds}`;
      this.container.querySelector('.progressBar-bar').style.width = '0%';

      this.container.querySelector('.tooltip .left').style.flexGrow = 0;
      this.container.querySelector('.tooltip .right').style.flexGrow = 100;
      this.container.querySelector('.tooltip .left').style.flexBasis = '0%';
      this.container.querySelector('.tooltip .right').style.flexBasis = '100%';
      return false;
    }

    percentage = this.timer.elapsed.milliseconds;
    percentage /= this.timer.total.milliseconds;
    percentage *= 100;

    elapsed = this.timer.elapsed.toDays();
    left = this.timer.remaining.toDays();

    this.container.querySelector('.tooltip .left .progressBar-percent').innerHTML = `${percentage}%`;
    this.container.querySelector('.tooltip .right .progressBar-percent').innerHTML = `-${100 - percentage}%`;
    this.container.querySelector('.tooltip .left .progressBar-days').innerHTML = `${elapsed.days}d ${elapsed.hours}:${elapsed.minutes}:${elapsed.seconds}`;
    this.container.querySelector('.tooltip .right .progressBar-days').innerHTML = `-${left.days}d ${left.hours}:${left.minutes}:${left.seconds}`;
    this.container.querySelector('.progressBar-bar').style.width = `${percentage.toFixed(2)}%`;// TODO animar a porcentagem  e o número quando a página carregar pela primeira vez

    this.container.querySelector('.tooltip .left').style.flexGrow = percentage.toFixed(0);
    this.container.querySelector('.tooltip .right').style.flexGrow = 100 - percentage.toFixed(0);
    this.container.querySelector('.tooltip .left').style.flexBasis = `${percentage.toFixed(0)}%`;
    this.container.querySelector('.tooltip .right').style.flexBasis = `${100 - percentage.toFixed(0)}%`;
    return true;
  }

  /**
 * Barra de progresso do tempo decorrido e tempo restante
 * Atualiza a cada segundo
 */
  init() {
    this.build();
    this.container.querySelector('.progressBar-start').innerHTML = this.timer.startDate.toLocaleDateString();
    this.container.querySelector('.progressBar-end').innerHTML = this.timer.endDate.toLocaleDateString();

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
    tooltip.classList.add('tooltip');
    this.container.appendChild(tooltip);

    const left = document.createElement('span');
    left.classList.add('left');
    tooltip.appendChild(left);

    const percentLeft = document.createElement('span');
    percentLeft.classList.add('progressBar-percent');
    left.appendChild(percentLeft);

    const daysLeft = document.createElement('h2');
    daysLeft.classList.add('progressBar-days');
    left.appendChild(daysLeft);

    const decorridos = document.createElement('span');
    left.appendChild(decorridos);
    const text = document.createTextNode('decorridos');
    decorridos.appendChild(text);


    const right = document.createElement('span');
    right.classList.add('right');
    tooltip.appendChild(right);

    const percentRight = document.createElement('span');
    percentRight.classList.add('progressBar-percent');
    right.appendChild(percentRight);

    const daysRight = document.createElement('h2');
    daysRight.classList.add('progressBar-days');
    right.appendChild(daysRight);

    const restantes = document.createElement('span');
    right.appendChild(restantes);
    const text2 = document.createTextNode('restantes');
    restantes.appendChild(text2);
  }

  createBar() {
    const track = document.createElement('div');
    track.classList.add('progressBar-track');
    this.container.appendChild(track);

    const bar = document.createElement('div');
    bar.classList.add('progressBar-bar', 'stripes');
    track.appendChild(bar);

    const hint = document.createElement('div');
    hint.classList.add('progressBar-hint');
    this.container.appendChild(hint);

    const start = document.createElement('div');
    start.classList.add('progressBar-start');
    hint.appendChild(start);

    const end = document.createElement('div');
    end.classList.add('progressBar-end');
    hint.appendChild(end);
  }

  // FIXME: todas as criações de componente dão erro se o container for null
  build() {
    this.createTooltip();
    this.createBar();
  }
}
