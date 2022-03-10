//флаги настроек и состояний

let isGameStarted = false;
let isGamePaused = true;
let sizeField = 4;
sizeField = (Number(localStorage.getItem('field')) || 4);
let nullPositionMemory = sizeField * sizeField - 1;
let isItNotLoad = true;
let isSoundActive = true;
let isOnlyWinActive = true;
let movesCount = 0;
let minCount = 0;
let secCount = 0;

let arrMoveScoreList = [];
let arrTimeScoreList = [];
let num1;
let num2;
let num3;
let num4;
let num5;
let numNew;
let miNew;
let secNew;

var audio = new Audio('click.mp3');
var audioWin = new Audio('win.mp3');

//генерация случайных чисел 

function getRandomInRange (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//проверка на совпадение с числами массива

function isHereDouble (arr, test) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === test) {
        return false;
        }
    }
    return true;
}

// генерация подходящего массива чисел

let arrayPartsTotal = [];
let memoryRandom;

function generateNewFieldArray () {
    arrayPartsTotal = [];
    while (arrayPartsTotal.length < (sizeField * sizeField) - 1) {
        memoryRandom = getRandomInRange(1, ((sizeField * sizeField) - 1));
        if (isHereDouble(arrayPartsTotal, memoryRandom)) {
            arrayPartsTotal.push(memoryRandom);
        }
    }
    arrayPartsTotal.push(null);
    if (checkCompletable() && isItNotLoad && isOnlyWinActive) {
        let arrTemp = [];
        arrTemp.push(arrayPartsTotal[0]);
        arrayPartsTotal[0] = arrayPartsTotal[1];
        arrayPartsTotal[1] = arrTemp[0];
    }
}

// проверка на собираемость 

function checkCompletable () {
    let countCompletable = 0;
    for (let i = 0; i < arrayPartsTotal.length - 2; i++) {
        for (let j = i + 1; j < arrayPartsTotal.length - 1; j++) {
            if (arrayPartsTotal[i] < arrayPartsTotal[j]) {
                countCompletable++;
            }
        }
    }
    if (countCompletable % 2) {
        if (sizeField % 2 === 0) {
            return false; 
        }
        else {
            return true;
        } 
    }
    else {
        if (sizeField % 2 === 0) {
            return true; 
        }
        else {
            return false;
        } 
    }
}

//отрисовка игрового поля

const body = document.getElementById('body');
let headerAdd = document.createElement('header');
body.appendChild(headerAdd);
headerAdd.classList.add('headermain');
const header = document.querySelector('.headermain');
let divTimeAdd = document.createElement('div');
header.appendChild(divTimeAdd);
divTimeAdd.classList.add('divtime');
const divtime = document.querySelector('.divtime');
let navTimeAdd = document.createElement('nav');
divtime.appendChild(navTimeAdd);
navTimeAdd.classList.add('desc2');
navTimeAdd.classList.add('time');
const time = document.querySelector('.time');
time.textContent = 'Time ';
let pTimeAdd = document.createElement('p');
divtime.appendChild(pTimeAdd);
pTimeAdd.classList.add('desc2');
pTimeAdd.classList.add('timetext');
const timeText = document.querySelector('.timetext');
timeText.textContent = '00 : 00';
let divMovesAdd = document.createElement('div');
header.appendChild(divMovesAdd);
divMovesAdd.classList.add('divmoves');
const divmoves = document.querySelector('.divmoves');
let navMovesAdd = document.createElement('nav');
divmoves.appendChild(navMovesAdd);
navMovesAdd.classList.add('desc2');
navMovesAdd.classList.add('moves');
const moves = document.querySelector('.moves');
moves.textContent = 'Moves ';
let pMovesAdd = document.createElement('p');
divmoves.appendChild(pMovesAdd);
pMovesAdd.classList.add('desc2');
pMovesAdd.classList.add('movestext');
const movesText = document.querySelector('.movestext');
movesText.textContent = movesCount;
let divPauseAdd = document.createElement('div');
header.appendChild(divPauseAdd);
divPauseAdd.classList.add('divpause');
const divpause = document.querySelector('.divpause');
let navPauseAdd = document.createElement('nav');
divpause.appendChild(navPauseAdd);
navPauseAdd.classList.add('desc');
navPauseAdd.classList.add('pause');
const pause = document.querySelector('.pause');
pause.textContent = 'Pause';
let pPauseAdd = document.createElement('p');
divpause.appendChild(pPauseAdd);
pPauseAdd.classList.add('desc');
pPauseAdd.classList.add('pausetext');
const pauseText = document.querySelector('.pausetext');
pauseText.textContent = 'Continue';
let boardAdd = document.createElement('div');
body.appendChild(boardAdd);
boardAdd.classList.add('board');
const board = document.querySelector('.board');

//отрисовка всех элементов html

let divBoardAdd = document.createElement('div');
body.appendChild(divBoardAdd);
divBoardAdd.classList.add('boardMenu');
const boardMenu = document.querySelector('.boardMenu');
let textHelloAdd = document.createElement('p');
boardMenu.appendChild(textHelloAdd);
textHelloAdd.classList.add('text');
textHelloAdd.classList.add('textHello');
const textHello = document.querySelector('.textHello');
textHello.textContent = 'Приветики!';
let newBtn1Add = document.createElement('nav');
boardMenu.appendChild(newBtn1Add);
newBtn1Add.classList.add('newBtn');
newBtn1Add.classList.add('newBtn1');
const newBtn1 = document.querySelector('.newBtn1');
newBtn1.textContent = 'Новая игра';
let newBtn2Add = document.createElement('nav');
boardMenu.appendChild(newBtn2Add);
newBtn2Add.classList.add('newBtn');
newBtn2Add.classList.add('newBtn2');
const newBtn2 = document.querySelector('.newBtn2');
newBtn2.textContent = 'Загрузить';
let newBtn3Add = document.createElement('nav');
boardMenu.appendChild(newBtn3Add);
newBtn3Add.classList.add('newBtn');
newBtn3Add.classList.add('newBtn3');
const newBtn3 = document.querySelector('.newBtn3');
newBtn3.textContent = 'Сохранить';
let newBtn4Add = document.createElement('nav');
boardMenu.appendChild(newBtn4Add);
newBtn4Add.classList.add('newBtn');
newBtn4Add.classList.add('newBtn4');
const newBtn4 = document.querySelector('.newBtn4');
newBtn4.textContent = 'Настройки';
let newBtn5Add = document.createElement('nav');
boardMenu.appendChild(newBtn5Add);
newBtn5Add.classList.add('newBtn');
newBtn5Add.classList.add('newBtn5');
const newBtn5 = document.querySelector('.newBtn5');
newBtn5.textContent = 'Правила';
let newBtn6Add = document.createElement('nav');
boardMenu.appendChild(newBtn6Add);
newBtn6Add.classList.add('newBtn');
newBtn6Add.classList.add('newBtn6');
const newBtn6 = document.querySelector('.newBtn6');
newBtn6.textContent = 'Рекорды';
let divBoarSettingsdAdd = document.createElement('div');
body.appendChild(divBoarSettingsdAdd);
divBoarSettingsdAdd.classList.add('boardSettings');
const boardSettings = document.querySelector('.boardSettings');
let btnSetRuenAdd = document.createElement('label');
boardSettings.appendChild(btnSetRuenAdd);
btnSetRuenAdd.classList.add('btnSet');
btnSetRuenAdd.classList.add('btnSetRuen');
const btnSetRuen = document.querySelector('.btnSetRuen');
btnSetRuen.textContent = 'Смена языка';
let selValueRuenAdd = document.createElement('select');
boardSettings.appendChild(selValueRuenAdd);
selValueRuenAdd.classList.add('selValue');
selValueRuenAdd.classList.add('selValueRuen');
const selValueRuen = document.querySelector('.selValueRuen');
let selValueRuAdd = document.createElement('option');
selValueRuen.appendChild(selValueRuAdd);
selValueRuAdd.classList.add('selValueRu');
const selValueRu = document.querySelector('.selValueRu');
selValueRu.textContent = 'Русский';
selValueRu.setAttribute('value', 'ru');
selValueRu.setAttribute('selected', ''); 
let selValueEnAdd = document.createElement('option');
selValueRuen.appendChild(selValueEnAdd);
selValueEnAdd.classList.add('selValueEn');
const selValueEn = document.querySelector('.selValueEn');
selValueEn.textContent = 'English';
selValueEn.setAttribute('value', 'en');
let btnSetSizeAdd = document.createElement('label');
boardSettings.appendChild(btnSetSizeAdd);
btnSetSizeAdd.classList.add('btnSet');
btnSetSizeAdd.classList.add('btnSetSize');
const btnSetSize = document.querySelector('.btnSetSize');
btnSetSize.textContent = 'Размер поля';
let selValueSizeAdd = document.createElement('select');
boardSettings.appendChild(selValueSizeAdd);
selValueSizeAdd.classList.add('selValue');
selValueSizeAdd.classList.add('selValueSize');
const selValueSize = document.querySelector('.selValueSize');
let selValue3Add = document.createElement('option');
selValueSize.appendChild(selValue3Add);
selValue3Add.classList.add('selValue3');
const selValue3 = document.querySelector('.selValue3');
selValue3.textContent = '3х3';
selValue3.setAttribute('value', '3');
let selValue4Add = document.createElement('option');
selValueSize.appendChild(selValue4Add);
selValue4Add.classList.add('selValue4');
const selValue4 = document.querySelector('.selValue4');
selValue4.setAttribute('selected', '');
selValue4.textContent = '4х4';
selValue4.setAttribute('value', '4');
let selValue5Add = document.createElement('option');
selValueSize.appendChild(selValue5Add);
selValue5Add.classList.add('selValue5');
const selValue5 = document.querySelector('.selValue5');
selValue5.textContent = '5х5';
selValue5.setAttribute('value', '5');
let selValue6Add = document.createElement('option');
selValueSize.appendChild(selValue6Add);
selValue6Add.classList.add('selValue6');
const selValue6 = document.querySelector('.selValue6');
selValue6.textContent = '6х6';
selValue6.setAttribute('value', '6');
let selValue7Add = document.createElement('option');
selValueSize.appendChild(selValue7Add);
selValue7Add.classList.add('selValue7');
const selValue7 = document.querySelector('.selValue7');
selValue7.textContent = '7х7';
selValue7.setAttribute('value', '7');
let selValue8Add = document.createElement('option');
selValueSize.appendChild(selValue8Add);
selValue8Add.classList.add('selValue8');
const selValue8 = document.querySelector('.selValue8');
selValue8.textContent = '8х8';
selValue8.setAttribute('value', '8');
let btnSetSoundAdd = document.createElement('label');
boardSettings.appendChild(btnSetSoundAdd);
btnSetSoundAdd.classList.add('btnSet');
btnSetSoundAdd.classList.add('btnSetSound');
const btnSetSound = document.querySelector('.btnSetSound');
btnSetSound.textContent = 'Звук';
let selValueSoundAdd = document.createElement('select');
boardSettings.appendChild(selValueSoundAdd);
selValueSoundAdd.classList.add('selValue');
selValueSoundAdd.classList.add('selValueSound');
const selValueSound = document.querySelector('.selValueSound');
let selValueOnAdd = document.createElement('option');
selValueSound.appendChild(selValueOnAdd);
selValueOnAdd.classList.add('selValueOn');
const selValueOn = document.querySelector('.selValueOn');
selValueOn.textContent = 'Вкл';
selValueOn.setAttribute('selected', '');
selValueOn.setAttribute('value', 'soundon');
let selValueOffAdd = document.createElement('option');
selValueSound.appendChild(selValueOffAdd);
selValueOffAdd.classList.add('selValueOff');
const selValueOff = document.querySelector('.selValueOff');
selValueOff.textContent = 'Выкл';
selValueOff.setAttribute('value', 'soundoff');
let btnSetAnimAdd = document.createElement('label');
boardSettings.appendChild(btnSetAnimAdd);
btnSetAnimAdd.classList.add('btnSet');
btnSetAnimAdd.classList.add('btnSetAnim');
const btnSetAnim = document.querySelector('.btnSetAnim');
btnSetAnim.textContent = 'Генерация поля';
let selValueAnimAdd = document.createElement('select');
boardSettings.appendChild(selValueAnimAdd);
selValueAnimAdd.classList.add('selValue');
selValueAnimAdd.classList.add('selValueAnim');
const selValueAnim = document.querySelector('.selValueAnim');
let selValueAnimOnAdd = document.createElement('option');
selValueAnim.appendChild(selValueAnimOnAdd);
selValueAnimOnAdd.classList.add('selValueAnimOn');
const selValueAnimOn = document.querySelector('.selValueAnimOn');
selValueAnimOn.setAttribute('selected', '');
selValueAnimOn.textContent = 'Выигрышные';
selValueAnimOn.setAttribute('value', 'win');
let selValueAnimOffAdd = document.createElement('option');
selValueAnim.appendChild(selValueAnimOffAdd);
selValueAnimOffAdd.classList.add('selValueAnimOff');
const selValueAnimOff = document.querySelector('.selValueAnimOff');
selValueAnimOff.textContent = 'Случайно';
selValueAnimOff.setAttribute('value', 'random');
let buttonBack1Add = document.createElement('p');
boardSettings.appendChild(buttonBack1Add);
buttonBack1Add.classList.add('back');
buttonBack1Add.classList.add('back1');
const backButton1 = document.querySelector('.back1');
backButton1.textContent = 'НАЗАД';
let boardRulesAdd = document.createElement('div');
body.appendChild(boardRulesAdd);
boardRulesAdd.classList.add('boardRules');
const boardRules = document.querySelector('.boardRules');
let textRulesAdd = document.createElement('p');
boardRules.appendChild(textRulesAdd);
textRulesAdd.classList.add('textRules');
const textRules = document.querySelector('.textRules');
textRules.textContent = 'Пятнашки - головоломка, представляющая собой 15 квадратных костяшек с нанесенными числами от 1 до 15. Все костяшки заключены в квадратную коробку размером 4x4 (сторона квадрата коробки в четыре раза длиннее, чем у костяшки). Таким образом при размещении костяшек в коробке остается одно пустое место размером с одну костяшку, которое можно использовать для перемещения костяшек внутри коробки. Цель игры - упорядочить размещение чисел в коробке, разместив их по возрастанию слева направо и сверху вниз, начиная с костяшки с номером 1 в левом верхнем углу и заканчивая пустым местом в правом нижнем углу коробки.'
let buttonBack2Add = document.createElement('p');
boardRules.appendChild(buttonBack2Add);
buttonBack2Add.classList.add('back');
buttonBack2Add.classList.add('back2');
const backButton2 = document.querySelector('.back2');
backButton2.textContent = 'НАЗАД';
let boardScoresAdd = document.createElement('div');
body.appendChild(boardScoresAdd);
boardScoresAdd.classList.add('boardScores');
const boardScores = document.querySelector('.boardScores');
let textTopAdd = document.createElement('p');
boardScores.appendChild(textTopAdd);
textTopAdd.classList.add('text');
textTopAdd.classList.add('textTop');
const textTop = document.querySelector('.textTop');
textTop.textContent = 'ТОП - 5';
let btnRulesAdd = document.createElement('label');
boardScores.appendChild(btnRulesAdd);
btnRulesAdd.classList.add('btnRules');
const btnRules = document.querySelector('.btnRules');
let selRulesTimeAdd = document.createElement('select');
btnRules.appendChild(selRulesTimeAdd);
selRulesTimeAdd.classList.add('selRules');
selRulesTimeAdd.classList.add('selRulesTime');
const selRulesTime = document.querySelector('.selRulesTime');
let selRulesTime1Add = document.createElement('option');
selRulesTime.appendChild(selRulesTime1Add);
selRulesTime1Add.classList.add('selRulesTime1');
const selRulesTime1 = document.querySelector('.selRulesTime1');
selRulesTime1.textContent = 'Ходы';
selRulesTime1.setAttribute('value', 'xmoves');
selRulesTime1.setAttribute('selected', '');
let selRulesTime2Add = document.createElement('option');
selRulesTime.appendChild(selRulesTime2Add);
selRulesTime2Add.classList.add('selRulesTime2');
const selRulesTime2 = document.querySelector('.selRulesTime2');
selRulesTime2.textContent = 'Время';
selRulesTime2.setAttribute('value', 'xtime');
let selRulesFieldAdd = document.createElement('select');
btnRules.appendChild(selRulesFieldAdd);
selRulesFieldAdd.classList.add('selRules');
selRulesFieldAdd.classList.add('selRulesField');
const selRulesField = document.querySelector('.selRulesField');
let selScore3Add = document.createElement('option');
selRulesField.appendChild(selScore3Add);
selScore3Add.classList.add('selScore3');
const selScore3 = document.querySelector('.selScore3');
selScore3.textContent = '3х3';
selScore3.setAttribute('value', 'x3');
let selScore4Add = document.createElement('option');
selRulesField.appendChild(selScore4Add);
selScore4Add.classList.add('selScore4');
const selScore4 = document.querySelector('.selScore4');
selScore4.textContent = '4х4';
selScore4.setAttribute('value', 'x4');
selScore4.setAttribute('selected', '');
let selScore5Add = document.createElement('option');
selRulesField.appendChild(selScore5Add);
selScore5Add.classList.add('selScore5');
const selScore5 = document.querySelector('.selScore5');
selScore5.textContent = '5х5';
selScore5.setAttribute('value', 'x5');
let selScore6Add = document.createElement('option');
selRulesField.appendChild(selScore6Add);
selScore6Add.classList.add('selScore6');
const selScore6 = document.querySelector('.selScore6');
selScore6.textContent = '6х6';
selScore6.setAttribute('value', 'x6');
let selScore7Add = document.createElement('option');
selRulesField.appendChild(selScore7Add);
selScore7Add.classList.add('selScore7');
const selScore7 = document.querySelector('.selScore7');
selScore7.textContent = '7х7';
selScore7.setAttribute('value', 'x7');
let selScore8Add = document.createElement('option');
selRulesField.appendChild(selScore8Add);
selScore8Add.classList.add('selScore8');
const selScore8 = document.querySelector('.selScore8');
selScore8.textContent = '8х8';
selScore8.setAttribute('value', 'x8');
let text21Add = document.createElement('p');
boardScores.appendChild(text21Add);
text21Add.classList.add('text2');
text21Add.classList.add('text21');
const text21 = document.querySelector('.text21');
text21.textContent = '1. ';
let text22Add = document.createElement('p');
boardScores.appendChild(text22Add);
text22Add.classList.add('text2');
text22Add.classList.add('text22');
const text22 = document.querySelector('.text22');
text22.textContent = '2. ';
let text23Add = document.createElement('p');
boardScores.appendChild(text23Add);
text23Add.classList.add('text2');
text23Add.classList.add('text23');
const text23 = document.querySelector('.text23');
text23.textContent = '3. ';
let text24Add = document.createElement('p');
boardScores.appendChild(text24Add);
text24Add.classList.add('text2');
text24Add.classList.add('text24');
const text24 = document.querySelector('.text24');
text24.textContent = '4. ';
let text25Add = document.createElement('p');
boardScores.appendChild(text25Add);
text25Add.classList.add('text2');
text25Add.classList.add('text25');
const text25 = document.querySelector('.text25');
text25.textContent = '5. ';
let buttonBack3Add = document.createElement('p');
boardScores.appendChild(buttonBack3Add);
buttonBack3Add.classList.add('back');
buttonBack3Add.classList.add('back3');
const backButton3 = document.querySelector('.back3');
backButton3.textContent = 'НАЗАД';

if (sizeField === 3) {
    removeAllSelected();
    selValue3.setAttribute('selected', '');
    board.style.gridTemplateColumns = 'repeat(3, 1fr)';
}
if (sizeField === 4) {
    removeAllSelected();
    selValue4.setAttribute('selected', '');
    board.style.gridTemplateColumns = 'repeat(4, 1fr)';
}
if (sizeField === 5) {
    removeAllSelected();
    selValue5.setAttribute('selected', '');
    board.style.gridTemplateColumns = 'repeat(5, 1fr)';
}
if (sizeField === 6) {
    removeAllSelected();
    selValue6.setAttribute('selected', '');
    board.style.gridTemplateColumns = 'repeat(6, 1fr)';
}
if (sizeField === 7) {
    removeAllSelected();
    selValue7.setAttribute('selected', '');
    board.style.gridTemplateColumns = 'repeat(7, 1fr)';
}
if (sizeField === 8) {
    removeAllSelected();
    selValue8.setAttribute('selected', '');
    board.style.gridTemplateColumns = 'repeat(8, 1fr)';
}

//заполнение поля фишками

generateNewFieldArray();


let buttonAdd = document.createElement('button');
let arrayBonesWindow = [];


function fillingFieldHtml (n) {
    let buttonAdd = document.createElement('button');
    board.appendChild(buttonAdd);
    buttonAdd.classList.add('bone');
    buttonAdd.classList.add('bone' + n);
    window['bone' + n] = document.querySelector('.bone' + n); 
    window['bone' + n].textContent = arrayPartsTotal[n];
    arrayBonesWindow.push(window['bone' + n]);
}

function initFillingHtml () {
    for(let i = 0; i < (sizeField * sizeField); i++) {
        if (arrayPartsTotal[i] == null) {
            let buttonEmptyAdd = document.createElement('div');
            board.appendChild(buttonEmptyAdd);
            buttonEmptyAdd.classList.add('empty');
            empty = document.querySelector('.empty'); 
            arrayBonesWindow.push(null);
            continue;
        }
        fillingFieldHtml(i);
    }
}

initFillingHtml();

console.log(body);

//обработчики кликов, нажатия, перетаскивания и т.п.

function deleteAllBoard () {
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

function initBoneListener () {
    for(let i = 0; i < sizeField * sizeField; i++) {
        if (arrayPartsTotal[i] == null) {
            continue;
        }
        window['bone' + i].addEventListener('click', function () {boneMove(i)});
    }
}
initBoneListener();


let memoryBoneCurrent;
function boneMove (current) {
    if(arrayPartsTotal[current - sizeField] === null || arrayPartsTotal[current - 1] === null || arrayPartsTotal[current + 1] === null || arrayPartsTotal[current + sizeField] === null) {
        if (isSoundActive) {
            audio.play();
        }
        movesCount++;
        movesText.textContent = movesCount;
        deleteAllBoard();
        arrayPartsTotal[nullPositionMemory] = arrayPartsTotal[current];
        arrayPartsTotal[current] = null;
        nullPositionMemory = current;
        initFillingHtml();
        if (isGameStarted) {
            initBoneListener();
        }
        for(let i = 0; i < sizeField * sizeField; i++) {
            if (i === sizeField * sizeField - 1) {
                // событие победы
                deleteAllBoard();
                let textWinAdd = document.createElement('p');
                board.appendChild(textWinAdd);
                textWinAdd.classList.add('textWin');
                textWinAdd.classList.add('text');
                const textWin = document.querySelector('.textWin');
                textWin.textContent = 'Ура! Вы решили головоломку за ' + addZero(minCount) + ':' + addZeroSec(secCount) + ' и ' + movesCount + ' ходов';
                bestScores(sizeField, addZeroSec(secCount), addZero(minCount), movesCount);
                movesCount = 0;
                movesText.textContent = movesCount;
                minCount = 0;
                secCount = 0;
                timeText.textContent = addZero(minCount) + ' : ' + addZeroSec(secCount);
                isGameStarted = false;
                emptyLocalStorage();
                if (isSoundActive) {
                    audioWin.play();
                }
                setTimeout(resetGame, 3000);
            }
            else if (arrayPartsTotal[i] !== i + 1) {
                break;
            }
        }
    }
}

function resetGame () {
    deleteAllBoard();
    setAllNone();
    localStorage.setItem('save15', '');
    isGamePaused = true;
    boardMenu.style.display = 'block';
}

// переходы по меню

function setAllNone () {
    board.style.display = 'none';
    boardMenu.style.display = 'none';
    boardSettings.style.display = 'none';
    boardRules.style.display = 'none';
    boardScores.style.display = 'none';
}

divpause.addEventListener('click', function () {pauseGame()});

function pauseGame () {
    if (isGameStarted) {
        if (isGamePaused === false) {
            isGamePaused = true;
            setAllNone();
            boardMenu.style.display = 'block';
        }
        else {
            isGamePaused = false;
            setAllNone();
            board.style.display = 'grid';
        }
    } 
    setTimeout(startStopTime, 10);
}

newBtn1.addEventListener('click', function () {newGame()});

function newGame () {
    movesCount = 0;
    movesText.textContent = movesCount;
    isGamePaused = false;
    isGameStarted = true;
    arrayPartsTotal = [];
    generateNewFieldArray();
    deleteAllBoard();
    initFillingHtml();
    nullPositionMemory = sizeField * sizeField - 1;
    initBoneListener();
    setAllNone();
    board.style.display = 'grid';
    minCount = 0;
    secCount = 0;
    movesCount = 0;
    timeText.textContent = addZero(minCount) + ' : ' + addZero(secCount);
    setTimeout(startStopTime, 10);
}

newBtn2.addEventListener('click', function () {loadGame()});

let tempArrayToString = '';
let tempGenElement = '';

function generateArrayLoad () {
    tempArrayToString = localStorage.getItem('save15');
    tempArrayToString += ',';
    for (let i = 0; i < tempArrayToString.length; i++) {
        if (i === 0 && tempArrayToString[i] === ',') {
            arrayPartsTotal.push(null);
        }
        else if (tempArrayToString[i] !== 'n' && tempArrayToString[i] !== ',') {
            tempGenElement += tempArrayToString[i];
        }
        else if (tempArrayToString[i] === ',' && tempArrayToString[i + 1] === ',') {
            arrayPartsTotal.push(Number(tempGenElement));
            tempGenElement = '';
            arrayPartsTotal.push(null);
            i++;        
        }
        else if (tempArrayToString[i] === ',') {
            arrayPartsTotal.push(Number(tempGenElement));
            tempGenElement = '';
        }
        
    }
}

function emptyLocalStorage () {
    localStorage.setItem('save15', '');
    localStorage.setItem('position', '');
    localStorage.setItem('move15', '');
    localStorage.setItem('sec15', '');
    localStorage.setItem('min15', '');
}

function loadGame () {
    if (localStorage.getItem('save15') !== null && localStorage.getItem('save15') !== '') {
        arrayPartsTotal = []
        isGamePaused = false;
        isGameStarted = true;
        sizeField = Number(localStorage.getItem('field'));
        generateArrayLoad();
        deleteAllBoard();
        isItNotLoad = false;
        initFillingHtml();
        isItNotLoad = true;
        nullPositionMemory = Number(localStorage.getItem('position'));
        initBoneListener();
        setAllNone();
        board.style.display = 'grid';
        setTimeout(startStopTime, 10);
        movesCount = localStorage.getItem('move15');
        movesText.textContent = movesCount;
        secCount = localStorage.getItem('sec15');
        minCount = localStorage.getItem('min15');
    }
}

newBtn3.addEventListener('click', function () {saveGame()});

function saveGame () {
    if (isGameStarted) {
        tempArrayToString = arrayPartsTotal.join();
        localStorage.setItem('save15', tempArrayToString);
        localStorage.setItem('position', nullPositionMemory);
        localStorage.setItem('move15', movesCount);
        localStorage.setItem('sec15', secCount);
        localStorage.setItem('min15', minCount);
        localStorage.setItem('field', sizeField);
    }
}

newBtn4.addEventListener('click', function () {settingsGame()});

function settingsGame () {
    setAllNone();
    boardSettings.style.display = 'grid';
}

newBtn5.addEventListener('click', function () {ruleGame()});

function ruleGame () {
    setAllNone();
    boardRules.style.display = 'block';
}

newBtn6.addEventListener('click', function () {scoreGame()});

function scoreGame () {
    displayScore();
    setAllNone();
    boardScores.style.display = 'block';
}

backButton1.addEventListener('click', function () {backToMenu()});
backButton2.addEventListener('click', function () {backToMenu()});
backButton3.addEventListener('click', function () {backToMenu()});

function backToMenu () {
    setAllNone();
    boardMenu.style.display = 'block';
}

// перевод

function langOnStart () {
    if (localStorage.getItem('lang') === 'en') {
        setEn();
    }
    else {
        setRu();
    }
}

langOnStart();

selValueRuen.addEventListener('change', function () {setRuEn()});

function setRuEn () {
    if (selValueRuen.value === 'ru') {
        setRu();
    }
    if (selValueRuen.value === 'en') {
        setEn();
    }
}

function setRu () {
    selValueEn.removeAttribute('selected');
    selValueRu.setAttribute('selected', '');
    localStorage.setItem('lang', 'ru');
    time.textContent = 'Время :';
    moves.textContent = 'Ходы :';
    pause.textContent = 'Пауза /';
    pauseText.textContent = 'Продолжить';
    textHello.textContent = 'Приветики!';
    newBtn1.textContent = 'Новая игра';
    newBtn2.textContent = 'Загрузить';
    newBtn3.textContent = 'Сохранить';
    newBtn4.textContent = 'Настройки';
    newBtn5.textContent = 'Правила';
    newBtn6.textContent = 'Рекорды';
    btnSetRuen.textContent = 'Смена языка';
    btnSetSize.textContent = 'Размер поля';
    btnSetSound.textContent = 'Звук';
    selValueOn.textContent = 'Вкл';
    selValueOff.textContent = 'Выкл';
    btnSetAnim.textContent = 'Генерация поля';
    selValueAnimOn.textContent = 'Выигрышные';
    selValueAnimOff.textContent = 'Случайно';
    backButton1.textContent = 'НАЗАД';
    textRules.textContent = 'Пятнашки - головоломка, представляющая собой 15 квадратных костяшек с нанесенными числами от 1 до 15. Все костяшки заключены в квадратную коробку размером 4x4 (сторона квадрата коробки в четыре раза длиннее, чем у костяшки). Таким образом при размещении костяшек в коробке остается одно пустое место размером с одну костяшку, которое можно использовать для перемещения костяшек внутри коробки. Цель игры - упорядочить размещение чисел в коробке, разместив их по возрастанию слева направо и сверху вниз, начиная с костяшки с номером 1 в левом верхнем углу и заканчивая пустым местом в правом нижнем углу коробки.'
    backButton2.textContent = 'НАЗАД';
    textTop.textContent = 'ТОП - 5';
    selRulesTime1.textContent = 'Ходы';
    selRulesTime2.textContent = 'Время';
    backButton3.textContent = 'НАЗАД';
}

function setEn () {
    selValueRu.removeAttribute('selected');
    selValueEn.setAttribute('selected', '');
    localStorage.setItem('lang', 'en');
    time.textContent = 'Time :';
    moves.textContent = 'Moves :';
    pause.textContent = 'Pause /';
    pauseText.textContent = 'Continue';
    textHello.textContent = 'Hello!';
    newBtn1.textContent = 'New game';
    newBtn2.textContent = 'Load';
    newBtn3.textContent = 'Save';
    newBtn4.textContent = 'Settings';
    newBtn5.textContent = 'Rules';
    newBtn6.textContent = 'Best scores';
    btnSetRuen.textContent = 'Language';
    btnSetSize.textContent = 'Field size';
    btnSetSound.textContent = 'Sound';
    selValueOn.textContent = 'on';
    selValueOff.textContent = 'off';
    btnSetAnim.textContent = 'Field generation';
    selValueAnimOn.textContent = 'Completable';
    selValueAnimOff.textContent = 'Randomly';
    backButton1.textContent = 'BACK';
    textRules.textContent = 'Game is a sliding puzzle that consists of a frame of numbered square tiles in random order with one tile missing. The puzzle also exists in other sizes, particularly the smaller 8-puzzle. If the size is 3×3 tiles, the puzzle is called the 8-puzzle or 9-puzzle, and if 4×4 tiles, the puzzle is called the 15-puzzle or 16-puzzle named, respectively, for the number of tiles and the number of spaces. The object of the puzzle is to place the tiles in order by making sliding moves that use the empty space.'
    backButton2.textContent = 'BACK';
    textTop.textContent = 'TOP - 5';
    selRulesTime1.textContent = 'Moves';
    selRulesTime2.textContent = 'Time';
    backButton3.textContent = 'BACK';
}

// работа со звуком

selValueSound.addEventListener('change', function () {setSound()});

function setSound () {
    if (selValueSound.value === 'soundon') {
        isSoundActive = true;
    }
    if (selValueSound.value === 'soundoff') {
        isSoundActive = false;
    }
}

// выигрышность

selValueAnim.addEventListener('change', function () {setWinRandom()});

function setWinRandom () {
    if (selValueAnim.value === 'win') {
        isOnlyWinActive = true;
    }
    if (selValueAnim.value === 'random') {
        isOnlyWinActive = false;
    }
}

//выбор размера поля

selValueSize.addEventListener('change', function () {setSize()});


function setSize () {
    isGameStarted = false;
    emptyLocalStorage();
    if (selValueSize.value === '3') {
        sizeField = 3;
        removeAllSelected();
        selValue3.setAttribute('selected', '');
        board.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
    if (selValueSize.value === '4') {
        sizeField = 4;
        removeAllSelected();
        selValue4.setAttribute('selected', '');
        board.style.gridTemplateColumns = 'repeat(4, 1fr)';
    }
    if (selValueSize.value === '5') {
        sizeField = 5;
        removeAllSelected();
        selValue5.setAttribute('selected', '');
        board.style.gridTemplateColumns = 'repeat(5, 1fr)';
    }
    if (selValueSize.value === '6') {
        sizeField = 6;
        removeAllSelected();
        selValue6.setAttribute('selected', '');
        board.style.gridTemplateColumns = 'repeat(6, 1fr)';
    }
    if (selValueSize.value === '7') {
        sizeField = 7;
        removeAllSelected();
        selValue7.setAttribute('selected', '');
        board.style.gridTemplateColumns = 'repeat(7, 1fr)';
    }
    if (selValueSize.value === '8') {
        sizeField = 8;
        removeAllSelected();
        selValue8.setAttribute('selected', '');
        board.style.gridTemplateColumns = 'repeat(8, 1fr)';
    }
}

function removeAllSelected () {
    selValue3.removeAttribute('selected');
    selValue4.removeAttribute('selected');
    selValue5.removeAttribute('selected');
    selValue6.removeAttribute('selected');
    selValue7.removeAttribute('selected');
    selValue8.removeAttribute('selected');
}

//отслеживание времени


function startStopTime () {
    if (isGameStarted && !isGamePaused) {
        if (secCount < 3000) {
            secCount++;
        }
        else {
            minCount++
            secCount = 0;
        }
        timeText.textContent = addZero(minCount) + ' : ' + addZeroSec(secCount);
        setTimeout(startStopTime, 20);
    }
}

  
function addZero(n) {
    if (n < 10) {
        return '0' + String(n);
    }
    else {
        return String(n);
    }
    
}

function addZeroSec(n) {
    n = Math.floor(n / 50);
    if (n < 10) {
        return '0' + String(n);
    }
    else {
        return String(n);
    }
    
}

//топ-10 результатов, массив и обработчик

function initScore () {
    text21.textContent = '1. ' + (localStorage.getItem('m41'));
    text22.textContent = '2. ' + (localStorage.getItem('m42'));
    text23.textContent = '3. ' + (localStorage.getItem('m43'));
    text24.textContent = '4. ' + (localStorage.getItem('m44'));
    text25.textContent = '5. ' + (localStorage.getItem('m45'));
}

initScore();

selRulesField.addEventListener('change', function () {displayScore()});
selRulesTime.addEventListener('change', function () {displayScore()});

function displayScore () {
    addXtimeCheck();
    if (selRulesTime.value === 'xmoves') {
        if (selRulesField.value === 'x3') {
            text21.textContent = '1. ' + (localStorage.getItem('m31'));
            text22.textContent = '2. ' + (localStorage.getItem('m32'));
            text23.textContent = '3. ' + (localStorage.getItem('m33'));
            text24.textContent = '4. ' + (localStorage.getItem('m34'));
            text25.textContent = '5. ' + (localStorage.getItem('m35'));
        }
        if (selRulesField.value === 'x4') {
            text21.textContent = '1. ' + (localStorage.getItem('m41'));
            text22.textContent = '2. ' + (localStorage.getItem('m42'));
            text23.textContent = '3. ' + (localStorage.getItem('m43'));
            text24.textContent = '4. ' + (localStorage.getItem('m44'));
            text25.textContent = '5. ' + (localStorage.getItem('m45'));
        }
        if (selRulesField.value === 'x5') {
            text21.textContent = '1. ' + (localStorage.getItem('m51'));
            text22.textContent = '2. ' + (localStorage.getItem('m52'));
            text23.textContent = '3. ' + (localStorage.getItem('m53'));
            text24.textContent = '4. ' + (localStorage.getItem('m54'));
            text25.textContent = '5. ' + (localStorage.getItem('m55'));
        }
        if (selRulesField.value === 'x6') {
            text21.textContent = '1. ' + (localStorage.getItem('m61'));
            text22.textContent = '2. ' + (localStorage.getItem('m62'));
            text23.textContent = '3. ' + (localStorage.getItem('m63'));
            text24.textContent = '4. ' + (localStorage.getItem('m64'));
            text25.textContent = '5. ' + (localStorage.getItem('m65'));
        }
        if (selRulesField.value === 'x7') {
            text21.textContent = '1. ' + (localStorage.getItem('m71'));
            text22.textContent = '2. ' + (localStorage.getItem('m72'));
            text23.textContent = '3. ' + (localStorage.getItem('m73'));
            text24.textContent = '4. ' + (localStorage.getItem('m74'));
            text25.textContent = '5. ' + (localStorage.getItem('m75'));
        }
        if (selRulesField.value === 'x8') {
            text21.textContent = '1. ' + (localStorage.getItem('m81'));
            text22.textContent = '2. ' + (localStorage.getItem('m82'));
            text23.textContent = '3. ' + (localStorage.getItem('m83'));
            text24.textContent = '4. ' + (localStorage.getItem('m84'));
            text25.textContent = '5. ' + (localStorage.getItem('m85'));
        }
    }
}

function addXtimeCheck () {
    if (selRulesTime.value === 'xtime') {
        if (selRulesField.value === 'x3') {
            text21.textContent = '1. ' + (localStorage.getItem('t31'));
            text22.textContent = '2. ' + (localStorage.getItem('t32'));
            text23.textContent = '3. ' + (localStorage.getItem('t33'));
            text24.textContent = '4. ' + (localStorage.getItem('t34'));
            text25.textContent = '5. ' + (localStorage.getItem('t35'));
        }
        if (selRulesField.value === 'x4') {
            text21.textContent = '1. ' + (localStorage.getItem('t41'));
            text22.textContent = '2. ' + (localStorage.getItem('t42'));
            text23.textContent = '3. ' + (localStorage.getItem('t43'));
            text24.textContent = '4. ' + (localStorage.getItem('t44'));
            text25.textContent = '5. ' + (localStorage.getItem('t45'));
        }
        if (selRulesField.value === 'x5') {
            text21.textContent = '1. ' + (localStorage.getItem('t51'));
            text22.textContent = '2. ' + (localStorage.getItem('t52'));
            text23.textContent = '3. ' + (localStorage.getItem('t53'));
            text24.textContent = '4. ' + (localStorage.getItem('t54'));
            text25.textContent = '5. ' + (localStorage.getItem('t55'));
        }
        if (selRulesField.value === 'x6') {
            text21.textContent = '1. ' + (localStorage.getItem('t61'));
            text22.textContent = '2. ' + (localStorage.getItem('t62'));
            text23.textContent = '3. ' + (localStorage.getItem('t63'));
            text24.textContent = '4. ' + (localStorage.getItem('t64'));
            text25.textContent = '5. ' + (localStorage.getItem('t65'));
        }
        if (selRulesField.value === 'x7') {
            text21.textContent = '1. ' + (localStorage.getItem('t71'));
            text22.textContent = '2. ' + (localStorage.getItem('t72'));
            text23.textContent = '3. ' + (localStorage.getItem('t73'));
            text24.textContent = '4. ' + (localStorage.getItem('t74'));
            text25.textContent = '5. ' + (localStorage.getItem('t75'));
        }
        if (selRulesField.value === 'x8') {
            text21.textContent = '1. ' + (localStorage.getItem('t81'));
            text22.textContent = '2. ' + (localStorage.getItem('t82'));
            text23.textContent = '3. ' + (localStorage.getItem('t83'));
            text24.textContent = '4. ' + (localStorage.getItem('t84'));
            text25.textContent = '5. ' + (localStorage.getItem('t85'));
        }
    }
}

function bestScores (size, sec, mi, move) {
    miNew = mi;
    secNew = sec;
    numNew = move;
    if (size === 3) {
        compareScore3();
        localStorage.setItem('m31', arrMoveScoreList[0]);
        localStorage.setItem('m32', arrMoveScoreList[1]);
        localStorage.setItem('m33', arrMoveScoreList[2]);
        localStorage.setItem('m34', arrMoveScoreList[3]);
        localStorage.setItem('m35', arrMoveScoreList[4]);
        localStorage.setItem('t31', arrTimeScoreList[0]);
        localStorage.setItem('t32', arrTimeScoreList[1]);
        localStorage.setItem('t33', arrTimeScoreList[2]);
        localStorage.setItem('t34', arrTimeScoreList[3]);
        localStorage.setItem('t35', arrTimeScoreList[4]);
    }
    if (size === 4) {
        compareScore4();
        localStorage.setItem('m41', arrMoveScoreList[0]);
        localStorage.setItem('m42', arrMoveScoreList[1]);
        localStorage.setItem('m43', arrMoveScoreList[2]);
        localStorage.setItem('m44', arrMoveScoreList[3]);
        localStorage.setItem('m45', arrMoveScoreList[4]);
        localStorage.setItem('t41', arrTimeScoreList[0]);
        localStorage.setItem('t42', arrTimeScoreList[1]);
        localStorage.setItem('t43', arrTimeScoreList[2]);
        localStorage.setItem('t44', arrTimeScoreList[3]);
        localStorage.setItem('t45', arrTimeScoreList[4]);
    }
    if (size === 5) {
        compareScore5();
        localStorage.setItem('m51', arrMoveScoreList[0]);
        localStorage.setItem('m52', arrMoveScoreList[1]);
        localStorage.setItem('m53', arrMoveScoreList[2]);
        localStorage.setItem('m54', arrMoveScoreList[3]);
        localStorage.setItem('m55', arrMoveScoreList[4]);
        localStorage.setItem('t51', arrTimeScoreList[0]);
        localStorage.setItem('t52', arrTimeScoreList[1]);
        localStorage.setItem('t53', arrTimeScoreList[2]);
        localStorage.setItem('t54', arrTimeScoreList[3]);
        localStorage.setItem('t55', arrTimeScoreList[4]);
    }
    if (size === 6) {
        compareScore6();
        localStorage.setItem('m61', arrMoveScoreList[0]);
        localStorage.setItem('m62', arrMoveScoreList[1]);
        localStorage.setItem('m63', arrMoveScoreList[2]);
        localStorage.setItem('m64', arrMoveScoreList[3]);
        localStorage.setItem('m65', arrMoveScoreList[4]);
        localStorage.setItem('t61', arrTimeScoreList[0]);
        localStorage.setItem('t62', arrTimeScoreList[1]);
        localStorage.setItem('t63', arrTimeScoreList[2]);
        localStorage.setItem('t64', arrTimeScoreList[3]);
        localStorage.setItem('t65', arrTimeScoreList[4]);
    }
    if (size === 7) {
        compareScore7();
        localStorage.setItem('m71', arrMoveScoreList[0]);
        localStorage.setItem('m72', arrMoveScoreList[1]);
        localStorage.setItem('m73', arrMoveScoreList[2]);
        localStorage.setItem('m74', arrMoveScoreList[3]);
        localStorage.setItem('m75', arrMoveScoreList[4]);
        localStorage.setItem('t71', arrTimeScoreList[0]);
        localStorage.setItem('t72', arrTimeScoreList[1]);
        localStorage.setItem('t73', arrTimeScoreList[2]);
        localStorage.setItem('t74', arrTimeScoreList[3]);
        localStorage.setItem('t75', arrTimeScoreList[4]);
    }
    if (size === 8) {
        compareScore8();
        localStorage.setItem('m81', arrMoveScoreList[0]);
        localStorage.setItem('m82', arrMoveScoreList[1]);
        localStorage.setItem('m83', arrMoveScoreList[2]);
        localStorage.setItem('m84', arrMoveScoreList[3]);
        localStorage.setItem('m85', arrMoveScoreList[4]);
        localStorage.setItem('t81', arrTimeScoreList[0]);
        localStorage.setItem('t82', arrTimeScoreList[1]);
        localStorage.setItem('t83', arrTimeScoreList[2]);
        localStorage.setItem('t84', arrTimeScoreList[3]);
        localStorage.setItem('t85', arrTimeScoreList[4]);
    }
}

// сравнение рекордов

function compareScore3 () {
    arrMoveScoreList = [];
    num1 = localStorage.getItem('m31');
    num2 = localStorage.getItem('m32');
    num3 = localStorage.getItem('m33');
    num4 = localStorage.getItem('m34');
    num5 = localStorage.getItem('m35');
    arrMoveScoreList.push(numNew);
    if (Number(num1) !== 0) {
        arrMoveScoreList.push(Number(num1));
    }
    if (Number(num2) !== 0) {
        arrMoveScoreList.push(Number(num2));
    }
    if (Number(num3) !== 0) {
        arrMoveScoreList.push(Number(num3));
    }
    if (Number(num4) !== 0) {
        arrMoveScoreList.push(Number(num4));
    }
    if (Number(num5) !== 0) {
        arrMoveScoreList.push(Number(num5));
    }
        moveSort();
    if (Number(num1) === 0) {
        arrMoveScoreList.push(num1);
    }
    if (Number(num2) === 0) {
        arrMoveScoreList.push(num2);
    }
    if (Number(num3) === 0) {
        arrMoveScoreList.push(num3);
    }
    if (Number(num4) === 0) {
        arrMoveScoreList.push(num4);
    }
    arrTimeScoreList = [];
    num1 = String(localStorage.getItem('t31'));
    num2 = String(localStorage.getItem('t32'));
    num3 = String(localStorage.getItem('t33'));
    num4 = String(localStorage.getItem('t34'));
    num5 = String(localStorage.getItem('t35'));
    arrTimeScoreList.push(miNew + ':' + secNew);
    if (num1 === '0') {num1 = '00:00'}
    if (num2 === '0') {num2 = '00:00'}
    if (num3 === '0') {num3 = '00:00'}
    if (num4 === '0') {num4 = '00:00'}
    if (num5 === '0') {num5 = '00:00'}
    arrTimeScoreList.push(num1);
    arrTimeScoreList.push(num2);
    arrTimeScoreList.push(num3);
    arrTimeScoreList.push(num4);
    arrTimeScoreList.push(num5);
    arrTimeScoreList.sort();
    while (arrTimeScoreList[0] === '00:00') {
        arrTimeScoreList.push(arrTimeScoreList.shift());
    }
}

function compareScore4 () {
    arrMoveScoreList = [];
    num1 = localStorage.getItem('m41');
    num2 = localStorage.getItem('m42');
    num3 = localStorage.getItem('m43');
    num4 = localStorage.getItem('m44');
    num5 = localStorage.getItem('m45');
    arrMoveScoreList.push(numNew);
    if (Number(num1) !== 0) {
        arrMoveScoreList.push(Number(num1));
    }
    if (Number(num2) !== 0) {
        arrMoveScoreList.push(Number(num2));
    }
    if (Number(num3) !== 0) {
        arrMoveScoreList.push(Number(num3));
    }
    if (Number(num4) !== 0) {
        arrMoveScoreList.push(Number(num4));
    }
    if (Number(num5) !== 0) {
        arrMoveScoreList.push(Number(num5));
    }
        moveSort();
    if (Number(num1) === 0) {
        arrMoveScoreList.push(num1);
    }
    if (Number(num2) === 0) {
        arrMoveScoreList.push(num2);
    }
    if (Number(num3) === 0) {
        arrMoveScoreList.push(num3);
    }
    if (Number(num4) === 0) {
        arrMoveScoreList.push(num4);
    }
    arrTimeScoreList = [];
    num1 = String(localStorage.getItem('t41'));
    num2 = String(localStorage.getItem('t42'));
    num3 = String(localStorage.getItem('t43'));
    num4 = String(localStorage.getItem('t44'));
    num5 = String(localStorage.getItem('t45'));
    arrTimeScoreList.push(miNew + ':' + secNew);
    if (num1 === '0') {num1 = '00:00'}
    if (num2 === '0') {num2 = '00:00'}
    if (num3 === '0') {num3 = '00:00'}
    if (num4 === '0') {num4 = '00:00'}
    if (num5 === '0') {num5 = '00:00'}
    arrTimeScoreList.push(num1);
    arrTimeScoreList.push(num2);
    arrTimeScoreList.push(num3);
    arrTimeScoreList.push(num4);
    arrTimeScoreList.push(num5);
    arrTimeScoreList.sort();
    while (arrTimeScoreList[0] === '00:00') {
        arrTimeScoreList.push(arrTimeScoreList.shift());
    }
}

function compareScore5 () {
    arrMoveScoreList = [];
    num1 = localStorage.getItem('m51');
    num2 = localStorage.getItem('m52');
    num3 = localStorage.getItem('m53');
    num4 = localStorage.getItem('m54');
    num5 = localStorage.getItem('m55');
    arrMoveScoreList.push(numNew);
    if (Number(num1) !== 0) {
        arrMoveScoreList.push(Number(num1));
    }
    if (Number(num2) !== 0) {
        arrMoveScoreList.push(Number(num2));
    }
    if (Number(num3) !== 0) {
        arrMoveScoreList.push(Number(num3));
    }
    if (Number(num4) !== 0) {
        arrMoveScoreList.push(Number(num4));
    }
    if (Number(num5) !== 0) {
        arrMoveScoreList.push(Number(num5));
    }
        moveSort();
    if (Number(num1) === 0) {
        arrMoveScoreList.push(num1);
    }
    if (Number(num2) === 0) {
        arrMoveScoreList.push(num2);
    }
    if (Number(num3) === 0) {
        arrMoveScoreList.push(num3);
    }
    if (Number(num4) === 0) {
        arrMoveScoreList.push(num4);
    }
    arrTimeScoreList = [];
    num1 = String(localStorage.getItem('t51'));
    num2 = String(localStorage.getItem('t52'));
    num3 = String(localStorage.getItem('t53'));
    num4 = String(localStorage.getItem('t54'));
    num5 = String(localStorage.getItem('t55'));
    arrTimeScoreList.push(miNew + ':' + secNew);
    if (num1 === '0') {num1 = '00:00'}
    if (num2 === '0') {num2 = '00:00'}
    if (num3 === '0') {num3 = '00:00'}
    if (num4 === '0') {num4 = '00:00'}
    if (num5 === '0') {num5 = '00:00'}
    arrTimeScoreList.push(num1);
    arrTimeScoreList.push(num2);
    arrTimeScoreList.push(num3);
    arrTimeScoreList.push(num4);
    arrTimeScoreList.push(num5);
    arrTimeScoreList.sort();
    while (arrTimeScoreList[0] === '00:00') {
        arrTimeScoreList.push(arrTimeScoreList.shift());
    }
}

function compareScore6 () {
    arrMoveScoreList = [];
    num1 = localStorage.getItem('m61');
    num2 = localStorage.getItem('m62');
    num3 = localStorage.getItem('m63');
    num4 = localStorage.getItem('m64');
    num5 = localStorage.getItem('m65');
    arrMoveScoreList.push(numNew);
    if (Number(num1) !== 0) {
        arrMoveScoreList.push(Number(num1));
    }
    if (Number(num2) !== 0) {
        arrMoveScoreList.push(Number(num2));
    }
    if (Number(num3) !== 0) {
        arrMoveScoreList.push(Number(num3));
    }
    if (Number(num4) !== 0) {
        arrMoveScoreList.push(Number(num4));
    }
    if (Number(num5) !== 0) {
        arrMoveScoreList.push(Number(num5));
    }
        moveSort();
    if (Number(num1) === 0) {
        arrMoveScoreList.push(num1);
    }
    if (Number(num2) === 0) {
        arrMoveScoreList.push(num2);
    }
    if (Number(num3) === 0) {
        arrMoveScoreList.push(num3);
    }
    if (Number(num4) === 0) {
        arrMoveScoreList.push(num4);
    }
    arrTimeScoreList = [];
    num1 = String(localStorage.getItem('t61'));
    num2 = String(localStorage.getItem('t62'));
    num3 = String(localStorage.getItem('t63'));
    num4 = String(localStorage.getItem('t64'));
    num5 = String(localStorage.getItem('t65'));
    arrTimeScoreList.push(miNew + ':' + secNew);
    if (num1 === '0') {num1 = '00:00'}
    if (num2 === '0') {num2 = '00:00'}
    if (num3 === '0') {num3 = '00:00'}
    if (num4 === '0') {num4 = '00:00'}
    if (num5 === '0') {num5 = '00:00'}
    arrTimeScoreList.push(num1);
    arrTimeScoreList.push(num2);
    arrTimeScoreList.push(num3);
    arrTimeScoreList.push(num4);
    arrTimeScoreList.push(num5);
    arrTimeScoreList.sort();
    while (arrTimeScoreList[0] === '00:00') {
        arrTimeScoreList.push(arrTimeScoreList.shift());
    }
}

function compareScore7 () {
    arrMoveScoreList = [];
    num1 = localStorage.getItem('m71');
    num2 = localStorage.getItem('m72');
    num3 = localStorage.getItem('m73');
    num4 = localStorage.getItem('m74');
    num5 = localStorage.getItem('m75');
    arrMoveScoreList.push(numNew);
    if (Number(num1) !== 0) {
        arrMoveScoreList.push(Number(num1));
    }
    if (Number(num2) !== 0) {
        arrMoveScoreList.push(Number(num2));
    }
    if (Number(num3) !== 0) {
        arrMoveScoreList.push(Number(num3));
    }
    if (Number(num4) !== 0) {
        arrMoveScoreList.push(Number(num4));
    }
    if (Number(num5) !== 0) {
        arrMoveScoreList.push(Number(num5));
    }
        moveSort();
    if (Number(num1) === 0) {
        arrMoveScoreList.push(num1);
    }
    if (Number(num2) === 0) {
        arrMoveScoreList.push(num2);
    }
    if (Number(num3) === 0) {
        arrMoveScoreList.push(num3);
    }
    if (Number(num4) === 0) {
        arrMoveScoreList.push(num4);
    }
    arrTimeScoreList = [];
    num1 = String(localStorage.getItem('t71'));
    num2 = String(localStorage.getItem('t72'));
    num3 = String(localStorage.getItem('t73'));
    num4 = String(localStorage.getItem('t74'));
    num5 = String(localStorage.getItem('t75'));
    arrTimeScoreList.push(miNew + ':' + secNew);
    if (num1 === '0') {num1 = '00:00'}
    if (num2 === '0') {num2 = '00:00'}
    if (num3 === '0') {num3 = '00:00'}
    if (num4 === '0') {num4 = '00:00'}
    if (num5 === '0') {num5 = '00:00'}
    arrTimeScoreList.push(num1);
    arrTimeScoreList.push(num2);
    arrTimeScoreList.push(num3);
    arrTimeScoreList.push(num4);
    arrTimeScoreList.push(num5);
    arrTimeScoreList.sort();
    while (arrTimeScoreList[0] === '00:00') {
        arrTimeScoreList.push(arrTimeScoreList.shift());
    }
}

function compareScore8 () {
    arrMoveScoreList = [];
    num1 = localStorage.getItem('m81');
    num2 = localStorage.getItem('m82');
    num3 = localStorage.getItem('m83');
    num4 = localStorage.getItem('m84');
    num5 = localStorage.getItem('m85');
    arrMoveScoreList.push(numNew);
    if (Number(num1) !== 0) {
        arrMoveScoreList.push(Number(num1));
    }
    if (Number(num2) !== 0) {
        arrMoveScoreList.push(Number(num2));
    }
    if (Number(num3) !== 0) {
        arrMoveScoreList.push(Number(num3));
    }
    if (Number(num4) !== 0) {
        arrMoveScoreList.push(Number(num4));
    }
    if (Number(num5) !== 0) {
        arrMoveScoreList.push(Number(num5));
    }
        moveSort();
    if (Number(num1) === 0) {
        arrMoveScoreList.push(num1);
    }
    if (Number(num2) === 0) {
        arrMoveScoreList.push(num2);
    }
    if (Number(num3) === 0) {
        arrMoveScoreList.push(num3);
    }
    if (Number(num4) === 0) {
        arrMoveScoreList.push(num4);
    }
    arrTimeScoreList = [];
    num1 = String(localStorage.getItem('t81'));
    num2 = String(localStorage.getItem('t82'));
    num3 = String(localStorage.getItem('t83'));
    num4 = String(localStorage.getItem('t84'));
    num5 = String(localStorage.getItem('t85'));
    arrTimeScoreList.push(miNew + ':' + secNew);
    if (num1 === '0') {num1 = '00:00'}
    if (num2 === '0') {num2 = '00:00'}
    if (num3 === '0') {num3 = '00:00'}
    if (num4 === '0') {num4 = '00:00'}
    if (num5 === '0') {num5 = '00:00'}
    arrTimeScoreList.push(num1);
    arrTimeScoreList.push(num2);
    arrTimeScoreList.push(num3);
    arrTimeScoreList.push(num4);
    arrTimeScoreList.push(num5);
    arrTimeScoreList.sort();
    while (arrTimeScoreList[0] === '00:00') {
        arrTimeScoreList.push(arrTimeScoreList.shift());
    }
}

function moveSort () {
    arrMoveScoreList.sort(function (a, b) { 
        return a - b;
    });
}
