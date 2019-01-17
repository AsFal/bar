/**
 * @file
 * @author Alexandre Falardeau
 */

import { Menu, IMenuModel } from "../models/Menu";
import { IMenu } from "../../interfaces/IMenu";
import { removeDocumentFromContainer, addDocumentToContainer } from "./helper";
import { deleteRecipe } from "./recipe";
import { IRecipeModel } from "../models/Recipe";
import { User, IUserModel } from "../models/User";
import { finished } from "stream";

/**
 * @async
 * @function fetchMenu
 * @param {string} menuId
 * @returns {Promise<MenuDoc>}
 */
export function fetchMenu(menuId: string): Promise<IMenuModel> {
    return Menu.findById(menuId).exec();
}

/**
 * @async
 * @function fetchMenus
 * @returns {Promise<Array<MenuDoc>>}
 */
export async function fetchMenus(userIdentifier: string): Promise<IMenuModel[]> {
    const user = await User.findOne({identifier: userIdentifier})
    .populate("menus").populate("mainMenu").exec();
    return [<IMenuModel>user.mainMenu].concat(<IMenuModel[]>user.menus);
}

export async function fetchMainMenu(userIdentifier: string): Promise<IMenuModel> {
    const user = await User.findOne({identifier: userIdentifier}).populate("mainMenu").exec();
    return <IMenuModel>user.mainMenu;
}
export async function addRecipeToMenu(menuId: string, recipeId: string): Promise<IMenuModel> {
    return addDocumentToContainer(Menu, menuId, "recipes", recipeId);
}

export async function addRecipeToMain(userIdentifier: string, recipeId: string):
Promise<IMenuModel> {
    const mainMenu = await fetchMainMenu(userIdentifier);
    return addDocumentToContainer(Menu, mainMenu._id, "recipes", recipeId);
}

/**
 * @async
 * @function createMenu
 * @param {MenuDoc} menu - A menu like object received from front-end
 * @returns {PromiseLike<MenuDoc>}
 */
export async function createMenu(userIdentifier: string, menu: IMenu): Promise<IMenuModel> {
    const newMenu = await Menu.create(menu);
    const user = await User.findOne({identifier: userIdentifier}).exec();
    await addDocumentToContainer(User, user._id, "menus", newMenu._id);
    return newMenu;
}

/**
 * @async
 * @function updateMenu
 * @param {string} menuId
 * @param {Object} updateObject - Contains property of menu to be updated
 * @returns {Promise<MenuDoc>}
 */
export function updateMenu(menuId: string, updateObject: IMenu): Promise<IMenuModel> {
    // Put the creation logic with the ingredients and what not here
    return Menu.findByIdAndUpdate(menuId, updateObject, {new: true}).exec();
}

export function deleteMenu(menuId: string): Promise<IMenuModel> {
    return Menu.findByIdAndDelete(menuId).exec();
}

export async function removeMenufromUser(userIdentifier: string, menuId: string):
Promise<IMenuModel> {
    const user = await User.findOne({identifier: userIdentifier}).exec();
    await removeDocumentFromContainer(User, user._id, "menus", menuId);
    return deleteMenu(menuId);
}

export function clearMenu(menuId: string): Promise<IMenuModel> {
    return Menu.findByIdAndUpdate(menuId, {
        recipes: [],
        ingredients: []
    }).exec();
}

export async function clearMainMenu(menuId: string): Promise<IMenuModel> {
    const mainMenu = await Menu.findById(menuId);
    await Promise.all(mainMenu.recipes.map((recipeId) => deleteRecipe(<string>recipeId)));
    return clearMenu(menuId);
}