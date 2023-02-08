
/* #region  declarations */
let elyseToggle = document.getElementById('elyse');
let elyseFace = document.getElementById('elyse-face');
let elyseBackground = document.getElementById('elyse-background');
let board = document.getElementById('board');
let cellArray = document.getElementsByClassName('cell');
cellArray = Array.from(cellArray);
let html = document.getElementsByTagName('html');
let animatedContainer = document.getElementById('animated-elyse');
let animationTimer;
let bigContainer = document.getElementById('big-animated');

let boardWidth = $(board).css('width');
boardWidth = boardWidth.slice(0, boardWidth.length - 3);
boardWidth = Number(boardWidth);

/* #endregion */
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
        $(elyseBackground).css({ width: $(board).css('width'), height: $(board).css('height') });
        for (let i = 0; i < cellArray.length; i++) {

            $(cellArray[i]).addClass('transparent');

        }

        html[0].style.cursor = 'url("./resources/media/cursor.png"), auto';
        $(board).css({ borderImage: 'url("./resources/media/border.png")', borderImageOutset: '10px', borderImageRepeat: 'space', borderImageWidth: '20px', borderImageSlice: '100%' });
        animatedContainer.style.display = 'inline-flex';
        bigContainer.style.display = 'inline-flex';
        let bigWidth = boardWidth + boardWidth * 0.1;
        let bigHeight = boardWidth - boardWidth * 0.2;
        $(bigContainer).css({ width: bigWidth, height: bigHeight });
        $(animatedContainer).css({ width: $(board).css('width') })

        animationTimer = setInterval(() => {

            $(animatedContainer).animate({
                filter: 'hue-rotate(45deg)',
                opacity: '0%'
            }, 500);
            $(animatedContainer).animate({
                filter: 'hue-rotate(360deg)',
                opacity: '100%'
            }, 500);
            $(bigContainer).animate({
                filter: 'hue-rotate(45deg)',
                opacity: '0%'
            }, 500);
            $(bigContainer).animate({
                filter: 'hue-rotate(360deg)',
                opacity: '100%'
            }, 500);

        }, 1000)


    } else {
        elyseBackground.style.display = 'none';
        for (let i = 0; i < cellArray.length; i++) {

            $(cellArray[i]).removeClass('transparent');

        }

        html[0].style.cursor = 'auto';
        $(board).css('border', '7px double rgb(214, 202, 185)');
        animatedContainer.style.display = 'none';
        bigContainer.style.display = 'none';

        clearInterval(animationTimer);
    }

})
