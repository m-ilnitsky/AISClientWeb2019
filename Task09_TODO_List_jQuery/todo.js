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
        var tbody = $("#todo_tbody");
        var buttonAddTask = $("#todo_add-task");
        var buttonRemoveAll = $("#todo_remove-all");

        var windowRemoveAll = $("#remove-all-window").add("#shield-window");
        var buttonRemoveAllCancel = $("#remove-all_cancel");
        var buttonRemoveAllOk = $("#remove-all_ok");

        var windowAddTask = $("#add-task-window").add("#shield-window");
        var buttonAddTaskCancel = $("#add-task_cancel");
        var buttonAddTaskAdd = $("#add-task_add");
        var textareaAddTask = $("#add-task_text");
        var captionAddTask = $("#add-task_caption");

        buttonRemoveAll.click(function() {
            var tasksNumber = tbody.children().length;
            if (tasksNumber > 1) {
                windowRemoveAll.removeClass("invisible");
            } else if (tasksNumber === 1) {
                tbody.html("");
            }
        });

        buttonRemoveAllOk.click(function() {
            tbody.html("");
            windowRemoveAll.addClass("invisible");
        });

        buttonRemoveAllCancel.click(function() {
            windowRemoveAll.addClass("invisible");
        });

        buttonAddTask.click(function() {
            captionAddTask.text("Введите текст задачи");
            buttonAddTaskAdd.text("Добавить");
            windowAddTask.removeClass("invisible");
            textareaAddTask.focus();
        });

        buttonAddTaskCancel.click(function() {
            windowAddTask.addClass("invisible");
        });

        var editTD;

        buttonAddTaskAdd.click(function() {
            if ("Добавить" === buttonAddTaskAdd.text()) {
                var taskText = textareaAddTask.val();

                if (taskText.trim() === "") {
                    return
                }

                var tr = $("<tr></tr>").appendTo(tbody);
                var tdDate = $("<td></td>").addClass("date").text(getDateAndTime()).appendTo(tr);
                var tdText = $("<td></td>").text(taskText).appendTo(tr);
                var tdButtonEdit = $("<td></td>").addClass("button").text("Изменить").click(function() {
                    captionAddTask.text("Измените текст задачи");
                    buttonAddTaskAdd.text("Сохранить");
                    windowAddTask.removeClass("invisible");
                    textareaAddTask.val(tdText.text());
                    textareaAddTask.focus();
                    editTD = tdText;
                }).appendTo(tr);
                var tdButtonDelete = $("<td></td>").addClass("button").text("Удалить").click(function() {
                    tr.remove();
                }).appendTo(tr);

                textareaAddTask.val("");

                windowAddTask.addClass("invisible");

            } else if ("Сохранить" === buttonAddTaskAdd.text()) {
                var newText = textareaAddTask.val();

                if (newText.trim() === "") {
                    return
                }

                editTD.text(newText);
                textareaAddTask.val("");

                windowAddTask.addClass("invisible");
            }
        });
    });
})();