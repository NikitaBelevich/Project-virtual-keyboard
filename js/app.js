'use strict';

// Коллекция кодов спец клавиш, которые не должны никак визуально меняться при нажатии CapsLock или Shift
const specialKeys = new Set(['Tab', 'CapsLock', 'ShiftLeft', 'ControlLeft', 'MetaLeft', 'MetaRight', 'AltLeft', 'Space', 'AltRight', 'Fn', 'LED', 'ControlRight', 'ShiftRight', 'Enter', 'Backspace']);

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
const capsLock = keyboard.querySelector('.caps-key');
const leftShift = keyboard.querySelector('.l-shift-key');
const rightShift = keyboard.querySelector('.r-shift-key');

const inputField = document.querySelector('.textarea-keyboard');
inputField.focus(); // ставим сразу фокус на поле

// TODO Функция заполнения клавиш атрибутами с соответствующими физическими кодами
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
// TODO Функция заполнения клавиш атрибутами с соответствующими физическими кодами

document.addEventListener('keydown', (event) => {
    // Получили текущую нажатую клавишу из DOM 
    const currentKeyDown = document.querySelector(`.keyboard .keyboard__key[data-keyCode="${event.code}"]`);
    if (currentKeyDown === null) return; // Если такой клавиши на клавиатуре нет, то просто выходим, сами клавиши которых нет на клавиатуре будут работать, например Num Pad
    const keyCodeAttribute = currentKeyDown.dataset.keycode;
    const currentStyleKeyboard = keyboard.classList[1];
    const targetStyleActiveKey = keyboardStyleClasses[currentStyleKeyboard];
    const containActiveClassCapsLock = capsLock.classList.contains(targetStyleActiveKey);
    const selectionStartTextarea = inputField.selectionStart;
    const selectionEndTextarea = inputField.selectionEnd;

    // Если нажат Tab, тогда отменяем действие по умолчанию и выводим табуляцию в место где стоит курсор
    if (keyCodeAttribute == 'Tab') {
        event.preventDefault();
        inputField.setRangeText('\t', selectionStartTextarea, selectionEndTextarea, "end");
    }

    inputField.focus(); // Когда начинаем ввод, делаем активным поле ввода

    // TODO Логика CapsLock
    // Если мы поймали CapsLock, то мы через toggle даём клавише активность
    // При следующем нажатии на Caps, класс активности снимется и клавиша уже сама будет неактивна на аппаратном уровне
    if (checkCapsLock(keyCodeAttribute)) {
        // Здесь у нас currentKeyDown однозначно Caps

        // Если Caps не содержит класс активности, значит мы его только включаем, а значит переводим сиволы клавиатуры в верхний регистр
        if (!containActiveClassCapsLock) {
            fillKeyboardNewSymbols(upperCaseCapsSymbols);
        }
        // И наоборот, если имеется, значит мы желаем выключить Caps, и переводим регистр символов в нижний
        if (containActiveClassCapsLock) {
            fillKeyboardNewSymbols(lowerCaseSymbols);
        }

        currentKeyDown.classList.toggle(targetStyleActiveKey);
        return;
    }
    // TODO Логика CapsLock
    // Если у нас не CapsLock, тогда мы добавляем активность на нажатую клавишу
    currentKeyDown.classList.add(targetStyleActiveKey);
    // Если был нажат какой-либо Shift, тогда мы меняем символы в другую раскладку, которая отличается от Caps
    if (checkShift(keyCodeAttribute)) {
        fillKeyboardNewSymbols(upperCaseShiftSymbols);
    }

    // TODO Keyup
    /*  Единственное стабильное решение которое я нашёл, это не использовать addEventListener, а назначать обработчик через свойство-событие узла.
        Если назначать обработчик keyup через addEventListener, тогда нужно потом удалять его, иначе каждый раз будет срабатывать множество обработчиков которые вешаются при каждом нажатии клавиши, они одинаковые, но для JS они разные, как с объектами короче, и с каждым новым нажатием будет срабатывать этот обработчик + 1 такой-же, по сути этот обработчик будет "инкрементироваться", это будет очень ресурсозатратно, после 3 минут ввода, при очередном нажатии клавиши будет срабатывать столько обработчиков - сколько пользователь всего нажимал клавиш за всё время ввода.

        А если удалять каждый раз обработчик, в этом случае ранее зажатые клавиши при отпускании последней зажатой, на них не удалится класс активности, например: зажали 3 клавиши, отпустили третью(последнюю нажатую в комбинации), класс активности удалится только с неё, а 2 остались с активным классом, т.к на них keyup обработчика уже нет (Он сработал на первой отпущенной клавише из комбинаций и мы его удалили, поэтому на ранее зажатых клавишах, логики keyup просто не будет).

        Можно удалять классы активности тех клавиш, которые были помечены при keydown, но в этом случае с Shift будут проблемы, т.к мы можем и хотим удерживать Shift, и при этом нажимать другие клавиши, но если мы введём и отпустим любую клавишу при удержании Shift, то и класс активности Shift тоже снимется, в общем такой вот парадокс, но с document.onkeyup вроде работает как мне нужно.
    */
    document.onkeyup = function listenerKeyup(event) {
        const currentKeyUp = document.querySelector(`.keyboard .keyboard__key[data-keyCode="${event.code}"]`);
        if (currentKeyUp === null) return; // Если такой клавиши на клавиатуре нет, то просто выходим, сами клавиши которых нет на клавиатуре будут работать, например Num Pad
        const keyCodeAttribute = currentKeyUp.dataset.keycode;
        // Если отпущена любая клавиша кроме пробела, то удаляем активность, а пробел остаётся активным до следующего нажатия
        if (!checkCapsLock(keyCodeAttribute)) {
            currentKeyUp.classList.remove(targetStyleActiveKey);
        }
        // Когда отпускаем Shift
        if (checkShift(keyCodeAttribute)) {
            // Проверяем был ли в этот момент активирован Caps, если да, тогда ставим раскладку которая соответствует Caps, т.к он ещё активирован
            if (containActiveClassCapsLock) {
                fillKeyboardNewSymbols(upperCaseCapsSymbols);
                // Если Caps не был активирован, значит клавиши с буквами тоже переводим в нижний регистр
            } else {
                fillKeyboardNewSymbols(lowerCaseSymbols);
            }
        }
    }
    // TODO Keyup

});



//* Создание логики реагирования клавиатуры на клики мыши, т.е то, для чего по сути и нужна виртуальная клавиатура...
// Отключим на клавиатуре возможное выделение текста на клавишах при частых кликах, нам это не нужно
keyboard.onmousedown = () => false;
// При наведении на клавиатуру поставим в поле ввода фокус
keyboard.addEventListener('mouseover', () => {inputField.focus();});

keyboard.addEventListener('mousedown', (event) => {
    const targetKey = event.target.closest('.keyboard__key');
    if (!targetKey) return; // Если элемент есть, значит выполняем логику ниже
    const keyCodeAttribute = targetKey.dataset.keycode;
    const keySymbol = targetKey.textContent;
    const currentStyleKeyboard = keyboard.classList[1];
    const targetStyleActiveKey = keyboardStyleClasses[currentStyleKeyboard];
    const containActiveClassCapsLock = capsLock.classList.contains(targetStyleActiveKey);
    // Имеется ли класс активности либо в левом либо в правом Shift
    const containActiveClassShift = leftShift.classList.contains(targetStyleActiveKey) || rightShift.classList.contains(targetStyleActiveKey);
    const selectionStartTextarea = inputField.selectionStart;
    const selectionEndTextarea = inputField.selectionEnd;

    // TODO Логика CapsLock
    // Если мы поймали CapsLock, то мы через toggle даём клавише активность
    // При следующем нажатии на Caps, класс активности снимется и клавиша уже сама будет неактивна на аппаратном уровне
    if (checkCapsLock(keyCodeAttribute)) {
        // Здесь у нас currentKeyDown однозначно Caps

        // Если Caps не содержит класс активности, значит мы его только включаем, а значит переводим символы клавиатуры в верхний регистр
        if (!containActiveClassCapsLock) {
            fillKeyboardNewSymbols(upperCaseCapsSymbols);
        }
        // И наоборот, если имеется, значит мы желаем выключить Caps, и переводим регистр символов в нижний
        if (containActiveClassCapsLock) {
            // Если при выключении Caps, был активирован Shift, то мы выводим символы характерные для зажатого Shift
            if (containActiveClassShift) {
                fillKeyboardNewSymbols(upperCaseShiftSymbols);
            } else { // Иначе, переводим всё в нижний регистр
                fillKeyboardNewSymbols(lowerCaseSymbols);
            }
        }
        targetKey.classList.toggle(targetStyleActiveKey);
        return;
    }
    // TODO Логика CapsLock

    // TODO Логика Shift
    // Если был нажат какой-либо Shift, тогда мы меняем символы в другую раскладку, которая отличается от Caps
    if (checkShift(keyCodeAttribute)) {
         // Если Shift не содержит класс активности, значит мы его только включаем, а значит переводим сиволы клавиатуры в верхний регистр
        if (!containActiveClassShift) {
            fillKeyboardNewSymbols(upperCaseShiftSymbols);
        }
        // И наоборот, если имеется, значит мы желаем выключить Shift, и переводим регистр символов в нижний
        if (containActiveClassShift) {
            // Если при выключении Shift, был активирован Caps, то мы выводим символы характерные для активного Caps
            if (containActiveClassCapsLock) {
                fillKeyboardNewSymbols(upperCaseCapsSymbols);
            } else { // Иначе, переводим всё в нижний регистр
                fillKeyboardNewSymbols(lowerCaseSymbols);
            }
        }

        // Делаем активными левый и правый Shift
        leftShift.classList.toggle(targetStyleActiveKey);
        rightShift.classList.toggle(targetStyleActiveKey);
        return;
    }
    // TODO Логика Shift

    // Если у нас не CapsLock, тогда мы добавляем активность на нажатую клавишу
    targetKey.classList.add(targetStyleActiveKey);

    // Вставляем наш символ клавиши в позицию курсора (с помощью спец.функции)
    if (!specialKeys.has(keyCodeAttribute)) { // Если клавиша не является специальной, выводим в поле textContent её содержимого
        inputField.setRangeText(keySymbol, selectionStartTextarea, selectionEndTextarea, "end");
    } else { // иначе если это всё-таки спец.клавиша
        // Делаем особое поведение для некоторых клавиш
        actionSpecialKey();
        function actionSpecialKey() {
            if (keyCodeAttribute == 'Enter') {
                inputField.setRangeText('\n', selectionStartTextarea, selectionEndTextarea, "end");
            }
            if (keyCodeAttribute == 'Tab') {
                inputField.setRangeText('\t', selectionStartTextarea, selectionEndTextarea, "end");
            }
            if (keyCodeAttribute == 'Space') {
                inputField.setRangeText(' ', selectionStartTextarea, selectionEndTextarea, "end");
            }
            if (keyCodeAttribute == 'Backspace') {
                let textAreaValue = inputField.value;
                let positionCursor = inputField.selectionStart;
                if (positionCursor > 0) {
                    // Получили позицию строки от начала до курсора минус 1(так как удаляем 1 символ при нажатии)
                    let firstPartString = textAreaValue.slice(0, positionCursor - 1);
                    // Вторая часть от позиции курсора до конца
                    let secondPartString = textAreaValue.slice(positionCursor);

                    // Вывели склеенную строку за вычетом 1 символа перед курсором
                    inputField.value = firstPartString + secondPartString;
                    // Установили курсор в позицию где произошло удаление
                    inputField.setSelectionRange(positionCursor - 1, positionCursor - 1);
                }
            }

        }
        
    }
    

    // TODO Исправление небольшого казуса при быстрых кликах
    // При нажатии мышкой клавиши, начинаем отслеживать движение курсора по всей клавиатуре
    // mousemove здесь для того, чтобы при быстрых кликах на разные клавиши, у нас не было "залипания" стиля активности клавиши, чтобы если случайно клавиша была зажата, а отпущена в другом месте, у нас эта самая зажатая клавиша не осталась в таком состоянии, т.е стиль нажатия на ней не остался случайно.
    keyboard.onmousemove = (event) => {
        /* Специально не отбираем ближайшую клавишу по closest, будет попытка считать дата атрибут элемента у которого нет такого атрибута, такого свойства у объекта dataset не будет, он вернёт нам undefined, и это нам на руку, потому что в этом случае, как только мы вылезем за граниы клавиши, сразу сбросится её активность, а так эта активность сбрасывалась бы только если мы зажали курсор на клавише и протащили бы его до следующей клавиши.
        */
        const moveCodeAttribute = event.target.dataset.keycode;
        // Код нажатой клавиши отличается от той, на котором сейчас курсор? Если да - тогда мы ушли с нажатой клавиши, удаляем её активность.
        if (keyCodeAttribute !== moveCodeAttribute) {
            targetKey.classList.remove(targetStyleActiveKey);
            keyboard.onmousemove = null;
            return;
        }
    };
    // TODO Исправление небольшого казуса при быстрых кликах

    // TODO MOUSEUP
    // И при отпускании последней нажатой клавиши мы удаляем с неё класс активности
    keyboard.addEventListener('mouseup', listenerMouseup);
    function listenerMouseup(event) {
        const targetKeyUp = event.target.closest('.keyboard__key');
        if (targetKeyUp === null) return; // Если такой клавиши на клавиатуре нет, то просто выходим, сами клавиши которых нет на клавиатуре будут работать, например Num Pad
        // Если отпущена любая клавиша кроме пробела, то удаляем активность, а пробел остаётся активным до следующего нажатия
            targetKeyUp.classList.remove(targetStyleActiveKey);
        
        // При отпускании клавиши, завершаем отслеживание курсора mousemove на клавиатуре
        keyboard.onmousemove = null;
        
        keyboard.removeEventListener('mouseup', listenerMouseup);
    }
    // TODO MOUSEUP
});


// TODO Функции для проверок отдельных клавиш ------------------------------------------------------
// Принимает аргументом код активной в данный момент клавиши, код из атрибута, функции используются и в событиях клавиатуры и в событиях мыши
// Т.е сделал более универсальные функции
function checkCapsLock(keyCode) {
    return (keyCode == 'CapsLock') ? true : false;
}
// Проверяет был ли нажат Shift при событии клавиатуры
function checkShift(keyCode) {
    return (keyCode == 'ShiftLeft' || keyCode == 'ShiftRight') ? true : false;
}
// TODO Функции для проверок отдельных клавиш ------------------------------------------------------

// TODO Функция заполнения. Одна из самых частых функций -------------------------------------------
// Функция заполняет все символьные клавишами символами верхнего или нижнего регистра, в зависимости от того, какой объект передан в качестве аргумента
function fillKeyboardNewSymbols(objKeySymbols) {
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
// TODO Функция заполнения. Одна из самых частых функций -------------------------------------------

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
        fillKeyboardNewSymbols(lowerCaseSymbols);
        // И проверяем, если класс активности у CapsLock есть, значит удаляем его
        // Т.е мы переключаем новый стиль клавиатуры, сбрасываем капс и всё как с чистого листа
        if (capsLock.classList[2]) {
            capsLock.classList.remove(keyboardStyleClasses[currentStyleKeyboard]);
        }
        if (leftShift.classList[2] || rightShift.classList[2]) {
            leftShift.classList.remove(keyboardStyleClasses[currentStyleKeyboard]);
            rightShift.classList.remove(keyboardStyleClasses[currentStyleKeyboard]);
        }
        // Удалили текущий класс стиля
        keyboard.classList.remove(currentStyleKeyboard);
        // Добавили новый стиль
        keyboard.classList.add(targetStyle);
    });
}
// TODO Изменение стиля клавиатуры -------------------------------------------
