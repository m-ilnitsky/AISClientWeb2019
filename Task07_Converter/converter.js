"use strict";

(function() {
    var minK = 0;
    var minC = -273.15;
    var minF = -459.67;

    function convertCtoK(tC) {
        return parseFloat(tC) + 273.15;
    }

    function convertKtoC(tK) {
        return parseFloat(tK) - 273.15;
    }

    function convertCtoF(tC) {
        return parseFloat(tC) * 9 / 5 + 32;
    }

    function convertFtoC(tF) {
        return (parseFloat(tF) - 32) * 5 / 9;
    }

    document.addEventListener("DOMContentLoaded", function() {
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
            if (isNaN(value) || typeof(value) !== "number") {
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
            var tC = parseFloat(inputC.value);
            inputK.value = convertCtoK(tC);
            inputF.value = convertCtoF(tC);
        }

        function onInputK() {
            if (!validateInputValue(inputK, errorK, minK)) {
                return
            }
            var tC = convertKtoC(parseFloat(inputK.value));
            inputC.value = tC;
            inputF.value = convertCtoF(tC);
        }

        function onInputF() {
            if (!validateInputValue(inputF, errorF, minF)) {
                return
            }
            var tC = convertFtoC(parseFloat(inputF.value));
            inputC.value = tC;
            inputK.value = convertCtoK(tC);
        }

        inputK.addEventListener("change", onInputK);
        inputC.addEventListener("change", onInputC);
        inputF.addEventListener("change", onInputF);

        inputF.addEventListener("keydown", function(e) {
            if (e.keyCode === 9) {
                e.preventDefault();
                inputK.focus();
            }
        });
    });
})();