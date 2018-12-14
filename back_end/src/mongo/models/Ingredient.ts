/**
 * @file
 * @author Alexandre Falardeau
 */
import { Document, Schema, Model, model } from "mongoose";
import { IIngredient } from "../../interfaces/IIngredient";

export interface IIngredientModel extends IIngredient, Document {}

const ingredientSchema: Schema = new Schema({
  rate: {
    cost: Number,
    unitOfMeasure: String
  },
  name: String,
  type: String,
  abv: Number,
  quantity: Number
});

/**
 * @typedef {Object} IngredientPrice
 * @prop {Number} cost
 * @prop {String} unitOfMeasure
 */

/**
 * @typedef {Object} IngredientDoc - This is the format of a mongoose Ingredient Document
 * @property {IngredientPrice} [price]
 * @property {String} [name]
 * @property {String} [type]
 * @property {Number} [abv]
 * @prop {Number} [quantity]
 * @prop {String} [_v]
 * @prop {String} [_id]
 */

let Ingredient: Model<IIngredientModel>;
try {
  Ingredient = model("Ingredient");
} catch (err) {
  Ingredient = model("Ingredient", ingredientSchema);
}

export {Ingredient};
