var Ingredient = require("../models/Ingredient.js");
var Table = require("../models/Table.js");


/** @todo: INject Mongoose here */
function fetchLists() {
    // Should return all lists
    return Table.find({})
}

/** @todo: INject Mongoose here */
function fetchIngredientList(listId) {
    return Table.findById(listId).populate().exec()
    .then((listDoc)=>listDoc.ingredients);
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



module.exports = {
    fetchLists : fetchLists,
    fetchIngredientList: fetchIngredientList,
    createIngredient: createIngredient,
    createList:createList
}