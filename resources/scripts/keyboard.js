import { columnArray, column1, column2, column3, column4, column5, column6, column7, column8, column9, rowArray, rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH } from "./script.js";

let cellsArray = document.getElementsByClassName('cell');
let selectedCell = document.getElementsByClassName('selected');

let noteToggle = document.getElementById('note-toggle');
let globalToggle = false;


$(noteToggle).on('click', function() {
    if (noteToggle.checked == true) {
        globalToggle = true;
    } else if (noteToggle.checked == false) {
        globalToggle = false;
    }
})

$(document).on('keypress', function(e) {
    let key = e.originalEvent.key;
    key = Number(key);
    if (Number.isNaN(key) && e.originalEvent.shiftKey == false) {
        return;
    }
    let notesCollection = $(selectedCell).find('.note');

    if (globalToggle) {
        noteInput(key, notesCollection);
    }else if (e.originalEvent.shiftKey) {
        key = e.originalEvent.code[5];
        key = Number(key);
        noteInput(key, notesCollection);
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

    if (selectedCell[0].dataset.isFilled == 'false') {

        selectedCell[0].dataset.isFilled = 'true';


        for (let i = 0; i < notesCollection.length; i++) {
            notesCollection[i].style.display = 'none';
        }
        //console.log(notesCollection)
        //console.log(answerSpot)
        answerSpot[0].innerText = num.toString();

        let remove = '.note' + num.toString();
        let columnNumber = selectedCell[0].dataset.column;
        columnNumber = eval(columnNumber);
        let removeNote = $(columnNumber).find(remove);
        for (let i = 0; i < removeNote.length; i++) {
            removeNote[i].innerText = '';
        }

        let rowNumber = selectedCell[0].dataset.row;
        rowNumber = eval(rowNumber);
        let removeRow = $(rowNumber).find(remove);
        for (let i = 0; i < removeRow.length; i++) {
            removeRow[i].innerText = '';
        }

        let blockNumber = selectedCell[0].dataset.block;
        for (let i = 0; i < cellsArray.length; i++) {
            if (cellsArray[i].dataset.block == blockNumber) {
                let removeBlock = $(cellsArray[i]).find(remove);
                for (let j = 0; j < removeBlock.length; j++) {
                    removeBlock[j].innerText = '';
                }
            }
        }

    } else if (num.toString() == answerSpot[0].innerText) {

        selectedCell[0].dataset.isFilled = 'false';

        for (let i = 0; i < notesCollection.length; i++) {
            notesCollection[i].style.display = 'inline-flex';
        }

        answerSpot[0].innerText = '';

    } else if (num.toString() !== answerSpot[0].innerText) {

        answerSpot[0].innerText = num.toString();

        let remove = '.note' + num.toString();
        let columnNumber = selectedCell[0].dataset.column;
        columnNumber = eval(columnNumber);
        let removeNote = $(columnNumber).find(remove);
        for (let i = 0; i < removeNote.length; i++) {
            removeNote[i].innerText = '';
        }

        let rowNumber = selectedCell[0].dataset.row;
        rowNumber = eval(rowNumber);
        let removeRow = $(rowNumber).find(remove);
        for (let i = 0; i < removeRow.length; i++) {
            removeRow[i].innerText = '';
        }

        let blockNumber = selectedCell[0].dataset.block;
        for (let i = 0; i < cellsArray.length; i++) {
            if (cellsArray[i].dataset.block == blockNumber) {
                let removeBlock = $(cellsArray[i]).find(remove);
                for (let j = 0; j < removeBlock.length; j++) {
                    removeBlock[j].innerText = '';
                }
            }
        }

    }

}

export { globalToggle, noteInput, answerInput, selectedCell };