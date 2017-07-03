document.addEventListener("DOMContentLoaded", pageLoaded);

function pageLoaded(event) {
    var dialogButton = document.getElementById("dialogTrigger");
    var closeButton = document.getElementById('closeBtn');
    var dialog = document.querySelector('dialog');

    dialogPolyfill.registerDialog(dialog);

    dialogButton.addEventListener("click", dialogBtnHandler);
    closeButton.addEventListener("click", dialogCloseBtnHandler);

    function dialogBtnHandler(event) {
        dialog.showModal();
    }

    function dialogCloseBtnHandler(event) {
        dialog.close();

        dialogButton.focus();
    }
}