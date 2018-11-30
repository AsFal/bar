//@ts-check
/**
 * @file
 * @author Alexandre Falardeau
 * 
 * @typedef {import("./Ingredient").IngredientDoc} IngredientDoc
 */
let mongoose = require("mongoose");

let ingredientListSchema = new mongoose.Schema(
  {
    name: String,
    filters: [String],
    ingredients : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient"
    }]
  });

  /**
   * @typedef {Object} IngredientListDoc
   * @prop {String} name
   * @prop {Array<String>} filters
   * @prop {IngredientDoc | String } ingredients
   * @prop {String} [_id]
   */
  let IngredientList = mongoose.model("Table", ingredientListSchema);
  module.exports = IngredientList;