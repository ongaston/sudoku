function inlineToggle(obj) {
    if ($(obj).css('display') == 'none') {
        $(obj).slideToggle();
        $(obj).css({
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center'
        })
    } else if (obj.style.display == 'inline-flex') {
        $(obj).slideToggle();
    }
}

function rotateToggle(element, duration=400, rotation='180deg') {
    if ($(element).css('rotate') !== rotation) {
        $(element).animate({
            rotate: rotation
        }, duration);
    } else {
        $(element).animate({
            rotate: '0deg'
        }, duration);
    }
}

export { inlineToggle, rotateToggle };