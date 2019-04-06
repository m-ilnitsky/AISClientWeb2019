"use strict";

(function () {
    var people = [
        {name: "Михаил", lastName: "Михайлов", age: 99},
        {name: "Валентин", lastName: "Валентинов", age: 89},
        {name: "Николай", lastName: "Николаев", age: 79},
        {name: "Сидор", lastName: "Сидоров", age: 39},
        {name: "Пётр", lastName: "Петров", age: 29},
        {name: "Анна", lastName: "Аннова", age: 27},
        {name: "Алексей", lastName: "Алексеев", age: 49},
        {name: "Дамир", lastName: "Дамиров", age: 59},
        {name: "Василиса", lastName: "Васильева", age: 25},
        {name: "Серафима", lastName: "Серафимова", age: 21},
        {name: "Юрий", lastName: "Юрьев", age: 17},
        {name: "Илья", lastName: "Ильин", age: 23}
    ];

    function print(arrayOfObjects) {
        arrayOfObjects.forEach(function (obj, i) {
            for (var property in obj) {
                console.log("[" + i + "] " + property + " : " + obj[property]);
            }
        });
    }

    console.log("Исходный массив people:");
    print(people);
    console.log();

    people = _.each(people, function (p) {
        p.fullName = p.lastName + " " + p.name;
    });
    console.log("Массив people с полным именем:");
    print(people);
    console.log();

    var averageAge = _.reduce(people, function (memo, p) {
        return memo + p.age;
    }, 0) / people.length;
    console.log("Средний возраст:" + averageAge);
    console.log();

    var peopleFrom20To30 = _.chain(people)
        .filter(function (p) {
            return p.age >= 20 && p.age <= 30;
        })
        .sortBy("age")
        .value();
    console.log("Массив people от 20 до 30 с сортировкой по имени:");
    print(peopleFrom20To30);
})();