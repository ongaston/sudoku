
import { conflict } from "./keyboard.js";
import { highlightSame, resetGrid, columnArray, column1, column2, column3, column4, column5, column6, column7, column8, column9, rowArray, rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH, rowI, block1, block2, block3, block4, block5, block6, block7, block8, block9, blockArray } from "./script.js";
import { timerInterval, modifyTimerInterval } from "./settings.js";

let cellArray = Array.from(document.getElementsByClassName('cell'));

function checkComplete() {

    /*if (!cellArray.every(e => e.dataset.isFilled == 'true')) {

        return;

    } else*/ if (!conflict) {
        //win


    } else if (conflict) {
        //wrong
        

    }

}

export {checkComplete};