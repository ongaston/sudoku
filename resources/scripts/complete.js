
import { conflict } from "./keyboard.js";
import { highlightSame, resetGrid, columnArray, column1, column2, column3, column4, column5, column6, column7, column8, column9, rowArray, rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH, rowI, block1, block2, block3, block4, block5, block6, block7, block8, block9, blockArray, cellArray } from "./script.js";
import { timerInterval, modifyTimerInterval } from "./settings.js";
import { inlineToggle } from "./utilities.js";
import { defaultBoard } from "./reset.js";

let finishMenu = document.getElementById('finish-menu');
let finishUnderlay = document.getElementById('finish-overlay');
let finishTitle = document.getElementById('finish-title');
let winOptions = document.getElementById('win-options');
let loseOptions = document.getElementById('lose-options');
let resetClass = document.getElementsByClassName('reset');
let resumeWrong = document.getElementById('resume-wrong');
let resume = document.getElementById('resume');
let board = document.getElementById('board');

for (let i = 0; i < resetClass.length; i++) {
        
    $(resetClass[i]).on('click', function() {

        location.reload();

    })
}

$(resumeWrong).on('click', function() {

    inlineToggle(finishMenu);
    finishUnderlay.style.display = 'none';
    modifyTimerInterval('start');

})

function checkComplete() {

    if (!cellArray.every(e => e.dataset.isFilled == 'true')) {

        return;

    } else if (!conflict) {
        //win

        inlineToggle(finishMenu);
        finishUnderlay.style.display = 'block';

        finishTitle.innerText = 'Congratulations!';

        winOptions.style.display = 'inline-flex';

        modifyTimerInterval('stop');

    } else if (conflict) {
        //wrong

        inlineToggle(finishMenu);
        finishUnderlay.style.display = 'block';

        loseOptions.style.display = 'inline-flex';

        finishTitle.innerText = 'Incorrect Solution';
        
        modifyTimerInterval('stop');

    }

}

export {checkComplete};