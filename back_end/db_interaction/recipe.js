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
const inventoryDb = require("./inventory");
const recipeAnalytics = require("../helper/drink_analysis")

/**
 * @async
 * @function fetchRecipe
 * @param {String} recipeId 
 * @returns {Promise<RecipeDoc>}
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
 * @function fetchMenus
 * @returns {Promise<Array<MenuDoc>>}
 */
function fetchMenus() {
    return Menu.find({}).exec();
}

/**
 * @async
 * @function createRecipe
 * @param {RecipeDoc} recipe - A recipe object received from from front-end
 * @returns {Promise<PromiseLike<RecipeDoc>>}
 */
async function createRecipe(recipe){
    // Changes here, put the creation logic with the ingredients and what not here
    let convertedRecipe = await convertRecipe(recipe)
    return Recipe.create(convertedRecipe);
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
    // Put the creation logic with the ingredients and what not here
    return Menu.findByIdAndUpdate(menuId, updateObject).exec();
}

/**
 * @async
 * @function updateRecipe
 * @param {String} recipeId 
 * @param {RecipeDoc} updateRecipe 
 * @returns {Promise<RecipeDoc>}
 */
async function updateRecipe(recipeId, updateRecipe) {
    // if all recipe ingredient descriptions are ids, no need to convert here
    let convertedRecipe = await convertRecipe(updateRecipe)
    return Recipe.findByIdAndUpdate(recipeId, convertedRecipe, {new:true}).exec();
}

/**
 * @async
 * @function convertRecipe
 * @description converts a recipe from a template that contains
 * ingredients in either id or IngredientDoc form, creates the necessary
 * new ingredients and then returns the formatted recipe
 * @param {RecipeDoc} recipe 
 * @returns {Promise<RecipeDoc>}
 */
async function convertRecipe(recipe) {

    let ingredientCreationPromises = []
    let existingIngredientPromises = [];
    // This first section makes sure all the ingredients are created and populated the recipe
    recipe.ingredients.forEach((ingredient)=>{
        // If they sent ingredient information, then there will be a  name

        if(ingredient.ingredient.name) {
            // Make mongodb ingredient function with this in mind
            // This might break
            ingredientCreationPromises.push(inventoryDb.createIngredient(ingredient.ingredient)
            .then((ingredientDoc)=>({
                quantity: ingredient.quantity,
                unitOfMeasure: ingredient.unitOfMeasure,
                ingredient:ingredientDoc
            })))
        } else {
            // If there is no information, then the ingredient information contained is an Id
            existingIngredientPromises.push(inventoryDb.fetchIngredient(ingredient.ingredient)
            .then((ingredientDoc)=>({
                quantity: ingredient.quantity,
                unitOfMeasure:ingredient.unitOfMeasure,
                ingredient: ingredientDoc
            })))
        }
    })
    const newRecipeIngredients = await Promise.all(ingredientCreationPromises)
    const existingRecipeIngredients = await Promise.all(existingIngredientPromises)
    // these recipe ingredients are all populated
    const recipeIngredients = newRecipeIngredients.concat(existingRecipeIngredients)
    // Therefore the populated recipe is - Affected real recipe - function leakage
    recipe.ingredients = recipeIngredients
    recipe.price = recipeAnalytics.price(recipe)
    recipe.abv = recipeAnalytics.abv(recipe)

    // Depopulate Recipe
    recipe.ingredients = recipe.ingredients.map((recipeIngredient)=>({
        quantity: recipeIngredient.quantity,
        unitOfMeasure : recipeIngredient.unitOfMeasure,
        ingredient: recipeIngredient.ingredient._id
    }))
    console.log(recipe)
    return recipe
}

/**
 * @async
 * @function removeRecipeFromMenu
 * @param {String} menuId 
 * @param {String} recipeId 
 * @returns {Promise<MenuDoc>}
 */
async function removeRecipeFromMenu(menuId, recipeId){
    let menuDoc = await Menu.findById(menuId).exec()
    let filteredRecipes = menuDoc.recipes.filter((recipe)=>recipeId.toString() != recipe._id.toString());
    return Menu.findByIdAndUpdate(menuDoc._id, {
        recipes: filteredRecipes
    }).exec()
}

/**
 * @async
 * @function removeRecipeFromMain
 * @param {String} recipeId 
 * @returns {Promise<any>} 
 */
async function removeRecipeFromMain(recipeId) {
    let allMenus = await fetchMenus()
    let deleteIngredientFromListPromises =[]
    
    let removalPromises = []
    allMenus.forEach(async (menuDoc)=>{
        menuDoc.recipes.forEach(async (fetchedRecipeId)=>{
            if(recipeId.toString() == fetchedRecipeId.toString())
                removalPromises.push(removeRecipeFromMenu(menuDoc._id, recipeId))
        })
    })
    await Promise.all(removalPromises)
    return deleteRecipe(recipeId)
}

function deleteRecipe(recipeId) {
    return Recipe.findByIdAndDelete(recipeId).exec();
}


// Order with CRUD functionality
module.exports = {
    fetchRecipe,
    fetchMenu,
    createRecipe,
    createMenu,
    updateMenu,
    fetchMenus,
    updateRecipe,
    removeRecipeFromMenu,
    removeRecipeFromMain,
    convertRecipe
}