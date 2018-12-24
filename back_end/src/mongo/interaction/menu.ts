/**
 * @file
 * @author Alexandre Falardeau
 */

import { Menu, IMenuModel } from "../models/Menu";
import { IMenu } from "../../interfaces/IMenu";
import { removeDocumentFromContainer, addDocumentToContainer } from "./helper";
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
export function fetchMenus(): Promise<IMenuModel[]> {
    return Menu.find({}).exec();
}

// export async function addRecipeToMain(recipeId: string): Promise<IMenuModel> {
    // const mainMenu = Menu.findOne({name: "Main"});
// }

/**
 * @async
 * @function createMenu
 * @param {MenuDoc} menu - A menu like object received from front-end
 * @returns {PromiseLike<MenuDoc>}
 */
export function createMenu(menu: IMenu): Promise<IMenuModel> {
    return Menu.create(menu);
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
