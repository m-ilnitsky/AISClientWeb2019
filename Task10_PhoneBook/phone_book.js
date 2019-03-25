"use strict";

(function() {
    $(document).ready(function() {
        var addButton = $("#add-button");
        var editButton = $("#edit-button");
        var deleteButton = $("#delete-button");

        var messageDialog = $("#message-dialog").add("#shield-window");
        var messageDialogButton = $("#message-dialog_ok");
        var messageDialogMessage = $("#message-dialog_message");


        var confirmDialog = $("#confirm-dialog").add("#shield-window");
        var confirmDialogMessage = $("#confirm-dialog_message");
        var confirmDialogCencelButton = $("#confirm-dialog_cancel");
        var confirmDialogOkButton = $("#confirm-dialog_ok");

        var editDialog = $("#edit-dialog").add("#shield-window");
        var editDialogMessage = $("#edit-dialog_message");
        var editDialogCencelButton = $("#edit-dialog_cancel");
        var editDialogOkButton = $("#edit-dialog_ok");

        $(deleteButton).click(function() {
            messageDialogMessage.text("Тестовое сообщение!");
            messageDialog.removeClass("invisible");
        });

        $(editButton).click(function() {
            confirmDialogMessage.text("Вы подтверждаете прочтение данного сообщения?");
            confirmDialog.removeClass("invisible");
        });

        $(addButton).click(function() {
            editDialogMessage.text("Введите данные нового контакта");
            editDialog.removeClass("invisible");
        });

        $(messageDialogButton).click(function() {
            messageDialog.addClass("invisible");
        });

        $(confirmDialogCencelButton).click(function() {
            confirmDialog.addClass("invisible");
        });

        $(confirmDialogOkButton).click(function() {
            confirmDialog.addClass("invisible");
        });

        $(editDialogCencelButton).click(function() {
            editDialog.addClass("invisible");
        });

        $(editDialogOkButton).click(function() {
            editDialog.addClass("invisible");
        });
    });
})();