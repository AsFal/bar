/**
 * @file
 * @author Alexandre Falardeau
 */
import { Schema, Document, Model, model, Types } from "mongoose";
import { IRecipe } from "../../interfaces/IRecipe";

export interface IRecipeModel extends IRecipe, Document {}

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

let Recipe: Model<IRecipeModel>;
try {
  Recipe = model("Recipe");
} catch (err) {
  Recipe = model("Recipe", recipeSchema);
}

export {Recipe};

