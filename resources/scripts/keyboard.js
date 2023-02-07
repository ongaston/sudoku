import { resetGrid, columnArray, column1, column2, column3, column4, column5, column6, column7, column8, column9, rowArray, rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH, rowI, block1, block2, block3, block4, block5, block6, block7, block8, block9, blockArray } from "./script.js";
import { undo, getBoard } from './undo.js';

/* #region  declarations */
let cellsArray = document.getElementsByClassName('cell');
let cellArray = Array.from(cellsArray);
let selectedCell = document.getElementsByClassName('selected');

let noteToggle = document.getElementById('note-toggle');
let globalToggle = false;
let noteRemovalToggle = document.getElementById('note-removal');
let blueToggle = document.getElementById('blue-highlight');

let undoButton = document.getElementById('undo');
let originalBoard;
let boardCollection = [];
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

    /* #region  declarations */
    let newCell;
    const rowIndexFunction = (e) => e == eval(selectedCell[0].dataset.row);
    let selectedRowIndex = rowArray.findIndex(rowIndexFunction);
    let newRowIndex;
    let newRow;

    const columnIndexFunction = (e) => e == eval(selectedCell[0].dataset.column);
    let selectedColumnIndex = columnArray.findIndex(columnIndexFunction);
    let newColumnIndex;
    let newColumn;

    /* #endregion */
    /* #region  cells */
    let e2 = document.getElementById('e2');
    let f6 = document.getElementById('f6');
    let i3 = document.getElementById('i3');
    let i8 = document.getElementById('i8');

    let b2 = document.getElementById('b2');
    let c6 = document.getElementById('c6');
    let f3 = document.getElementById('f3');
    let e8 = document.getElementById('e8');

    let e4 = document.getElementById('e4');
    let g7 = document.getElementById('g7');
    let h2 = document.getElementById('h2');

    let b5 = document.getElementById('b5');
    let g1 = document.getElementById('g1');
    let h5 = document.getElementById('h5');
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

                if ((cellsArray[i].dataset.column == selectedCell[0].dataset.column && eval(cellsArray[i].dataset.row) == newRow) && cellsArray[i].classList[1] !== 'given') {

                    newCell = cellsArray[i];

                } else if ((cellsArray[i].dataset.column == selectedCell[0].dataset.column && eval(cellsArray[i].dataset.row) == newRow) && cellsArray[i].classList[1] == 'given') {

                    switch (selectedCell[0]) {

                        case e2:
                            newCell = b2;
                            break;
                        case f6:
                            newCell = c6;
                            break;
                        case i3:
                            newCell = f3;
                            break;
                        case i8:
                            newCell = e8;
                            break;
                        default:
                            if (newRowIndex == 0) {
                                newRowIndex = 8;
                            } else {
                                newRowIndex -= 1;
                            }
                            newRow = rowArray[newRowIndex];
                            for (let j = 0; j < cellsArray.length; j++) {
                                if ((cellsArray[j].dataset.column == selectedCell[0].dataset.column && eval(cellsArray[j].dataset.row) == newRow) && cellsArray[j].classList[1] !== 'given') {

                                    newCell = cellsArray[j];

                                }
                            }

                            break;

                    }

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

                if ((cellsArray[i].dataset.column == selectedCell[0].dataset.column && eval(cellsArray[i].dataset.row) == newRow) && cellsArray[i].classList[1] !== 'given') {

                    newCell = cellsArray[i];

                } else if ((cellsArray[i].dataset.column == selectedCell[0].dataset.column && eval(cellsArray[i].dataset.row) == newRow) && cellsArray[i].classList[1] == 'given') {

                    switch (selectedCell[0]) {

                        case b2:
                            newCell = e2;
                            break;
                        case c6:
                            newCell = f6;
                            break;
                        case f3:
                            newCell = i3;
                            break;
                        case e8:
                            newCell = i8;
                            break;
                        default:
                            if (newRowIndex == 8) {
                                newRowIndex = 0;
                            } else {
                                newRowIndex += 1;
                            }
                            newRow = rowArray[newRowIndex];
                            for (let j = 0; j < cellsArray.length; j++) {
                                if ((cellsArray[j].dataset.column == selectedCell[0].dataset.column && eval(cellsArray[j].dataset.row) == newRow) && cellsArray[j].classList[1] !== 'given') {

                                    newCell = cellsArray[j];

                                }
                            }

                            break;

                    }

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

                if ((cellsArray[i].dataset.row == selectedCell[0].dataset.row && eval(cellsArray[i].dataset.column) == newColumn) && cellsArray[i].classList[1] !== 'given') {

                    newCell = cellsArray[i];

                } else if ((cellsArray[i].dataset.row == selectedCell[0].dataset.row && eval(cellsArray[i].dataset.column) == newColumn) && cellsArray[i].classList[1] == 'given') {

                    switch (selectedCell[0]) {

                        case b2:
                            newCell = b5;
                            break;
                        case e4:
                            newCell = e8;
                            break;
                        case g7:
                            newCell = g1;
                            break;
                        case h2:
                            newCell = h5;
                            break;
                        default:
                            if (newColumnIndex == 8) {
                                newColumnIndex = 0;
                            } else {
                                newColumnIndex += 1;
                            }
                            newColumn = columnArray[newColumnIndex];
                            for (let j = 0; j < cellsArray.length; j++) {
                                if ((cellsArray[j].dataset.row == selectedCell[0].dataset.row && eval(cellsArray[j].dataset.column) == newColumn) && cellsArray[j].classList[1] !== 'given') {

                                    newCell = cellsArray[j];

                                }
                            }

                            break;

                    }

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

                if ((cellsArray[i].dataset.row == selectedCell[0].dataset.row && eval(cellsArray[i].dataset.column) == newColumn) && cellsArray[i].classList[1] !== 'given') {

                    newCell = cellsArray[i];

                } else if ((cellsArray[i].dataset.row == selectedCell[0].dataset.row && eval(cellsArray[i].dataset.column) == newColumn) && cellsArray[i].classList[1] == 'given') {

                    switch (selectedCell[0]) {

                        case b5:
                            newCell = b2;
                            break;
                        case e8:
                            newCell = e4;
                            break;
                        case g1:
                            newCell = g7;
                            break;
                        case h5:
                            newCell = h2;
                            break;
                        default:
                            if (newColumnIndex == 0) {
                                newColumnIndex = 8;
                            } else {
                                newColumnIndex -= 1;
                            }
                            newColumn = columnArray[newColumnIndex];
                            for (let j = 0; j < cellsArray.length; j++) {
                                if ((cellsArray[j].dataset.row == selectedCell[0].dataset.row && eval(cellsArray[j].dataset.column) == newColumn) && cellsArray[j].classList[1] !== 'given') {

                                    newCell = cellsArray[j];

                                }
                            }

                            break;

                    }

                }

            }

            break;

    }

    if ((selectedCell[0].dataset.column == 'column3' || selectedCell[0].dataset.column == 'column6') && selectedCell[0].classList[1] == 'selected') {

        selectedCell[0].style.borderRight = '6px solid black';

    }

    selectedCell[0].dataset.isSelected = 'false';
    selectedCell[0].classList.remove('selected');

    newCell.classList.add('selected');
    newCell.dataset.isSelected = 'true';

    if ((selectedCell[0].dataset.column == 'column3' || selectedCell[0].dataset.column == 'column6') && selectedCell[0].classList[1] == 'selected') {

        selectedCell[0].style.borderRight = '8px solid black';

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