"use strict";

(function () {

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

    var phoneRegexp = /^(\+[0-9]+)?([(][0-9]+[)])?([\-0-9]+)?[0-9]$/;

    var app = new Vue({
        el: "#App",
        data: {
            contacts: [
                {id: 0, family: "Иванов", name: "Василий", phone: "123321", checked: false},
                {id: 1, family: "Васильев", name: "Дмитрий", phone: "234234", checked: false},
                {id: 2, family: "Дмитриев", name: "Иоган", phone: "345345", checked: false},
                {id: 3, family: "Йохансон", name: "Скарлетт", phone: "456456", checked: false},
                {id: 4, family: "Скарлетсон", name: "Рагнар", phone: "567567", checked: false},
                {id: 5, family: "Рагнарсон", name: "Сигурд", phone: "678678", checked: false},
                {id: 6, family: "Сигурдсон", name: "Снорри", phone: "789789", checked: false},
                {id: 7, family: "Стурлуссон", name: "Снорри", phone: "890890", checked: false},
                {id: 8, family: "Барбаросса", name: "Фридрих", phone: "779988", checked: false},
                {id: 9, family: "Арагонский", name: "Фердинанд", phone: "123456", checked: false},
                {id: 10, family: "Македонский", name: "Александр", phone: "112233", checked: false},
                {id: 11, family: "Итакский", name: "Одиссей", phone: "123456789", checked: false},
                {id: 12, family: "Африканский", name: "Сципион", phone: "123456123", checked: false},
                {id: 13, family: "Кортес", name: "Эрнан", phone: "7654321", checked: false},
                {id: 14, family: "Юлий Цезарь", name: "Гай", phone: "123123123", checked: false},
                {id: 15, family: "", name: "Ксенофонт", phone: "7775773", checked: false},
                {id: 16, family: "", name: "Фукидид", phone: "7775772", checked: false},
                {id: 17, family: "", name: "Геродод", phone: "7775771", checked: false},
                {id: 18, family: "", name: "Аристотель", phone: "5775773", checked: false},
                {id: 19, family: "", name: "Платон", phone: "5775772", checked: false},
                {id: 20, family: "Плюшкины", name: "", phone: "123771", checked: false},
                {id: 21, family: "Неваляшкины", name: "", phone: "123772", checked: false},
                {id: 22, family: "Поваляшкины", name: "", phone: "123773", checked: false},
                {id: 23, family: "Деточкины", name: "", phone: "123774", checked: false},
                {id: 24, family: "Мышкины", name: "", phone: "123775", checked: false}
            ],
            newContact: {
                family: "",
                name: "",
                phone: "",
                isInvalidFamily: false,
                isInvalidName: false,
                isInvalidPhone: false,
                invalidPhoneFeedback: ""
            },
            editedContact: {
                family: "",
                name: "",
                phone: "",
                initPhone: "",
                isInvalidFamily: false,
                isInvalidName: false,
                isInvalidPhone: false,
                invalidPhoneFeedback: ""
            },
            isEditing: false,
            id: 26,
            filterString: "",
            isFilter: false,
            checkedAll: false,
            contactForRemove: {},
            contactForEdit: {},
            confirmRemoveContact: {
                message: "",
                family: "",
                name: "",
                phone: ""
            },
            confirmDialog: {
                message: "",
                okButtonText: ""
            }
        },
        computed: {
            filteredContacts: function () {
                var str = this.filterString.trim();

                if (str === "") {
                    this.isFilter = false;
                    return this.contacts;
                }

                this.isFilter = true;

                return this.contacts.filter(
                    function (contact) {
                        return contact.family.includes(str)
                            || contact.name.includes(str)
                            || contact.phone.includes(str);
                    }
                );
            },
            checkedContactsCount: function () {
                return this.filteredContacts.reduce(
                    function (number, contact) {
                        if (contact.checked) {
                            return number + 1;
                        }
                        return number;
                    }, 0
                );
            },
            filteredContactsCount: function () {
                if (this.contacts.length === 0) {
                    $(this.$refs.searchInput).popover("disable");
                    $(this.$refs.searchInput).popover("hide");
                    return 0;
                }

                if (this.filteredContacts.length > 0) {
                    $(this.$refs.searchInput).popover("disable");
                    $(this.$refs.searchInput).popover("hide");
                } else {
                    $(this.$refs.searchInput).popover("enable");
                    $(this.$refs.searchInput).popover("show");
                }

                return this.filteredContacts.length;
            }
        },
        methods: {
            checkAll: function () {
                if (!this.checkedAll) {
                    this.checkedAll = true;
                    this.contacts.forEach(function (element) {
                        element.checked = true;
                    });
                } else {
                    if (this.contacts.every(function (element, index, array) {
                        return element.checked;
                    })) {
                        this.checkedAll = false;
                        this.contacts.forEach(function (element) {
                            element.checked = false;
                        });
                    } else {
                        this.checkedAll = true;
                        this.contacts.forEach(function (element) {
                            element.checked = true;
                        });
                    }
                }
            },
            check: function (contact) {
                contact.checked = !contact.checked;
                if (this.checkedAll && this.contacts.some(function (element, index, array) {
                    return element.checked == false;
                })) {
                    this.checkedAll = false;
                }
            },
            resetFilter: function () {
                this.filterString = "";
            },
            copyContact: function (contact) {
                this.newContact.family = contact.family;
                this.newContact.name = contact.name;
                this.$refs.newPhone.focus();
            },
            havePhone: function (phoneNumber) {
                var newPhone = phoneNumber.trim()
                    .replace(/[+]/g, "")
                    .replace(/[(]/g, "")
                    .replace(/[)]/g, "")
                    .replace(/[-]/g, "");

                var isPhone = false;

                this.contacts.forEach(function (contact) {
                    var phoneInRow = contact.phone.trim()
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
            },
            isCorrectPhone: function (phoneNumber) {
                return phoneRegexp.test(phoneNumber);
            },
            addContact: function () {
                this.newContact.isInvalidFamily = false;
                this.newContact.isInvalidName = false;
                this.newContact.isInvalidPhone = false;

                if (this.newContact.family === "" && this.newContact.name === "") {
                    this.newContact.isInvalidFamily = true;
                    this.newContact.isInvalidName = true;
                }

                if (this.newContact.phone.trim().length === 0) {
                    this.newContact.isInvalidPhone = true;
                    this.newContact.invalidPhoneFeedback = "Нет номера телефона.";
                } else if (!this.isCorrectPhone(this.newContact.phone.trim())) {
                    this.newContact.isInvalidPhone = true;
                    this.newContact.invalidPhoneFeedback = "Некорректный номер телефона.";
                } else if (this.havePhone(this.newContact.phone)) {
                    this.newContact.isInvalidPhone = true;
                    this.newContact.invalidPhoneFeedback = "Такой номер телефона уже есть.";
                }

                if (this.newContact.isInvalidFamily || this.newContact.isInvalidName || this.newContact.isInvalidPhone) {
                    return;
                }

                var contact = {};
                contact.id = this.id;
                contact.family = this.newContact.family;
                contact.name = this.newContact.name;
                contact.phone = this.newContact.phone;
                contact.checked = false;

                this.contacts.push(contact);

                this.newContact.phone = "";

                this.id++;
            },
            removeContact: function () {
                var index = this.contacts.indexOf(this.contactForRemove);
                this.contacts.splice(index, 1);
                $(this.$refs.confirmDialogRemoveContact).modal("hide");
            },
            confirmRemove: function (contact) {
                this.confirmRemoveContact.message = "Вы действительно хотите удалить контакт?";
                this.confirmRemoveContact.family = contact.family;
                this.confirmRemoveContact.name = contact.name;
                this.confirmRemoveContact.phone = contact.phone;

                $(this.$refs.confirmDialogRemoveContact).modal("show");
                this.contactForRemove = contact;
            },
            removeCheckedContacts: function () {
                var str = this.filterString.trim();

                this.contacts = this.contacts.filter(
                    function (contact) {
                        return !(contact.checked && (contact.family.includes(str) || contact.name.includes(str) || contact.phone.includes(str)));
                    }
                );
            },
            confirmRemoveChecked: function () {
                if (this.checkedContactsCount === 0) {
                    $(this.$refs.messageDialog).modal("show");
                } else if (this.checkedContactsCount === 1) {
                    var checkedContacts = this.filteredContacts.filter(
                        function (contact) {
                            return contact.checked;
                        }
                    );
                    this.confirmRemove(checkedContacts[0]);
                } else {
                    this.confirmDialog.message = "Вы действительно хотите удалить " + this.checkedContactsCount + " " + getContactString(this.checkedContactsCount) + "?";
                    this.confirmDialog.okButtonText = "Удалить все";
                    $(this.$refs.confirmDialog).modal("show");
                }
            },
            applyChange: function () {
                this.editedContact.isInvalidFamily = false;
                this.editedContact.isInvalidName = false;
                this.editedContact.isInvalidPhone = false;

                if (this.editedContact.family === "" && this.editedContact.name === "") {
                    this.editedContact.isInvalidFamily = true;
                    this.editedContact.isInvalidName = true;
                }

                if (this.editedContact.phone.trim().length === 0) {
                    this.editedContact.isInvalidPhone = true;
                    this.editedContact.invalidPhoneFeedback = "Нет номера телефона.";
                } else if (!this.isCorrectPhone(this.editedContact.phone.trim())) {
                    this.editedContact.isInvalidPhone = true;
                    this.editedContact.invalidPhoneFeedback = "Некорректный номер телефона.";
                } else if ((this.editedContact.initPhone.trim() !== this.editedContact.phone.trim()) && this.havePhone(this.editedContact.phone)) {
                    this.editedContact.isInvalidPhone = true;
                    this.editedContact.invalidPhoneFeedback = "Такой номер телефона уже есть.";
                }

                if (this.editedContact.isInvalidFamily || this.editedContact.isInvalidName || this.editedContact.isInvalidPhone) {
                    return;
                }

                this.contactForEdit.family = this.editedContact.family;
                this.contactForEdit.name = this.editedContact.name;
                this.contactForEdit.phone = this.editedContact.phone;
                this.contactForEdit.checked = false;

                $(this.$refs.editDialog).modal("hide");
                isEditing = false;
            },
            editContact: function (contact) {
                this.editedContact.family = contact.family;
                this.editedContact.name = contact.name;
                this.editedContact.phone = contact.phone;
                this.editedContact.initPhone = contact.phone;

                this.editedContact.isInvalidFamily = false;
                this.editedContact.isInvalidName = false;
                this.editedContact.isInvalidPhone = false;

                this.contactForEdit = contact;

                $(this.$refs.editDialog).modal("show");
            },
            confirmEditChecked: function () {
                if (this.checkedContactsCount === 0) {
                    $(this.$refs.messageDialog).modal("show");
                    return;
                }

                var checkedContacts = this.filteredContacts.filter(
                    function (contact) {
                        return contact.checked;
                    }
                );

                if (this.checkedContactsCount === 1) {
                    this.editContact(checkedContacts[0]);
                } else {
                    this.confirmDialog.message = "Вы действительно хотите изменить " + this.checkedContactsCount + " " + getContactString(this.checkedContactsCount) + "?";
                    this.confirmDialog.okButtonText = "Изменить";
                    $(this.$refs.confirmDialog).modal("show");
                }
            },
            editCheckedContacts: function () {
                var checkedContacts = this.filteredContacts.filter(
                    function (contact) {
                        return contact.checked;
                    }
                );

                var i = 0;
                this.isEditing = false;

                var timerId = setInterval(function () {
                    if (!this.isEditing) {
                        this.isEditing = true;
                        app.editContact(checkedContacts[i]);
                        i++;
                    }
                    if (i >= checkedContacts.length) {
                        clearInterval(timerId);
                    }
                }, 50);
            },
            confirm: function () {
                if (this.confirmDialog.okButtonText === "Удалить все") {
                    this.removeCheckedContacts();
                } else if (this.confirmDialog.okButtonText === "Изменить") {
                    this.editCheckedContacts();
                }

                $(this.$refs.confirmDialog).modal("hide");
            }
        }
    });

    $(document).ready(function () {
        var editKey = false;

        var filterKey = false;
        var lastFilterString = "";

        var singleDeleteKey = true;
        var deletingRowDelButton;

        var addButton = $("#add-button");
        var addDialogInputFamily = $("#add-dialog_family");
        var addDialogInputName = $("#add-dialog_name");
        var addDialogInputPhone = $("#add-dialog_phone");
        var addDialogInputPhoneFeedback = $("#add-dialog_phone-feedback");

        var editButton = $("#edit-button");
        var deleteButton = $("#delete-button");

        var textSearchInput = $("#search-input");
        var searchResetButton = $("#search-reset-button");

        var topCheckbox = $("#all-checkbox-top");
        var bottomCheckbox = $("#all-checkbox-bottom");

        var topCounter = $("#checked-counter-top");
        var bottomCounter = $("#checked-counter-bottom");

        var messageDialog = $("#message-dialog");
        var messageDialogMessage = $("#message-dialog_message");

        var confirmDialog = $("#confirm-dialog");
        var confirmDialogMessage = $("#confirm-dialog_message");
        var confirmDialogOkButton = $("#confirm-dialog_ok");

        var editDialog = $("#edit-dialog");
        var editDialogInputFamily = $("#edit-dialog_family");
        var editDialogInputName = $("#edit-dialog_name");
        var editDialogInputPhone = $("#edit-dialog_phone");
        var editDialogInputPhoneFeedback = $("#edit-dialog_phone-feedback");
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
            /*    var str = searchingString.toLowerCase().trim();

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

                    var isString = (family.indexOf(str) >= 0) ||
                        (name.indexOf(str) >= 0) ||
                        (phone.indexOf(str) >= 0) ||
                        (phoneDigits.indexOf(str) >= 0);

                    $(this).toggle(isString);

                    if (!isString) {
                        if (checkboxes.eq(i).is(":checked")) {
                            checkboxes.eq(i).click();
                        }
                        rowCounter--;
                    }
                });

                if (rowCounter === 0) {
                    textSearchInput.popover("enable");
                    textSearchInput.popover("show");
                } else {
                    textSearchInput.popover("disable");
                    textSearchInput.popover("hide");
                }

                setRowNumbers();
                showCheckedRowsNumber();

                filterKey = false;*/
        }

        function callFiltering() {
            /*    var newFilterString = textSearchInput.val().toLowerCase().trim();
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
                }*/
        }

        /*textSearchInput.on("keyup", function () {
            //callFiltering();
        });*/

        /*textSearchInput.on("change", function () {
            //callFiltering();
        });*/

        /*searchResetButton.on("click", function () {
            textSearchInput.val("");
            searchResetButton.removeClass("visible-button");
            lastFilterString = "";
            filterRows(textSearchInput.val());
        });*/

        function createToast(title, message) {
            var divToast = $("<div></div>").addClass("toast")
                .prop("role", "alert")
                .prop("aria-live", "assertive")
                .prop("aria-atomic", "true");
            var divToastHeader = $("<div></div>").addClass("toast-header")
                .appendTo(divToast);
            $("<strong></strong>").addClass("mr-auto")
                .text(title)
                .appendTo(divToastHeader);
            var buttonClose = $("<button></button>").addClass("ml-2 mb-1 close")
                .prop("data-dismiss", "toast")
                .prop("aria-label", "Close")
                .click(function () {
                    divToast.toast("hide");
                })
                .appendTo(divToastHeader);
            $("<span>&times;</span>")
                .prop("aria-hidden", "true")
                .appendTo(buttonClose);
            $("<div></div>").addClass("toast-body")
                .text(message)
                .appendTo(divToast);

            divToast.appendTo("#toastBox");
            divToast.toast({delay: 60000});
            divToast.toast("show");
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
            var addButton = $("<div></div>").addClass("circle-button add-button")
                .attr("title", "Создать новый контакт на основе данного")
                .click(function () {
                    addDialogInputFamily.val(tdFamily.text());
                    addDialogInputName.val(tdName.text());
                    addDialogInputPhone.val("");
                    addDialogInputPhone.focus();
                }).appendTo(tdButtons);
            var addButtonImg = $("<img src='icon-add.png'  alt='a'>")
                .appendTo(addButton);
            var editButton = $("<div></div>").addClass("circle-button edit-button")
                .attr("title", "Изменить контакт")
                .click(function () {
                    editDialogOkButton.text("Применить");
                    editDialogInputFamily.removeClass("is-invalid");
                    editDialogInputName.removeClass("is-invalid");
                    editDialogInputPhone.removeClass("is-invalid");
                    editDialog.modal('show');
                    editDialogInputFamily.val(tdFamily.text());
                    editDialogInputName.val(tdName.text());
                    editDialogInputPhone.val(tdPhone.text());
                    editDialogInputFamily.focus();
                    editedFamily = tdFamily;
                    editedName = tdName;
                    editedPhone = tdPhone;
                    editedCheckbox = checkbox;
                }).appendTo(tdButtons);
            var delEditImg = $("<img src='icon-edit.png'  alt='e'>")
                .appendTo(editButton);
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
                        confirmDialog.modal('show');
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
            var delButtonImg = $("<img src='icon-close.png'  alt='x'>")
                .appendTo(delButton);

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

        /*$(deleteButton).click(function () {
            if (checkedCounter === 0) {
                messageDialogMessage.html("Не выбрано ни одного контакта!<br>Для выполнения операции выберите контакты!");
                messageDialog.modal("show");
            } else if (checkedCounter === 1) {
                var checkedDeleteButtons = $("#table-body tr:has(input[type='checkbox']:checked) .delete-button");
                singleDeleteKey = true;
                checkedDeleteButtons.click();
            } else {
                confirmDialogMessage.text("Вы действительно хотите удалить " + checkedCounter + " " + getContactString(checkedCounter) + "?");
                confirmDialogOkButton.text("Удалить все");
                confirmDialog.modal("show");
            }
        });*/

        /*$(editButton).click(function () {
            if (checkedCounter === 0) {
                messageDialogMessage.html("Не выбрано ни одного контакта!<br>Для выполнения операции выберите контакты!");
                messageDialog.modal("show");
            } else if (checkedCounter === 1) {
                var checkedEditButtons = $("#table-body tr:has(input[type='checkbox']:checked) .edit-button");
                checkedEditButtons.click();
            } else {
                confirmDialogMessage.text("Вы действительно хотите изменить " + checkedCounter + " " + getContactString(checkedCounter) + "?");
                confirmDialogOkButton.text("Изменить");
                confirmDialog.modal("show");
            }
        });*/

        /*$(confirmDialogOkButton).click(function () {
            if (confirmDialogOkButton.text() === "Удалить") {
                singleDeleteKey = false;
                deletingRowDelButton.click();
                singleDeleteKey = true;
                createToast("Удаление", "Удалён один контакт");
            } else if (confirmDialogOkButton.text() === "Удалить все") {
                var checkedDeleteButtons = $("#table-body tr:has(input[type='checkbox']:checked) .delete-button");
                var counterValue = checkedCounter;
                singleDeleteKey = false;
                checkedDeleteButtons.click();
                singleDeleteKey = true;
                createToast("Удаление", "Удалено " + counterValue + " " + getContactString(counterValue));
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
            confirmDialog.modal("hide");
        });*/

        var phoneRegexp = /^(\+[0-9]+)?([(][0-9]+[)])?([\-0-9]+)?[0-9]$/;

        /*$(addButton).click(function () {
            var isInvalid = false;

            if (addDialogInputFamily.val().trim() === "" && addDialogInputName.val().trim() === "") {
                addDialogInputFamily.addClass("is-invalid");
                addDialogInputName.addClass("is-invalid");
                isInvalid = true;
            } else {
                addDialogInputFamily.removeClass("is-invalid");
                addDialogInputName.removeClass("is-invalid");
            }

            if (addDialogInputPhone.val().trim().length === 0) {
                addDialogInputPhone.addClass("is-invalid");
                addDialogInputPhoneFeedback.text("Нет номера телефона.");
                isInvalid = true;
            } else if (!phoneRegexp.test(addDialogInputPhone.val())) {
                addDialogInputPhone.addClass("is-invalid");
                addDialogInputPhoneFeedback.text("Некорректный номер телефона.");
                isInvalid = true;
            } else if (isPhoneNumber(addDialogInputPhone.val())) {
                addDialogInputPhone.addClass("is-invalid");
                addDialogInputPhoneFeedback.text("Такой номер телефона уже есть.");
                isInvalid = true;
            } else {
                addDialogInputPhone.removeClass("is-invalid");
            }

            if (isInvalid) {
                return;
            }

            createRow(rowCounter + 1, addDialogInputFamily.val().trim(), addDialogInputName.val().trim(), addDialogInputPhone.val().trim());

            createToast("Создание", "Добавлен контакт: " + addDialogInputFamily.val() + " " + addDialogInputName.val());

            addDialogInputFamily.val("");
            addDialogInputName.val("");
            addDialogInputPhone.val("");
            showCheckedRowsNumber();
        });*/

        /*$(editDialogCancelButton).click(function () {
            editDialog.modal("hide");
            editKey = false;
        });*/

        /*$(editDialogOkButton).click(function () {

            var isInvalid = false;

            if (editDialogInputFamily.val().trim() === "" && editDialogInputName.val().trim() === "") {
                editDialogInputFamily.addClass("is-invalid");
                editDialogInputName.addClass("is-invalid");
                isInvalid = true;
            } else {
                editDialogInputFamily.removeClass("is-invalid");
                editDialogInputName.removeClass("is-invalid");
            }

            if (editDialogInputPhone.val().trim().length === 0) {
                editDialogInputPhone.addClass("is-invalid");
                editDialogInputPhoneFeedback.text("Нет номера телефона.");
                isInvalid = true;
            } else if (!phoneRegexp.test(editDialogInputPhone.val())) {
                editDialogInputPhone.addClass("is-invalid");
                editDialogInputPhoneFeedback.text("Некорректный номер телефона.");
                isInvalid = true;
            } else if (editDialogInputPhone.val().trim() !== editedPhone.text().trim() && isPhoneNumber(editDialogInputPhone.val())) {
                editDialogInputPhone.addClass("is-invalid");
                editDialogInputPhoneFeedback.text("Такой номер телефона уже есть.");
                isInvalid = true;
            } else {
                editDialogInputPhone.removeClass("is-invalid");
            }

            if (isInvalid) {
                return;
            }

            editDialog.modal("hide");
            editedFamily.text(editDialogInputFamily.val().trim());
            editedName.text(editDialogInputName.val().trim());
            editedPhone.text(editDialogInputPhone.val().trim());
            if (editedCheckbox.is(":checked")) {
                editedCheckbox.click();
            }
            showCheckedRowsNumber();
            editKey = false;

            createToast("Редактирование", "Изменён контакт: " + editDialogInputFamily.val() + " " + editDialogInputName.val());

        });*/

        function showCheckedRowsNumber() {
            /*    if (checkedCounter === 0) {
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
                }*/
        }

        function setAllCheckbox(isChecked) {
            /*   var allTableBodyCheckboxes = $("#table-body tr:visible input[type='checkbox']");
               if (isChecked) {
                   checkedCounter = 0;
                   allTableBodyCheckboxes.prop("checked", false);
                   allTableBodyCheckboxes.click();
               } else {
                   allTableBodyCheckboxes.prop("checked", true);
                   allTableBodyCheckboxes.click();
                   checkedCounter = 0;
               }*/
        }

        /*$(topCheckbox).click(function () {
              var isChecked = topCheckbox.is(":checked");
              bottomCheckbox.prop("checked", isChecked);
              setAllCheckbox(isChecked);
        });*/

        /*$(bottomCheckbox).click(function () {
              var isChecked = bottomCheckbox.is(":checked");
              topCheckbox.prop("checked", isChecked);
              setAllCheckbox(isChecked);
        });*/

        function createTestContacts() {
            createRow(1, "Иванов", "Василий", "123321");
            createRow(2, "Васильев", "Дмитрий", "234234");
            createRow(3, "Дмитриев", "Иоган", "345345");
            createRow(4, "Йохансон", "Скарлетт", "456456");
            createRow(5, "Скарлетсон", "Рагнар", "567567");
            createRow(6, "Рагнарсон", "Сигурд", "678678");
            createRow(7, "Сигурдсон", "Снорри", "789789");
        }

        //createTestContacts();

        $('[data-toggle="tooltip"]').tooltip({container: 'body'});
        textSearchInput.popover({container: 'body'});
        textSearchInput.popover("disable");

        textSearchInput.focus();
    });
})();