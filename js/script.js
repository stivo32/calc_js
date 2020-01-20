const app = document.querySelector('#app');

const addElement = (tag, content='', id='', className='') => {
    const element = document.createElement(tag);
    if (id) element.setAttribute('id', id);
    if (className) element.classList.add(className);
    element.textContent = content;
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
            backspace: 'backspace',
        };
        this.operationMapper = {
            'Enter': '=',
            'Backspace': '<='
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
        this.elements['displayField'] = addElement('div', '','display', this.classes['output']);
        this.elements['divide'] = addElement('button', '/', 'divide', this.classes['operation']);
        this.elements['multiply'] = addElement('button','*', 'multiply', this.classes['operation']);
        this.elements['plus'] = addElement('button','+', 'plus', this.classes['operation']);
        this.elements['minus'] = addElement('button','-', 'minus', this.classes['operation']);
        this.elements['clear'] = addElement('button','clear', 'clear', this.classes['operation']);
        this.elements['equal'] = addElement('button','=', 'equal', this.classes['operation']);
        this.elements['one'] = addElement('button','1', 'one', this.classes['number']);
        this.elements['two'] = addElement('button','2', 'two', this.classes['number']);
        this.elements['three'] = addElement('button','3', 'three', this.classes['number']);
        this.elements['four'] = addElement('button','4', 'four', this.classes['number']);
        this.elements['five'] = addElement('button','5', 'five', this.classes['number']);
        this.elements['six'] = addElement('button','6', 'six', this.classes['number']);
        this.elements['seven'] = addElement('button','7', 'seven', this.classes['number']);
        this.elements['eight'] = addElement('button','8', 'eight', this.classes['number']);
        this.elements['nine'] = addElement('button','9', 'nine', this.classes['number']);
        this.elements['zero'] = addElement('button','0', 'zero', this.classes['number']);
        this.elements['sign'] = addElement('button','+/-', 'sign', this.classes['operation']);
        this.elements['point'] = addElement('button','.', 'point', this.classes['point']);
        this.elements['backspace'] = addElement('button','<=', 'backspace', this.classes['operation']);
    }

    displayElements() {
        Object.values(this.elements).forEach((element) => this.app.appendChild(element), this);
    }

    setListeners() {
        const displayField = this.elements['displayField'];
        // Вешаем обработчик для нажатия клавиш.
        const numbers = '1234567890';
        document.onkeydown = event => {
            const key = event.key;
            // цифры
            if (numbers.includes(key)) {
                if (displayField.innerHTML.length === 1 && !numbers.includes(displayField.innerHTML[0])) {
                    displayField.innerHTML = '';
                }
                displayField.innerHTML += key;
            }
            // точка
            if (key === '.' && this.checkIfPointAllowed()) displayField.innerHTML += key;
            // остальные операторы
            if (['/', '*', '-', '+', 'Enter', 'Backspace'].includes(key)) this.perform(key);
        };
        // вешаем обработчик на каждую кнопку калькулятора.
        for (let key of Object.keys(this.elements)) {
            let element = this.elements[key];
            element.onclick = () => {
                // цифры
                if (element.classList.contains(this.classes['number'])) {
                    if (displayField.innerHTML.length === 1 && !numbers.includes(displayField.innerHTML[0])) {
                        displayField.innerHTML = '';
                    }
                    displayField.innerHTML += element.textContent;
                // точка
                } else if (element.classList.contains(this.classes['point'])) {
                    displayField.innerHTML += this.checkIfPointAllowed() ? '.' : '';
                // операторы
                } else if (element.classList.contains(this.classes['operation'])) {
                    this.perform(element.textContent);
                }
            }
        }
    }


    perform(key) {
        if (!this.logic) throw Error('You need to setup some logic');

        if (key in this.operationMapper) {
            key = this.operationMapper[key];
        }

        if (key === 'clear') {
            this.clearOutput();
            this.clearInputVariables();
        } else if (key === '+/-') {
            if (this.elements['displayField'].innerHTML[0] === '-') {
                this.elements['displayField'].innerHTML = this.elements['displayField'].innerHTML.slice(1);
            } else this.elements['displayField'].innerHTML = `-${this.elements['displayField'].innerHTML}`;
        } else if (key === '<=') {
            this.elements['displayField'].innerHTML = this.elements['displayField'].innerHTML.slice(0, -1);
        } else if (['/', '*', '+', '-'].includes(key)) {
            if (this.operation) return;
            this.operation = key;
            this.firstNumber = this.elements['displayField'].innerHTML || '0';
            this.elements['displayField'].innerHTML = key;
        } else if (key === '=') {
            if (!this.elements['displayField'].innerHTML) return;
            this.secondNumber = this.elements['displayField'].innerHTML;
            this.elements['displayField'].innerHTML = this.logic.compute(this.firstNumber, this.secondNumber, this.operation);
            this.clearInputVariables();
            this.firstNumber = this.elements['displayField'].innerHTML;
        }
    }

    clearOutput() {
        this.elements['displayField'].innerHTML = '';
    }

    clearInputVariables() {
        this.firstNumber = '';
        this.secondNumber = '';
        this.operation = '';
    }

    checkIfPointAllowed() {
        return this.elements['displayField'].innerHTML.length > 0 && !this.elements['displayField'].innerHTML.includes('.')
    }

}

class Calculator {
    constructor() {
        this.mapper = {
            '+': (first, second) => first + second,
            '-': (first, second) => first - second,
            '/': (first, second) => first / second,
            '*': (first, second) => first * second,
        };

    }

    compute(firstNumber, secondNumber, operation) {
        return this.mapper[operation](parseFloat(firstNumber), parseFloat(secondNumber))
    }


}

calc = new Calculator();
front = new CalculatorFront(app);
front.setFrontend();
front.setLogic(calc);





