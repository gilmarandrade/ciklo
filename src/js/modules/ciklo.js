import Timestamp from './Timestamp';

/**
 * Calcula a diferença de tempo entre duas datas.
 * Particularmente, calcula a diferença entre uma data (futura ou passada) e a data atual
 */
export default class Ciklo {
  /**
   * Recebe um objeto com duas strings (startDate, endDate) representando
   * as datas de inicio e fim de um intervalo (não importa a ordem).
   * Pode receber apenas uma das strings, contendo uma data passada ou futura
   * em relação ao momento atual.
   * Se não receber nenhuma data, passa a considerar a data atual
   * @param {Object} options {starDate, endDate}
   */
  constructor({ startDate, endDate }) {
    if (startDate && endDate) {
      const date1 = new Date(startDate);
      const date2 = new Date(endDate);
      if (startDate && this.isValidDate(date1) && this.isValidDate(date2)) {
        if (date1.getTime() >= date2.getTime()) {
          this._startDate = date2;
          this._endDate = date1;
        } else {
          this._startDate = date1;
          this._endDate = date2;
        }
      }
    } else if (startDate) {
      const date = new Date(startDate);
      if (this.isValidDate(date)) {
        this._startDate = date;
        this._endDate = null;
      }
    } else if (endDate) {
      const date = new Date(endDate);
      if (this.isValidDate(date)) {
        this._startDate = null;
        this._endDate = date;
      }
    } else {
      this._startDate = new Date();
      this._endDate = null;
    }
    console.log(this);
    return this;
  }

  /**
   *
   * @param {Date} d verifica se uma data é válida
   */
  isValidDate(d) {
    return d instanceof Date && !Number.isNaN(d);
  }

  /**
   * @returns {Date} Data atual
   */
  get actualDate() {
    return new Date();
  }

  /**
   * @returns {Date} Data de início.
   * Pode ser null caso não tenha sido definida
   */
  get startDate() {
    return this._startDate;
  }

  /**
   * @returns {Date} Data de término
   * Pode ser null caso não tenha sido definida
   */
  get endDate() {
    return this._endDate;
  }

  /**
   * @returns {Timestamp} Retorna um Timestamp contendo a diferença entre a data final e inicial,
   * caso as duas datas do intervalo estejam definidas. Caso só uma data esteja definida, retorna null
   */
  get total() {
    if (this.endDate && this.startDate) {
      return new Timestamp(this.endDate.getTime() - this.startDate.getTime());
    }
    return null;
  }

  /**
   * @returns {Timestamp} Retorna um Timestamp contendo a diferença entre a data atual e a data de inicio passado
   */
  get elapsed() {
    if (this.startDate && this.actualDate > this.startDate && (!this.endDate || this.endDate > this.actualDate)) {
      return new Timestamp(this.actualDate.getTime() - this.startDate.getTime());
    }
    return new Timestamp(0);
  }

  /**
   * @returns {Timestamp} Retorna um Timestamp contendo a diferença entre a data de término futuro e a data atual
   */
  get remaining() {
    if (this.endDate && this.endDate > this.actualDate && this.startDate < this.actualDate) {
      return new Timestamp(this.endDate.getTime() - this.actualDate.getTime());
    }
    return new Timestamp(0);
  }
}
