/**
 * @file
 * @author Alexandre Falardeau
 */
import { Document, Schema, Model, model } from "mongoose";

export interface IIngredientModel extends Document {
    rate: {
        cost: number,
        unitOfMeasure: String
      };
      name: String;
      type: String;
      abv: number;
      quantity: number;
}

export function instanceOfIIngredientModel(o: any): o is IIngredientModel {
  return "name" in o && "type" in o && "abv" in o && "quantity" in o;
}

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

export const Ingredient: Model<IIngredientModel> = model("Ingredient", ingredientSchema);
