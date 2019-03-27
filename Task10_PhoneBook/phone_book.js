"use strict";

(function () {
    $(document).ready(function () {
        var addButton = $("#add-button");
        var editButton = $("#edit-button");
        var deleteButton = $("#delete-button");
        var textSearchInput = $("#text-search");

        var topCheckbox = $("#all-checkbox-top");
        var bottomCheckbox = $("#all-checkbox-bottom");

        var topCounter = $("#checked-counter-top");
        var bottomCounter = $("#checked-counter-bottom");

        var messageDialog = $("#message-dialog").add("#message-shield-window");
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

        var rowCounter = 0;
        var checkedCounter = 0;

        function isPhoneNumber(phoneNumber) {
            var newPhone = phoneNumber.trim();
            var phones = $("#table-body .column-phone");
            for (var i = 0; i < phones.length; ++i) {
                if (phones.eq(i).text() === newPhone) {
                    return true;
                }
            }
            return false;
        }

        function filterRows(searchingString) {
            var str = searchingString.toLowerCase().trim();
            var rows = $("#table-body tr");
            var families = $("#table-body .column-family");
            var names = $("#table-body .column-name");
            var phones = $("#table-body .column-phone");

            var family;
            var name;
            var phone;
            for (var i = 0; i < rows.length; ++i) {
                family = families.eq(i).text().toLowerCase();
                name = names.eq(i).text().toLowerCase();
                phone = phones.eq(i).text().toLowerCase();

                if ((family.indexOf(str) >= 0) || (name.indexOf(str) >= 0) || (phone.indexOf(str) >= 0)) {
                    rows.eq(i).show();
                } else {
                    rows.eq(i).hide();
                }
            }
        }

        textSearchInput.on("change", function () {
            filterRows(textSearchInput.val());
        });

        textSearchInput.on("keyup", function () {
            filterRows(textSearchInput.val());
        });

        function setRowNumbers() {
            var numberColumnElements = $("#table-body .column-number");
            for (var i = 0; i < numberColumnElements.length; ++i) {
                numberColumnElements.eq(i).text(i + 1);
            }
        }

        function showCheckedRowsNumber() {
            if (checkedCounter === 0) {
                topCounter.text("");
                bottomCounter.text("");
                topCheckbox.prop("checked", false);
                bottomCheckbox.prop("checked", false);
            } else if (checkedCounter === rowCounter) {
                topCounter.text("все(" + checkedCounter + ")");
                bottomCounter.text("все(" + checkedCounter + ")");
                topCheckbox.prop("checked", true);
                bottomCheckbox.prop("checked", true);
            } else {
                topCounter.text(checkedCounter);
                bottomCounter.text(checkedCounter);
                topCheckbox.prop("checked", false);
                bottomCheckbox.prop("checked", false);
            }
        }

        var editedFamily;
        var editedName;
        var editedPhone;
        var editedCheckbox;

        function createRow(number, family, name, phone) {
            var tr = $("<tr></tr>").appendTo(tableBody);

            $("<td></td>").addClass("column-number").text(number).appendTo(tr);
            var tdFamily = $("<td></td>").addClass("column-family").text(family).appendTo(tr);
            var tdName = $("<td></td>").addClass("column-name").text(name).appendTo(tr);
            var tdPhone = $("<td></td>").addClass("column-phone").text(phone).appendTo(tr);
            var tdCheckbox = $("<td></td>").addClass("column-checkbox").appendTo(tr);
            var checkbox = $("<input type='checkbox'>").addClass("checkbox").click(function () {
                if (checkbox.is(":checked")) {
                    tr.addClass("checked-row");
                    checkedCounter++;
                } else {
                    tr.removeClass("checked-row");
                    checkedCounter--;
                }
                showCheckedRowsNumber();
            }).appendTo(tdCheckbox);
            var tdButtons = $("<td></td>").addClass("column-buttons").appendTo(tr);
            $("<div></div>").addClass("circle-button").addClass("add-button").click(function () {
                editDialogMessage.text("Введите данные нового контакта");
                editDialogOkButton.text("Добавить");
                editDialog.removeClass("invisible");
                editDialogInputFamily.val(tdFamily.text());
                editDialogInputName.val(tdName.text());
                editDialogInputPhone.val("");
                editDialogInputFamily.focus();
            }).appendTo(tdButtons);
            $("<div></div>").addClass("circle-button").addClass("edit-button").click(function () {
                editDialogMessage.text("Измените данные существующего контакта");
                editDialogOkButton.text("Применить");
                editDialog.removeClass("invisible");
                editDialogInputFamily.val(tdFamily.text());
                editDialogInputName.val(tdName.text());
                editDialogInputPhone.val(tdPhone.text());
                editDialogInputFamily.focus();
                editedFamily = tdFamily;
                editedName = tdName;
                editedPhone = tdPhone;
                editedCheckbox = checkbox;
            }).appendTo(tdButtons);
            $("<div></div>").addClass("circle-button").addClass("delete-button").click(function () {
                if (checkbox.is(":checked")) {
                    checkedCounter--;
                }
                rowCounter--;
                tr.remove();
                setRowNumbers();
                showCheckedRowsNumber();
            }).appendTo(tdButtons);

            rowCounter++;
            return tr;
        }

        $(deleteButton).click(function () {
            if (checkedCounter === 0) {
                messageDialogMessage.text("Не выбрано ни одного контакта!\nДля выполнения операции выберите контакты!");
                messageDialog.removeClass("invisible");
            } else {
                confirmDialogMessage.text("Вы действительно хотите удалить " + checkedCounter + " контактов?");
                confirmDialogOkButton.text("Удалить");
                confirmDialog.removeClass("invisible");
            }
        });

        $(editButton).click(function () {
            if (checkedCounter === 0) {
                messageDialogMessage.text("Не выбрано ни одного контакта!\nДля выполнения операции выберите контакты!");
                messageDialog.removeClass("invisible");
            } else {
                confirmDialogMessage.text("Вы действительно хотите изменить " + checkedCounter + " контактов?");
                confirmDialogOkButton.text("Изменить");
                confirmDialog.removeClass("invisible");
            }
        });

        $(addButton).click(function () {
            editDialogMessage.text("Введите данные нового контакта");
            editDialogOkButton.text("Добавить");
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
            if (confirmDialogOkButton.text() === "Удалить") {
                var checkedDeleteButtons = $("#table-body tr:has(input[type='checkbox']:checked) .delete-button");
                checkedDeleteButtons.click();
            } else if (confirmDialogOkButton.text() === "Изменить") {
                var checkedEditButtons = $("#table-body tr:has(input[type='checkbox']:checked) .edit-button");
                checkedEditButtons.click();
            }
            confirmDialog.addClass("invisible");
        });

        $(editDialogCancelButton).click(function () {
            editDialog.addClass("invisible");
        });

        function isValidNewData() {
            if (editDialogInputFamily.val().trim() === "" && editDialogInputName.val().trim() === "") {
                editDialogInputFamily.addClass("error-marker");
                editDialogInputName.addClass("error-marker");
                messageDialogMessage.text("Не введено ни имени, ни фамилии! Нужно задать хотя бы одно из них!");
                messageDialog.removeClass("invisible");
                return false;
            } else {
                editDialogInputFamily.removeClass("error-marker");
                editDialogInputName.removeClass("error-marker");
            }

            if (editDialogInputPhone.val().trim() === "") {
                editDialogInputPhone.addClass("error-marker");
                messageDialogMessage.text("Не введён номер телефона!");
                messageDialog.removeClass("invisible");
                return false;
            } else {
                editDialogInputPhone.removeClass("error-marker");
            }

            return true;
        }

        function isNewPhoneNumber() {
            if (isPhoneNumber(editDialogInputPhone.val())) {
                editDialogInputPhone.addClass("error-marker");
                messageDialogMessage.text("Такой номер телефона уже есть!");
                messageDialog.removeClass("invisible");
                return false;
            } else {
                editDialogInputPhone.removeClass("error-marker");
                return true;
            }
        }

        $(editDialogOkButton).click(function () {
            if (!isValidNewData()) {
                return
            }

            if (editDialogOkButton.text() === "Добавить") {
                if (!isNewPhoneNumber()) {
                    return
                }

                editDialog.addClass("invisible");
                createRow(rowCounter + 1, editDialogInputFamily.val().trim(), editDialogInputName.val().trim(), editDialogInputPhone.val().trim());
                editDialogInputFamily.val("");
                editDialogInputName.val("");
                editDialogInputPhone.val("");
                showCheckedRowsNumber();
            } else if (editDialogOkButton.text() === "Применить") {
                editDialog.addClass("invisible");
                editedFamily.text(editDialogInputFamily.val().trim());
                editedName.text(editDialogInputName.val().trim());
                editedPhone.text(editDialogInputPhone.val().trim());
                if (editedCheckbox.is(":checked")) {
                    editedCheckbox.click();
                }
                showCheckedRowsNumber();
            }
        });

        function setAllCheckbox(isChecked) {
            var allTableBodyCheckboxes = $("#table-body input[type='checkbox']");
            if (isChecked) {
                checkedCounter = 0;
                allTableBodyCheckboxes.prop("checked", false);
                allTableBodyCheckboxes.click();
            } else {
                allTableBodyCheckboxes.prop("checked", true);
                allTableBodyCheckboxes.click();
                checkedCounter = 0;
            }
        }

        $(topCheckbox).click(function () {
            if (topCheckbox.is(":checked")) {
                bottomCheckbox.prop("checked", true);
                setAllCheckbox(true);
            } else {
                bottomCheckbox.prop("checked", false);
                setAllCheckbox(false);
            }
        });

        $(bottomCheckbox).click(function () {
            if (bottomCheckbox.is(":checked")) {
                topCheckbox.prop("checked", true);
                setAllCheckbox(true);
            } else {
                topCheckbox.prop("checked", false);
                setAllCheckbox(false);
            }
        });

        function createTestContacts() {
            createRow(1, "Иванов", "Василий", "123123");
            createRow(2, "Васильев", "Дмитрий", "234234");
            createRow(3, "Дмитриев", "Иоган", "345345");
            createRow(4, "Йохансон", "Скарлетт", "456456");
            createRow(5, "Скарлетсон", "Рагнар", "567567");
            createRow(6, "Рагнарсон", "Сигурд", "678678");
            createRow(7, "Сигурдсон", "Снорри", "789789");
            createRow(8, "Стурлуссон", "Снорри", "890890");
            createRow(9, "Барбаросса", "Фридрих", "779988");
            createRow(10, "Арагонский", "Фердинанд", "123456");
            createRow(11, "Македонский", "Александр", "112233");
            createRow(12, "Итакский", "Одиссей", "123456789");
            createRow(13, "Африканский", "Сципион", "123456");
            createRow(14, "Кортес", "Эрнан", "7654321");
            createRow(15, "Юлий Цезарь", "Гай", "123123");
            createRow(16, "", "Ксенофонт", "7775777");
        }

        createTestContacts();
    });
})();