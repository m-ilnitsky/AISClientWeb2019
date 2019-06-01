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
            contacts: [],
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
            id: 0,
            isEditing: false,
            editIndex: -1,
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

                return this.contacts.filter(function (contact) {
                    return contact.family.indexOf(str) >= 0
                        || contact.name.indexOf(str) >= 0
                        || contact.phone.indexOf(str) >= 0;
                });
            },
            checkedContactsCount: function () {
                return this.filteredContacts.reduce(function (number, contact) {
                    if (contact.checked) {
                        return number + 1;
                    }
                    return number;
                }, 0);
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
                    if (this.contacts.every(function (element) {
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

                var isNoChecked = this.contacts.some(function (element) {
                    return !element.checked;
                });

                if (this.checkedAll && isNoChecked) {
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
            hasPhone: function (phoneNumber) {
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
            loadContact: function (family, name, phone) {
                var contact = {
                    id: this.id,
                    family: family,
                    name: name,
                    phone: phone,
                    checked: false
                };

                this.contacts.push(contact);
                this.id++;
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
                } else if (this.hasPhone(this.newContact.phone)) {
                    this.newContact.isInvalidPhone = true;
                    this.newContact.invalidPhoneFeedback = "Такой номер телефона уже есть.";
                }

                if (this.newContact.isInvalidFamily || this.newContact.isInvalidName) {
                    this.$refs.newFamily.focus();
                    return;
                }

                if (this.newContact.isInvalidPhone) {
                    this.$refs.newPhone.focus();
                    return;
                }

                var contact = {};
                contact.id = this.id;
                contact.family = this.newContact.family.trim();
                contact.name = this.newContact.name.trim();
                contact.phone = this.newContact.phone.trim();
                contact.checked = false;

                this.contacts.push(contact);
                this.id++;

                this.createToast("Создание", "Добавлен контакт: " + this.newContact.family + " " + this.newContact.name + " " + this.newContact.phone);

                this.newContact.phone = "";
                this.$refs.newPhone.focus();
            },
            removeContact: function () {
                var index = this.contacts.indexOf(this.contactForRemove);

                this.createToast("Удаление", "Удалён контакт: " + this.contacts[index].family + " " + this.contacts[index].name + " " + this.contacts[index].phone);

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

                this.contacts = this.contacts.filter(function (contact) {
                    return (!contact.checked
                        || (contact.family.indexOf(str) < 0 && contact.name.indexOf(str) < 0 && contact.phone.indexOf(str) < 0));
                    // return !(contact.checked && (contact.family.indexOf(str) >= 0 || contact.name.indexOf(str) >= 0 || contact.phone.indexOf(str) >= 0));
                });

                var deleteCount = oldCount - this.contacts.length;

                this.createToast("Удаление", "Удалено " + deleteCount + " " + getContactString(deleteCount));
            },
            confirmRemoveChecked: function () {
                if (this.checkedContactsCount === 0) {
                    $(this.$refs.messageDialog).modal("show");
                } else if (this.checkedContactsCount === 1) {
                    var checkedContacts = this.filteredContacts.filter(function (contact) {
                        return contact.checked;
                    });
                    this.confirmRemove(checkedContacts[0]);
                } else {
                    this.confirmDialog.message = "Вы действительно хотите удалить " + this.checkedContactsCount + " " + getContactString(this.checkedContactsCount) + "?";
                    this.confirmDialog.okButtonText = "Удалить все";
                    $(this.$refs.confirmDialog).modal("show");
                }
            },
            cancelChange: function () {
                $(this.$refs.editDialog).modal("hide");
                this.isEditing = false;
                this.editIndex = -1;
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
                } else if ((this.editedContact.initPhone.trim() !== this.editedContact.phone.trim()) && this.hasPhone(this.editedContact.phone)) {
                    this.editedContact.isInvalidPhone = true;
                    this.editedContact.invalidPhoneFeedback = "Такой номер телефона уже есть.";
                }

                if (this.editedContact.isInvalidFamily || this.editedContact.isInvalidName) {
                    this.$refs.editFamily.focus();
                    return;
                }

                if (this.editedContact.isInvalidPhone) {
                    this.$refs.editPhone.focus();
                    return;
                }

                if (this.editedContact.initFamily.trim() !== this.editedContact.family.trim()
                    || this.editedContact.initName.trim() !== this.editedContact.name.trim()
                    || this.editedContact.initPhone.trim() !== this.editedContact.phone.trim()) {
                    this.contactForEdit.family = this.editedContact.family.trim();
                    this.contactForEdit.name = this.editedContact.name.trim();
                    this.contactForEdit.phone = this.editedContact.phone.trim();
                    this.contactForEdit.checked = false;

                    this.createToast("Редактирование", "Изменён контакт: " + this.editedContact.family + " " + this.editedContact.name + " " + this.editedContact.phone);
                }

                $(this.$refs.editDialog).modal("hide");
                this.isEditing = false;
            },
            editContact: function (contact) {
                this.editedContact.family = contact.family;
                this.editedContact.name = contact.name;
                this.editedContact.phone = contact.phone;

                this.editedContact.initFamily = contact.family;
                this.editedContact.initName = contact.name;
                this.editedContact.initPhone = contact.phone;

                this.editedContact.isInvalidFamily = false;
                this.editedContact.isInvalidName = false;
                this.editedContact.isInvalidPhone = false;

                this.contactForEdit = contact;

                $(this.$refs.editDialog).modal("show");
                this.$refs.editPhone.focus();
            },
            confirmEditChecked: function () {
                if (this.checkedContactsCount === 0) {
                    $(this.$refs.messageDialog).modal("show");
                    return;
                }

                var checkedContacts = this.filteredContacts.filter(function (contact) {
                    return contact.checked;
                });

                if (this.checkedContactsCount === 1) {
                    this.editContact(checkedContacts[0]);
                } else {
                    this.confirmDialog.message = "Вы действительно хотите изменить " + this.checkedContactsCount + " " + getContactString(this.checkedContactsCount) + "?";
                    this.confirmDialog.okButtonText = "Изменить";
                    $(this.$refs.confirmDialog).modal("show");
                }
            },
            editCheckedContacts: function () {
                var checkedContacts = this.filteredContacts.filter(function (contact) {
                    return contact.checked;
                });

                this.isEditing = false;
                this.editIndex = 0;

                var self = this;
                //var count = 0;

                var timerId = setInterval(function () {
                    //count++;
                    //console.log(count);
                    if (self.editIndex >= checkedContacts.length || self.editIndex < 0) {
                        clearInterval(timerId);
                        return;
                    }
                    if (!self.isEditing) {
                        //console.log("self.editIndex = " + self.editIndex);
                        self.isEditing = true;
                        self.editContact(checkedContacts[self.editIndex]);
                        self.editIndex++;
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
            createToast: function (title, message) {
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
        function createTestContacts() {
            app.loadContact("Иванов", "Василий", "123321");
            app.loadContact("Васильев", "Дмитрий", "234234");
            app.loadContact("Дмитриев", "Иоган", "345345");
            app.loadContact("Йохансон", "Скарлетт", "456456");
            app.loadContact("Скарлетсон", "Рагнар", "567567");
            app.loadContact("Рагнарсон", "Сигурд", "678678");
            app.loadContact("Сигурдсон", "Снорри", "789789");
            app.loadContact("Стурлуссон", "Снорри", "890890");
            app.loadContact("Барбаросса", "Фридрих", "779988");
            app.loadContact("Арагонский", "Фердинанд", "123456");
            app.loadContact("Македонский", "Александр", "112233");
            app.loadContact("Итакский", "Одиссей", "123456789");
            app.loadContact("Африканский", "Сципион", "123456123");
            app.loadContact("Кортес", "Эрнан", "7654321");
            app.loadContact("Юлий Цезарь", "Гай", "123123123");
            app.loadContact("", "Ксенофонт", "7775773");
            app.loadContact("", "Фукидид", "7775772");
            app.loadContact("", "Геродод", "7775771");
            app.loadContact("", "Аристотель", "5775773");
            app.loadContact("", "Платон", "5775772");
            app.loadContact("Плюшкины", "", "123771");
            app.loadContact("Неваляшкины", "", "123772");
            app.loadContact("Поваляшкины", "", "123773");
            app.loadContact("Деточкины", "", "123774");
            app.loadContact("Мышкины", "", "123775");
        }

        createTestContacts();

        $('[data-toggle="tooltip"]').tooltip({container: "body"});

        $(app.$refs.searchInput).popover({container: "body"});
        $(app.$refs.searchInput).popover("disable");

        $(app.$refs.searchInput).focus();
    });
})();