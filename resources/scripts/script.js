
let column1 = [];
let column2 = [];
let column3 = [];
let column4 = [];
let column5 = [];
let column6 = [];
let column7 = [];
let column8 = [];
let column9 = [];

let cellsArray = document.getElementsByClassName('cell');

for (let i = 0; i < cellsArray.length; i++) {
 if (cellsArray[i].id[1] == '3' || (cellsArray[i].id[1] == '6')) {
        cellsArray[i].style.borderRight = '6px solid black';
    }
}



let rowC = document.getElementById('rowC');
rowC.style.borderBottom = '6px solid black';

let rowF = document.getElementById('rowF');
rowF.style.borderBottom = '6px solid black';