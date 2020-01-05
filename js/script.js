const app = document.querySelector('#app');


const addDisplayString = () => {
    const element = document.createElement('input');
    element.setAttribute('type', 'text');
    element.setAttribute('id', 'display');
    return element;
};

const addButton = (sign, descr) => {
    const element = document.createElement('button');
    element.setAttribute('id', descr);
    element.textContent = sign;
    return element;
};

const wrapElement = element => {
    const container = document.createElement('div');
    container.setAttribute('class', 'element-wrapper');
    container.appendChild(element);
    return container;
};

const displayField = addDisplayString();
const one = addButton('1', 'one');
const two = addButton('2', 'two');
const three = addButton('3', 'three');
const four = addButton('4', 'four');
const five = addButton('5', 'five');
const six = addButton('6', 'six');
const seven = addButton('7', 'seven');
const eight = addButton('8', 'eight');
const nine = addButton('9', 'nine');
const zero = addButton('0', 'zero');
const plus = addButton('+', 'plus');
const minus = addButton('-', 'minus');
const multiply = addButton('*', 'multiply');
const divide = addButton('/', 'divide');
const equal = addButton('=', 'equal');
const point = addButton('.', 'point');
const clear = addButton('clear', 'clear');

const elements = {
    displayField,
    divide,
    multiply,
    minus,
    plus,
    seven,
    eight,
    nine,
    clear,
    four,
    five,
    six,
    point,
    one,
    two,
    three,
    equal,
    zero
};

Object.values(elements).forEach(element => app.appendChild(element));




