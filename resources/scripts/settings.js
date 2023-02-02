import { inlineToggle, rotateToggle } from "./utilities.js";

let settingsButton = document.getElementById('gear');
let closeSettings = document.getElementById('close');
let settingsUnderlay = document.getElementById('settings-overlay');
let settingsMenu = document.getElementById('settings-menu');
let controls = document.getElementById('controls');



$(settingsButton).on('click', function() {

    rotateToggle(settingsButton, 400, '360deg');
    inlineToggle(settingsMenu);
    settingsMenu.style.alignItems = 'start';
    settingsUnderlay.style.display = 'block';

});

$(closeSettings).on('click', function() {

    rotateToggle(settingsButton, 0, '0deg');
    inlineToggle(settingsMenu);
    settingsUnderlay.style.display = 'none';

})