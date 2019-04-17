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

    new Vue({
        el: "#App",
        data: {
            tasks: [],
            editTaskText: "",
            newTaskText: "",
            isInvalidNewTask: false,
            id: 0,
            confirmMessage: ""
        },
        methods: {
            addTask: function() {
                if (this.newTaskText === "") {
                    this.isInvalidNewTask = true;
                    this.$refs.taskTextInput.focus();
                    return;
                }
                this.isInvalidNewTask = false;

                this.id++;
                var taskTime = getDateAndTime();
                var newTask = {
                    id: this.id,
                    time: taskTime,
                    text: this.newTaskText,
                    isEdit: false,
                    isRemove: false
                };
                this.newTaskText = "";
                this.tasks.push(newTask);

                this.$refs.taskTextInput.focus();
            },
            editTask: function(editTask) {
                this.tasks.forEach(function(task) {
                    task.isEdit = false;
                });
                editTask.isEdit = true;
                this.editTaskText = editTask.text;
            },
            changeTask: function(editTask) {
                editTask.text = this.editTaskText;
                editTask.isEdit = false;
                this.editTaskText = "";
            },
            confirmRemoveAllTasks: function() {
                this.tasks.forEach(function(task) {
                    task.isRemove = true;
                });
                this.confirmMessage = "Вы действительно хотите удалить все задачи?";
                $("#confirm-dialog").modal("show");
            },
            confirmRemoveTask: function(removeTask) {
                removeTask.isRemove = true;
                this.confirmMessage = "Вы действительно хотите удалить задачу: " + removeTask.text;
                $("#confirm-dialog").modal("show");
            },
            cancelRemove: function() {
                this.tasks.forEach(function(task) {
                    task.isRemove = false;
                });
            },
            applyRemove: function() {
                this.tasks = this.tasks.filter(function(task) {
                    return !task.isRemove;
                });
            }
        }
    });

    $('[data-toggle="tooltip"]').tooltip({ container: 'body' });
})();