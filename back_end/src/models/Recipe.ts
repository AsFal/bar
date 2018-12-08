/**
 * @file
 * @author Alexandre Falardeau
 */
import { Schema, Document, Model, model, Types } from "mongoose";
import { IIngredientModel } from "./Ingredient";

export interface IRecipeModel extends Document {
  name: String;
  ingredients:
    {
      unitOfMeasure: String,
      quantity: number,
      // Should be switched to description
      description: IIngredientModel | String
    }[];
  instructions: String[];
  portions: number;
  // refers to the price per portion
  price: number;
  abv: number;
}

const recipeSchema = new Schema({
  name: String,
  ingredients : [
    {
      unitOfMeasure: String,
      quantity: Number,
      // Should be switched to description
      description: {
        type: Schema.Types.ObjectId,
        ref: "Ingredient"
      }
    }
  ],
  instructions : [String],
  portions: Number,
  price: Number,
  abv: Number
});

/**
 * @typedef {Object|String} RecipeIngredient
 * @prop {String} unitOfMeasure
 * @prop {Number} quantity
 * @prop {IngredientDoc} ingredient
 */

/**
 * @typedef {Object} RecipeDoc
 * @prop {String} name
 * @prop {Array<(RecipeIngredient)>} ingredients
 * @prop {Array<String>} instructions
 * @prop {Number} portions
 * @prop {String} _id
 * @prop {Number} price
 * @prop {Number} abv
 */
export const Recipe: Model<IRecipeModel> = model("Recipe", recipeSchema);

module.exports = Recipe;