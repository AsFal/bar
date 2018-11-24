//@ts-check
/**
 * @file
 * @author Alexandre Falardeau
 * 
 * @typedef {import("./Ingredient").IngredientDoc} IngredientDoc
 */
let Ingredient = require("./Ingredient.js");
let mongoose = require("mongoose");

let tableSchema = new mongoose.Schema(
  {
    name: String,
    filters: [String],
    ingredients : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient"
    }]
  });

  /**
   * @typedef {Object} TableDoc
   * @prop {String} name
   * @prop {Array<String>} filters
   * @prop {IngredientDoc | String } ingredients
   */
  let Table = mongoose.model("Table", tableSchema);

  module.exports = Table;