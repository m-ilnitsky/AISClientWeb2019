"use strict";

(function () {

    function getDateAndTime() {
        var date = new Date();
        var month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        var seconds = date.getSeconds();
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var createDate = date.getDate() + "." + month + "." + date.getFullYear();
        var createTime = date.getHours() + ":" + minutes + ":" + seconds;

        return createDate + "\n" + createTime;
    }

    document.addEventListener("DOMContentLoaded", function () {
        var buttonAddTask = document.getElementById("todo_add-task");
        var buttonRemoveAll = document.getElementById("todo_remove-all");

        var tbody = document.getElementById("todo_tbody");

        var windowShield = document.getElementById("shield-window");

        var windowRemoveAll = document.getElementById("remove-all-window");
        var buttonRemoveAllCancel = document.getElementById("remove-all_cancel");
        var buttonRemoveAllOk = document.getElementById("remove-all_ok");

        var windowAddTask = document.getElementById("add-task-window");
        var buttonAddTaskCancel = document.getElementById("add-task_cancel");
        var buttonAddTaskAdd = document.getElementById("add-task_add");
        var textareaAddTask = document.getElementById("add-task_text");
        var captionAddTask = document.getElementById("add-task_caption");

        buttonRemoveAll.addEventListener("click", function () {
            var tasksNumber = tbody.childElementCount;
            if (tasksNumber > 1) {
                windowShield.className = "shield-window";
                windowRemoveAll.className = "remove-confirmation";
            } else if (tasksNumber === 1) {
                tbody.innerHTML = "";
            }
        });

        buttonRemoveAllOk.addEventListener("click", function () {
            tbody.innerHTML = "";
            windowShield.className = "shield-window invisible";
            windowRemoveAll.className = "remove-confirmation invisible";
        });

        buttonRemoveAllCancel.addEventListener("click", function () {
            windowShield.className = "shield-window invisible";
            windowRemoveAll.className = "remove-confirmation invisible";
        });

        buttonAddTask.addEventListener("click", function () {
            captionAddTask.innerText = "Введите текст задачи";
            buttonAddTaskAdd.innerText = "Добавить";
            windowShield.className = "shield-window";
            windowAddTask.className = "add-task";
            textareaAddTask.focus();
        });

        buttonAddTaskCancel.addEventListener("click", function () {
            windowShield.className = "shield-window invisible";
            windowAddTask.className = "add-task invisible";
        });

        var editTD;

        buttonAddTaskAdd.addEventListener("click", function () {
            if ("Добавить" === buttonAddTaskAdd.innerText) {
                var taskText = textareaAddTask.value;

                if (taskText.trim() === "") {
                    return
                }

                var tr = document.createElement("tr");
                var tdDate = document.createElement("td");
                tdDate.className = "date";
                tdDate.innerText = getDateAndTime();
                var tdText = document.createElement("td");
                tdText.innerText = taskText;
                var tdButtonEdit = document.createElement("td");
                tdButtonEdit.className = "button";
                tdButtonEdit.innerText = "Изменить";
                var tdButtonDelete = document.createElement("td");
                tdButtonDelete.className = "button";
                tdButtonDelete.innerText = "Удалить";

                tr.appendChild(tdDate);
                tr.appendChild(tdText);
                tr.appendChild(tdButtonEdit);
                tr.appendChild(tdButtonDelete);

                tbody.appendChild(tr);

                tdButtonDelete.addEventListener("click", function () {
                    tbody.removeChild(tr);
                });

                tdButtonEdit.addEventListener("click", function () {
                    captionAddTask.innerText = "Измените текст задачи";
                    buttonAddTaskAdd.innerText = "Сохранить";
                    windowShield.className = "shield-window";
                    windowAddTask.className = "add-task";
                    textareaAddTask.value = tdText.innerText;
                    textareaAddTask.focus();
                    editTD = tdText;
                });

                textareaAddTask.value = "";

                windowShield.className = "shield-window invisible";
                windowAddTask.className = "add-task invisible";

            } else if ("Сохранить" === buttonAddTaskAdd.innerText) {
                var newText = textareaAddTask.value;

                if (newText.trim() === "") {
                    return
                }

                editTD.innerText = newText;

                windowShield.className = "shield-window invisible";
                windowAddTask.className = "add-task invisible";
            }
        });
    });
})();