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
 * @function addToIngredientList
 * @param {string} tableId
 * @param {Array<IngredientDoc>} ingredientDocs
 */
// Adds a variable number of ingredients to the table
export function addToIngredientList(ingredientListId: string, ingredientDoc: IIngredientModel):
Promise<IIngredientListModel> {
    return addDocumentToContainer(IngredientList, ingredientListId, "ingredients", ingredientDoc._id);
}


/**
 * @async
 * @function addToMain
 * @param {Array<IngredientDoc>} ingredientDocs
 */
export function addToMain(ingredientDoc: IIngredientModel): Promise<IIngredientListModel> {

    return IngredientList.findOne({name: "Main"}).exec()
    .then((mainTableDoc) => {
        const oldIngredients = mainTableDoc.ingredients;
        const newIngredients = oldIngredients.concat([ingredientDoc._id]);
        return IngredientList.findByIdAndUpdate(mainTableDoc._id, {
            ingredients: newIngredients}, {new: true}).exec();
    });
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
export function deleteIngredient(ingredientId: string): Promise<IIngredientModel> {
    return Ingredient.findByIdAndDelete(ingredientId).exec();
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

export async function removeIngredientFromMain(ingredientId: string): Promise<IIngredientModel> {
    const allIngredientLists = await fetchLists();
    const deleteIngredientFromListPromises = [];
    allIngredientLists.forEach(async (list) => {
        list.ingredients.forEach(async (listIngredientId) => {
            if (ingredientId == listIngredientId.toString())
                await removeIngredientFromList(list._id, ingredientId);
        });
    });
    return deleteIngredient(ingredientId);
}