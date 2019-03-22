"use strict";

(function() {

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

    $(document).ready(function() {
        var buttonAddTask = $("#todo_add-task")[0];
        var buttonRemoveAll = $("#todo_remove-all")[0];

        var tbody = $("#todo_tbody")[0];

        var windowShield = $("#shield-window")[0];

        var windowRemoveAll = $("#remove-all-window")[0];
        var buttonRemoveAllCancel = $("#remove-all_cancel")[0];
        var buttonRemoveAllOk = $("#remove-all_ok")[0];

        var windowAddTask = $("#add-task-window")[0];
        var buttonAddTaskCancel = $("#add-task_cancel")[0];
        var buttonAddTaskAdd = $("#add-task_add")[0];
        var textareaAddTask = $("#add-task_text")[0];
        var captionAddTask = $("#add-task_caption")[0];

        buttonRemoveAll.addEventListener("click", function() {
            var tasksNumber = tbody.childElementCount;
            if (tasksNumber > 1) {
                $(windowShield).removeClass("invisible");
                $(windowRemoveAll).removeClass("invisible");
            } else if (tasksNumber === 1) {
                tbody.innerHTML = "";
            }
        });

        buttonRemoveAllOk.addEventListener("click", function() {
            tbody.innerHTML = "";
            $(windowShield).addClass("invisible");
            $(windowRemoveAll).addClass("invisible");
        });

        buttonRemoveAllCancel.addEventListener("click", function() {
            $(windowShield).addClass("invisible");
            $(windowRemoveAll).addClass("invisible");
        });

        buttonAddTask.addEventListener("click", function() {
            captionAddTask.innerText = "Введите текст задачи";
            buttonAddTaskAdd.innerText = "Добавить";
            $(windowShield).removeClass("invisible");
            $(windowAddTask).removeClass("invisible");
            textareaAddTask.focus();
        });

        buttonAddTaskCancel.addEventListener("click", function() {
            $(windowShield).addClass("invisible");
            $(windowAddTask).addClass("invisible");
        });

        var editTD;

        buttonAddTaskAdd.addEventListener("click", function() {
            if ("Добавить" === buttonAddTaskAdd.innerText) {
                var taskText = textareaAddTask.value;

                if (taskText.trim() === "") {
                    return
                }

                var tr = $("<tr></tr>").appendTo(tbody);
                var tdDate = $("<td></td>").addClass("date").text(getDateAndTime()).appendTo(tr);
                var tdText = $("<td></td>").text(taskText).appendTo(tr);
                var tdButtonEdit = $("<td></td>").addClass("button").text("Изменить").click(function() {
                    captionAddTask.innerText = "Измените текст задачи";
                    buttonAddTaskAdd.innerText = "Сохранить";
                    $(windowShield).removeClass("invisible");
                    $(windowAddTask).removeClass("invisible");
                    textareaAddTask.value = tdText[0].innerText;
                    textareaAddTask.focus();
                    editTD = tdText[0];
                }).appendTo(tr);
                var tdButtonDelete = $("<td></td>").addClass("button").text("Удалить").click(function() {
                    tbody.removeChild(tr[0]);
                }).appendTo(tr);

                textareaAddTask.value = "";

                $(windowShield).addClass("invisible");
                $(windowAddTask).addClass("invisible");

            } else if ("Сохранить" === buttonAddTaskAdd.innerText) {
                var newText = textareaAddTask.value;

                if (newText.trim() === "") {
                    return
                }

                editTD.innerText = newText;
                textareaAddTask.value = "";

                $(windowShield).addClass("invisible");
                $(windowAddTask).addClass("invisible");
            }
        });
    });
})();