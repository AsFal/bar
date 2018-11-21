var Recipe = require("../models/Recipe.js");
var Menu = require("../models/Menu.js");

function fetchRecipe(recipeId) {
    return Recipe.findById(recipeId).exec();
}

function fetchMenu(menuId) {
    Menu.findById(menuId).exec();
}

function createRecipe(recipe){
    return Recipe.create(recipe).exec();
    // return new Promise(function(fulfill, reject) {
    //     recipe._id = newId();
    //     fulfill(recipe);
    // });
}

function createMenu(menu) {
    return Menu.create(menu).exec();
}

function updateMenu(menuId, updateObject) {
    return Menu.findByIdAndUpdate(menuId, updateObject).exec();
}

module.exports = {
    fetchRecipe : fetchRecipe,
    fetchMenu : fetchMenu,
    createRecipe: createRecipe,
    createMenu : createMenu,
    updateMenu : updateMenu
}