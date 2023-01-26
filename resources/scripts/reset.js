

let resetButton = document.getElementById('reset-button');
let cellArrayDOM = document.getElementsByClassName('cell');
let cellArray = Array.from(cellArrayDOM);
let blankCells = cellArray.filter(function(e) {
    if (e.classList[1] == 'given') {
        return false;
    }
    return e;
})



$(resetButton).on('click', function() {

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

    }

})