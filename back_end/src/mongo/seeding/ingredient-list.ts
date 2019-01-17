import * as ingredientDb from "../interaction/ingredient";
import * as ingredientListDb from "../interaction/ingredientList";
import { IIngredient } from "../../interfaces/IIngredient";
import { IIngredientList } from "../../interfaces/IIngredientList";
import { IIngredientListModel } from "../models/IngredientList";
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
    const mainMenuCopies = await Promise.all(ingredientDocs.map((ingredientDoc) => ingredientListDb.addToMain("testAccount", ingredientDoc)));
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
    /**
     * @todo: BAD CODE, MUST EVENTUALLY FIND A WAY TO CHANGE OR DEPRECATE
     */
    let list: IIngredientListModel;
    for (const ingredientDoc of ingredientDocs) {
        list = await ingredientListDb.addToIngredientList(listId, ingredientDoc._id);
    }
    return {
        ingredientIds: ingredientDocs.map((ingredientDoc) => ingredientDoc._id),
        listId: list._id
    };
}

export async function exec() {

}

