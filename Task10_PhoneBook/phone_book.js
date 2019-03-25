"use strict";

(function () {
    $(document).ready(function () {
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
        var editDialogInputFamily = $("#edit-dialog_family");
        var editDialogInputName = $("#edit-dialog_name");
        var editDialogInputPhone = $("#edit-dialog_phone");
        var editDialogCancelButton = $("#edit-dialog_cancel");
        var editDialogOkButton = $("#edit-dialog_ok");

        var tableBody = $("#table-body");

        function createRow(number, family, name, phone) {
            var tr = $("<tr></tr>").appendTo(tableBody);

            var tdNumber = $("<td></td>").addClass("column-number").text(number).appendTo(tr);
            var tdFamily = $("<td></td>").addClass("column-family").text(family).appendTo(tr);
            var tdName = $("<td></td>").addClass("column-name").text(name).appendTo(tr);
            var tdPhone = $("<td></td>").addClass("column-phone").text(phone).appendTo(tr);
            var tdCheckbox = $("<td></td>").addClass("column-checkbox").appendTo(tr);
            var checkbox = $("<input type='checkbox'>").addClass("checkbox").appendTo(tdCheckbox);
            var tdButtons = $("<td></td>").addClass("column-buttons").appendTo(tr);
            $("<div></div>").addClass("circle-button").addClass("add-button").click(function () {
                editDialogMessage.text("Введите данные нового контакта");
                editDialog.removeClass("invisible");
                editDialogInputFamily.val(tdFamily.text());
                editDialogInputName.val(tdName.text());
                editDialogInputPhone.val("");
                editDialogInputFamily.focus();
            }).appendTo(tdButtons);
            $("<div></div>").addClass("circle-button").addClass("edit-button").click(function () {
                editDialogMessage.text("Измените данные существующего контакта");
                editDialog.removeClass("invisible");
                editDialogInputFamily.val(tdFamily.text());
                editDialogInputName.val(tdName.text());
                editDialogInputPhone.val(tdPhone.text());
                editDialogInputFamily.focus();
            }).appendTo(tdButtons);
            $("<div></div>").addClass("circle-button").addClass("delete-button").click(function () {
                tr.remove();
            }).appendTo(tdButtons);

            return tr;
        }

        $(deleteButton).click(function () {
            messageDialogMessage.text("Тестовое сообщение!");
            messageDialog.removeClass("invisible");
        });

        $(editButton).click(function () {
            confirmDialogMessage.text("Вы подтверждаете прочтение данного сообщения?");
            confirmDialog.removeClass("invisible");
        });

        $(addButton).click(function () {
            editDialogMessage.text("Введите данные нового контакта");
            editDialog.removeClass("invisible");
            editDialogInputFamily.focus();
        });

        $(messageDialogButton).click(function () {
            messageDialog.addClass("invisible");
        });

        $(confirmDialogCencelButton).click(function () {
            confirmDialog.addClass("invisible");
        });

        $(confirmDialogOkButton).click(function () {
            confirmDialog.addClass("invisible");
        });

        $(editDialogCancelButton).click(function () {
            editDialog.addClass("invisible");
        });

        $(editDialogOkButton).click(function () {
            editDialog.addClass("invisible");
            createRow(1, editDialogInputFamily.val(), editDialogInputName.val(), editDialogInputPhone.val());
            editDialogInputFamily.val("");
            editDialogInputName.val("");
            editDialogInputPhone.val("");
        });
    });
})();