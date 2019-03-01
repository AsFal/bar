/**
 * @file
 * @author Alexandre Falardeau
 */

import { Schema, Document, Model, model , Types } from "mongoose";
import { IIngredientList } from   "../../interfaces/IIngredientList";

export interface IIngredientListModel extends IIngredientList, Document {}

export function isIngredientListModel(arg: IIngredientList | string): arg is IIngredientListModel {
    return !(typeof arg === "string");
}

export function isIngredientListModelArray(arr: (IIngredientList | string)[]): arr is IIngredientListModel[] {
    return arr.reduce((acc, ingredientList) => acc && typeof ingredientList !== "string", true);
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
   * @prop {string} name
   * @prop {Array<string>} filters
   * @prop {Array<IngredientDoc>} ingredients
   * @prop {string} [_id]
   */

let IngredientList: Model<IIngredientListModel>;
try {
    IngredientList = model("IngredientList");
} catch (err) {
    IngredientList = model("IngredientList", ingredientListSchema);
}
export {IngredientList};