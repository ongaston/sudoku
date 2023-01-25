
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

    switch(cellsArray[i].id[1]) {
        case '1':
            column1.push(cellsArray[i]);
            break;
        case '2':
            column2.push(cellsArray[i]);
            break;
        case '3':
            column3.push(cellsArray[i]);
            cellsArray[i].style.borderRight = '6px solid black';
            break;     
        case '4':
            column4.push(cellsArray[i]);
            break;
        case '5':
            column5.push(cellsArray[i]);
            break;
        case '6':
            column6.push(cellsArray[i]);
            cellsArray[i].style.borderRight = '6px solid black';
            break;         
        case '7':
            column7.push(cellsArray[i]);
            break;
        case '8':
            column8.push(cellsArray[i]);
            break;
        case '9':
            column9.push(cellsArray[i]);
            break;                            
    }

    $(cellsArray[i]).on('click', function() {
        for (let j = 0; j < cellsArray.length; j++) {
            if (cellsArray[j].dataset.isSelected == 'true') {
                cellsArray[j].dataset.isSelected = 'false';
                cellsArray[j].classList.remove('selected');
            }
        }
        cellsArray[i].classList.add('selected');
        cellsArray[i].dataset.isSelected = 'true';

    })

}





let rowC = document.getElementById('rowC');
rowC.style.borderBottom = '6px solid black';

let rowF = document.getElementById('rowF');
rowF.style.borderBottom = '6px solid black';