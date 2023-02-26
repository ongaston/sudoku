import {columnArray, column1, column2, column3, column4, column5, column6, column7, column8, column9, rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH, rowI, rowArray, block1, block2, block3, block4, block5, block6, block7, block8, block9, blockArray } from './script.js';


let board = document.getElementById('board');

let undoButton = document.getElementById('undo');

function getBoard() {

    let board = document.getElementById('board');
    board = board.innerHTML;
    return board;

}

function undo(originalBoard) {

    board.innerHTML = originalBoard;

}

export { getBoard, undo };