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

    $(document).ready(function () {
        var buttonAddTask = $("#todo_add-task_btn");
        var textAddTask = $("#todo_add-task_text");

        var tbody = $("#todo_tbody");

        var buttonRemoveAll = $("#todo_delete-all-btn");
        var confirmDialog = $("#confirm-dialog");
        var confirmDialogMessage = $("#confirm-dialog_message");
        var confirmDialogOk = $("#confirm-dialog_ok");

        var editDialog = $("#edit-dialog");
        var editDialogTaskText = $("#edit-task_text");
        var editDialogOk = $("#edit-dialog_ok");

        buttonRemoveAll.click(function () {
            var tasksNumber = tbody.children().length;
            if (tasksNumber > 1) {
                confirmDialogMessage.text("Вы действительно хотите удалить все задачи?");
                confirmDialog.modal("show");
            } else if (tasksNumber === 1) {
                confirmDialogMessage.text("Вы действительно хотите удалить единственную задачу?");
                confirmDialog.modal("show");
            }
        });

        confirmDialogOk.click(function () {
            tbody.html("");
            confirmDialog.modal("hide");
        });

        var editTD;

        buttonAddTask.click(function () {
            var taskText = textAddTask.val();

            if (taskText.trim() === "") {
                textAddTask.addClass("is-invalid");
                return
            }
            textAddTask.removeClass("is-invalid");

            var tr = $("<tr></tr>")
                .appendTo(tbody);
            $("<td></td>").addClass("todo_col-date")
                .text(getDateAndTime())
                .appendTo(tr);
            var tdText = $("<td></td>")
                .text(taskText)
                .appendTo(tr);
            var tdButtonEdit = $("<td></td>").addClass("todo_col-button")
                .appendTo(tr);
            $("<button></button>").addClass("btn btn-primary")
                .text("Изменить")
                .click(function () {
                    editDialog.modal("show");
                    editDialogTaskText.val(tdText.text());
                    editDialogTaskText.focus();
                    editTD = tdText;
                })
                .appendTo(tdButtonEdit);
            var tdButtonDelete = $("<td></td>").addClass("todo_col-button").appendTo(tr);
            $("<button></button>").addClass("btn btn-primary")
                .text("Удалить")
                .click(function () {
                    tr.remove();
                })
                .appendTo(tdButtonDelete);

            textAddTask.val("");
            textAddTask.focus();
        });

        editDialogOk.click(function () {
            var newText = editDialogTaskText.val();

            if (newText.trim() === "") {
                editDialogTaskText.addClass("is-invalid");
                return
            }
            editDialogTaskText.removeClass("is-invalid");

            editTD.text(newText);
            editDialogTaskText.val("");

            editDialog.modal("hide");
        });

        $('[data-toggle="tooltip"]').tooltip({container: 'body'});
    });
})();