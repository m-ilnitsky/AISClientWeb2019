"use strict";

(function () {

    function createCountryList() {
        var russia = {
            "Название": "Россия",
            "Города": [
                {"Название": "Москва", "Население": 12e6},
                {"Название": "Петроград", "Население": 5e6},
                {"Название": "Новосибирск", "Население": 1.6e6},
                {"Название": "Екатеринбург", "Население": 1.4e6},
                {"Название": "Нижний Новгород", "Население": 1.2e6}
            ]
        };

        var ukraine = {
            "Название": "Украина",
            "Города": [
                {"Название": "Киев", "Население": 2.9e6},
                {"Название": "Харьков", "Население": 1.4e6},
                {"Название": "Одесса", "Население": 1e6},
                {"Название": "Днепропетровск", "Население": 1e6},
                {"Название": "Донецк", "Население": 0.9e6}
            ]
        };

        var belarus = {
            "Название": "Беларусь",
            "Города": [
                {"Название": "Минск", "Население": 1.9e6},
                {"Название": "Брест", "Население": 0.3e6},
                {"Название": "Гомель", "Население": 0.5e6}
            ]
        };

        var kazakhstan = {
            "Название": "Казахстан",
            "Города": [
                {"Название": "Алма-Ата", "Население": 1.8e6},
                {"Название": "Астана", "Население": 1e6},
                {"Название": "Шимкент", "Население": 1e6},
                {"Название": "Караганда", "Население": 0.5e6}
            ]
        };

        return [russia, ukraine, belarus, kazakhstan];
    }

    var countries = createCountryList();


    function numberOfCities(a) {
        return a["Города"].length;
    }

    function max(max, current) {
        if (current > max) {
            return current;
        } else {
            return max;
        }
    }

    var maxNumberOfCities = countries.map(numberOfCities).reduce(max, 0);

    console.log("Максимальное число городов: " + maxNumberOfCities);

    function isMaxNumberOfCities(a) {
        return a["Города"].length === maxNumberOfCities;
    }

    function getCountryName(a) {
        return a["Название"];
    }

    var countriesWithMaxNumberOfCities = countries.filter(isMaxNumberOfCities).map(getCountryName);

    console.log("Страны с максимальным числом городов: " + countriesWithMaxNumberOfCities);


    function createCountryMap(object, current) {
        function sumPopulation(sum, current) {
            return sum + current["Население"];
        }

        var population = current["Города"].reduce(sumPopulation, 0);

        object[current["Название"]] = population;

        return object;
    }

    var countryMap = countries.reduce(createCountryMap, {});

    console.log("Страны и их население: ");
    for (var property in countryMap) {
        console.log(property + " : " + countryMap[property]);
    }
})();