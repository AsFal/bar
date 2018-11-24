//@ts-check
/**
 * @file
 * @author Alexandre Falardeau
 * 
 * @typedef {import("./Recipe").RecipeDoc} RecipeDoc
 * @typedef {import("./Ingredient").IngredientDoc} IngredientDoc
 */

let mongoose = require("mongoose");

let menuSchema = new mongoose.Schema(
  {
    name:String,
    theme:String,
    season:String,
    drinks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe"
    }],
    // This functionality will need to be thought out, not exactly sure what I want here tbh
    ingredients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient"
    }]
})

/**
 * @typedef {Object} MenuDoc
 * @prop {String} name
 * @prop {String} theme
 * @prop {String} season
 * @prop {RecipeDoc |String } drinks
 * @prop {IngredientDoc | String} ingredients
 */

let Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;