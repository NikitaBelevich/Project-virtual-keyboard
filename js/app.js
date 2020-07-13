'use strict';

// Коллекция кодов спец клавиш, которые не должны никак визуально меняться при нажатии CapsLock или Shift
const specialKeys = new Set(['Tab', 'CapsLock', 'ShiftLeft', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'Fn', 'LED', 'ControlRight', 'ShiftRight', 'Enter', 'Backspace']);

const lowerCaseSymbols = {
    'row-1': ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    'row-2': ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    'row-3': ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
    'row-4': ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
    'row-5': ['Ctrl', 'Meta', 'Alt', 'Space', 'Alt', 'Fn', 'LED', 'Ctrl'],
};

const upperCaseSymbols = {
    'row-1': ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", 'Backspace'],
    'row-2': ['Tab',"Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|"],
    'row-3': ['CapsLock', "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", 'Enter'],
    'row-4': ['Shift', "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", 'Shift'],
    'row-5': ['Ctrl', 'Meta', 'Alt', 'Space', 'Alt', 'Fn', 'LED', 'Ctrl'],
};


const keyboard = document.querySelector('.keyboard');
const keyboardRows = Array.from(keyboard.children);
const allKeys = keyboard.querySelectorAll('.keyboard__key');
const inputField = document.querySelector('.input-keyboard');

addCodeAttribute();
// Функция добавляет всем клавишам клавиатуры атрибут с соответствующим ей физическим кодом
function addCodeAttribute() {
    // Объект с кодами клавиш, коды разбиты по рядам клавиатуры
    const codesKeys = {
        'row-1': ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
        'row-2': ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
        'row-3': ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
        'row-4': ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'],
        'row-5': ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'Fn', 'LED', 'ControlRight'],
    };

    let rowKyesIndex = 0; // индекс ряда в коллекции рядов-узлов клавиатуры
    for (const codesRow in codesKeys) {
        codesKeys[codesRow].forEach((keyCode, i) => {
            // Находимся на 1 свойстве объекта кодов, ему соответствует rowKyesIndex == 0 (т.е первая строка клавиатуры с узлами клавиш)
            // children[i] - это мы получаем все клавиши текущего ряда и обращаемся к текущей клавиши итерации
            // А keyCode из codesKeys[codesRow] это текущий код этой клавиши из event
            // И в конечном итоге мы записали текущей DOM - клавише её физический код расположения в атрибут
            const currentKey = keyboardRows[rowKyesIndex].children[i];
            currentKey.setAttribute('data-keyCode', keyCode);
        });
        // Переходим на следующий ряд клавиатуры, и в объекте мы переходим на следующий ряд кодов клавиатуры
        rowKyesIndex++;
    }
}

document.addEventListener('keydown', (event) => {
    // Получили текущую нажатую клавишу из DOM 
    const currentKeyDown = document.querySelector(`.keyboard .keyboard__key[data-keyCode="${event.code}"]`);
    const keyCodeAttribute = currentKeyDown.dataset.keycode;

    if (event.code == 'Tab') event.preventDefault();

    // Если мы поймали CapsLock, то мы через toggle даём клавише активность
    // При следующем нажатии на Caps, класс активности снимется и клавиша уже сама будет неактивна на аппаратном уровне
    if (checkCapsLock(event)) {
        // Здесь у нас currentKeyDown однозначно Space
        const containActiveClassCapsLock = currentKeyDown.classList.contains('key-active');
        if (!containActiveClassCapsLock) {
            fillKeyboardNewSymbol(upperCaseSymbols);
        }
        if (containActiveClassCapsLock) {
            fillKeyboardNewSymbol(lowerCaseSymbols);
        }
        
        currentKeyDown.classList.toggle('key-active');
        return;
    }
    // Если у нас не CapsLock, тогда мы добавляем активность на нажатую клавишу
    addActiveClass(event, currentKeyDown);

    //* Если наша нажатая клавиша не является специальной (из коллекции), тогда мы выводим в поле вывода textContent этой клавиши
    //* Т.е отменили вывод символов по умолчанию и выводим нарисованный символ на виртуальной клавише
    //* Здесь другая локика работы клавиатуры, активированный CapsLock работает как зажатый Shift, поэтому мы должны отменить дефолтный вывод и выводить свои символы
    if (!specialKeys.has(keyCodeAttribute)) {
        event.preventDefault();
        console.warn(event.key);
        inputField.value += currentKeyDown.textContent;
    }
    

    // И при отпускании последней нажатой клавиши мы удаляем с неё класс активности
    document.addEventListener('keyup', (event) => {
        const currentKeyUp = document.querySelector(`.keyboard .keyboard__key[data-keyCode="${event.code}"]`);
        // Если отпущена любая клавиша кроме пробела, то удаляем активность, а пробел остаётся активным до следующего нажатия
        if (!checkCapsLock(event)) {
            currentKeyUp.classList.remove('key-active');
        }
    });
});

function addActiveClass(event, currentKey) {
    currentKey.classList.add('key-active');
}

function checkCapsLock(event) {
    return (event.code == 'CapsLock') ? true : false;
}

function fillKeyboardNewSymbol(objKeySymbols) {
    
    let rowKyesIndex = 0; // индекс ряда в коллекции рядов-узлов клавиатуры
    for (const codesRow in objKeySymbols) {
        objKeySymbols[codesRow].forEach((keySymbol, i) => {
            const currentKey = keyboardRows[rowKyesIndex].children[i];
            // Получили код текущей перебираемой клавиши из дата атрибута
            const keyCodeAttribute = currentKey.dataset.keycode;
            if (specialKeys.has(keyCodeAttribute)) {
                return;
            }
            currentKey.textContent = keySymbol;
        });
        // Переходим на следующий ряд клавиатуры, и в объекте мы переходим на следующий ряд кодов клавиатуры
        rowKyesIndex++;
    }
}