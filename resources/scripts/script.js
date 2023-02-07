import { globalToggle, noteInput, answerInput, selectedCell, noteCheck, modifyBoardCollection } from "./keyboard.js";
import { getBoard } from "./undo.js";
import { rotateToggle } from "./utilities.js";

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

/* #region  rows */
let rowA = [];
let rowACells = document.getElementById('rowA').children;
for (let i = 0; i < rowACells.length; i++) {
    rowA.push(rowACells[i]);
}
let rowB = [];
let rowBCells = document.getElementById('rowB').children;
for (let i = 0; i < rowBCells.length; i++) {
    rowB.push(rowBCells[i]);
}
let rowC = [];
let rowCCells = document.getElementById('rowC').children;
let rowCElement = document.getElementById('rowC');
rowCElement.style.borderBottom = '6px solid black';
for (let i = 0; i < rowCCells.length; i++) {
    rowC.push(rowCCells[i]);
}
let rowD = [];
let rowDCells = document.getElementById('rowD').children;
for (let i = 0; i < rowDCells.length; i++) {
    rowD.push(rowDCells[i]);
}
let rowE = [];
let rowECells = document.getElementById('rowE').children;
for (let i = 0; i < rowECells.length; i++) {
    rowE.push(rowECells[i]);
}
let rowF = [];
let rowFCells = document.getElementById('rowF').children;
let rowFElement = document.getElementById('rowF');
rowFElement.style.borderBottom = '6px solid black';
for (let i = 0; i < rowFCells.length; i++) {
    rowF.push(rowFCells[i]);
}
let rowG = [];
let rowGCells = document.getElementById('rowG').children;
for (let i = 0; i < rowGCells.length; i++) {
    rowG.push(rowGCells[i]);
}
let rowH = [];
let rowHCells = document.getElementById('rowH').children;
for (let i = 0; i < rowHCells.length; i++) {
    rowH.push(rowHCells[i]);
}
let rowI = [];
let rowICells = document.getElementById('rowI').children;
for (let i = 0; i < rowICells.length; i++) {
    rowI.push(rowICells[i]);
}
let rowArray = [rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH, rowI];
/* #endregion */

/* #region  declarations */
let frog = document.getElementById('frog');
let originalBoard;
let board = document.getElementById('board');
let cellsArray = document.getElementsByClassName('cell');
let cellArray = Array.from(cellsArray);
let highlightToggle = document.getElementById('highlight');
let noteHighlightToggle = document.getElementById('note-highlight');
let noteHighlightContainer = document.getElementById('note-highlight-container');
/* #endregion */


function highlightSame() {

    let currentCell;
    let selectedCells = document.getElementsByClassName('selected');
    let selectedGiven = document.getElementsByClassName('selected-given');
    let currentNum;
    let noteArray = $(cellArray).find('.note');

    if (selectedCells.length > selectedGiven.length) {
        currentCell = selectedCells[0];
    } else {
        currentCell = selectedGiven[0];
    }

    let answerSpot = $(currentCell).find('h1');
    if (answerSpot[0].innerText !== '') {

        currentNum = answerSpot[0].innerText;

    } else {
        for (let i = 0; i < cellArray.length; i++) {
            let cellAnswer = $(cellArray[i]).find('h1');
            cellAnswer[0].style.color = 'black';
            cellAnswer[0].style.fontWeight = 'normal';
        }

        for (let i = 0; i < noteArray.length; i++) {
            noteArray[i].style.color = 'black';
            noteArray[i].style.fontWeight = 'normal';
        }
        return;
    }

    for (let i = 0; i < cellArray.length; i++) {

        let cellAnswer = $(cellArray[i]).find('h1');
        if (cellAnswer[0].innerText == currentNum) {

            cellAnswer[0].style.color = 'cornflowerblue';
            cellAnswer[0].style.fontWeight = 'bold';

        } else {
            cellAnswer[0].style.color = 'black';
            cellAnswer[0].style.fontWeight = 'normal';
        }

    }

    if (noteHighlightToggle.checked) {

        for (let i = 0; i < noteArray.length; i++) {

            if (noteArray[i].innerText == currentNum) {
                noteArray[i].style.color = 'cornflowerblue';
                noteArray[i].style.fontWeight = 'bold';
            } else {
                noteArray[i].style.color = 'black';
                noteArray[i].style.fontWeight = 'normal';
            }
    
        }

    }


}

function resetGrid() {

    cellsArray = document.getElementsByClassName('cell');

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
                        cellsArray[j].classList.remove('selected-given');

                        if ((cellsArray[j].dataset.column == 'column3' || cellsArray[j].dataset.column == 'column6') && (cellsArray[j].classList[1] !== 'selected' && cellsArray[j].classList[2] !== 'selected-given')) {

                            cellsArray[j].style.borderRight = '6px solid black';

                        }
                    }
                }
                cellsArray[i].classList.add('selected');
                cellsArray[i].dataset.isSelected = 'true';

                if ((cellsArray[i].dataset.column == 'column3' || cellsArray[i].dataset.column == 'column6') && (cellsArray[i].classList[1] == 'selected' || cellsArray[i].classList[2] == 'selected-given')) {

                    cellsArray[i].style.borderRight = '8px solid black';


                }

                if (highlightToggle) {
                    highlightSame();
                }

            })
        } else {
            $(cellsArray[i]).on('click', function () {

                for (let j = 0; j < cellsArray.length; j++) {
                    if (cellsArray[j].dataset.isSelected == 'true') {
                        cellsArray[j].dataset.isSelected = 'false';
                        cellsArray[j].classList.remove('selected');
                        cellsArray[j].classList.remove('selected-given');

                        if ((cellsArray[j].dataset.column == 'column3' || cellsArray[j].dataset.column == 'column6') && (cellsArray[j].classList[1] !== 'selected' && cellsArray[j].classList[2] !== 'selected-given')) {

                            cellsArray[j].style.borderRight = '6px solid black';

                        }
                    }
                }
                cellsArray[i].classList.add('selected-given');
                cellsArray[i].dataset.isSelected = 'true';

                if ((cellsArray[i].dataset.column == 'column3' || cellsArray[i].dataset.column == 'column6') && (cellsArray[i].classList[1] == 'selected' || cellsArray[i].classList[2] == 'selected-given')) {

                    cellsArray[i].style.borderRight = '8px solid black';


                }

                if (highlightToggle) {
                    highlightSame();
                }

            })
        }

    }


    /* #region  rows */
    rowA = [];
    rowACells = document.getElementById('rowA').children;
    for (let i = 0; i < rowACells.length; i++) {
        rowA.push(rowACells[i]);
    }
    rowB = [];
    rowBCells = document.getElementById('rowB').children;
    for (let i = 0; i < rowBCells.length; i++) {
        rowB.push(rowBCells[i]);
    }
    rowC = [];
    rowCCells = document.getElementById('rowC').children;
    rowCElement = document.getElementById('rowC');
    rowCElement.style.borderBottom = '6px solid black';
    for (let i = 0; i < rowCCells.length; i++) {
        rowC.push(rowCCells[i]);
    }
    rowD = [];
    rowDCells = document.getElementById('rowD').children;
    for (let i = 0; i < rowDCells.length; i++) {
        rowD.push(rowDCells[i]);
    }
    rowE = [];
    rowECells = document.getElementById('rowE').children;
    for (let i = 0; i < rowECells.length; i++) {
        rowE.push(rowECells[i]);
    }
    rowF = [];
    rowFCells = document.getElementById('rowF').children;
    rowFElement = document.getElementById('rowF');
    rowFElement.style.borderBottom = '6px solid black';
    for (let i = 0; i < rowFCells.length; i++) {
        rowF.push(rowFCells[i]);
    }
    rowG = [];
    rowGCells = document.getElementById('rowG').children;
    for (let i = 0; i < rowGCells.length; i++) {
        rowG.push(rowGCells[i]);
    }
    rowH = [];
    rowHCells = document.getElementById('rowH').children;
    for (let i = 0; i < rowHCells.length; i++) {
        rowH.push(rowHCells[i]);
    }
    rowI = [];
    rowICells = document.getElementById('rowI').children;
    for (let i = 0; i < rowICells.length; i++) {
        rowI.push(rowICells[i]);
    }
    rowArray = [rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH, rowI];
    /* #endregion */


}

$(window).on('load', function () {

    resetGrid();

})

$(frog).on('click', function () {

    $(frog).animate({
        rotate: '360deg'
    }, 400);

    setTimeout(() => {
        $(frog).animate({
            rotate: '0deg'
        }, 0);
    })

    /*let gay = document.createElement('h1');
    gay.setAttribute('id', 'youre-gay');
    gay.innerText = "You're Gay!";
    $(gay).appendTo(board);

    $(gay).animate({
        top: '78%',
        opacity: '100%',
        fontSize: '40px'
    }, 500, 'swing')

    $(gay).animate({
        top: '20%',
        opacity: '0%',
        fontSize: '20px'
    }, 3000, 'swing');

    setTimeout(() => {

        $(gay).remove();


    }, 3500)*/

})

//number input stuff

let numberButtons = document.getElementsByClassName('number-input');

for (let i = 0; i < numberButtons.length; i++) {

    $(numberButtons[i]).on('click', function () {
        let notesCollection = $(selectedCell).find('.note');
        let key = numberButtons[i].innerText;
        key = Number(key);

        originalBoard = getBoard();
        modifyBoardCollection(originalBoard);

        if (globalToggle) {
            noteInput(key, notesCollection);
        } else if (globalToggle == false) {
            answerInput(key, notesCollection);
            noteCheck();
        }

    })

}

export { highlightSame, resetGrid, columnArray, column1, column2, column3, column4, column5, column6, column7, column8, column9, rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH, rowI, rowArray, block1, block2, block3, block4, block5, block6, block7, block8, block9, blockArray };