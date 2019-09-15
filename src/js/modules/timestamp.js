/**
 * Representa um intervalo de tempo entre duas datas
 *
 * Classe utilitária para facilitar a conversão de intervalos (em milissegundos)
 * para outros formatos (como dias, horas, minutos e segundos).
 */
export default class Timestamp {
  /**
   * Recebe um timestamp (milissegundos)
   * @param {number} timestamp representação numérica do intervalo (em milissegundos)
   */
  constructor(timestamp) {
    this._timestamp = timestamp;
    return this;
  }

  /**
   * @returns {number} Retorna o timestamp em milissegundos
   */
  get milliseconds() {
    return this._timestamp;
  }

  /**
   * @returns {number} Retorna o timestamp arredondado para dias
   */
  get days() {
    return Math.floor(this.milliseconds / (24 * 60 * 60 * 1000));
  }

  /**
   * @returns {number} Retorna o timestamp arredondado para horas
   */
  get hours() {
    return Math.floor(this.milliseconds / (60 * 60 * 1000));
  }

  /**
   * @returns {number} Retorna o timestamp arrendondado para minutos
   */
  get minutes() {
    return Math.floor(this.milliseconds / (60 * 1000));
  }

  /**
   * @returns {number} Retorna o timestamp arredondado para segundos
   */
  get seconds() {
    return Math.floor(this.milliseconds / 1000);
  }

  /**
   * @returns {Object} Converte o timestamp exatamente em dias, horas, minutos e segundos
   */
  toDays() {
    const { days } = this;
    const hours = this.hours % 24;
    const minutes = this.minutes % 60;
    const seconds = this.seconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  /**
   * @returns {Object} Converte o timestamp exatamente em horas, minutos e segundos
   */
  toHours() {
    const days = 0;
    const { hours } = this;
    const minutes = this.minutes % 60;
    const seconds = this.seconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  /**
   * @returns {Object} Converte o timestamp exatamente em minutos e segundos
   */
  toMinutes() {
    const days = 0;
    const hours = 0;
    const { minutes } = this;
    const seconds = this.seconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  /**
   * @returns {Object} Converte o timestamp exatamente em segundos
   */
  toSeconds() {
    const days = 0;
    const hours = 0;
    const minutes = 0;
    const { seconds } = this;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }
}
