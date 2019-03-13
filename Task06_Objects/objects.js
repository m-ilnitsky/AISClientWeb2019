"use strict";

(function () {

    function createCountryList() {
        var russia = {
            "name": "Россия",
            "cities": [
                {"name": "Москва", "population": 12e6},
                {"name": "Петроград", "population": 5e6},
                {"name": "Новосибирск", "population": 1.6e6},
                {"name": "Екатеринбург", "population": 1.4e6},
                {"name": "Нижний Новгород", "population": 1.2e6}
            ]
        };

        var ukraine = {
            "name": "Украина",
            "cities": [
                {"name": "Киев", "population": 2.9e6},
                {"name": "Харьков", "population": 1.4e6},
                {"name": "Одесса", "population": 1e6},
                {"name": "Днепропетровск", "population": 1e6},
                {"name": "Донецк", "population": 0.9e6}
            ]
        };

        var belarus = {
            "name": "Беларусь",
            "cities": [
                {"name": "Минск", "population": 1.9e6},
                {"name": "Брест", "population": 0.3e6},
                {"name": "Гомель", "population": 0.5e6}
            ]
        };

        var kazakhstan = {
            "name": "Казахстан",
            "cities": [
                {"name": "Алма-Ата", "population": 1.8e6},
                {"name": "Астана", "population": 1e6},
                {"name": "Шимкент", "population": 1e6},
                {"name": "Караганда", "population": 0.5e6}
            ]
        };

        return [russia, ukraine, belarus, kazakhstan];
    }

    var countries = createCountryList();

    var maxNumberOfCities = countries.map(function (a) {
        return a["cities"].length;
    }).reduce(function (max, current) {
        return Math.max(max, current);
    }, 0);
    console.log("Максимальное число городов: " + maxNumberOfCities);

    var countriesWithMaxNumberOfCities = countries.filter(function (a) {
        return a["cities"].length === maxNumberOfCities;
    }).map(function (a) {
        return a["name"];
    });
    console.log("Страны с максимальным числом городов: " + countriesWithMaxNumberOfCities);

    var countryMap = countries.reduce(function (object, current) {
        function sumPopulation(sum, current) {
            return sum + current["population"];
        }

        object[current["name"]] = current["cities"].reduce(sumPopulation, 0);
        return object;
    }, {});
    console.log("Страны и их население: ");
    for (var property in countryMap) {
        console.log(property + " : " + countryMap[property]);
    }
})();