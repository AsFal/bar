/**
 * @file
 * @author Alexandre Falardeau
 */

import { Recipe, IRecipeModel } from "../models/Recipe";
import { IRecipe } from "../../interfaces/IRecipe";
import { Menu, IMenuModel } from "../models/Menu";
import { IIngredientModel } from "../models/Ingredient";
import { instanceOfIIngredient } from "../../interfaces/IIngredient";
import * as ingredientDb from "./ingredient";
import * as recipeAnalytics from "../../helper/drink_analysis";
import { removeDocumentFromContainer, addDocumentToContainer } from "./helper";
import { fetchMenus } from "./menu";
/**
 * @async
 * @function fetchRecipe
 * @param {string} recipeId
 * @returns {Promise<RecipeDoc>}
 */
export function fetchRecipe(recipeId: string): Promise<IRecipeModel> {
    return Recipe.findById(recipeId).exec();
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

// export async function addRecipeToMain(recipeId: string): Promise<IMenuModel> {
    // const mainMenu = Menu.findOne({name: "Main"});
// }

/**
 * @async
 * @function updateRecipe
 * @param {string} recipeId
 * @param {RecipeDoc} updateRecipe
 * @returns {Promise<RecipeDoc>}
 */
export async function updateRecipe(recipeId: string, updateRecipe: IRecipe): Promise<IRecipeModel> {
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
    Promise<{quantity: number, unitOfMeasure: string, description: IIngredientModel}>[] = [];
    const existingIngredientPromises:
    Promise<{quantity: number, unitOfMeasure: string, description: IIngredientModel}>[] = [];
    // This first section makes sure all the ingredients are created and populated the recipe
    recipe.ingredients.forEach((ingredient) => {
        // If they sent ingredient information, then there will be a  name
        if (instanceOfIIngredient(ingredient.description)) {
            // Make mongodb ingredient function with this in mind
            // This might break
            ingredientCreationPromises.push(ingredientDb.createIngredient(ingredient.description)
            .then((ingredientDoc) => ({
                quantity: ingredient.quantity,
                unitOfMeasure: ingredient.unitOfMeasure,
                description: ingredientDoc
            })));
        } else {
            // If there is no information, then the ingredient information contained is an Id
            existingIngredientPromises.push(ingredientDb.fetchIngredient(ingredient.description)
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
 * @param {string} menuId
 * @param {string} recipeId
 * @returns {Promise<MenuDoc>}
 */
export async function removeRecipeFromMenu(menuId: string, recipeId: string): Promise<IMenuModel> {
    return removeDocumentFromContainer(Menu, menuId, "recipes", recipeId);
}
/**
 * @async
 * @function removeRecipeFromMain
 * @param {string} recipeId
 * @returns {Promise<any>}
 */

export async function removeRecipeFromMain(userIdentifier: string, recipeId: string): Promise<IRecipeModel> {
    const allMenus = await fetchMenus(userIdentifier);
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

export function deleteRecipe(recipeId: string): Promise<IRecipeModel> {
    return Recipe.findByIdAndDelete(recipeId).exec();
}