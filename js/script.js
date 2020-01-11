const app = document.querySelector('#app');

const addDisplayString = (className='') => {
    const element = document.createElement('input');
    element.setAttribute('type', 'text');
    element.setAttribute('id', 'display');
    if (className) {
        element.classList.add(className);
    }
    return element;
};

const addButton =(sign, descr, className='') => {
    const element = document.createElement('button');
    element.setAttribute('id', descr);
    element.textContent = sign;
    if (className) {
        element.classList.add(className);
    }
    return element;
};

class CalculatorFront {
    constructor(app) {
        this.app = app;
        this.logic = null;
        this.elements = {};
        this.classes = {
            number: 'number',
            output: 'output',
            operation: 'operation',
            point: 'point',
        };
        this.firstNumber = '';
        this.secondNumber = '';
        this.operation = '';
    }

    setFrontend() {
        this.createElements();
        this.displayElements();
        this.setListeners();
    }

    setLogic(logic) {
        this.logic = logic;
    }

    createElements() {
        this.elements['displayField'] = addDisplayString(this.classes['output']);
        this.elements['one'] = addButton('1', 'one', this.classes['number']);
        this.elements['two'] = addButton('2', 'two', this.classes['number']);
        this.elements['three'] = addButton('3', 'three', this.classes['number']);
        this.elements['four'] = addButton('4', 'four', this.classes['number']);
        this.elements['five'] = addButton('5', 'five', this.classes['number']);
        this.elements['six'] = addButton('6', 'six', this.classes['number']);
        this.elements['seven'] = addButton('7', 'seven', this.classes['number']);
        this.elements['eight'] = addButton('8', 'eight', this.classes['number']);
        this.elements['clear'] = addButton('clear', 'clear', this.classes['operation']);
        this.elements['nine'] = addButton('9', 'nine', this.classes['number']);
        this.elements['zero'] = addButton('0', 'zero', this.classes['number']);
        this.elements['plus'] = addButton('+', 'plus', this.classes['operation']);
        this.elements['minus'] = addButton('-', 'minus', this.classes['operation']);
        this.elements['multiply'] = addButton('*', 'multiply', this.classes['operation']);
        this.elements['divide'] = addButton('/', 'divide', this.classes['operation']);
        this.elements['equal'] = addButton('=', 'equal', this.classes['operation']);
        this.elements['point'] = addButton('.', 'point', this.classes['point']);
    }

    displayElements() {
        Object.values(this.elements).forEach((element) => this.app.appendChild(element), this);
    }

    setListeners() {
        const displayField = this.elements['displayField'];
        document.onkeydown = event => {
            const key = event.key;
            const numbers = '1234567890';
            if (numbers.includes(key)) displayField.value += key;
            if (key === '.' && this.checkIfPointAllowed()) displayField.value += key;
            if (displayField.value.length === 0 && key === '-') displayField.value += key;
            if (key === 'Backspace') displayField.value = displayField.value.slice(0, -1);
            if (['/', '*', '-', '+', 'Enter'].includes(key)) this.perform(key);
        };
        for (let key of Object.keys(this.elements)){
            let element = this.elements[key];
            element.onclick = () => {
                if (element.classList.contains(this.classes['number'])) {
                    displayField.value += element.textContent;
                } else if (element.classList.contains(this.classes['point'])){
                    displayField.value += this.checkIfPointAllowed()? '.': '';
                } else if (element.classList.contains(this.classes['operation'])) {
                    this.perform(element.textContent);
                }
            }
        }
    }

    perform(key) {
        if (key === 'clear') {
            this.elements['displayField'].value = '';
            this.firstNumber = '';
            this.secondNumber = '';
            this.operation = '';
            return
        }
        if (['/', '*', '+', '-'].includes(key)){
            if (this.operation) return;
            this.operation = key;
            this.firstNumber = this.elements['displayField'].value || '0';
        } else if (key === '') {

        }
    }

    checkIfPointAllowed() {
        return this.elements['displayField'].value.length > 0 && !this.elements['displayField'].value.includes('.')
    }

}

class Calculator {
    constructor(frontend) {
        this.frontend =
        this.firstNumber = null;
        this.secondNumber = null;
        this.operation = null;
        this.result = NaN;
        this.mapper = {
            '+': this.add,
            '-': this.subtract,
            '/': this.divide,
            '*': this.multiple
        }
    }

    compute() {
        return this.mapper[this.operation]()
    }

    add() {
        return this.firstNumber + this.secondNumber
    }

    subtract() {
        return this.firstNumber - this.secondNumber
    }

    multiple() {
        return this.firstNumber * this.secondNumber
    }

    divide() {
        return this.firstNumber / this.secondNumber
    }

    clear() {
        this.firstNumber = null;
        this.secondNumber = null;
        this.operation = null;
    }


}

calc = new Calculator();
front = new CalculatorFront(app);
front.setFrontend();
front.setLogic(calc);


// equal.onclick = () => {
//     if (displayField.value === '') {
//         return
//     }
//     calc.secondNumber = displayField.value;
//     if ([calc.firstNumber, calc.secondNumber, calc.operation].every(value => value !== null)) {
//         displayField.value = calc.compute();
//         calc.clear();
//     }
//
// }




