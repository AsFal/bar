/**
 * @file
 */
import { Ingredient, IIngredientModel } from "../models/Ingredient";
import { IIngredient } from "../../interfaces/IIngredient";
import { IngredientList, IIngredientListModel } from "../models/IngredientList";
import { removeDocumentFromContainer, addDocumentToContainer } from "./helper";
import { fetchLists } from "./ingredientList";

export function fetchIngredient(ingredientId: string): Promise<IIngredientModel> {
    return Ingredient.findById(ingredientId).exec();
}

/**
 * @async
 * @function createIngredient
 * @param {Object} ingredient
 * @returns {Promise}
 */
export function createIngredient(ingredient: IIngredient): Promise<IIngredientModel> {
    return Ingredient.create(ingredient);
}

/**
 * @async
 * @function removeIngredientFromList
 * @param {string} listId
 * @param {string} ingredientId
 * @returns {Promise<IngredientListDoc>}
 */
export function removeIngredientFromList(listId: string, ingredientId: string):
Promise<IIngredientListModel> {
    return removeDocumentFromContainer(IngredientList, listId, "ingredients", ingredientId);
}

/**
 * @async
 * @function deleteIngredient
 * @param {string} ingredientId
 * @returns {Promise<IngredientDoc>}
 */
export async function deleteIngredient(ingredientId: string): Promise<any> {
    return Ingredient.findByIdAndDelete(ingredientId).exec();
    // return {};
}

/**
 * @async
 * @function updateIngredient
 * @param {string} ingredientId
 * @param {IngredientDoc} updateIngredient - The body of the new ingredient (without Id)
 * @return {Promise<IngredientDoc>}
 */
export function updateIngredient(ingredientId: string, updateIngredient: IIngredient):
Promise<IIngredientModel> {
    return Ingredient.findByIdAndUpdate(ingredientId, updateIngredient, {new: true}).exec();
}

export async function removeIngredientFromMain(userIdentifier: string, ingredientId: string): Promise<IIngredientModel> {
    // here the ingredient lists are populate
    // get all the list ids from the user, and then remove it from the list
    // also need to remove from main
    // na that would stop the flow, can't stop the flow
    const allIngredientLists = await fetchLists(userIdentifier);
    // /**
    //  * @todo: this code is not pretty, fix it
    //  */
    console.log(allIngredientLists);
    allIngredientLists.forEach(async (list) => {
        list.ingredients.forEach(async (listIngredientId) => {
            if (ingredientId == listIngredientId.toString())
                await removeIngredientFromList(list._id, ingredientId);
        });
    });
    return deleteIngredient(ingredientId);
}