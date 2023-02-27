import { cellArray, highlightSame, resetGrid, columnArray, column1, column2, column3, column4, column5, column6, column7, column8, column9, rowArray, rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH, rowI, block1, block2, block3, block4, block5, block6, block7, block8, block9, blockArray } from "./script.js";
import { undo, getBoard } from './undo.js';
import { checkComplete } from "./complete.js";

/* #region  declarations */
let cellsArray = document.getElementsByClassName('cell');
let selectedCell = document.getElementsByClassName('selected');
let selectedGiven = document.getElementsByClassName('selected-given');

let noteToggle = document.getElementById('note-toggle');
let globalToggle = false;
let noteRemovalToggle = document.getElementById('note-removal');
let blueToggle = document.getElementById('blue-highlight');
let resetButton = document.getElementById('reset-button');

let undoButton = document.getElementById('undo');
let originalBoard;
let boardCollection = [];

let highlightToggle = document.getElementById('highlight');
let previousKey;
let noteArray = document.getElementsByClassName('note');
let conflict = false;
let answer = document.getElementsByClassName('answer');
answer = Array.from(answer);

let conflictToggle = document.getElementById('conflict');
/* #endregion */

$(window).on('load', function() {

    for (let i = 0; i < cellArray.length; i++) {
        cellArray[i].setAttribute('data-removed', '');
    }

})

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
        if (blueToggle.checked == true) {
            noteCheck();
        }
        //note input with shift key shortcut
    } else if (e.originalEvent.shiftKey) {
        key = e.originalEvent.code[5];
        key = Number(key);
        noteInput(key, notesCollection);
        if (blueToggle.checked == true) {
            noteCheck();
        }
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
    let shiftToggled = false;

    if (key == 'Control' && previousKey == 'Control') {
        $(noteToggle).trigger('click');
        controlToggled = true;
    } else if (key == 'Shift' && previousKey == 'Shift') {
        $(resetButton).trigger('click');
        shiftToggled = true;
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

    if (controlToggled || shiftToggled) {
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
            //replaceNote(num);
        }



        conflictCheck();

        

        /*for (let i = 0; i < cellArray.length; i++) {

            if (cellArray[i].dataset.isFilled == 'false') {
                break;
            } else if (i == cellArray.length - 1) {

            }

        }*/

        //remove answer and show notes again
    } else if (num.toString() == answerSpot[0].innerText) {

        selectedCell[0].dataset.isFilled = 'false';
        selectedCell[0].dataset.value = '';

        for (let i = 0; i < notesCollection.length; i++) {
            notesCollection[i].style.display = 'inline-flex';
        }

        answerSpot[0].innerText = '';

        if (noteRemovalToggle.checked == true) {
            replaceNote(num);
        }

        conflictCheck();

        

        //change answer if answer is already inputted
    } else if (num.toString() !== answerSpot[0].innerText) {

        if (noteRemovalToggle.checked == true) {
            replaceNote(answerSpot[0].innerText);
            removeNotes(num);
        }

        answerSpot[0].innerText = num.toString();
        selectedCell[0].dataset.value = num.toString();

        conflictCheck();

    }

    checkComplete();

}

//check notes for conflicts

function noteCheck() {


    for (let i = 0; i < noteArray.length; i++) {

        noteArray[i].children[0].removeAttribute('class');
        //console.log(noteArray[i].children[0])

    }

    for (let i = 0; i < cellArray.length; i++) {

        if (cellArray[i].dataset.isFilled == 'true') {
            continue;
        } else {

            let noteArrayCheck = Array.from($(cellArray[i]).find('.note'));

            noteArrayCheck = noteArrayCheck.filter(function(e) {

                if (e.innerHTML == "<p></p>") {
                    return false;
                }
                return e;

            })

            let relativeAnswers = [];

            if (noteArrayCheck.length == 1) {

                relativeAnswers.push($(selectedCell[0].dataset.column).find('.answer'));
                //console.log(relativeAnswers)
                //console.log(eval(selectedCell[0].dataset.column))

                //console.log(noteArrayCheck)
                $(noteArrayCheck[0].children[0]).addClass('note-highlight');

            }

        }

    }

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
                $(remainingNote[0]).addClass('note-highlight');

            }

            if (remainingNote.length == 2) {

                for (let p = 0; p < currentColumn.length; p++) {

                    let secondNum = p + 1;
                    let secondCheck = '.note' + secondNum.toString();
                    let secondRemaining = $(currentColumn).find(secondCheck);
                    let secondFilled = 'p:contains(' + secondNum.toString() + ')';
                    secondRemaining = Array.from($(secondRemaining).find(secondFilled));
                    secondRemaining = secondRemaining.filter(function(e) {

                        if (e.parentElement.parentElement.parentElement.dataset.isFilled == 'true') {
                            return false;
                        }
                        return e;

                    })

                    if ((secondRemaining.length == 2 && secondNum !== currentNum) && (((secondRemaining[1].parentElement.parentElement.parentElement.id == remainingNote[1].parentElement.parentElement.parentElement.id) && (secondRemaining[0].parentElement.parentElement.parentElement.id == remainingNote[0].parentElement.parentElement.parentElement.id)) || ((secondRemaining[1].parentElement.parentElement.parentElement.id == remainingNote[0].parentElement.parentElement.parentElement.id) && (secondRemaining[0].parentElement.parentElement.parentElement.id == remainingNote[1].parentElement.parentElement.parentElement.id)))) {
                        $(remainingNote[0]).addClass('note-highlight');
                        $(remainingNote[1]).addClass('note-highlight');
                        $(secondRemaining[0]).addClass('note-highlight');
                        $(secondRemaining[1]).addClass('note-highlight');
                    }

                }

            } /*else if (remainingNote.length == 3) {

                for (let p = 0; p < currentColumn.length; p++) {

                    let secondNum = p + 1;
                    let secondCheck = '.note' + secondNum.toString();
                    let secondRemaining = $(currentColumn).find(secondCheck);
                    let secondFilled = 'p:contains(' + secondNum.toString() + ')';
                    secondRemaining = Array.from($(secondRemaining).find(secondFilled));
                    secondRemaining = secondRemaining.filter(function(e) {

                        if (e.parentElement.parentElement.parentElement.dataset.isFilled == 'true') {
                            return false;
                        }
                        return e;

                    })

                    if ((secondRemaining.length == 2 && secondNum !== currentNum) && (((secondRemaining[1].parentElement.parentElement.parentElement.id == remainingNote[1].parentElement.parentElement.parentElement.id) && (secondRemaining[0].parentElement.parentElement.parentElement.id == remainingNote[0].parentElement.parentElement.parentElement.id)) || ((secondRemaining[1].parentElement.parentElement.parentElement.id == remainingNote[0].parentElement.parentElement.parentElement.id) && (secondRemaining[0].parentElement.parentElement.parentElement.id == remainingNote[1].parentElement.parentElement.parentElement.id)))) {



                    }

                }

            }*/

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
                $(remainingNote[0]).addClass('note-highlight');
            } else if (remainingNote.length == 2) {

                for (let p = 0; p < currentRow.length; p++) {

                    let secondNum = p + 1;
                    let secondCheck = '.note' + secondNum.toString();
                    let secondRemaining = $(currentRow).find(secondCheck);
                    let secondFilled = 'p:contains(' + secondNum.toString() + ')';
                    secondRemaining = Array.from($(secondRemaining).find(secondFilled));
                    secondRemaining = secondRemaining.filter(function(e) {

                        if (e.parentElement.parentElement.parentElement.dataset.isFilled == 'true') {
                            return false;
                        }
                        return e;

                    })

                    if ((secondRemaining.length == 2 && secondNum !== currentNum) && (((secondRemaining[1].parentElement.parentElement.parentElement.id == remainingNote[1].parentElement.parentElement.parentElement.id) && (secondRemaining[0].parentElement.parentElement.parentElement.id == remainingNote[0].parentElement.parentElement.parentElement.id)) || ((secondRemaining[1].parentElement.parentElement.parentElement.id == remainingNote[0].parentElement.parentElement.parentElement.id) && (secondRemaining[0].parentElement.parentElement.parentElement.id == remainingNote[1].parentElement.parentElement.parentElement.id)))) {
                        $(remainingNote[0]).addClass('note-highlight');
                        $(remainingNote[1]).addClass('note-highlight');
                        $(secondRemaining[0]).addClass('note-highlight');
                        $(secondRemaining[1]).addClass('note-highlight');
                    }

                }

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
                $(remainingNote[0]).addClass('note-highlight');
            } else if (remainingNote.length == 2) {

                for (let p = 0; p < currentBlock.length; p++) {

                    let secondNum = p + 1;
                    let secondCheck = '.note' + secondNum.toString();
                    let secondRemaining = $(currentBlock).find(secondCheck);
                    let secondFilled = 'p:contains(' + secondNum.toString() + ')';
                    secondRemaining = Array.from($(secondRemaining).find(secondFilled));
                    secondRemaining = secondRemaining.filter(function(e) {

                        if (e.parentElement.parentElement.parentElement.dataset.isFilled == 'true') {
                            return false;
                        }
                        return e;

                    })

                    if ((secondRemaining.length == 2 && secondNum !== currentNum) && (((secondRemaining[1].parentElement.parentElement.parentElement.id == remainingNote[1].parentElement.parentElement.parentElement.id) && (secondRemaining[0].parentElement.parentElement.parentElement.id == remainingNote[0].parentElement.parentElement.parentElement.id)) || ((secondRemaining[1].parentElement.parentElement.parentElement.id == remainingNote[0].parentElement.parentElement.parentElement.id) && (secondRemaining[0].parentElement.parentElement.parentElement.id == remainingNote[1].parentElement.parentElement.parentElement.id)))) {
                        $(remainingNote[0]).addClass('note-highlight');
                        $(remainingNote[1]).addClass('note-highlight');
                        $(secondRemaining[0]).addClass('note-highlight');
                        $(secondRemaining[1]).addClass('note-highlight');
                    }

                }

            }

        }
    }

}

//check inputted answers for conflicts

function conflictCheck() {

    answer = Array.from(document.getElementsByClassName('answer'));

    for (let i = 0; i < answer.length; i++) {

        $(answer[i]).removeClass('conflict-answer hidden-conflict');

    }


    for (let i = 0; i < columnArray.length; i++) {

        let currentColumn = columnArray[i];

        let answerSpots = Array.from($(currentColumn).find('.answer'));
        answerSpots = answerSpots.filter(function(e) {

            if (e.innerText == '') {
                return false;
            }

            return e;

        })
        
        let answerInputs = answerSpots.map(function (e) {

            return e.innerText;

        })

        answerInputs.forEach(function(e) {

            if (answerInputs.indexOf(e) !== answerInputs.lastIndexOf(e)) {

                
                answerSpots.forEach(function(k) {
                    if (k.innerText == e && conflictToggle.checked) {
                        $(k).addClass('conflict-answer');
                    } else if (k.innerText == e) {
                        $(k).addClass('hidden-conflict');
                    }
                })
            }

        })

    

    }

    for (let i = 0; i < rowArray.length; i++) {

        let currentRow = rowArray[i];

        let answerSpots = Array.from($(currentRow).find('.answer'));
        answerSpots = answerSpots.filter(function(e) {

            if (e.innerText == '') {
                return false;
            }

            return e;

        })
        
        let answerInputs = answerSpots.map(function (e) {

            return e.innerText;

        })

        answerInputs.forEach(function(e) {

            if (answerInputs.indexOf(e) !== answerInputs.lastIndexOf(e)) {
                answerSpots.forEach(function(k) {
                    if (k.innerText == e && conflictToggle.checked) {
                        $(k).addClass('conflict-answer');
                    } else if (k.innerText == e) {
                        $(k).addClass('hidden-conflict');
                    }
                })
            }

        })

    

    }

    for (let i = 0; i < blockArray.length; i++) {

        let currentBlock = blockArray[i];

        let answerSpots = Array.from($(currentBlock).find('.answer'));
        answerSpots = answerSpots.filter(function(e) {

            if (e.innerText == '') {
                return false;
            }

            return e;

        })
        
        let answerInputs = answerSpots.map(function (e) {

            return e.innerText;

        })

        answerInputs.forEach(function(e) {

            if (answerInputs.indexOf(e) !== answerInputs.lastIndexOf(e)) {
                answerSpots.forEach(function(k) {
                    if (k.innerText == e && conflictToggle.checked) {
                        $(k).addClass('conflict-answer');
                    } else if (k.innerText == e) {
                        $(k).addClass('hidden-conflict');
                    }
                })
            }

        })

    

    }

    if (answer.every(e => e.classList[1] !== 'conflict-answer') && answer.every(e => e.classList[1] !== 'hidden-conflict')) {
        conflict = false;
    } else {
        conflict = true;
    }

}

//modify conflict value 

function modifyConflict(value) {
    conflict = value;
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

    let removedArray = [];

    /* #region  remove notes in column */
    let remove = '.note' + num.toString();
    let currentNote = $(cell).find(remove);
    currentNote = currentNote[0].innerText;
    let noteFilled = false;
    if (currentNote.innerText == num.toString()) {
        noteFilled = true;
    }
    let columnNumber = cell.dataset.column;
    columnNumber = eval(columnNumber);
    let removeNote = $(columnNumber).find(remove);
    for (let i = 0; i < removeNote.length; i++) {
        if ((removedArray.includes(removeNote[i].parentElement.parentElement.id) == false) && (removeNote[i].parentElement.parentElement.id !== cell.id)) {

            removedArray.push(removeNote[i].parentElement.parentElement.id, removeNote[i].innerText + ' ');
            removeNote[i].innerHTML = '<p></p>';

        }
    }
    /* #endregion */

    /* #region  remove notes in row */
    let rowNumber = cell.dataset.row;
    rowNumber = eval(rowNumber);
    let removeRow = $(rowNumber).find(remove);

    for (let i = 0; i < removeRow.length; i++) {

        if ((removedArray.includes(removeRow[i].parentElement.parentElement.id) == false) && (removeRow[i].parentElement.parentElement.id !== cell.id)) {
            removedArray.push(removeRow[i].parentElement.parentElement.id, removeRow[i].innerText + ' ');
            removeRow[i].innerHTML = '<p></p>';

        }
    }
    /* #endregion */

    /* #region  remove notes in block */
    let blockNumber = cell.dataset.block;
    blockNumber = eval(blockNumber);
    let removeBlock = $(blockNumber).find(remove);
    for (let i = 0; i < removeBlock.length; i++) {
        if ((removedArray.includes(removeBlock[i].parentElement.parentElement.id) == false) && (removeBlock[i].parentElement.parentElement.id !== cell.id)) {
            removedArray.push(removeBlock[i].parentElement.parentElement.id, removeBlock[i].innerText + ' ');
            removeBlock[i].innerHTML = '<p></p>';

        }
    }
    /* #endregion */

    if (noteFilled) {
        currentNote[0].innerHTML = '<p>' + num.toString() + '</p>';
    }


    cell.setAttribute('data-removed', removedArray);


}

//replace notes when answer removed

function replaceNote(num, cell = selectedCell[0]) {

    let removedArray = cell.dataset.removed.split(" ,");
    removedArray = removedArray.map(x => new Array(x));

    for (let i = 0; i < removedArray.length; i++) {
        removedArray[i] = removedArray[i].toString().split(',');
    }

    for (let i = 0; i < cellArray.length; i++) {

        for (let j = 0; j < removedArray.length; j++) {

            if (cellArray[i].id == removedArray[j][0]) {
                let remove = '.note' + num.toString();
                $(cellArray[i]).find(remove)[0].innerHTML = '<p>' + removedArray[j][1] + '</p>';
            }

        }

    }


}

//board collection modify

function modifyBoardCollection(value) {

    boardCollection.push(value);
    undoButton.style.color = 'rgb(214, 202, 185)';
    if (boardCollection.length > 10) {
        boardCollection = boardCollection.slice(1);
    }

}

//modify answer

function modifyAnswerVariable() {
    answer = Array.from(document.getElementsByClassName('answer'));
}

export { globalToggle, noteInput, answerInput, selectedCell, noteCheck, removeNotes, modifyBoardCollection, conflictCheck, conflict, modifyConflict, answer, modifyAnswerVariable };