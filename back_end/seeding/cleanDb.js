var Ingredient = require("../models/Ingredient.js");
var Table = require("../models/Table.js");
var Menu = require("../models/Menu.js");
var Recipe = require("../models/Recipe.js");


function cleanDataBase() {
    return Ingredient.deleteMany({}).exec()
    .then(()=>Table.deleteMany({}).exec())
    .then(()=>Menu.deleteMany({}).exec())
    .then(()=>Recipe.deleteMany({}).exec())
    
    // This was working before, this is retarded
    // return Promise.all(Ingredient.deleteMany({}),
    // Table.deleteMany({}),
    // Menu.deleteMany({}),
    // Recipe.deleteMany({}));
}

module.exports = cleanDataBase;
