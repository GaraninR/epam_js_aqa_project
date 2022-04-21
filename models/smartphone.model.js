class SmartPhone {

    model;
    resolution;

    constructor(model, resolution) {
        this.model = model;
        this.resolution = resolution;
    }

    callToNumber(number) {
        if (number[0] === '+') {
            return `Calling to number ${number}`;
        } else {
            return 'Invalid number!'
        }
    }

    get model() {
        return this.model;
    }

    /**
     * @param {string} x
     */
    set model(x) {
        this.model = x;
    }
}

module.exports = SmartPhone;