var Ingredient = require("../models/Ingredient.js");
var Table = require("../models/Table.js");


/** @todo: INject Mongoose here */
function fetchLists() {
    // Should return all lists
    return Table.find({})
}

/** @todo: INject Mongoose here */
function fetchIngredientList(listId) {
    
    return Table.findById(listId).populate("ingredients").exec()
    .then((listDoc)=>{
        console.log(listDoc)
        return listDoc.ingredients});
}

/** Upon list create, the ingredients property will always be empty
 * A new list is not created with ingredients, but just a name */
function createList(list) {
    return Table.create(list)
}

/** @todo: Mongoose here */
function createIngredient(ingredient) {
    return new Promise(function(fulfill, reject) {    
        Ingredient.create(ingredient, (err, ingredientDoc)=>{
            fulfill(ingredientDoc);
        })
    })
}

// Adds a variable number of ingredients to the table
function addToTable(tableId, ingredientDocs) {
    return Table.findById(tableId)
    .then((tableDoc)=>{
        const oldIngredients = tableDoc.ingredients;
        let newIngredients = oldIngredients.slice();
        ingredientDocs.forEach((ingredientDoc)=>{
            newIngredients.push(ingredientDoc._id);
        })
        return Table.findByIdAndUpdate(tableDoc._id, {
            ingredients:newIngredients});
    })
}

function addToMain(ingredientDocs) {
    
    return Table.findOne({name:"Main"})
    .then((mainTableDoc)=>{

        const oldIngredients = mainTableDoc.ingredients;
        let newIngredients = oldIngredients.slice();
        ingredientDocs.forEach((ingredientDoc)=>{
            newIngredients.push(ingredientDoc._id);
        })

        return Table.findByIdAndUpdate(mainTableDoc._id, {
            ingredients:newIngredients});
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