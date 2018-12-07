//@ts-check
/**
 * @typedef {import("../../models/Ingredient").IngredientDoc} IngredientDoc
 */
let inventoryDb = require("../../db_interaction/inventory");

/**
 * @async
 * @function seedMain
 * @param {Array<IngredientDoc>} ingredients 
 * @returns {Promise<Object>}
 * @prop {String} ingredientId
 * @prop {String} mainId 
 */
async function seedMain(ingredients) {

    let ingredientDocs = await Promise.all(ingredients.map((ingredient)=>
    inventoryDb.createIngredient(ingredient)))
    let mainId = await inventoryDb.addToMain(ingredientDocs);
    return {
        ingredientIds: ingredientDocs.map(ingredientDoc=>ingredientDoc._id),
        mainId: mainId
    }
}

/**
 * @async
 * @function seedMain
 * @param {Array<IngredientDoc>} ingredients 
 * @returns {Promise<Object>}
 * @prop {ingredientIds}
 * @prop {listId}
 */
async function seedList(listId, ingredients) {
    let ingredientDocs = await Promise.all(ingredients.map((ingredient)=>
    inventoryDb.createIngredient(ingredient)))
    let mainId = await inventoryDb.addToIngredientList(listId, ingredientDocs);
    return {
        ingredientIds: ingredientDocs.map((ingredientDoc)=>ingredientDoc._id),
        listId: mainId
    }
}

async function exec(){

}

module.exports = {
    seedList,
    seedMain,
    exec
}