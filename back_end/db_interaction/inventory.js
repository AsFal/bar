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
    
    return IngredientList.findOne({name:"Main"}).exec()
    .then((mainTableDoc)=>{

        const oldIngredients = mainTableDoc.ingredients;
        let newIngredients = oldIngredients.slice();
        ingredientDocs.forEach((ingredientDoc)=>{
            newIngredients.push(ingredientDoc._id);
        })

        return IngredientList.findByIdAndUpdate(mainTableDoc._id, {
            ingredients:newIngredients}).exec();
    })
}

/**
 * @async
 * @function removeIngredientFromList
 * @param {String} listId 
 * @param {String} ingredientId 
 * @returns {Promise<IngredientListDoc>}
 */
function removeIngredientFromList(listId, ingredientId){
    return IngredientList.findById(listId).exec()
    .then((listDoc)=>{
        
        // Removes ingredient of given id
        console.log(listDoc._id);
        console.log(listDoc.ingredients.toString());
        
        let filteredIngredients = listDoc.ingredients.filter((ingredient)=>ingredientId != ingredient._id.toString());
        console.log(filteredIngredients);
        return IngredientList.findByIdAndUpdate(listDoc._id, {
            ingredients: filteredIngredients
        }).exec()
    })
}

/**
 * @async
 * @function deleteIngredient
 * @param {String} ingredientId 
 * @returns {Promise<IngredientDoc>}
 */
function deleteIngredient(ingredientId){
    return Ingredient.findByIdAndDelete(ingredientId).exec();
}

/**
 * @async
 * @function updateIngredient
 * @param {String} ingredientId 
 * @param {IngredientDoc} updateIngredient - The body of the new ingredient (without Id)
 * @return {Promise<IngredientDoc>} 
 */
function updateIngredient(ingredientId, updateIngredient) {
    return Ingredient.findByIdAndUpdate(ingredientId, updateIngredient).exec();
}

function fetchIngredient(ingredientId) {
    return Ingredient.findById(ingredientId).exec();
}

/**
 * @async
 * @function updateingredientList
 * @param {String} ingredientListId 
 * @param {IngredientListDoc} updateIngredientList 
 * @returns {Promise<IngredientListDoc>}
 */
function updateIngredientList(ingredientListId, updateIngredientList) {
    return IngredientList.findByIdAndUpdate(ingredientListId, updateIngredientList).exec();
}

/**
 * @async
 * @function deleteIngredientList
 * @param {String} ingredientListId
 * @returns {Promise<IngredientListDoc>} 
 */
function deleteIngredientList(ingredientListId) {
    return IngredientList.findByIdAndDelete(ingredientListId).exec();
}



module.exports = {
    fetchLists : fetchLists,
    fetchIngredientList: fetchIngredientList,
    createIngredient: createIngredient,
    addToTable:addToTable,
    addToMain:addToMain,
    createList:createList,
    deleteIngredient: deleteIngredient,
    removeIngredientFromList: removeIngredientFromList,
    updateIngredient:updateIngredient,
    fetchIngredient:fetchIngredient,
    updateIngredientList: updateIngredientList,
    deleteIngredientList: deleteIngredientList
}