import * as inventoryDb from "../interaction/inventory";
import { IIngredient } from "../../interfaces/IIngredient";
import { IIngredientList } from "../../interfaces/IIngredientList";


/**
 * @async
 * @function seedMain
 * @param {Array<IngredientDoc>} ingredients
 * @returns {Promise<Object>}
 * @prop {String} ingredientId
 * @prop {String} mainId
 */
export async function seedMain(ingredients: IIngredient[]) {

    const ingredientDocs = await Promise.all(ingredients.map((ingredient) =>
    inventoryDb.createIngredient(ingredient)));
    const mainList = await inventoryDb.addToMain(ingredientDocs);
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
export async function seedList(listId: String, ingredients: IIngredient[]) {
    const ingredientDocs = await Promise.all(ingredients.map((ingredient) =>
    inventoryDb.createIngredient(ingredient)));
    const list = await inventoryDb.addToIngredientList(listId, ingredientDocs);
    return {
        ingredientIds: ingredientDocs.map((ingredientDoc) => ingredientDoc._id),
        listId: list._id
    };
}

export async function exec() {

}

