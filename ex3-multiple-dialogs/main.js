import "babel-polyfill";

document.addEventListener("DOMContentLoaded", pageLoaded);

function pageLoaded(event) {
    Array.from(document.querySelectorAll(".js-dialog-trigger")).forEach(item => item.addEventListener('click', openDialog));
}


const KEYCODE = {
    ESC: 27
}

let previousActiveElement;

function openDialog() {
    // Grab a reference to the previos element.
    // We'll want to restore this when we close the dialog.
    previousActiveElement = document.activeElement;

    const target = previousActiveElement.dataset.dialogTarget;
    const dialogSelector = `.dialog[data-dialog='${target}']`;
    const dialog = document.querySelector(dialogSelector);
    const dialogMask = dialog.querySelector('.dialog__mask');
    const dialogWindow = dialog.querySelector('.dialog__window');

    // Quick and dirty way to make all the siblings of our dialog inert.
    Array.from(document.body.children).forEach(child => {
        if (child !== dialog) {
            child.inert = true;
        }
    })

    // Make the dialog visible
    dialog.classList.add('opened');

    // Listen for things that should close the dialog.
    dialogMask.addEventListener('click', closeDialog)
    
    // This is just for demo purposes, you'll probably want to do other actions here.
    Array.from(dialogWindow.querySelectorAll('button')).forEach(btn => {
        btn.addEventListener('click', closeDialog);

    });
    document.addEventListener('keydown', checkCloseDialog)

    // Finally, move focus into the dialog.
    dialog.querySelector('button').focus();
}

function checkCloseDialog(e) {
    if (e.keyCode === KEYCODE.ESC)
        closeDialog();
}

function closeDialog() {
    // Quickly get dialog selectors. Good candidate to refactor
    const target = previousActiveElement.dataset.dialogTarget;
    const dialogSelector = `.dialog[data-dialog="${target}"]`;
    const dialog = document.querySelector(dialogSelector);
    const dialogMask = dialog.querySelector('.dialog__mask');
    const dialogWindow = dialog.querySelector('.dialog__window');

    // Clean up any event listeners.
    dialogMask.removeEventListener('click', closeDialog);
    Array.from(dialogWindow.querySelectorAll('button')).forEach(btn => {
        btn.removeEventListener('click', closeDialog);
    });
    document.removeEventListener('keydown', checkCloseDialog);

    // Uninert our siblings.
    Array.from(document.body.children).forEach(child => {
        if (child !== dialog) {
            child.inert = false;
        }
    })

    // Hide the dialog.
    dialog.classList.remove('opened');

    // Restore focus to the previous active element.
    previousActiveElement.focus();
}
