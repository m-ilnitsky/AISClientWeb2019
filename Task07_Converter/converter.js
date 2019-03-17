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
        }

        var minValueMessage = "Минимальное значение: ";
        var numberErrorMessage = "Введите корректное число!";

        function showErrorMessage(errorElement, errorMessage) {
            errorElement.textContent = errorMessage;
            errorElement.className = "error-message show-error";
        }

        function validateInputValue(inputElement, min, errorElement) {
            var value = parseFloat(inputElement.value);
            if (isNaN(value) || typeof (value) !== "number") {
                showErrorMessage(errorElement, numberErrorMessage);
                return false;
            }
            clearErrorMessages();
            if (value < min) {
                value = min;
                inputElement.value = min;
                showErrorMessage(errorElement, minValueMessage + min);
            }
            return true;
        }

        function onInputC() {
            if (!validateInputValue(inputC, minC, errorC)) {
                return
            }
            var C = parseFloat(inputC.value);
            inputK.value = convertCtoK(C);
            inputF.value = convertCtoF(C);
        }

        function onInputK() {
            if (!validateInputValue(inputK, minK, errorK)) {
                return
            }
            var C = convertKtoC(parseFloat(inputK.value));
            inputC.value = C;
            inputF.value = convertCtoF(C);
        }

        function onInputF() {
            if (!validateInputValue(inputF, minF, errorF)) {
                return
            }
            var C = convertFtoC(parseFloat(inputF.value));
            inputC.value = C;
            inputK.value = convertCtoK(C);
        }

        inputC.addEventListener("change", onInputC);
        inputK.addEventListener("change", onInputK);
        inputF.addEventListener("change", onInputF);
    });
})();