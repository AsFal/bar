var Ingredient = require("../../models/Ingredient.js");
var IngredientList = require("../../models/IngredientList.js");
var Menu = require("../../models/Menu.js");
var Recipe = require("../../models/Recipe.js");


function cleanDataBase() {
    return Ingredient.deleteMany({}).exec()
    .then(()=>IngredientList.deleteMany({}).exec())
    .then(()=>Menu.deleteMany({}).exec())
    .then(()=>Recipe.deleteMany({}).exec())
    
    // This was working before, this is retarded
    // return Promise.all(Ingredient.deleteMany({}),
    // Table.deleteMany({}),
    // Menu.deleteMany({}),
    // Recipe.deleteMany({}));
}

module.exports = cleanDataBase;
