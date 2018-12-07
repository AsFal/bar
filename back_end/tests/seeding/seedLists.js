//@ts-check
let inventoryDb = require("../../db_interaction/inventory");

async function seedMain(listSeed) {

    let ingredientDocs = await Promise.all(listSeed.map((ingredient)=>
    inventoryDb.createIngredient(ingredient)))
    let mainId = await inventoryDb.addToMain(ingredientDocs);
    return {
        ingredientId: ingredientDocs[0]._id,
        mainId: mainId
    }
}

module.exports = {

}