/**
 * @file
 * @author Alexandre Falardeau
 */

import { Schema, Document, Model, model , Types } from "mongoose";
import { IIngredientModel } from "./Ingredient";

export interface IIngredientListModel extends Document {
  name: String;
  filters: String[];
  ingredients: (IIngredientModel | String)[];
}

const ingredientListSchema = new Schema({
    name: String,
    filters: [String],
    ingredients : [{
        type: Schema.Types.ObjectId,
        ref: "Ingredient"
    }]
  });

  /**
   * @typedef {Object} IngredientListDoc
   * @prop {String} name
   * @prop {Array<String>} filters
   * @prop {Array<IngredientDoc>} ingredients
   * @prop {String} [_id]
   */
  export const IngredientList: Model<IIngredientListModel> = model("IngredientList", ingredientListSchema);