//@ts-check
/**
 * @file
 * @typedef {import("../models/Ingredient.js").IngredientDoc} IngredientDoc
 * @typedef {import("../models/Table.js").TableDoc} TableDoc
 */
/// <reference path="../models/Ingredient.js" />

var Ingredient = require("../models/Ingredient.js");
var Table = require("../models/Table.js");

// Making interfaces of types in typescript
/**
 * @async
 * @function fetchList
 * @returns {Promise<Array<TableDoc>>}
 */
function fetchLists() {
    // Should return all lists
    return Table.find({}).exec()
}

/**
 * @async
 * @function fetchIngredientList
 * @param {String} listId 
 * @returns {Promise}
 */
function fetchIngredientList(listId) {
    return Table.findById(listId).populate("ingredients").exec()
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
    return Table.create(list);
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
    return Table.findById(tableId).exec()
    .then((tableDoc)=>{
        const oldIngredients = tableDoc.ingredients;
        let newIngredients = oldIngredients.slice();
        ingredientDocs.forEach((ingredientDoc)=>{
            newIngredients.push(ingredientDoc._id);
        })
        return Table.findByIdAndUpdate(tableDoc._id, {
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