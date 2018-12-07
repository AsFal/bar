
// let seed = require("./seeds/ingredientTest.json");
let seedLists = require("./ingredient-list.js");
let inventoryDb = require("../../db_interaction/inventory");
let cleanDb = require("./cleanDb");

/**@type {Array<Object>} */
let ingredientTemplates = [require("./seeds/ingredients/sample-ingredient-1.json")]
 ingredientTemplates.push(require("./seeds/ingredients/sample-ingredient-2.json"))
 ingredientTemplates.push(require("./seeds/ingredients/sample-ingredient-3.json"))

/**
 * @async
 * @function exec
 * @typedef {Object} ReturnData
 * @prop {String} mainId
 * @prop {Array<String>} listIds
 * @prop {String} ingredientId
 * @prop {Array<Object>} ingredientTemplates
 * @returns {Promise<ReturnData>}
 */
async function exec() {

    await cleanDb()
    let mainIngredientList = await inventoryDb.createList({name:"Main"})
    let otherIngredientLists = await Promise.all([inventoryDb.createList({name:"Shank"}),
        inventoryDb.createList({name:"Shanked"})]) 
    let data = await seedLists.seedList(mainIngredientList._id, ingredientTemplates)
    await seedLists.seedList(otherIngredientLists[0]._id, ingredientTemplates)
    await seedLists.seedList(otherIngredientLists[1]._id, ingredientTemplates)
    console.log("yes")
    return {
        mainId:mainIngredientList._id,
        listIds: otherIngredientLists.map(list=>list._id),
        ingredientId : data.ingredientIds[0],
        ingredientTemplates: ingredientTemplates
    }

}

module.exports = {
    exec:exec
}