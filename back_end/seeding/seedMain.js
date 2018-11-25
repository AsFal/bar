//@ts-check
let IngredientList = require("../models/IngredientList.js");
let inventoryDb = require("../db_interaction/inventory.js");



/**
 * @function 
 * @param {Object} listSeed 
 */
function seedMain(listSeed) {
    return Promise.all(listSeed.map((ingredient)=>
    inventoryDb.createIngredient(ingredient)))
    .then((ingredientDocs)=>inventoryDb.addToMain(ingredientDocs));
}

module.exports = seedMain;

