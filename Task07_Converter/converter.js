"use strict";

(function () {
    var minK = 0;
    var minC = -273.15;
    var minF = -459.67;

    function convertCtoK(C) {
        return parseFloat(C) + 273.15;
    }

    function convertKtoC(K) {
        return parseFloat(K) - 273.15;
    }

    function convertCtoF(C) {
        return parseFloat(C) * 9 / 5 + 32;
    }

    function convertFtoC(F) {
        return (parseFloat(F) - 32) * 5 / 9;
    }

    document.addEventListener("DOMContentLoaded", function () {
        var inputK = document.getElementById("temperatureK");
        var inputC = document.getElementById("temperatureC");
        var inputF = document.getElementById("temperatureF");

        var errorK = inputK.nextSibling.nextSibling;
        var errorC = inputC.nextSibling.nextSibling;
        var errorF = inputF.nextSibling.nextSibling;

        function clearErrorMessages() {
            errorK.className = "error-message";
            errorC.className = "error-message";
            errorF.className = "error-message";

            inputK.className = "";
            inputC.className = "";
            inputF.className = "";
        }

        var minValueMessage = "Минимальное значение: ";
        var numberErrorMessage = "Введите корректное число!";

        function showErrorMessage(inputElement, errorElement, errorMessage) {
            errorElement.textContent = errorMessage;
            errorElement.className = "error-message show-error";
            inputElement.className = "show-error";
        }

        function validateInputValue(inputElement, errorElement, min) {
            var value = parseFloat(inputElement.value);
            if (isNaN(value) || typeof (value) !== "number") {
                showErrorMessage(inputElement, errorElement, numberErrorMessage);
                return false;
            }
            clearErrorMessages();
            if (value < min) {
                inputElement.value = min;
                showErrorMessage(inputElement, errorElement, minValueMessage + min);
            }
            return true;
        }

        function onInputC() {
            if (!validateInputValue(inputC, errorC, minC)) {
                return
            }
            var C = parseFloat(inputC.value);
            inputK.value = convertCtoK(C);
            inputF.value = convertCtoF(C);
        }

        function onInputK() {
            if (!validateInputValue(inputK, errorK, minK)) {
                return
            }
            var C = convertKtoC(parseFloat(inputK.value));
            inputC.value = C;
            inputF.value = convertCtoF(C);
        }

        function onInputF() {
            if (!validateInputValue(inputF, errorF, minF)) {
                return
            }
            var C = convertFtoC(parseFloat(inputF.value));
            inputC.value = C;
            inputK.value = convertCtoK(C);
        }

        inputK.addEventListener("change", onInputK);
        inputC.addEventListener("change", onInputC);
        inputF.addEventListener("change", onInputF);

        inputF.addEventListener("keydown", function (e) {
            if (e.keyCode === 9) {
                inputK.focus();
            }
        });
    });
})();