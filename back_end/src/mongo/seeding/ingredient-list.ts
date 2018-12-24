import * as ingredientDb from "../interaction/ingredient";
import { IIngredient } from "../../interfaces/IIngredient";
import { IIngredientList } from "../../interfaces/IIngredientList";
import { IIngredientModel } from "../models/Ingredient";


/**
 * @async
 * @function seedMain
 * @param {Array<IngredientDoc>} ingredients
 * @returns {Promise<Object>}
 * @prop {string} ingredientId
 * @prop {string} mainId
 */
export async function seedMain(ingredients: IIngredient[]) {

    const ingredientDocs = await Promise.all(ingredients.map((ingredient) =>
    ingredientDb.createIngredient(ingredient)));
    const mainMenuCopies = await Promise.all(ingredientDocs.map((ingredientDoc) => ingredientDb.addToMain(ingredientDoc)));
    const mainList = mainMenuCopies[0];
    return {
        ingredientIds: ingredientDocs.map(ingredientDoc => ingredientDoc._id),
        mainId: mainList._id
    };
}

/**
 * @async
 * @function seedMain
 * @param {Array<IngredientDoc>} ingredients
 * @returns {Promise<Object>}
 * @prop {ingredientIds}
 * @prop {listId}
 */
export async function seedList(listId: string, ingredients: IIngredient[]) {
    const ingredientDocs = await Promise.all(ingredients.map((ingredient) =>
    ingredientDb.createIngredient(ingredient)));
    const listCopies = await Promise.all(ingredientDocs.map((ingredientDoc) =>
    ingredientDb.addToIngredientList(listId, ingredientDoc)));
    const list = listCopies[0];
    return {
        ingredientIds: ingredientDocs.map((ingredientDoc) => ingredientDoc._id),
        listId: list._id
    };
}

export async function exec() {

}

