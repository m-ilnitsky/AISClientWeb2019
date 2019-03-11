"use strict";

(function () {
    console.log("**********");

    var primeNumbers = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];

    console.log("Исходный массив list: " + primeNumbers);


    function compareNumeric(a, b) {
        return b - a;
    }

    primeNumbers.sort(compareNumeric);

    console.log("Отсортированный массив list: " + primeNumbers);


    var numberElements = 5;
    var listBegin = primeNumbers.slice(0, numberElements);
    var listEndMinusIndex = primeNumbers.slice(-numberElements, primeNumbers.length);
    var listEndPlusIndex = primeNumbers.slice(primeNumbers.length - numberElements, primeNumbers.length);

    console.log("Массив listBegin: " + listBegin);
    console.log("Массив listEndMinusIndex: " + listEndMinusIndex);
    console.log("Массив listEndPlusIndex: " + listEndPlusIndex);
})();


(function () {
    console.log("**********");

    var naturalNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    console.log("Массив naturalNumbers: " + naturalNumbers);


    function isEven(a) {
        return a % 2 === 0;
    }

    var evenNumbers = naturalNumbers.filter(isEven);

    console.log("Массив evenNumbers: " + evenNumbers);


    function sum(sum, current) {
        return sum + current;
    }

    var sumOfEvenNumbers = naturalNumbers.filter(isEven).reduce(sum, 0);

    console.log("sumOfEvenNumbers = " + sumOfEvenNumbers);
})();


(function () {
    console.log("**********");

    var numbers = [];

    for (var i = 1; i <= 100; ++i) {
        numbers.push(i);
    }

    console.log("Массив numbers: " + numbers);


    function isEven(a) {
        return a % 2 === 0;
    }

    function calcSquare(a) {
        return a * a;
    }

    var evenSquareNumbers = numbers.filter(isEven).map(calcSquare);

    console.log("Массив evenSquareNumbers: " + evenSquareNumbers);
})();