var Recipe = require("../models/Recipe.js");
var Menu = require("../models/Menu.js");

function fetchRecipe(recipeId) {
    return Recipe.findById(recipeId);
}

function fetchMenu(menuId) {
    Menu.findById(menuId);
}

function createRecipe(recipe){
    return Recipe.create(recipe);
    // return new Promise(function(fulfill, reject) {
    //     recipe._id = newId();
    //     fulfill(recipe);
    // });
}

module.exports = {
    fetchRecipe : fetchRecipe,
    fetchMenu : fetchMenu,
    createRecipe: createRecipe
}