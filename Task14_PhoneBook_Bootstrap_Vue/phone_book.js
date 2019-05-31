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
                this.id++;

                this.createToast("Создание", "Добавлен контакт: " + this.newContact.family + " " + this.newContact.name + " " + this.newContact.phone);

                this.newContact.phone = "";
            },
            removeContact: function () {
                var index = this.contacts.indexOf(this.contactForRemove);

                this.createToast("Удаление", "Удалён контакт:" + this.contacts[index].family + " " + this.contacts[index].name + " " + this.contacts[index].phone);

                this.contacts.splice(index, 1);

                $(this.$refs.confirmDialogRemoveContact).modal("hide");
            },
            confirmRemove: function (contact) {
                this.confirmRemoveContact.message = "Вы действительно хотите удалить контакт?";
                this.confirmRemoveContact.family = contact.family;
                this.confirmRemoveContact.name = contact.name;
                this.confirmRemoveContact.phone = contact.phone;

                this.contactForRemove = contact;

                $(this.$refs.confirmDialogRemoveContact).modal("show");
            },
            removeCheckedContacts: function () {
                var str = this.filterString.trim();
                var oldCount = this.contacts.length;

                this.contacts = this.contacts.filter(
                    function (contact) {
                        return !(contact.checked && (contact.family.includes(str) || contact.name.includes(str) || contact.phone.includes(str)));
                    }
                );

                var deleteCount = oldCount - this.contacts.length;

                this.createToast("Удаление", "Удалено " + deleteCount + " " + getContactString(deleteCount));
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
                this.isEditing = false;
                this.createToast("Редактирование", "Изменён контакт: " + this.editedContact.family + " " + this.editedContact.name + " " + this.editedContact.phone);
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
                    if (!app.isEditing) {
                        app.isEditing = true;
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
            },
            createToast: function(title, message) {
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
        }
    });

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip({container: 'body'});

        $(app.$refs.searchInput).popover({container: 'body'});
        $(app.$refs.searchInput).popover("disable");

        $(app.$refs.searchInput).focus();
    });
})();