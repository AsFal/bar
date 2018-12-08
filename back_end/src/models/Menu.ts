/**
 * @file
 * @author Alexandre Falardeau
 */

import { Schema, Document, Model, model, Types } from "mongoose";
import { IIngredientModel } from "./Ingredient";
import { IRecipeModel } from "./Recipe";

export interface IMenuModel extends Document {
  name: String;
  theme: String;
  season: String;
  recipes: (IRecipeModel|String)[];
  // This functionality will need to be thought out, not exactly sure what I want here tbh
  ingredients: (IIngredientModel|String)[];
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

export const Menu: Model<IMenuModel> = model("Menu", menuSchema);