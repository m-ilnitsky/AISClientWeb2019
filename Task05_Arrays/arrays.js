"use strict";

(function () {
    console.log("**********");

    var primeNumbers = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
    console.log("Исходный массив primeNumbers: " + primeNumbers);

    primeNumbers.sort(function (a, b) {
        return b - a;
    });
    console.log("Отсортированный массив primeNumbers: " + primeNumbers);

    var numberElements = 5;
    var listBegin = primeNumbers.slice(0, numberElements);
    var listEndMinusIndex = primeNumbers.slice(-numberElements, primeNumbers.length);
    var listEndPlusIndex = primeNumbers.slice(primeNumbers.length - numberElements, primeNumbers.length);
    var listEnd = primeNumbers.slice(primeNumbers.length - numberElements);

    console.log("Массив listBegin: " + listBegin);
    console.log("Массив listEndMinusIndex: " + listEndMinusIndex);
    console.log("Массив listEndPlusIndex: " + listEndPlusIndex);
    console.log("Массив listEnd: " + listEnd);
})();

(function () {
    console.log("**********");

    var naturalNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    console.log("Массив naturalNumbers: " + naturalNumbers);

    var evenNumbers = naturalNumbers.filter(function (a) {
        return a % 2 === 0;
    });
    console.log("Массив evenNumbers: " + evenNumbers);

    var sumOfEvenNumbers = evenNumbers.reduce(function (sum, current) {
        return sum + current;
    }, 0);
    console.log("sumOfEvenNumbers = " + sumOfEvenNumbers);
})();

(function () {
    console.log("**********");

    var numbers = [];
    for (var i = 1; i <= 100; ++i) {
        numbers.push(i);
    }
    console.log("Массив numbers: " + numbers);

    var evenSquareNumbers = numbers.filter(function (a) {
        return a % 2 === 0;
    }).map(function (a) {
        return a * a;
    });
    console.log("Массив evenSquareNumbers: " + evenSquareNumbers);
})();