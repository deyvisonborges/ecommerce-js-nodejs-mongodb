'use strict';

class ValidationContract {
    constructor() {
        // inicio com uma variavel interna com os errors
        this._errors = [];
    }

    // se não é um array ou está vazio
    isNotArrayOrEmpty(value, message) {
        if (!value && value.length == 0)
            this._errors.push({ message: message });
    }
    // se minha informação for true eu retorno uma mensagem
    isTrue(value, message) {
        if (value)
            this._errors.push({ message: message });
    }

    // é requerida
    isRequired(value, message) {
        if (!value || value.length <= 0)
            this._errors.push({ message: message });
    }

    // se ela possui um minimo de length
    hasMinLen(value, min, message) {
        if (!value || value.length < min)
            this._errors.push({ message: message });
    }

    // se ela possui um maximo de length
    hasMaxLen(value, max, message) {
        if (!value || value.length > max)
            this._errors.push({ message: message });
    }

    isFixedLen(value, len, message) {
        if (value.length != len)
            this._errors.push({ message: message });
    }

    isEmail(value, message) {
        var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!reg.test(value))
            this._errors.push({ message: message });
    } 

    errors() {
        return this._errors;
    }

    clear() {
        this._errors = [];
    }

    isValid() {
        return this._errors.length == 0;
    }
}

module.exports = ValidationContract;    
