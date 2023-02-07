

let checkInputs = document.getElementsByTagName('input');
checkInputs = Array.from(checkInputs);
let highlightToggle = document.getElementById('highlight');
let noteHighlightToggle = document.getElementById('note-highlight');
let noteHighlightContainer = document.getElementById('note-highlight-container');
let noteHighlightSpan = document.getElementById('note-highlight-span');
let mobileCheck = document.getElementById('mobile-check');


if ($(mobileCheck).css('display') == 'block') {

    noteHighlightSpan.parentElement.firstChild.textContent = 'Highlight Notes';
    highlightToggle.parentElement.firstChild.textContent = 'Highlight Selected Number';
}

for (let i = 0; i < checkInputs.length; i++) {

    let checkSpan = checkInputs[i].nextElementSibling;

    if (checkInputs[i].id == 'note-highlight') {

        checkSpan.style.marginLeft = '3.5rem';

        $(highlightToggle).on('click', function() {
            if (highlightToggle.checked) {

                checkSpan.style.backgroundColor = 'rgb(214, 202, 185)';
    
            } else {
    
                checkSpan.style.backgroundColor = 'rgb(5, 32, 37)';
    
            }
        })



    } else if (checkInputs[i].id == 'note-toggle') {

        checkSpan.style.marginLeft = '16.5rem';

        if ($(mobileCheck).css('display') == 'block') {

            checkSpan.style.marginLeft = '12rem';

        }

    }

    if (checkInputs[i].checked) {

        checkSpan.style.backgroundColor = 'rgb(214, 202, 185)';
    
    } else {
    
        checkSpan.style.backgroundColor = 'rgb(5, 32, 37)';
    
    }

    $(checkInputs[i]).on('change', function() {

        if (checkInputs[i].checked) {

            checkSpan.style.backgroundColor = 'rgb(214, 202, 185)';

        } else {

            checkSpan.style.backgroundColor = 'rgb(5, 32, 37)';

        }

    })

}


$(highlightToggle).on('click', function() {

    if (!highlightToggle.checked) {

        noteHighlightToggle.checked = false;
        noteHighlightContainer.style.color = 'rgb(90, 84, 75)';


    } else {

        noteHighlightContainer.style.color = 'antiquewhite';
        noteHighlightToggle.checked = true;

    }

})