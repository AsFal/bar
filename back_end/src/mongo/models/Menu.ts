/**
 * @file
 * @author Alexandre Falardeau
 */

import { Schema, Document, Model, model, Types } from "mongoose";
import { IMenu } from "../../interfaces/IMenu";

export interface IMenuModel extends IMenu, Document {}

export function isMenuModel(arg: IMenu | string): arg is IMenuModel {
    return typeof arg !== "string";
}

export function isMenuModelArray(arr: (IMenu | string)[]): arr is IMenuModel[] {
    return arr.reduce((acc, menu) => acc && typeof menu !== "string", true);
}

const menuSchema = new Schema(
  {
    name: String,
    theme: String,
    season: String,
    recipes: [{
      type: Schema.Types.ObjectId,
      ref: "Recipe"
    }],
    // This functionality will need to be thought out, not exactly sure what I want here tbh
    ingredients: [{
      type: Schema.Types.ObjectId,
      ref: "Ingredient"
    }]
});

/**
 * @typedef {Object} MenuDoc
 * @prop {String} name
 * @prop {String} theme
 * @prop {String} season
 * @prop {Array<RecipeDoc>} recipes
 * @prop {IngredientDoc | String} ingredients
 * @prop {String} [_id]
 */

let Menu: Model<IMenuModel>;
try {
  Menu = model("Menu");
} catch (err) {
  Menu = model("Menu", menuSchema);
}

export { Menu };