const main = require("./../main.js");
const data = require("./../data/data.json");

exports.fragilite = function (city_name) {
    return data.find(function (element) {
        if (element.Nom_com === city_name) {
            return element
        }
    });
};

exports.getCity = function (city_name) {


    return data.find(function (element) {
        if (element.Nom_com === city_name) {
            return element
        }
    });
};
