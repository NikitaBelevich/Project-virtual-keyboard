'use strict';

const keyboard = document.querySelector('.keyboard');
const keyboardRows = Array.from(keyboard.children);

addCodeAttribute();
// Функция добавляет всем клавишам клавиатуры атрибут с соответствующим ей физическим кодом
function addCodeAttribute() {
    // Объект с кодами клавиш, коды разбиты по рядам клавиатуры
    const codesKeys = {
        'row-1': ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
        'row-2': ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
        'row-3': ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
        'row-4': ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'],
        'row-5': ['ControlLeft', 'MetaLeft', 'AltRight', 'Space', 'AltRight', 'Fn', 'LED', 'ControlRight'],
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

document.addEventListener('keydown', (e) => {

    console.log(e);
});