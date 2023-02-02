import { inlineToggle, rotateToggle } from "./utilities.js";
import {columnArray, column1, column2, column3, column4, column5, column6, column7, column8, column9, rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH, rowI, rowArray, block1, block2, block3, block4, block5, block6, block7, block8, block9, blockArray } from './script.js';
import {removeNotes, noteCheck} from './keyboard.js';

/* #region  declarations */
let cellArray = document.getElementsByClassName('cell');
cellArray = Array.from(cellArray);

let settingsButton = document.getElementById('gear');
let closeSettings = document.getElementById('close');
let settingsUnderlay = document.getElementById('settings-overlay');
let settingsMenu = document.getElementById('settings-menu');

let colorToggle = document.getElementById('color-toggle');
let timerToggle = document.getElementById('timer');
let noteRemovalToggle = document.getElementById('note-removal');
let blueToggle = document.getElementById('blue-highlight');

let counterContainer = document.getElementById('counter-container');
let hoursElement = document.getElementById('hours');
let minutesElement = document.getElementById('minutes');
let secondsElement = document.getElementById('seconds');
/* #endregion */

$(settingsButton).on('click', function () {

    rotateToggle(settingsButton, 400, '360deg');
    inlineToggle(settingsMenu);
    settingsMenu.style.alignItems = 'start';
    settingsUnderlay.style.display = 'block';

});

$(closeSettings).on('click', function () {

    rotateToggle(settingsButton, 0, '0deg');
    inlineToggle(settingsMenu);
    settingsUnderlay.style.display = 'none';

})

function timerFunction() {
    let seconds = parseInt(secondsElement.innerText);
    let minutes = parseInt(minutesElement.innerText);
    let hours = parseInt(hoursElement.innerText);

    seconds += 1;
    if (seconds < 10) {

        seconds = '0' + seconds.toString();

    } else if (seconds == 60) {

        seconds = '00';
        minutes += 1;

    } else {

        seconds = seconds.toString();

    }

    if (minutes < 10) {

        minutes = '0' + minutes.toString();

    } else if (minutes == 60) {

        minutes = '00';
        hours += 1;

    } else {

        minutes = minutes.toString();

    }

    if (hours < 10) {
        hours = '0' + hours.toString();
    } else {
        hours = hours.toString();
    }

    secondsElement.innerText = seconds;
    minutesElement.innerText = minutes;
    hoursElement.innerText = hours;

}

setInterval(timerFunction, 1000);

$(timerToggle).on('click', function() {

    if (timerToggle.checked == true) {
        counterContainer.style.display = 'block';
    } else {
        counterContainer.style.display = 'none';
    }

})

$(noteRemovalToggle).on('click', function() {

    if (noteRemovalToggle.checked == true) {

        let filledCells = cellArray.filter(function(e) {

            if (e.children[0].innerText !== '' && e.classList[1] !== 'given') {
                return e;
            }

            return false;

        })
        
        for (let i = 0; i < filledCells.length; i++) {

            let number = Number(filledCells[i].children[0].innerText);
            removeNotes(number, filledCells[i]);

        }

    }

})

$(blueToggle).on('click', function() {

    if (blueToggle.checked == true) {

        noteCheck();

    }

})