import { globalToggle, noteInput, answerInput, selectedCell } from "./keyboard.js";


/* #region  columns */
let column1 = [];
let column2 = [];
let column3 = [];
let column4 = [];
let column5 = [];
let column6 = [];
let column7 = [];
let column8 = [];
let column9 = [];
let columnArray = [column1, column2, column3, column4, column5, column6, column7, column8, column9];
/* #endregion */

/* #region  blocks */
let block1 = [];
let block2 = [];
let block3 = [];
let block4 = [];
let block5 = [];
let block6 = [];
let block7 = [];
let block8 = [];
let block9 = [];
let blockArray = [block1, block2, block3, block4, block5, block6, block7, block8, block9];
/* #endregion */


let cellsArray = document.getElementsByClassName('cell');

for (let i = 0; i < cellsArray.length; i++) {

    //adds cells into appropriate column arrays
    switch (cellsArray[i].id[1]) {
        case '1':
            column1.push(cellsArray[i]);
            cellsArray[i].setAttribute('data-column', 'column1');
            break;
        case '2':
            column2.push(cellsArray[i]);
            cellsArray[i].setAttribute('data-column', 'column2');
            break;
        case '3':
            column3.push(cellsArray[i]);
            cellsArray[i].style.borderRight = '6px solid black';
            cellsArray[i].setAttribute('data-column', 'column3');
            break;
        case '4':
            column4.push(cellsArray[i]);
            cellsArray[i].setAttribute('data-column', 'column4');
            break;
        case '5':
            column5.push(cellsArray[i]);
            cellsArray[i].setAttribute('data-column', 'column5');
            break;
        case '6':
            column6.push(cellsArray[i]);
            cellsArray[i].style.borderRight = '6px solid black';
            cellsArray[i].setAttribute('data-column', 'column6');
            break;
        case '7':
            column7.push(cellsArray[i]);
            cellsArray[i].setAttribute('data-column', 'column7');
            break;
        case '8':
            column8.push(cellsArray[i]);
            cellsArray[i].setAttribute('data-column', 'column8');
            break;
        case '9':
            column9.push(cellsArray[i]);
            cellsArray[i].setAttribute('data-column', 'column9');
            break;
    }

    switch (cellsArray[i].id[0]) {
        case 'a':
            cellsArray[i].setAttribute('data-row', 'rowA');
            break;
        case 'b':
            cellsArray[i].setAttribute('data-row', 'rowB');
            break;
        case 'c':
            cellsArray[i].setAttribute('data-row', 'rowC');
            break;
        case 'd':
            cellsArray[i].setAttribute('data-row', 'rowD');
            break;
        case 'e':
            cellsArray[i].setAttribute('data-row', 'rowE');
            break;
        case 'f':
            cellsArray[i].setAttribute('data-row', 'rowF');
            break;
        case 'g':
            cellsArray[i].setAttribute('data-row', 'rowG');
            break;
        case 'h':
            cellsArray[i].setAttribute('data-row', 'rowH');
            break;
        case 'i':
            cellsArray[i].setAttribute('data-row', 'rowI');
            break;
    }

    //sorts cells into appropriate block arrays
    let blockNumber = cellsArray[i].dataset.block;
    blockNumber = eval(blockNumber);
    for (let j = 0; j < blockArray.length; j++) {

        if (blockNumber == blockArray[j]) {
            blockArray[j].push(cellsArray[i]);
        }

    }

    //toggles selected class for cells on click
    if (cellsArray[i].classList[1] !== 'given') {
        $(cellsArray[i]).on('click', function () {

            for (let j = 0; j < cellsArray.length; j++) {
                if (cellsArray[j].dataset.isSelected == 'true') {
                    cellsArray[j].dataset.isSelected = 'false';
                    cellsArray[j].classList.remove('selected');
                }
            }
            cellsArray[i].classList.add('selected');
            cellsArray[i].dataset.isSelected = 'true';

        })
    }

}
console.log(blockArray);

/* #region  rows */
let rowA = document.getElementById('rowA');

let rowB = document.getElementById('rowB');

let rowC = document.getElementById('rowC');
rowC.style.borderBottom = '6px solid black';

let rowD = document.getElementById('rowD');

let rowE = document.getElementById('rowE');

let rowF = document.getElementById('rowF');
rowF.style.borderBottom = '6px solid black';

let rowG = document.getElementById('rowG');

let rowH = document.getElementById('rowH');

let rowI = document.getElementById('rowI');

let rowArray = [rowA, rowB, rowC, rowD, rowE, rowF, rowG];
/* #endregion */


//number input stuff

let numberButtons = document.getElementsByClassName('number-input');

for (let i = 0; i < numberButtons.length; i++) {

    $(numberButtons[i]).on('click', function () {
        let notesCollection = $(selectedCell).find('.note');
        console.log(notesCollection);
        let key = numberButtons[i].innerText;
        key = Number(key);

        if (globalToggle == true) {
            noteInput(key, notesCollection);
        } else if (globalToggle == false) {
            answerInput(key, notesCollection);
        }

    })

}

export { columnArray, column1, column2, column3, column4, column5, column6, column7, column8, column9, rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH, rowArray, block1, block2, block3, block4, block5, block6, block7, block8, block9, blockArray };