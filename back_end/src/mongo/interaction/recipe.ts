/**
 * @file
 * @author Alexandre Falardeau
 */

import { Recipe, IRecipeModel } from "../models/Recipe";
import { IRecipe } from "../../interfaces/IRecipe";
import { Menu, IMenuModel } from "../models/Menu";
import { IMenu } from "../../interfaces/IMenu";
import { IIngredientModel } from "../models/Ingredient";
import { IIngredient, instanceOfIIngredient } from "../../interfaces/IIngredient";
import * as inventoryDb from "./inventory";
import * as recipeAnalytics from "../../helper/drink_analysis";

/**
 * @async
 * @function fetchRecipe
 * @param {String} recipeId
 * @returns {Promise<RecipeDoc>}
 */
export function fetchRecipe(recipeId: String): Promise<IRecipeModel> {
    return Recipe.findById(recipeId).exec();
}

/**
 * @async
 * @function fetchMenu
 * @param {String} menuId
 * @returns {Promise<MenuDoc>}
 */
export function fetchMenu(menuId: String): Promise<IMenuModel> {
    return Menu.findById(menuId).exec();
}

/**
 * @async
 * @function fetchMenus
 * @returns {Promise<Array<MenuDoc>>}
 */
export function fetchMenus(): Promise<IMenuModel[]> {
    return Menu.find({}).exec();
}

/**
 * @async
 * @function createRecipe
 * @param {RecipeDoc} recipe - A recipe object received from from front-end
 * @returns {Promise<PromiseLike<RecipeDoc>>}
 */
export async function createRecipe(recipe: IRecipe): Promise<IRecipeModel> {
    // Changes here, put the creation logic with the ingredients and what not here
    const convertedRecipe = await convertRecipe(recipe);
    return Recipe.create(convertedRecipe);
}

/**
 * @async
 * @function createMenu
 * @param {MenuDoc} menu - A menu like object received from front-end
 * @returns {PromiseLike<MenuDoc>}
 */
export function createMenu(menu: IMenu): Promise<IMenuModel> {
    return Menu.create(menu);
}

/**
 * @async
 * @function updateMenu
 * @param {String} menuId
 * @param {Object} updateObject - Contains property of menu to be updated
 * @returns {Promise<MenuDoc>}
 */
export function updateMenu(menuId: String, updateObject: IMenu): Promise<IMenuModel> {
    // Put the creation logic with the ingredients and what not here
    return Menu.findByIdAndUpdate(menuId, updateObject, {new: true}).exec();
}

/**
 * @async
 * @function updateRecipe
 * @param {String} recipeId
 * @param {RecipeDoc} updateRecipe
 * @returns {Promise<RecipeDoc>}
 */
export async function updateRecipe(recipeId: String, updateRecipe: IRecipe): Promise<IRecipeModel> {
    // if all recipe ingredient descriptions are ids, no need to convert here
    const convertedRecipe = await convertRecipe(updateRecipe);
    return Recipe.findByIdAndUpdate(recipeId, convertedRecipe, {new: true}).exec();
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
export async function convertRecipe(recipe: IRecipe): Promise<IRecipe> {
    // Bad code here
    const ingredientCreationPromises:
    Promise<{quantity: number, unitOfMeasure: String, description: IIngredientModel}>[] = [];
    const existingIngredientPromises:
    Promise<{quantity: number, unitOfMeasure: String, description: IIngredientModel}>[] = [];
    // This first section makes sure all the ingredients are created and populated the recipe
    recipe.ingredients.forEach((ingredient) => {
        // If they sent ingredient information, then there will be a  name
        if (instanceOfIIngredient(ingredient.description)) {
            // Make mongodb ingredient function with this in mind
            // This might break
            ingredientCreationPromises.push(inventoryDb.createIngredient(ingredient.description)
            .then((ingredientDoc) => ({
                quantity: ingredient.quantity,
                unitOfMeasure: ingredient.unitOfMeasure,
                description: ingredientDoc
            })));
        } else {
            // If there is no information, then the ingredient information contained is an Id
            existingIngredientPromises.push(inventoryDb.fetchIngredient(ingredient.description)
            .then((ingredientDoc) => ({
                quantity: ingredient.quantity,
                unitOfMeasure: ingredient.unitOfMeasure,
                description: ingredientDoc
            })));
        }
    });
    const newRecipeIngredients = await Promise.all(ingredientCreationPromises);
    const existingRecipeIngredients = await Promise.all(existingIngredientPromises);
    // these recipe ingredients are all populated
    const recipeIngredients = newRecipeIngredients.concat(existingRecipeIngredients);
    // Therefore the populated recipe is - Affected real recipe - function leakage
    recipe.ingredients = recipeIngredients;
    recipe.price = recipeAnalytics.drinkPrice(recipe);
    recipe.abv = recipeAnalytics.drinkAbv(recipe);

    // Depopulate Recipe
    recipe.ingredients = recipeIngredients.map((recipeIngredient) => ({
        quantity: recipeIngredient.quantity,
        unitOfMeasure : recipeIngredient.unitOfMeasure,
        description: recipeIngredient.description._id
    }));
    return recipe;
}

/**
 * @async
 * @function removeRecipeFromMenu
 * @param {String} menuId
 * @param {String} recipeId
 * @returns {Promise<MenuDoc>}
 */
export async function removeRecipeFromMenu(menuId: String, recipeId: String): Promise<IMenuModel> {
    const menuDoc = await Menu.findById(menuId).exec();
    const filteredRecipes = menuDoc.recipes.filter((recipe) => {
        const recipeModel = <IRecipeModel>recipe;
        recipeId.toString() != recipeModel._id.toString();
    });
    return Menu.findByIdAndUpdate(menuDoc._id, {
        recipes: filteredRecipes
    }, {new: true}).exec();
}

/**
 * @async
 * @function removeRecipeFromMain
 * @param {String} recipeId
 * @returns {Promise<any>}
 */
export async function removeRecipeFromMain(recipeId: String): Promise<IRecipeModel> {
    const allMenus = await fetchMenus();
    const deleteIngredientFromListPromises = [];

    const removalPromises: Promise<IMenuModel>[] = [];
    allMenus.forEach(async (menuDoc) => {
        menuDoc.recipes.forEach(async (fetchedRecipeId) => {
            if (recipeId.toString() == fetchedRecipeId.toString())
                removalPromises.push(removeRecipeFromMenu(menuDoc._id, recipeId));
        });
    });
    await Promise.all(removalPromises);
    return deleteRecipe(recipeId);
}

export function deleteRecipe(recipeId: String): Promise<IRecipeModel> {
    return Recipe.findByIdAndDelete(recipeId).exec();
}

export function deleteMenu(menuId: String): Promise<IMenuModel> {
    return Menu.findByIdAndDelete(menuId).exec();
}