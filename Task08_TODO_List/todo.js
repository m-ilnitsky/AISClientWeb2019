"use strict";

(function () {
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

        buttonRemoveAll.addEventListener("click", function () {
            windowShield.className = "shield-window";
            windowRemoveAll.className = "remove-confirmation";
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
            windowShield.className = "shield-window";
            windowAddTask.className = "add-task";
        });

        buttonAddTaskCancel.addEventListener("click", function () {
            windowShield.className = "shield-window invisible";
            windowAddTask.className = "add-task invisible";
        });
    });
})();