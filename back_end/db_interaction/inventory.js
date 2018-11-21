var Ingredient = require("../models/Ingredient.js");
var Table = require("../models/Table.js");


/** @todo: INject Mongoose here */
function fetchLists() {
    // Should return all lists
    return Table.find({}).exec()
}

/** @todo: INject Mongoose here */
function fetchIngredientList(listId) {
    
    return Table.findById(listId).populate("ingredients").exec()
    .then((listDoc)=>{
        return listDoc.ingredients});
}

/** Upon list create, the ingredients property will always be empty
 * A new list is not created with ingredients, but just a name */
function createList(list) {
    return Table.create(list);
}

/** @todo: Mongoose here */
function createIngredient(ingredient) {
    return Ingredient.create(ingredient);
}

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