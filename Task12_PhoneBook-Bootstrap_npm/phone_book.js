"use strict";

(function () {
    $(document).ready(function () {
        var editKey = false;

        var filterKey = false;
        var lastFilterString = "";

        var singleDeleteKey = true;
        var deletingRowDelButton;

        var addButton = $("#add-button");
        var editButton = $("#edit-button");
        var deleteButton = $("#delete-button");
        var textSearchInput = $("#search-input");
        var searchResetButton = $("#search-reset-button");

        var topCheckbox = $("#all-checkbox-top");
        var bottomCheckbox = $("#all-checkbox-bottom");

        var topCounter = $("#checked-counter-top");
        var bottomCounter = $("#checked-counter-bottom");

        var messageDialog = $("#message-dialog").add("#message-shield-window");
        var messageDialogButton = $("#message-dialog_ok");
        var messageDialogMessage = $("#message-dialog_message");

        var confirmDialog = $("#confirm-dialog").add("#shield-window");
        var confirmDialogMessage = $("#confirm-dialog_message");
        var confirmDialogCancelButton = $("#confirm-dialog_cancel");
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
            var newPhone = phoneNumber.trim()
                .replace(/[+]/g, "")
                .replace(/[(]/g, "")
                .replace(/[)]/g, "")
                .replace(/[-]/g, "");
            var phones = $("#table-body .column-phone");

            var isPhone = false;
            phones.each(function () {
                var phoneInRow = $(this).text().trim()
                    .replace(/[+]/g, "")
                    .replace(/[(]/g, "")
                    .replace(/[)]/g, "")
                    .replace(/[-]/g, "");
                if (phoneInRow === newPhone) {
                    isPhone = true;
                    return false;
                }
            });
            return isPhone;
        }

        function setRowNumbers() {
            var numberColumnElements = $("#table-body tr:visible .column-number");
            numberColumnElements.each(function (i) {
                numberColumnElements.eq(i).text(i + 1);
            });
            rowCounter = numberColumnElements.length;
        }

        function filterRows(searchingString) {
            var str = searchingString.toLowerCase().trim();

            searchResetButton.toggleClass("visible-button", str.length !== 0);

            var rows = $("#table-body tr");
            var families = $("#table-body .column-family");
            var names = $("#table-body .column-name");
            var phones = $("#table-body .column-phone");
            var checkboxes = $("#table-body .column-checkbox input");

            rowCounter = rows.length;

            rows.each(function (i) {
                var family = families.eq(i).text().toLowerCase();
                var name = names.eq(i).text().toLowerCase();
                var phone = phones.eq(i).text().toLowerCase();
                var phoneDigits = phone.replace(/[+]/g, "")
                    .replace(/[(]/g, "")
                    .replace(/[)]/g, "")
                    .replace(/[-]/g, "");

                var isString = (family.indexOf(str) >= 0)
                    || (name.indexOf(str) >= 0)
                    || (phone.indexOf(str) >= 0)
                    || (phoneDigits.indexOf(str) >= 0);

                $(this).toggle(isString);

                if (!isString) {
                    if (checkboxes.eq(i).is(":checked")) {
                        checkboxes.eq(i).click();
                    }
                    rowCounter--;
                }
            });

            if (rowCounter === 0) {
                messageDialogMessage.text("Не найдено ни одного совпадения!");
                messageDialog.removeClass("invisible");
            }

            setRowNumbers();
            showCheckedRowsNumber();

            filterKey = false;
        }

        function callFiltering() {
            var newFilterString = textSearchInput.val().toLowerCase().trim();
            if (newFilterString === lastFilterString) {
                return;
            } else {
                lastFilterString = newFilterString;
            }

            if (!filterKey) {
                filterKey = true;
                setTimeout(function () {
                    filterRows(textSearchInput.val());
                }, 100);
            }
        }

        textSearchInput.on("keyup", function () {
            callFiltering();
        });

        textSearchInput.on("change", function () {
            callFiltering();
        });

        searchResetButton.on("click", function () {
            textSearchInput.val("");
            searchResetButton.removeClass("visible-button");
            lastFilterString = "";
            filterRows(textSearchInput.val());
        });

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
            var checkbox = $("<input type='checkbox'>")
                .addClass("checkbox")
                .click(function () {
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
            $("<div></div>").addClass("circle-button add-button")
                .attr("title", "Создать новый контакт на основе данного")
                .click(function () {
                    editDialogMessage.text("Введите данные нового контакта");
                    editDialogOkButton.text("Добавить");
                    editDialog.removeClass("invisible");
                    editDialogInputFamily.val(tdFamily.text());
                    editDialogInputName.val(tdName.text());
                    editDialogInputPhone.val("");
                    editDialogInputFamily.focus();
                }).appendTo(tdButtons);
            $("<div></div>").addClass("circle-button edit-button")
                .attr("title", "Изменить контакт")
                .click(function () {
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
            var delButton = $("<div></div>").addClass("circle-button delete-button")
                .attr("title", "Удалить контакт")
                .click(function () {
                    if (singleDeleteKey) {
                        var message = "Вы действительно хотите удалить контакт? <br>" +
                            tdFamily.text() + " <br>" +
                            tdName.text() + " <br>" +
                            tdPhone.text();
                        confirmDialogMessage.html(message);
                        confirmDialogOkButton.text("Удалить");
                        confirmDialog.removeClass("invisible");
                        deletingRowDelButton = delButton;
                    } else {
                        if (checkbox.is(":checked")) {
                            checkedCounter--;
                        }
                        rowCounter--;
                        tr.remove();
                        setRowNumbers();
                        showCheckedRowsNumber();
                    }
                }).appendTo(tdButtons);

            rowCounter++;
            return tr;
        }

        function getContactString(number) {
            var twoDigits = number % 100;
            var lastDigit = number % 10;

            if ((twoDigits >= 5 && twoDigits <= 20) || (lastDigit === 0) || (lastDigit >= 5 && lastDigit <= 9)) {
                return "контактов";
            } else if (lastDigit === 1) {
                return "контакт";
            } else if (lastDigit >= 2 && lastDigit <= 4) {
                return "контакта";
            }

            return "хм..мммм";
        }

        $(deleteButton).click(function () {
            if (checkedCounter === 0) {
                messageDialogMessage.text("Не выбрано ни одного контакта!\nДля выполнения операции выберите контакты!");
                messageDialog.removeClass("invisible");
            } else if (checkedCounter === 1) {
                var checkedDeleteButtons = $("#table-body tr:has(input[type='checkbox']:checked) .delete-button");
                singleDeleteKey = true;
                checkedDeleteButtons.click();
            } else {
                confirmDialogMessage.text("Вы действительно хотите удалить " + checkedCounter + " " + getContactString(checkedCounter) + "?");
                confirmDialogOkButton.text("Удалить все");
                confirmDialog.removeClass("invisible");
            }
        });

        $(editButton).click(function () {
            if (checkedCounter === 0) {
                messageDialogMessage.text("Не выбрано ни одного контакта!\nДля выполнения операции выберите контакты!");
                messageDialog.removeClass("invisible");
            } else {
                confirmDialogMessage.text("Вы действительно хотите изменить " + checkedCounter + " " + getContactString(checkedCounter) + "?");
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

        $(confirmDialogCancelButton).click(function () {
            confirmDialog.addClass("invisible");
        });

        $(confirmDialogOkButton).click(function () {
            if (confirmDialogOkButton.text() === "Удалить") {
                singleDeleteKey = false;
                deletingRowDelButton.click();
                singleDeleteKey = true;
            } else if (confirmDialogOkButton.text() === "Удалить все") {
                var checkedDeleteButtons = $("#table-body tr:has(input[type='checkbox']:checked) .delete-button");
                singleDeleteKey = false;
                checkedDeleteButtons.click();
                singleDeleteKey = true;
            } else if (confirmDialogOkButton.text() === "Изменить") {
                var checkedEditButtons = $("#table-body tr:has(input[type='checkbox']:checked) .edit-button");
                var i = 0;
                editKey = false;
                var timerId = setInterval(function () {
                    if (!editKey) {
                        editKey = true;
                        checkedEditButtons.eq(i).click();
                        i++;
                    }
                    if (i >= checkedEditButtons.length) {
                        clearInterval(timerId);
                    }
                }, 50);
            }
            confirmDialog.addClass("invisible");
        });

        $(editDialogCancelButton).click(function () {
            editDialog.addClass("invisible");
            editKey = false;
        });

        function isValidNewData() {
            if (editDialogInputFamily.val().trim() === "" && editDialogInputName.val().trim() === "") {
                editDialogInputFamily.addClass("error-marker");
                editDialogInputName.addClass("error-marker");
                messageDialogMessage.text("Не введено ни имени, ни фамилии! Нужно задать хотя бы одно из них!");
                messageDialog.removeClass("invisible");
                return false;
            }

            editDialogInputFamily.removeClass("error-marker");
            editDialogInputName.removeClass("error-marker");

            if (editDialogInputPhone.val().trim() === "") {
                editDialogInputPhone.addClass("error-marker");
                messageDialogMessage.text("Не введён номер телефона!");
                messageDialog.removeClass("invisible");
                return false;
            }

            editDialogInputPhone.removeClass("error-marker");

            return true;
        }

        function isNewPhoneNumber() {
            if (isPhoneNumber(editDialogInputPhone.val())) {
                editDialogInputPhone.addClass("error-marker");
                messageDialogMessage.text("Такой номер телефона уже есть!");
                messageDialog.removeClass("invisible");
                return false;
            }

            editDialogInputPhone.removeClass("error-marker");
            return true;
        }

        var phoneRegexp = /^(\+[0-9]+)?([(][0-9]+[)])?([\-0-9]+)?[0-9]$/;

        function isValidPhoneNumber() {
            if (!phoneRegexp.test(editDialogInputPhone.val())) {
                editDialogInputPhone.addClass("error-marker");
                messageDialogMessage.text("Некорректный номер телефона!");
                messageDialog.removeClass("invisible");
                return false;
            }

            editDialogInputPhone.removeClass("error-marker");
            return true;
        }

        $(editDialogOkButton).click(function () {
            if (!isValidNewData()) {
                return;
            }

            if (!isValidPhoneNumber()) {
                return;
            }

            if (editDialogOkButton.text() === "Добавить") {
                if (!isNewPhoneNumber()) {
                    return;
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
                editKey = false;
            }
        });

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

        function setAllCheckbox(isChecked) {
            var allTableBodyCheckboxes = $("#table-body tr:visible input[type='checkbox']");
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
            var isChecked = topCheckbox.is(":checked");
            bottomCheckbox.prop("checked", isChecked);
            setAllCheckbox(isChecked);
        });

        $(bottomCheckbox).click(function () {
            var isChecked = bottomCheckbox.is(":checked");
            topCheckbox.prop("checked", isChecked);
            setAllCheckbox(isChecked);
        });

        function createTestContacts() {
            createRow(1, "Иванов", "Василий", "123321");
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
            createRow(13, "Африканский", "Сципион", "123456123");
            createRow(14, "Кортес", "Эрнан", "7654321");
            createRow(15, "Юлий Цезарь", "Гай", "123123123");
            createRow(16, "", "Ксенофонт", "7775773");
            createRow(17, "", "Фукидид", "7775772");
            createRow(18, "", "Геродод", "7775771");
            createRow(19, "", "Аристотель", "5775773");
            createRow(20, "", "Платон", "5775772");
            createRow(21, "Плюшкины", "", "123771");
            createRow(22, "Неваляшкины", "", "123772");
            createRow(23, "Поваляшкины", "", "123773");
            createRow(24, "Деточкины", "", "123774");
            createRow(25, "Мышкины", "", "123775");
        }

        createTestContacts();
        textSearchInput.focus();
    });
})();