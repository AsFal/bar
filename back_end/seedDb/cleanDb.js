var Ingredient = require("../models/Ingredient.js");
var Table = require("../models/Table.js");
var Menu = require("../models/Menu.js");
var Recipe = require("../models/Recipe.js");


function cleanDataBase() {
    return Ingredient.deleteMany({})
    .then((res)=>Table.deleteMany())
    .then((res)=>Menu.deleteMany({}))
    .then((res)=>Recipe.deleteMany({}));
}

module.exports = cleanDataBase;
