/**
 * @file
 */
import { IngredientList, IIngredientListModel } from "../models/IngredientList";
import { IIngredientList } from "../../interfaces/IIngredientList";
import { User } from "../models/User";
import { removeDocumentFromContainer, addDocumentToContainer } from "./helper";
import { Error } from "mongoose";


/**
 * @async
 * @function fetchList
 * @returns {Promise<Array<IngredientListDoc>>}
 */
export async function fetchLists(userId): Promise<IIngredientListModel[]> {
    // Should return all lists
    const user = await User.findById(userId).populate("mainIngredientList", "ingredientLists");
    return [<IIngredientListModel>user.mainIngredientList]
    .concat(<IIngredientListModel[]>user.ingredientLists);
}

/**
 * @async
 * @function fetchIngredientList
 * @param {string} listId
 * @returns {Promise}
 */
export function fetchIngredientList(listId: string): Promise<IIngredientListModel> {
    return IngredientList.findById(listId).populate("ingredients").exec();
}

/**
 * @async
 * @function createList
 * @param {Object} list
 * @returns {Promise}
 */
export async function createList(list: IIngredientList, userId: string): Promise<IIngredientListModel> {

    const ingredientListDoc = await IngredientList.create(list);
    await addDocumentToContainer(User, userId, "ingredientLists", ingredientListDoc._id);
    return ingredientListDoc;
}


/**
 * @async
 * @function updateingredientList
 * @param {string} ingredientListId
 * @param {IngredientListDoc} updateIngredientList
 * @returns {Promise<IngredientListDoc>}
 */
export function updateIngredientList(ingredientListId: string,
updateIngredientList: IIngredientList): Promise<IIngredientListModel> {

    return IngredientList.findByIdAndUpdate(ingredientListId, updateIngredientList, {new: true}).exec();
}

/**
 * @async
 * @function deleteIngredientList
 * @param {string} ingredientListId
 * @returns {Promise<IngredientListDoc>}
 */
export async function deleteIngredientList(userId: string, ingredientListId: string): Promise<IIngredientListModel> {
    try {
        await removeDocumentFromContainer(User, userId, "ingredientLists", ingredientListId);
        return IngredientList.findByIdAndDelete(ingredientListId).exec();
    } catch (err) {
        throw err;
    }
}