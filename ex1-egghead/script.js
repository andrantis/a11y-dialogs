document.addEventListener("DOMContentLoaded", pageLoaded);

function pageLoaded(event) {
    var dialogButton = document.getElementById("dialogTrigger");
    var closeButton = document.getElementById('closeBtn');
    var dialog = document.querySelector('dialog');
    var wrapper = document.querySelector('.wrapper');


    dialogPolyfill.registerDialog(dialog);

    dialogButton.addEventListener("click", dialogBtnHandler);
    closeButton.addEventListener("click", dialogCloseBtnHandler);

    function dialogBtnHandler(event) {
        dialog.show();

        document.addEventListener("keydown", keydownHandler);
        wrapper.setAttribute("inert", "")
    }

    function dialogCloseBtnHandler(event) {
        closeDialog();
    }

    function closeDialog() {
        dialog.close();

        //the next line is dirty. we need a tick before focusing
        setTimeout(function() {
            dialogButton.focus();
        })

        wrapper.removeAttribute("inert");
    }

    function keydownHandler(event) {
        if (event.keyCode === 27) {
            closeDialog();
        }

    }
}