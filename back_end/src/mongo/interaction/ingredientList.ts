/**
 * @file
 */
import { IngredientList, IIngredientListModel } from "../models/IngredientList";
import { IIngredientList } from "../../interfaces/IIngredientList";
import { User } from "../models/User";
import { removeDocumentFromContainer, addDocumentToContainer } from "./helper";
import { deleteIngredient } from "./ingredient";
import { IIngredientModel } from "../models/Ingredient";

/**
 * @async
 * @function fetchList
 * @returns {Promise<Array<IngredientListDoc>>}
 */
export async function fetchLists(userIdentifier: string): Promise<IIngredientListModel[]> {
    // Should return all lists
    const user = await User.findOne({identifier: userIdentifier})
    .populate("mainIngredientList")
    .populate("ingredientLists").exec();

    return [<IIngredientListModel>user.mainIngredientList]
    .concat(<IIngredientListModel[]>user.ingredientLists);
}

export async function fetchMainIngredientList(userIdentifier: string):
Promise<IIngredientListModel> {

    const user = await User.findOne({identifier: userIdentifier})
    .populate("mainIngredientList").exec();
    return <IIngredientListModel>user.mainIngredientList;
}

/**
 * @async/
 * @function fetchIngredientList
 * @param {string} listId
 * @returns {Promise}
 */
export function fetchIngredientList(listId: string): Promise<IIngredientListModel> {
    return IngredientList.findById(listId).populate("ingredients").exec();
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

    return addDocumentToContainer(IngredientList, ingredientListId,
        "ingredients", ingredientDoc._id);
}


/**
 * @async
 * @function addToMain
 * @param {Array<IngredientDoc>} ingredientDocs
 */
export async function addToMain(accountId: string, ingredientDoc: IIngredientModel):
Promise<IIngredientListModel> {

    const mainIngredientList =  await fetchMainIngredientList(accountId);
    return addDocumentToContainer(IngredientList, mainIngredientList._id,
        "ingredients", ingredientDoc._id);
}

/**
 * @async
 * @function createList
 * @param {Object} list
 * @returns {Promise}
 */
export async function createIngredientList(userIdentifier: string, list: IIngredientList): Promise<IIngredientListModel> {
    const user = await User.findOne({identifier: userIdentifier}).exec();
    const userId = user._id;
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
    return IngredientList.findByIdAndUpdate(ingredientListId, updateIngredientList,
        {new: true}).exec();
}

/**
 * @async
 * @function deleteIngredientList
 * @param {string} ingredientListId
 * @returns {Promise<IngredientListDoc>}
 */
export async function deleteIngredientList(userIdentifier: string, ingredientListId: string):
Promise<IIngredientListModel> {
    try {
        const user = await User.findOne({identifier: userIdentifier}).exec();
        const userId = user._id;
        await removeDocumentFromContainer(User, userId, "ingredientLists", ingredientListId);
        return IngredientList.findByIdAndDelete(ingredientListId).exec();
    } catch (err) {
        throw err;
    }
}

export async function clearIngredientList(listId: string): Promise<IIngredientListModel> {
    return IngredientList.findByIdAndUpdate(listId, {
        ingredients: []
    }).exec();
}

export async function clearMainIngredientList(listId: string): Promise<IIngredientListModel> {
    const mainIngredientList = await IngredientList.findById(listId);
    await Promise.all(mainIngredientList.ingredients.map((ingredientId) =>
        deleteIngredient(<string>ingredientId)));
    return clearIngredientList(listId);
}