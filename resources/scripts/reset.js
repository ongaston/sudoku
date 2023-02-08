import { resetGrid } from "./script.js";

let resetButton = document.getElementById('reset-button');
let board = document.getElementById('board');
let defaultBoard;
let cellArrayDOM = document.getElementsByClassName('cell');
let cellArray = Array.from(cellArrayDOM);
let blankCells = cellArray.filter(function (e) {
    if (e.classList[1] == 'given') {
        return false;
    }
    return e;
})

let defaultNotes = [];

$(window).on('load', function () {

    //defaultBoard = board.innerHTML;

    for (let i = 0; i < blankCells.length; i++) {

        let noteArray = [blankCells[i].id];

        let notesCollection = $(blankCells[i]).find('.note');

        for (let j = 0; j < notesCollection.length; j++) {

            noteArray.push(notesCollection[j].innerText);


        }

        defaultNotes.push(noteArray);
    }

})

$(resetButton).on('click', function () {

    //board.innerHTML = defaultBoard;
    //resetGrid();

    /* #region  timer stuff */
    let secondsElement = document.getElementById('seconds');
    let minutesElement = document.getElementById('minutes');
    let hoursElement = document.getElementById('hours');

    secondsElement.innerText = '00';
    minutesElement.innerText = '00';
    hoursElement.innerText = '00';
    /* #endregion */

    //removes filled in answers and shows hidden note objects again
    for (let i = 0; i < blankCells.length; i++) {

        let notesCollection = $(blankCells[i]).find('.note');
        let answerSpot = $(blankCells[i]).find('h1');

        if (blankCells[i].dataset.isFilled == 'true') {

            blankCells[i].dataset.isFilled = 'false';

            for (let j = 0; j < notesCollection.length; j++) {

                notesCollection[j].style.display = 'inline-flex';

            }

            answerSpot[0].innerText = '';

        }

        for (let j = 0; j < defaultNotes.length; j++) {

            if (blankCells[i].id == defaultNotes[j][0]) {

                for (let p = 0; p < notesCollection.length; p++) {

                    notesCollection[p].innerHTML = '<p>' + defaultNotes[j][p + 1] + '</p>';

                }

            }

        }

    }

})

