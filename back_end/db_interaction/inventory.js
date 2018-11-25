//@ts-check
/**
 * @file
 * @typedef {import("../models/Ingredient.js").IngredientDoc} IngredientDoc
 * @typedef {import("../models/IngredientList.js").IngredientListDoc} IngredientListDoc
 */
/// <reference path="../models/Ingredient.js" />

var Ingredient = require("../models/Ingredient.js");
var IngredientList = require("../models/IngredientList.js");

// Making interfaces of types in typescript
/**
 * @async
 * @function fetchList
 * @returns {Promise<Array<IngredientListDoc>>}
 */
function fetchLists() {
    // Should return all lists
    return IngredientList.find({}).exec()
}

/**
 * @async
 * @function fetchIngredientList
 * @param {String} listId 
 * @returns {Promise}
 */
function fetchIngredientList(listId) {
    return IngredientList.findById(listId).populate("ingredients").exec()
    .then((listDoc)=>{
        return listDoc.ingredients});
}

/**
 * @async
 * @function createList
 * @param {Object} list
 * @returns {Promise} 
 */
function createList(list) {
    return IngredientList.create(list);
}

/**
 * @async
 * @function createIngredient 
 * @param {Object} ingredient
 * @returns {Promise} 
 */
function createIngredient(ingredient) {
    return Ingredient.create(ingredient);
}

/**
 * @async
 * @function addToTable
 * @param {String} tableId 
 * @param {Array<IngredientDoc>} ingredientDocs 
 */
// Adds a variable number of ingredients to the table
function addToTable(tableId, ingredientDocs) {
    return IngredientList.findById(tableId).exec()
    .then((tableDoc)=>{
        const oldIngredients = tableDoc.ingredients;
        let newIngredients = oldIngredients.slice();
        ingredientDocs.forEach((ingredientDoc)=>{
            newIngredients.push(ingredientDoc._id);
        })
        return IngredientList.findByIdAndUpdate(tableDoc._id, {
            ingredients:newIngredients}).exec();
    })
}


/**
 * @async
 * @function addToMain
 * @param {Array<IngredientDoc>} ingredientDocs 
 */
function addToMain(ingredientDocs) {
    
    return Table.findOne({name:"Main"}).exec()
    .then((mainTableDoc)=>{

        const oldIngredients = mainTableDoc.ingredients;
        let newIngredients = oldIngredients.slice();
        ingredientDocs.forEach((ingredientDoc)=>{
            newIngredients.push(ingredientDoc._id);
        })

        return Table.findByIdAndUpdate(mainTableDoc._id, {
            ingredients:newIngredients}).exec();
    })
}


module.exports = {
    fetchLists : fetchLists,
    fetchIngredientList: fetchIngredientList,
    createIngredient: createIngredient,
    addToTable:addToTable,
    addToMain:addToMain,
    createList:createList
}