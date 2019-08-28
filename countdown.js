/**
 * Contador regressivo de dias
 */
export default class Countdown {

    /**
     * Recebe uma string em qualquer formato compativel com o objeto Date do javascript
     * @param {String} targetDate Data futura que serve de alvo para o contador regressivo
     */
    constructor(targetDate) {
        this.targetDate = targetDate;
        return this;
    }

    /**
     * @returns {Date} Data atual
     */
    get _actuaDate() {
        return new Date();
    }

    /**
     * @returns {Date} Data alvo
     */
    get _targetDate() {
        return new Date(this.targetDate);
    }

    /**
     * @returns {number} Retorna a diferença entre a data atual e a data alvo (em milissegundos)
     */
    get _timestampDiff() {
        return this._targetDate.getTime() - this._actuaDate.getTime();
    }

    /**
     * @returns {number} Retorna a diferença entre a data atual e a data alvo (em dias)
     */
    get days() {
        return Math.floor(this._timestampDiff / (24*60*60*1000));
    }

    /**
     * @returns {number} Retorna a diferença entre a data atual e a data alvo (em horas)
     */
    get hours() {
        return Math.floor(this._timestampDiff / (60*60*1000));
    }

    /**
     * @returns {number} Retorna a diferença entre a data atual e a data alvo (em minutos)
     */
    get minutes() {
        return Math.floor(this._timestampDiff / (60*1000));
    }

    /**
     * @returns {number} Retorna a diferença entre a data atual e a data alvo (em segundos)
     */
    get seconds() {
        return Math.floor(this._timestampDiff / 1000);
    }

    /**
     * @returns {Object} Retorna um objeto com a diferença completa entre a data atual e a data alvo (dias, horas, minutos, segundos)
     */
    get fullDiff() {
        const days = this.days;
        const hours = this.hours % 24;
        const minutes = this.minutes % 60;
        const seconds = this.seconds % 60;

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }
}