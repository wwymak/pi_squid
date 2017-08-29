const Gpio = require('pigpio').Gpio;
const convert = require('color-convert');

class Squid {
    constructor (redPinNumber, bluePinNumber, greenPinNumber) {
        this.redPinNumber = redPinNumber;
        this.bluePinNumber = bluePinNumber;
        this.greenPinNumber =greenPinNumber;

        this.setupPins();
    }

    setupPins () {
        this.redLed = new Gpio(this.redPinNumber, {mode: Gpio.OUTPUT});
        this.blueLed = new Gpio(this.bluePinNumber, {mode: Gpio.OUTPUT});
        this.greenLed = new Gpio(this.greenPinNumber, {mode: Gpio.OUTPUT});

        this.redLed.pwmRange(255);
        this.blueLed.pwmRange(255);
        this.greenLed.pwmRange(255);

        this.redLed.pwmWrite(0);
        this.blueLed.pwmWrite(0);
        this.greenLed.pwmWrite(0);

    }

    setRed(brightness) {
        this.redLed.pwmWrite(brightness);
    }

    setGreen(brightness) {
        this.greenLed.pwmWrite(brightness);
    }

    setBlue(brightness) {
        this.blueLed.pwmWrite(brightness);
    }

    setColor (colorVal, brightness = 1) {
        let colArr = [0,0,0];
        if(typeof colorVal === 'string') {
            colArr = convert.keyword.rgb(colorVal);
            if(!colArr) colArr = [Math.random() * 255, Math.random() * 255, Math.random() * 255 ];
        } else if(Array.isArray(colorVal)) {
            colArr = colorVal;
        }
        this.setRed(colArr[0] * brightness);
        this.setGreen(colArr[1]* brightness);
        this.setBlue(colArr[2]* brightness);
    }

    turnOff() {
        this.setColor([0,0,0]);
    }


}

module.exports = Squid;