
// let seed = require("./seeds/ingredientTest.json");
let seedLists = require("./ingredient-list.js");
let inventoryDb = require("../db_interaction/inventory");
/**@ */
let ingredientTemplate = require("./seeds/ingredients/sample-ingredient-1.json");
let ingredientTemplate = require("./seeds/ingredients/sample-ingredient-2.json");
let ingredientTemplate = require("./seeds/ingredients/sample-ingredient-3.json");

/**
 * @async
 * @function exec
 * @typedef {Object} ReturnData
 * @prop {String} mainId
 * @prop {Array<String>} listIds
 * @prop {String} ingredientId
 * @prop {Object} ingredientTemplate
 * @returns {Promise<ReturnData>}
 */
async function exec() {
    let mainIngredientList = await inventoryDb.createList({name:"Main"});
    let otherIngredientLists = await Promise.all([inventoryDb.createList({name:"Shank"}),
        inventoryDb.createList({name:"Shanked"})]) 
    
    let data = await seedLists.seedList(mainIngredientList._id, ingredientTemplate);
    await seedLists.seedList(otherIngredientLists[0]._id, ingredientTemplate);
    await seedLists.seedList(otherIngredientLists[1]._id, ingredientTemplate);

    return {
        mainId:mainIngredientList._id,
        listIds: otherIngredientLists.map(list=>list._id),
        ingredientId : data.ingredientIds[0],
        ingredientTemplate: ingredientTemplate
    }

}

module.exports = {
    exec:exec
}