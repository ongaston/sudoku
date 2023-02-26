
import { getBoard } from "./undo.js";
import { highlightSame, resetGrid, columnArray, column1, column2, column3, column4, column5, column6, column7, column8, column9, rowArray, rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH, rowI, block1, block2, block3, block4, block5, block6, block7, block8, block9, blockArray, cellArray } from "./script.js";

let board1;
let board1Link = document.getElementById('board-1');
let board2Link = document.getElementById('board-2');

let board = document.getElementById('board');

$(window).on('load', function() {

    board1 = getBoard();

})

$(board1Link).on('click', function() {
    board.innerHTML = board1;
    resetGrid();
})



/*$(document).on('keypress', function(e) {

    if (e.originalEvent.key == 'a') {
        board.innerHTML = board1;
        resetGrid();
    }

})*/