/**
 * Calcula o timestamp restante de agora até uma determinada data, podendo retornar o resultado em diferentes formatos
 */
export default class Countdown {

    /**
     * Recebe uma string em qualquer formato compativel com o objeto Date do javascript
     * @param {String} targetDate Data futura que serve de alvo para o contador regressivo
     */
    constructor(targetDate) {
        if(this.isValidDate(new Date(targetDate)) ){
            this.targetDate = targetDate;
        } else {
            this.targetDate = this._actualDate;
        }
        return this;
    }

    /**
     * 
     * @param {Date} d verifica se a data é válida
     */
    isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }

    /**
     * @returns {Date} Data atual
     */
    get _actualDate() {
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
    get timestamp() {
        //console.log(this._targetDate.getTime() - this._actualDate.getTime());
        return this._targetDate.getTime() - this._actualDate.getTime();
    }

    /**
     * @returns {number} Retorna o timestamp em dias
     */
    get days() {
        return Math.floor(this.timestamp / (24*60*60*1000));
    }

    /**
     * @returns {number} Retorna o timestamp em horas
     */
    get hours() {
        return Math.floor(this.timestamp / (60*60*1000));
    }

    /**
     * @returns {number} Retorna o timestamp em minutos
     */
    get minutes() {
        return Math.floor(this.timestamp / (60*1000));
    }

    /**
     * @returns {number} Retorna o timestamp em segundos
     */
    get seconds() {
        return Math.floor(this.timestamp / 1000);
    }

    /**
     * @returns {Object} Converte o timestamp em dias, horas, minutos e segundos
     */
    toDays() {
        const days    = this.days;
        const hours   = this.hours % 24;
        const minutes = this.minutes % 60;
        const seconds = this.seconds % 60;

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

    /**
     * @returns {Object} Converte o timestamp em horas, minutos e segundos
     */
    toHours() {
        const days    = 0;
        const hours   = this.hours;
        const minutes = this.minutes % 60;
        const seconds = this.seconds % 60;

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

    /**
     * @returns {Object} Converte o timestamp em minutos e segundos
     */
    toMinutes() {
        const days    = 0;
        const hours   = 0;
        const minutes = this.minutes
        const seconds = this.seconds % 60;

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

    /**
     * @returns {Object} Converte o timestamp em segundos
     */
    toSeconds() {
        const days    = 0;
        const hours   = 0;
        const minutes = 0;
        const seconds = this.seconds;

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

}