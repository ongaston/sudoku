
let cellsArray = document.getElementsByClassName('cell');
let selectedCell = document.getElementsByClassName('selected');

let noteToggle = document.getElementById('note-toggle');
let globalToggle = false;


$(noteToggle).on('click', function() {
    if (noteToggle.checked == true) {
        globalToggle = true;
    } else if (noteToggle.checked == false) {
        globalToggle = false;
    }
})

$(document).on('keypress', function(e) {
    let key = e.originalEvent.key;
    key = Number(key);
    if (Number.isNaN(key) && e.originalEvent.shiftKey == false) {
        return;
    }
    let notesCollection = $(selectedCell).find('.note');

    if (globalToggle) {
        noteInput(key, notesCollection);
    }else if (e.originalEvent.shiftKey) {
        key = e.originalEvent.code[5];
        key = Number(key);
        noteInput(key, notesCollection);
    } else if (globalToggle == false) {
        answerInput(key, notesCollection);
    }
})


//note mode function

function noteInput(num, notesCollection) {

    let noteIndex = num - 1;
    let selectedNote = notesCollection[noteIndex];
    //console.log(notesCollection);
    //console.log(selectedNote);

    if (selectedNote.innerText == '') {
        selectedNote.innerText = num.toString();
    } else if (selectedNote.innerText !== '') {
        selectedNote.innerText = '';
    }

}


//answer input function

function answerInput(num, notesCollection) {

    let answerSpot = $(selectedCell).find('h1');

    if (selectedCell[0].dataset.isFilled == 'false') {

        selectedCell[0].dataset.isFilled = 'true';


        for (let i = 0; i < notesCollection.length; i++) {
            notesCollection[i].style.display = 'none';
        }
        //console.log(notesCollection)
        //console.log(answerSpot)
        answerSpot[0].innerText = num.toString();

    } else if (num.toString() == answerSpot[0].innerText) {

        selectedCell[0].dataset.isFilled = 'false';

        for (let i = 0; i < notesCollection.length; i++) {
            notesCollection[i].style.display = 'inline-flex';
        }

        answerSpot[0].innerText = '';

    } else if (num.toString() !== answerSpot[0].innerText) {

        answerSpot[0].innerText = num.toString();

    }

}

export { globalToggle, noteInput, answerInput, selectedCell };