
let elyseToggle = document.getElementById('elyse');
let elyseFace = document.getElementById('elyse-face');
let elyseBackground = document.getElementById('elyse-background');
let board = document.getElementById('board');
let cellArray = document.getElementsByClassName('cell');
cellArray = Array.from(cellArray);
let html = document.getElementsByTagName('html');

$(elyseToggle).on('click', function () {

    $(elyseFace).animate({
        rotate: '360deg'
    }, 400);

    setTimeout(() => {
        $(elyseFace).animate({
            rotate: '0deg'
        }, 0);
    })

    if (elyseToggle.checked) {

        elyseBackground.style.display = 'block';
        $(elyseBackground).css({width: $(board).css('width'), height: $(board).css('height')});
        for (let i = 0; i < cellArray.length; i++) {

            $(cellArray[i]).addClass('transparent');

        }

        html[0].style.cursor = 'url("./resources/media/cursor.png"), auto';


    } else {
        elyseBackground.style.display = 'none';
        for (let i = 0; i < cellArray.length; i++) {

            $(cellArray[i]).removeClass('transparent');

        }

        html[0].style.cursor = 'auto';
    }

})
