import Timestamp from './timestamp.js';

/**
 * Calcula a diferença entre uma data alvo qualquer e a data atual.
 * 
 * A data alvo pode ser uma data no passado ou futuro.
 */
export default class Timer {

    /**
     * Recebe uma string representando uma data em qualquer formato compativel com o objeto Date do javascript
     * @param {String} targetDate Data alvo que serve de referência
     */
    constructor(targetDate) {
        if(this.isValidDate(new Date(targetDate))){
            this._targetDate = new Date(targetDate);
        } else {
            this._targetDate = this.actualDate;
        }
        return this;
    }

    /**
     * 
     * @param {Date} d verifica se uma data é válida
     */
    isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }

    /**
     * Calcula a diferença de tempo, em módulo, entre duas datas
     * @param {Date} date1 data 1
     * @param {Date} date2 data 2
     * @returns {Timestamp} Timestamp representando a diferença entre as datas
     */
    static dateDiff(date1, date2) {
        return new Timestamp(Math.abs(date1.getTime() - date2.getTime()));
    }

    /**
     * @returns {Date} Data atual
     */
    get actualDate() {
        return new Date();
    }

    /**
     * @returns {Date} Data alvo (pode ser uma data no passado ou futuro)
     */
    get targetDate() {
        return this._targetDate;
    }

    /**
     * @returns {Timestamp} Retorna um Timestamp contendo o módulo da diferença entre a data atual e a data alvo
     */
    get timestamp() {
        return Timer.dateDiff(this.actualDate, this.targetDate);
    }
}