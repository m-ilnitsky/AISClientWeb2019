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

    var minValueMessage = "Минимальное значение: ";
    var errorNumberMessage = "Введите корректное число!";

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

        function onInputC() {
            var C = parseFloat(inputC.value);
            if (isNaN(C) || typeof (C) !== "number") {
                errorC.textContent = errorNumberMessage;
                errorC.className = "error-message show-error";
                return
            }
            clearErrorMessages();
            if (C < minC) {
                C = minC;
                inputC.value = minC;
                errorC.textContent = minValueMessage + minC;
                errorC.className = "error-message show-error";
            }
            inputK.value = convertCtoK(C);
            inputF.value = convertCtoF(C);
        }

        function onInputK() {
            var K = parseFloat(inputK.value);
            if (isNaN(K) || typeof (K) !== "number") {
                errorK.textContent = errorNumberMessage;
                errorK.className = "error-message show-error";
                return
            }
            clearErrorMessages();
            if (K < minK) {
                K = minK;
                inputK.value = minK;
                errorK.textContent = minValueMessage + minK;
                errorK.className = "error-message show-error";
            }
            var C = convertKtoC(K);
            inputC.value = C;
            inputF.value = convertCtoF(C);
        }

        function onInputF() {
            var F = parseFloat(inputF.value);
            if (isNaN(F) || typeof (F) !== "number") {
                errorF.textContent = errorNumberMessage;
                errorF.className = "error-message show-error";
                return
            }
            clearErrorMessages();
            if (F < minF) {
                F = minF;
                inputF.value = minF;
                errorF.textContent = minValueMessage + minF;
                errorF.className = "error-message show-error";
            }
            var C = convertFtoC(F);
            inputC.value = C;
            inputK.value = convertCtoK(C);
        }

        inputC.addEventListener("change", onInputC);
        inputK.addEventListener("change", onInputK);
        inputF.addEventListener("change", onInputF);
    });
})();