'use strict';

// Коллекция кодов спец клавиш, которые не должны никак визуально меняться при нажатии CapsLock или Shift
const specialKeys = new Set(['Tab', 'CapsLock', 'ShiftLeft', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'Fn', 'LED', 'ControlRight', 'ShiftRight', 'Enter', 'Backspace']);

// Символы нижнего регистра
const lowerCaseSymbols = {
    'row-1': ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    'row-2': ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    'row-3': ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
    'row-4': ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
    'row-5': ['Ctrl', 'Meta', 'Alt', 'Space', 'Alt', 'Fn', 'LED', 'Ctrl'],
};

// Символы верхнего регистра для Caps Lock
const upperCaseCapsSymbols = {
    'row-1': ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    'row-2': ['Tab',"Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", '[', ']', '\\'],
    'row-3': ['CapsLock', "A", "S", "D", "F", "G", "H", "J", "K", "L", ';', '\'', 'Enter'],
    'row-4': ['Shift', "Z", "X", "C", "V", "B", "N", "M", ',', '.', '/', 'Shift'],
    'row-5': ['Ctrl', 'Meta', 'Alt', 'Space', 'Alt', 'Fn', 'LED', 'Ctrl'],
};

// Символы верхнего регистра для Shift
const upperCaseShiftSymbols = {
    'row-1': ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
    'row-2': ['Tab',"Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", '{', '}', '|'],
    'row-3': ['CapsLock', "A", "S", "D", "F", "G", "H", "J", "K", "L", ':', '"', 'Enter'],
    'row-4': ['Shift', "Z", "X", "C", "V", "B", "N", "M", '<', '>', '?', 'Shift'],
    'row-5': ['Ctrl', 'Meta', 'Alt', 'Space', 'Alt', 'Fn', 'LED', 'Ctrl'],
};

// Стили клавиатуры и соотвветствующие стили активных клавиш
const keyboardStyleClasses = {
    'style-light': 'key-active-light',
    'style-dark': 'key-active-dark',
    'style-pink': 'key-active-pink',
    'style-turquoise': 'key-active-turquoise',
};

const keyboard = document.querySelector('.keyboard');
const keyboardRows = Array.from(keyboard.children);
const allKeys = keyboard.querySelectorAll('.keyboard__key');
const capsLock = keyboard.querySelector('.caps-key');

const inputField = document.querySelector('.textarea-keyboard');
inputField.focus(); // ставим сразу фокус на поле

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
    if (currentKeyDown === null) return; // Если такой клавиши на клавиатуре нет, то просто выходим, сами клавиши которых нет на клавиатуре будут работать, например Num Pad

    const keyCodeAttribute = currentKeyDown.dataset.keycode;
    const currentStyleKeyboard = keyboard.classList[1];

    const targetStyleActiveKey = keyboardStyleClasses[currentStyleKeyboard];
    const containActiveClassCapsLock = capsLock.classList.contains(targetStyleActiveKey);

    if (event.code == 'Tab') event.preventDefault();

    inputField.focus(); // Когда начинаем ввод, делаем активным поле ввода

    // Если мы поймали CapsLock, то мы через toggle даём клавише активность
    // При следующем нажатии на Caps, класс активности снимется и клавиша уже сама будет неактивна на аппаратном уровне
    if (checkCapsLock(event)) {
        // Здесь у нас currentKeyDown однозначно Space

        // Если Caps не содержит класс активности, значит мы его только включаем, а значит переводим сиволы клавиатуры в верхний регистр
        if (!containActiveClassCapsLock) {
            fillKeyboardNewSymbol(upperCaseCapsSymbols);
        }
        // И наоборот, если имеется, значит мы желаем выключить Caps, и переводим регистр символов в нижний
        if (containActiveClassCapsLock) {
            fillKeyboardNewSymbol(lowerCaseSymbols);
        }

        currentKeyDown.classList.toggle(targetStyleActiveKey);
        return;
    }
    // Если у нас не CapsLock, тогда мы добавляем активность на нажатую клавишу
    currentKeyDown.classList.add(targetStyleActiveKey);


    // Если был нажат какой-либо Shift, тогда мы меняем символы в другую раскладку, которая отличается от Caps
    if (checkShift(event)) {
        fillKeyboardNewSymbol(upperCaseShiftSymbols);
    }

    // И при отпускании последней нажатой клавиши мы удаляем с неё класс активности
    document.addEventListener('keyup', (event) => {
        const currentKeyUp = document.querySelector(`.keyboard .keyboard__key[data-keyCode="${event.code}"]`);
        if (currentKeyUp === null) return; // Если такой клавиши на клавиатуре нет, то просто выходим, сами клавиши которых нет на клавиатуре будут работать, например Num Pad
        // Если отпущена любая клавиша кроме пробела, то удаляем активность, а пробел остаётся активным до следующего нажатия
        if (!checkCapsLock(event)) {
            currentKeyUp.classList.remove(targetStyleActiveKey);
        }
        
        // Когда отпускаем Shift
        if (checkShift(event)) {
            // Проверяем был ли в этот момент активирован Caps, если да, тогда ставим раскладку которая соответствует Caps, т.к он ещё активирован
            if (containActiveClassCapsLock) {
                fillKeyboardNewSymbol(upperCaseCapsSymbols);
                // Если Caps не был активирован, значит клавиши с буквами тоже переводим в нижний регистр
            } else {
                fillKeyboardNewSymbol(lowerCaseSymbols);
            }
        }
    });

});

function checkCapsLock(event) {
    return (event.code == 'CapsLock') ? true : false;
}

// Проверяет был ли нажат Shift при событии клавиатуры
function checkShift(event) {
    return (event.code == 'ShiftLeft' || event.code == 'ShiftRight') ? true : false;
}

// Функция заполняет все символьные клавишами символами верхнего или нижнего регистра, в зависимости от того, какой объект передан в качестве аргумента
function fillKeyboardNewSymbol(objKeySymbols) {
    let rowKyesIndex = 0; // индекс ряда в коллекции рядов-узлов клавиатуры
    for (const codesRow in objKeySymbols) {
        objKeySymbols[codesRow].forEach((keySymbol, i) => {
            const currentKey = keyboardRows[rowKyesIndex].children[i];
            // Получили код текущей перебираемой клавиши из дата атрибута
            const keyCodeAttribute = currentKey.dataset.keycode;
            // Если текущая перебираемая клавиша является специальной, тогда мы не выводим новый символ и переходим на следующий шаг
            if (specialKeys.has(keyCodeAttribute)) {
                return;
            }
            currentKey.textContent = keySymbol;
        });
        // Переходим на следующий ряд клавиатуры, и в объекте мы переходим на следующий ряд кодов клавиатуры
        rowKyesIndex++;
    }
}

// TODO Изменение стиля клавиатуры -------------------------------------------
changingTheKeyboardStyle();
function changingTheKeyboardStyle() {
    const styleButtonsContainer = document.querySelector('.keyboard-style-button');
    styleButtonsContainer.addEventListener('click', (event) => {
        const targetButton = event.target.closest('.check-block');
        if (!targetButton) return;
        const targetStyle = targetButton.dataset.styleKeyboard;

        const currentStyleKeyboard = keyboard.classList[1];
        // Сбрасываем все клавиши в нижний регистр
        fillKeyboardNewSymbol(lowerCaseSymbols);
        // И проверяем, если класс активности у CapsLock есть, значит удаляем его
        // Т.е мы переключаем новый стиль клавиатуры, сбрасываем капс и всё как с чистого листа
        if (capsLock.classList[2]) {
            capsLock.classList.remove(keyboardStyleClasses[currentStyleKeyboard]);
        }

        // Удалили текущий класс стиля
        keyboard.classList.remove(currentStyleKeyboard);
        // Добавили новый стиль
        keyboard.classList.add(targetStyle);
    });
}
// TODO Изменение стиля клавиатуры -------------------------------------------
