var Recipe = require("../models/Recipe.js");
var Menu = require("../models/Menu.js");

function fetchRecipe(recipeId) {
    return Recipe.findById(recipeId);
    // return new Promise(function(fulfill, reject) {   
    //     /**
    //      * @todo: figure out if its better to have more client side operations and send more data
    //      * or have more back-end operations
    //      */
    //     switch (recipeId) {
    //         case "rum_smash":
    //             fulfill(require("../seeds/recipe_rum_smash.json"));
    //         case "gin_smash":
    //             fulfill(require("../seeds/recipe_gin_smash.json"));
    //         case "vodka_smash":
    //             fulfill(require("../seeds/recipe_vodka_smash.json"));
    //         default:
    //             fulfill(require("../seeds/recipe_vodka_smash.json"));
    //     }
    // });
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