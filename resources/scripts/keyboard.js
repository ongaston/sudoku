import { columnArray, column1, column2, column3, column4, column5, column6, column7, column8, column9, rowArray, rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH, block1, block2, block3, block4, block5, block6, block7, block8, block9, blockArray } from "./script.js";

let cellsArray = document.getElementsByClassName('cell');
let selectedCell = document.getElementsByClassName('selected');

let noteToggle = document.getElementById('note-toggle');
let globalToggle = false;


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
    if (Number.isNaN(key) && e.originalEvent.shiftKey == false) {
        return;
    }
    let notesCollection = $(selectedCell).find('.note');

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
    }
})


//note mode function

function noteInput(num, notesCollection) {

    let noteIndex = num - 1;
    let selectedNote = notesCollection[noteIndex];
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


        for (let i = 0; i < notesCollection.length; i++) {
            notesCollection[i].style.display = 'none';
        }

        answerSpot[0].innerText = num.toString();

        /* #region  remove notes in column */
        let remove = '.note' + num.toString();
        let columnNumber = selectedCell[0].dataset.column;
        columnNumber = eval(columnNumber);
        let removeNote = $(columnNumber).find(remove);
        for (let i = 0; i < removeNote.length; i++) {
            removeNote[i].innerText = '';
        }
        /* #endregion */

        /* #region  remove notes in row */
        let rowNumber = selectedCell[0].dataset.row;
        rowNumber = eval(rowNumber);
        let removeRow = $(rowNumber).find(remove);
        for (let i = 0; i < removeRow.length; i++) {
            removeRow[i].innerText = '';
        }
        /* #endregion */

        /* #region  remove notes in block */
        let blockNumber = selectedCell[0].dataset.block;
        blockNumber = eval(blockNumber);
        let removeBlock = $(blockNumber).find(remove);
        for (let i = 0; i < removeBlock.length; i++) {
            removeBlock[i].innerText = '';
        }
        /* #endregion */

        //remove answer and show notes again
    } else if (num.toString() == answerSpot[0].innerText) {

        selectedCell[0].dataset.isFilled = 'false';

        for (let i = 0; i < notesCollection.length; i++) {
            notesCollection[i].style.display = 'inline-flex';
        }

        answerSpot[0].innerText = '';

        //change answer if answer is already inputted
    } else if (num.toString() !== answerSpot[0].innerText) {

        answerSpot[0].innerText = num.toString();

        let remove = '.note' + num.toString();
        /* #region  remove column notes */
        let columnNumber = selectedCell[0].dataset.column;
        columnNumber = eval(columnNumber);
        let removeNote = $(columnNumber).find(remove);
        for (let i = 0; i < removeNote.length; i++) {
            removeNote[i].innerText = '';
        }
        /* #endregion */

        /* #region  remove row notes */
        let rowNumber = selectedCell[0].dataset.row;
        rowNumber = eval(rowNumber);
        let removeRow = $(rowNumber).find(remove);
        for (let i = 0; i < removeRow.length; i++) {
            removeRow[i].innerText = '';
        }
        /* #endregion */

        /* #region  remove block notes */
        let blockNumber = selectedCell[0].dataset.block;
        blockNumber = eval(blockNumber);
        let removeBlock = $(blockNumber).find(remove);
        for (let i = 0; i < removeBlock.length; i++) {
            removeBlock[i].innerText = '';
        }
        /* #endregion */

    }

}

//check notes for conflicts

function conflictCheck() {

    let currentColumn = selectedCell[0].dataset.column;
    currentColumn = eval(currentColumn);

    let currentRow = selectedCell[0].dataset.row;
    currentRow = eval(currentRow);

    let currentBlock = selectedCell.dataset.block;


}

export { globalToggle, noteInput, answerInput, selectedCell };