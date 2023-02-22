import { highlightSame, resetGrid, columnArray, column1, column2, column3, column4, column5, column6, column7, column8, column9, rowArray, rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH, rowI, block1, block2, block3, block4, block5, block6, block7, block8, block9, blockArray } from "./script.js";
import { undo, getBoard } from './undo.js';

/* #region  declarations */
let cellsArray = document.getElementsByClassName('cell');
let cellArray = Array.from(cellsArray);
let selectedCell = document.getElementsByClassName('selected');
let selectedGiven = document.getElementsByClassName('selected-given');

let noteToggle = document.getElementById('note-toggle');
let globalToggle = false;
let noteRemovalToggle = document.getElementById('note-removal');
let blueToggle = document.getElementById('blue-highlight');

let undoButton = document.getElementById('undo');
let originalBoard;
let boardCollection = [];

let highlightToggle = document.getElementById('highlight');
let previousKey;
/* #endregion */

$(noteToggle).on('click', function () {
    if (noteToggle.checked == true) {
        globalToggle = true;
    } else if (noteToggle.checked == false) {
        globalToggle = false;
    }
})

$(document).on('keypress', function (e) {
    let key = e.originalEvent.key;
    key = Number(key);
    if ((Number.isNaN(key) && e.originalEvent.shiftKey == false) || key == 0) {
        return;
    } else if (selectedGiven.length > selectedCell.length) {
        return;
    }
    let notesCollection = $(selectedCell).find('.note');

    originalBoard = getBoard();
    boardCollection.push(originalBoard);
    undoButton.style.color = 'rgb(214, 202, 185)';
    if (boardCollection.length > 10) {
        boardCollection = boardCollection.slice(1);
    }

    //note mode input
    if (globalToggle) {
        noteInput(key, notesCollection);
        //note input with shift key shortcut
    } else if (e.originalEvent.shiftKey) {
        key = e.originalEvent.code[5];
        key = Number(key);
        noteInput(key, notesCollection);
        //answer input
    } else if (globalToggle == false) {
        answerInput(key, notesCollection);
        if (blueToggle.checked == true) {
            noteCheck();
        }
    }
})

$(document).on('keydown', function (e) {

    let key = e.originalEvent.key;
    let notesCollection = $(selectedCell).find('.note');
    let controlToggled = false;

    if (key == 'Control' && previousKey == 'Control') {
        $(noteToggle).trigger('click');
        controlToggled = true;
    }

    if (key == 'Backspace') {

        let answerSpot = $(selectedCell).find('h1');

        if (selectedCell[0].dataset.isFilled == 'true') {

            selectedCell[0].dataset.isFilled = 'false';

            for (let i = 0; i < notesCollection.length; i++) {

                notesCollection[i].style.display = 'inline-flex';

            }

            answerSpot[0].innerText = '';

        } else {

            for (let i = 0; i < notesCollection.length; i++) {

                notesCollection[i].children[0].innerText = '';

            }

        }

    }

    if ((key == 'ArrowUp' || key == 'ArrowDown') || (key == 'ArrowLeft' || key == 'ArrowRight')) {

        e.preventDefault();
        arrowMove(key);

    }

    if (controlToggled) {
        previousKey = '';
    } else {
        previousKey = e.originalEvent.key;

    }

})

$(undoButton).on('click', function () {

    let arrayLength = boardCollection.length;
    let mostRecentBoard = boardCollection[arrayLength - 1];
    undo(mostRecentBoard);
    boardCollection.pop();
    if (boardCollection.length == 0) {
        undoButton.style.color = 'rgb(179, 168, 154)';
    }
    resetGrid();
})


//note mode function

function noteInput(num, notesCollection) {

    let noteIndex = num - 1;
    let selectedNote = notesCollection[noteIndex].children[0];
    //console.log(notesCollection);
    //console.log(selectedNote);
    if (selectedNote.innerText == '') {
        selectedNote.innerText = num.toString();
    } else if (selectedNote.innerText !== '') {
        selectedNote.innerText = '';
    }

}

//answer input function

function answerInput(num, notesCollection) {

    let answerSpot = $(selectedCell).find('h1');

    //if answering from notes
    if (selectedCell[0].dataset.isFilled == 'false') {

        selectedCell[0].dataset.isFilled = 'true';
        selectedCell[0].dataset.value = num.toString();


        for (let i = 0; i < notesCollection.length; i++) {
            notesCollection[i].style.display = 'none';
        }

        answerSpot[0].innerText = num.toString();

        if (noteRemovalToggle.checked == true) {
            removeNotes(num);
        }

        //remove answer and show notes again
    } else if (num.toString() == answerSpot[0].innerText) {

        selectedCell[0].dataset.isFilled = 'false';
        selectedCell[0].dataset.value = '';

        for (let i = 0; i < notesCollection.length; i++) {
            notesCollection[i].style.display = 'inline-flex';
        }

        answerSpot[0].innerText = '';

        //change answer if answer is already inputted
    } else if (num.toString() !== answerSpot[0].innerText) {

        answerSpot[0].innerText = num.toString();
        selectedCell[0].dataset.value = num.toString();

        if (noteRemovalToggle.checked == true) {
            removeNotes(num);
        }

    }

}

//check notes for conflicts

function noteCheck() {
    for (let i = 0; i < columnArray.length; i++) {

        let currentColumn = columnArray[i];

        for (let j = 0; j < currentColumn.length; j++) {

            let currentNum = j + 1;
            let noteCheck = '.note' + currentNum.toString();
            let remainingNote = $(currentColumn).find(noteCheck);
            let filledCheck = 'p:contains(' + currentNum.toString() + ')';
            remainingNote = $(remainingNote).find(filledCheck);
            remainingNote = Array.from(remainingNote);
            remainingNote = remainingNote.filter(function (e) {

                if (e.parentElement.parentElement.parentElement.dataset.isFilled == 'true') {
                    return false;
                }
                return e;
            })

            if (remainingNote.length == 1) {
                remainingNote[0].style.color = 'cornflowerblue';
                remainingNote[0].style.fontWeight = 'bold';
            }

        }

    }

    for (let i = 0; i < rowArray.length; i++) {
        let currentRow = rowArray[i];

        for (let j = 0; j < currentRow.length; j++) {

            let currentNum = j + 1;
            let noteCheck = '.note' + currentNum.toString();
            let remainingNote = $(currentRow).find(noteCheck);
            let filledCheck = 'p:contains(' + currentNum.toString() + ')';
            remainingNote = $(remainingNote).find(filledCheck);
            remainingNote = Array.from(remainingNote);
            remainingNote = remainingNote.filter(function (e) {

                if (e.parentElement.parentElement.parentElement.dataset.isFilled == 'true') {
                    return false;
                }
                return e;
            })

            if (remainingNote.length == 1) {
                remainingNote[0].style.color = 'cornflowerblue';
                remainingNote[0].style.fontWeight = 'bold';
            }

        }
    }

    for (let i = 0; i < blockArray.length; i++) {
        let currentBlock = blockArray[i];

        for (let j = 0; j < currentBlock.length; j++) {

            let currentNum = j + 1;
            let noteCheck = '.note' + currentNum.toString();
            let remainingNote = $(currentBlock).find(noteCheck);
            let filledCheck = 'p:contains(' + currentNum.toString() + ')';
            remainingNote = $(remainingNote).find(filledCheck);
            remainingNote = Array.from(remainingNote);
            remainingNote = remainingNote.filter(function (e) {

                if (e.parentElement.parentElement.parentElement.dataset.isFilled == 'true') {
                    return false;
                }
                return e;
            })

            if (remainingNote.length == 1) {
                remainingNote[0].style.color = 'cornflowerblue';
                remainingNote[0].style.fontWeight = 'bold';
            }

        }
    }

}

//arrow key navigation

function arrowMove(key) {

    let chosenCell;
    if (selectedCell.length > selectedGiven.length) {
        chosenCell = selectedCell[0];
    } else {
        chosenCell = selectedGiven[0];
    }

    /* #region  declarations */
    let newCell;
    const rowIndexFunction = (e) => e == eval(chosenCell.dataset.row);
    let selectedRowIndex = rowArray.findIndex(rowIndexFunction);
    let newRowIndex;
    let newRow;

    const columnIndexFunction = (e) => e == eval(chosenCell.dataset.column);
    let selectedColumnIndex = columnArray.findIndex(columnIndexFunction);
    let newColumnIndex;
    let newColumn;

    /* #endregion */


    switch (key) {

        case 'ArrowUp':
            if (selectedRowIndex == 0) {
                newRowIndex = 8;
            } else {
                newRowIndex = selectedRowIndex - 1;
            }
            newRow = rowArray[newRowIndex];

            for (let i = 0; i < cellsArray.length; i++) {

                if ((cellsArray[i].dataset.column == chosenCell.dataset.column && eval(cellsArray[i].dataset.row) == newRow)) {

                    newCell = cellsArray[i];

                }

            }

            break;
        case 'ArrowDown':
            if (selectedRowIndex == 8) {
                newRowIndex = 0;
            } else {
                newRowIndex = selectedRowIndex + 1;
            }
            newRow = rowArray[newRowIndex];

            for (let i = 0; i < cellsArray.length; i++) {

                if ((cellsArray[i].dataset.column == chosenCell.dataset.column && eval(cellsArray[i].dataset.row) == newRow)) {

                    newCell = cellsArray[i];

                } 

            }

            break;
        case 'ArrowRight':
            if (selectedColumnIndex == 8) {
                newColumnIndex = 0;
            } else {
                newColumnIndex = selectedColumnIndex + 1;
            }
            newColumn = columnArray[newColumnIndex];

            for (let i = 0; i < cellsArray.length; i++) {

                if ((cellsArray[i].dataset.row == chosenCell.dataset.row && eval(cellsArray[i].dataset.column) == newColumn)) {

                    newCell = cellsArray[i];

                }

            }

            break;
        case 'ArrowLeft':
            if (selectedColumnIndex == 0) {
                newColumnIndex = 8;
            } else {
                newColumnIndex = selectedColumnIndex - 1;
            }
            newColumn = columnArray[newColumnIndex];

            for (let i = 0; i < cellsArray.length; i++) {

                if ((cellsArray[i].dataset.row == chosenCell.dataset.row && eval(cellsArray[i].dataset.column) == newColumn)) {

                    newCell = cellsArray[i];

                } 

                

            }

            break;

    }

    if ((chosenCell.dataset.column == 'column3' || chosenCell.dataset.column == 'column6') && (chosenCell.classList[1] !== 'selected' || chosenCell.classList[2] !== 'selected-given')) {

        chosenCell.style.borderRight = '6px solid black';

    }

    chosenCell.dataset.isSelected = 'false';
    chosenCell.classList.remove('selected');
    chosenCell.classList.remove('selected-given');

    if (newCell.classList[1] !== 'given') {

        newCell.classList.add('selected');

    } else {

        newCell.classList.add('selected-given');

    }
    newCell.dataset.isSelected = 'true';

    if ((newCell.dataset.column == 'column3' || newCell.dataset.column == 'column6') && (newCell.classList[1] == 'selected' || newCell.classList[2] == 'selected-given')) {

        newCell.style.borderRight = '8px solid black';

    }

    if (highlightToggle.checked) {

        highlightSame();

    }

}

//auto remove notes function

function removeNotes(num, cell = selectedCell[0]) {

    /* #region  remove notes in column */
    let remove = '.note' + num.toString();
    let columnNumber = cell.dataset.column;
    columnNumber = eval(columnNumber);
    let removeNote = $(columnNumber).find(remove);
    for (let i = 0; i < removeNote.length; i++) {
        removeNote[i].innerText = '';
    }
    /* #endregion */

    /* #region  remove notes in row */
    let rowNumber = cell.dataset.row;
    rowNumber = eval(rowNumber);
    let removeRow = $(rowNumber).find(remove);
    for (let i = 0; i < removeRow.length; i++) {
        removeRow[i].innerText = '';
    }
    /* #endregion */

    /* #region  remove notes in block */
    let blockNumber = cell.dataset.block;
    blockNumber = eval(blockNumber);
    let removeBlock = $(blockNumber).find(remove);
    for (let i = 0; i < removeBlock.length; i++) {
        removeBlock[i].innerText = '';
    }
    /* #endregion */

}

//board collection modify

function modifyBoardCollection(value) {

    boardCollection.push(value);
    undoButton.style.color = 'rgb(214, 202, 185)';
    if (boardCollection.length > 10) {
        boardCollection = boardCollection.slice(1);
    }

}

export { globalToggle, noteInput, answerInput, selectedCell, noteCheck, removeNotes, modifyBoardCollection };