// TODO renomear progressBar para progress bar
export default class ProgressBar {
  constructor(counterContainer, timer) {
    this.counterContainer = counterContainer;
    this.timer = timer;
  }

  /**
 * Caso seja necessário, atualiza a tela com os novos dados do contador
 * @param {Element} counterContainer Elemento html que contém a linha do tempo
 * @param {Timer} timer contador progressivo
 * @returns Retorna true para continuar a contagem, e false para parar
 */
  updateProgressBarView() {
    let percentage; let elapsed; let left;

    if (this.timer.endDate.getTime() < this.timer.actualDate.getTime()) { // data final já passou, ou tempo esgotado
      console.log('data final ja passou / tempo esgotado!');
      this.counterContainer.classList.add('ended');
      this.counterContainer.querySelector('.tooltip .left .progressBar-percent').innerHTML = '100.0000000000000000%';
      this.counterContainer.querySelector('.tooltip .right .progressBar-percent').innerHTML = '-0.0000000000000000%';
      const elapsed = this.timer.total.toDays();
      this.counterContainer.querySelector('.tooltip .left .progressBar-days').innerHTML = `${elapsed.days}d ${elapsed.hours}:${elapsed.minutes}:${elapsed.seconds}`;
      this.counterContainer.querySelector('.tooltip .right .progressBar-days').innerHTML = '-0d';
      this.counterContainer.querySelector('.progressBar-bar').style.width = '100%';

      this.counterContainer.querySelector('.tooltip .left').style.flexGrow = 100;
      this.counterContainer.querySelector('.tooltip .right').style.flexGrow = 0;
      this.counterContainer.querySelector('.tooltip .left').style.flexBasis = '100%';
      this.counterContainer.querySelector('.tooltip .right').style.flexBasis = '0%';
      return false;
    }

    if (this.timer.actualDate.getTime() < this.timer.startDate.getTime()) { // data inicial ainda não chegou
      console.log('data inicial não chegou');
      this.counterContainer.classList.add('ended');
      this.counterContainer.querySelector('.tooltip .left .progressBar-percent').innerHTML = '0.0000000000000000%';
      this.counterContainer.querySelector('.tooltip .right .progressBar-percent').innerHTML = '-100.0000000000000000%';
      this.counterContainer.querySelector('.tooltip .left .progressBar-days').innerHTML = '0d';
      const left = this.timer.total.toDays();
      this.counterContainer.querySelector('.tooltip .right .progressBar-days').innerHTML = `-${left.days}d ${left.hours}:${left.minutes}:${left.seconds}`;
      this.counterContainer.querySelector('.progressBar-bar').style.width = '0%';

      this.counterContainer.querySelector('.tooltip .left').style.flexGrow = 0;
      this.counterContainer.querySelector('.tooltip .right').style.flexGrow = 100;
      this.counterContainer.querySelector('.tooltip .left').style.flexBasis = '0%';
      this.counterContainer.querySelector('.tooltip .right').style.flexBasis = '100%';
      return false;
    }

    percentage = this.timer.elapsed.milliseconds;
    percentage /= this.timer.total.milliseconds;
    percentage *= 100;

    elapsed = this.timer.elapsed.toDays();
    left = this.timer.remaining.toDays();

    this.counterContainer.querySelector('.tooltip .left .progressBar-percent').innerHTML = `${percentage}%`;
    this.counterContainer.querySelector('.tooltip .right .progressBar-percent').innerHTML = `-${100 - percentage}%`;
    this.counterContainer.querySelector('.tooltip .left .progressBar-days').innerHTML = `${elapsed.days}d ${elapsed.hours}:${elapsed.minutes}:${elapsed.seconds}`;
    this.counterContainer.querySelector('.tooltip .right .progressBar-days').innerHTML = `-${left.days}d ${left.hours}:${left.minutes}:${left.seconds}`;
    this.counterContainer.querySelector('.progressBar-bar').style.width = `${percentage.toFixed(2)}%`;// TODO animar a porcentagem  e o número quando a página carregar pela primeira vez

    this.counterContainer.querySelector('.tooltip .left').style.flexGrow = percentage.toFixed(0);
    this.counterContainer.querySelector('.tooltip .right').style.flexGrow = 100 - percentage.toFixed(0);
    this.counterContainer.querySelector('.tooltip .left').style.flexBasis = `${percentage.toFixed(0)}%`;
    this.counterContainer.querySelector('.tooltip .right').style.flexBasis = `${100 - percentage.toFixed(0)}%`;
    return true;
  }

  /**
 * Barra de progresso do tempo decorrido e tempo restante
 * Atualiza a cada segundo
 */
  init() {
    const counterContainer = document.querySelector('#progressBar');
    counterContainer.querySelector('.progressBar-start').innerHTML = this.timer.startDate.toLocaleDateString();
    counterContainer.querySelector('.progressBar-end').innerHTML = this.timer.endDate.toLocaleDateString();

    let loop = true;
    const interval = setInterval(() => {
      loop = this.updateProgressBarView();
      if (!loop) {
        clearInterval(interval);
      }
    }, 1000);
  }
}
