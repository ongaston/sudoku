import { resetGrid, cellArray } from "./script.js";
import { getBoard } from "./undo.js";

let resetButton = document.getElementById('reset-button');
let board = document.getElementById('board');
let defaultBoard;


/*$(window).on('load', function () {

    defaultBoard = getBoard();
    console.log(defaultBoard)
    /*for (let i = 0; i < blankCells.length; i++) {

        let noteArray = [blankCells[i].id];

        let notesCollection = $(blankCells[i]).find('.note');

        for (let j = 0; j < notesCollection.length; j++) {

            noteArray.push(notesCollection[j].innerText);


        }

        defaultNotes.push(noteArray);
    }*/

//})

$(window).on('load', function () {
    resetGrid();
}

$(resetButton).on('click', function () {


    location.reload();
    /*board.innerHTML = defaultBoard;
    resetGrid();

    /* #region  timer stuff */
    /*let secondsElement = document.getElementById('seconds');
    let minutesElement = document.getElementById('minutes');
    let hoursElement = document.getElementById('hours');

    secondsElement.innerText = '00';
    minutesElement.innerText = '00';
    hoursElement.innerText = '00';
    /* #endregion */
/*
    for (let i = 0; i < cellArray.length; i++) {
        $(cellArray[i].children[0]).removeClass('conflict-answer');
    }

    //removes filled in answers and shows hidden note objects again
    /*for (let i = 0; i < blankCells.length; i++) {

        let notesCollection = $(blankCells[i]).find('.note');
        let answerSpot = $(blankCells[i]).find('h1');
        blankCells[i].dataset.removed = '';

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
                    $(notesCollection[p]).removeClass('note-highlight');

                }

            }

        }

    }*/

})

export {defaultBoard};
