/**
 * @file
 */
import { Ingredient, IIngredientModel } from "../models/Ingredient";
import { IIngredient } from "../../interfaces/IIngredient";
import { IngredientList, IIngredientListModel } from "../models/IngredientList";
import { IIngredientList } from "../../interfaces/IIngredientList";

export function fetchIngredient(ingredientId: String): Promise<IIngredientModel> {
    return Ingredient.findById(ingredientId).exec();
}

/**
 * @async
 * @function fetchList
 * @returns {Promise<Array<IngredientListDoc>>}
 */
export function fetchLists(): Promise<IIngredientListModel[]> {
    // Should return all lists
    return IngredientList.find({}).exec();
}

/**
 * @async
 * @function fetchIngredientList
 * @param {String} listId
 * @returns {Promise}
 */
export function fetchIngredientList(listId: String): Promise<IIngredientListModel> {
    return IngredientList.findById(listId).populate("ingredients").exec();
}

/**
 * @async
 * @function createList
 * @param {Object} list
 * @returns {Promise}
 */
export function createList(list: IIngredientList): Promise<IIngredientListModel> {
    return IngredientList.create(list);
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
 * @param {String} tableId
 * @param {Array<IngredientDoc>} ingredientDocs
 */
// Adds a variable number of ingredients to the table
export function addToIngredientList(tableId: String, ingredientDocs: IIngredientModel[]):
Promise<IIngredientListModel> {
    return IngredientList.findById(tableId).exec()
    .then((tableDoc) => {
        const oldIngredients = tableDoc.ingredients;
        const newIngredients = oldIngredients.slice();
        ingredientDocs.forEach((ingredientDoc) => {
            newIngredients.push(ingredientDoc._id);
        });
        return IngredientList.findByIdAndUpdate(tableDoc._id, {
            ingredients: newIngredients
        }).exec();
    });
}

/**
 * @async
 * @function addToMain
 * @param {Array<IngredientDoc>} ingredientDocs
 */
export function addToMain(ingredientDocs: IIngredientModel[]): Promise<IIngredientListModel> {

    return IngredientList.findOne({name: "Main"}).exec()
    .then((mainTableDoc) => {
        const oldIngredients = mainTableDoc.ingredients;
        const newIngredients = oldIngredients.slice();
        ingredientDocs.forEach((ingredientDoc) => {
            newIngredients.push(ingredientDoc._id);
        });
        return IngredientList.findByIdAndUpdate(mainTableDoc._id, {
            ingredients: newIngredients}).exec();
    });
}

/**
 * @async
 * @function removeIngredientFromList
 * @param {String} listId
 * @param {String} ingredientId
 * @returns {Promise<IngredientListDoc>}
 */
export function removeIngredientFromList(listId: String, ingredientId: String):
Promise<IIngredientListModel> {
    return IngredientList.findById(listId).exec()
    .then((listDoc) => {

        const filteredIngredients = listDoc.ingredients.filter((ingredient) => ingredientId
        != (<IIngredientModel>ingredient)._id.toString());

        return IngredientList.findByIdAndUpdate(listDoc._id, {
            ingredients: filteredIngredients
        }).exec();
    });
}

/**
 * @async
 * @function deleteIngredient
 * @param {String} ingredientId
 * @returns {Promise<IngredientDoc>}
 */
export function deleteIngredient(ingredientId: String): Promise<IIngredientModel> {
    return Ingredient.findByIdAndDelete(ingredientId).exec();
}

/**
 * @async
 * @function updateIngredient
 * @param {String} ingredientId
 * @param {IngredientDoc} updateIngredient - The body of the new ingredient (without Id)
 * @return {Promise<IngredientDoc>}
 */
export function updateIngredient(ingredientId: String, updateIngredient: IIngredient):
Promise<IIngredientModel> {
    return Ingredient.findByIdAndUpdate(ingredientId, updateIngredient).exec();
}


/**
 * @async
 * @function updateingredientList
 * @param {String} ingredientListId
 * @param {IngredientListDoc} updateIngredientList
 * @returns {Promise<IngredientListDoc>}
 */
export function updateIngredientList(ingredientListId: String,
updateIngredientList: IIngredientList): Promise<IIngredientListModel> {

    return IngredientList.findByIdAndUpdate(ingredientListId, updateIngredientList).exec();
}

/**
 * @async
 * @function deleteIngredientList
 * @param {String} ingredientListId
 * @returns {Promise<IngredientListDoc>}
 */
export function deleteIngredientList(ingredientListId: String): Promise<IIngredientListModel> {
    return IngredientList.findByIdAndDelete(ingredientListId).exec();
}

export async function removeIngredientFromMain(ingredientId: String): Promise<IIngredientModel> {
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
