//@ts-check
/**
 * @file
 * @author Alexandre Falardeau
 * 
 * @typedef {import("../models/Recipe").RecipeDoc} RecipeDoc
 * @typedef {import("../models/Menu").MenuDoc} MenuDoc
 */
var Recipe = require("../models/Recipe.js");
var Menu = require("../models/Menu.js");


/**
 * @async
 * @function fetchRecipe
 * @param {String} recipeId 
 * @returns {Promise<Array<RecipeDoc>>}
 */
function fetchRecipe(recipeId) {
    return Recipe.findById(recipeId).exec();
}

/**
 * @async
 * @function fetchMenu
 * @param {String} menuId
 * @returns {Promise<MenuDoc>} 
 */
function fetchMenu(menuId) {
    return Menu.findById(menuId).exec();
}

/**
 * @async
 * @function createRecipe
 * @param {RecipeDoc} recipe - A recipe object received from from front-end
 * @returns {PromiseLike<RecipeDoc>}
 */
function createRecipe(recipe){
    return Recipe.create(recipe);
}

/**
 * @async
 * @function createMenu
 * @param {MenuDoc} menu - A menu like object received from front-end 
 * @returns {PromiseLike<MenuDoc>}
 */
function createMenu(menu) {
    return Menu.create(menu);
}

/**
 * @async
 * @function updateMenu
 * @param {String} menuId 
 * @param {Object} updateObject - Contains property of menu to be updated
 * @returns {Promise<MenuDoc>}
 */
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