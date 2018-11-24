//@ts-check
/**
 * @file
 * @author Alexandre Falardeau
 * 
 * @typedef {import("./Ingredient.js").IngredientDoc} IngredientDoc
 */
var mongoose =  require("mongoose");

var recipeSchema = new mongoose.Schema({
  name:String,
  ingredients : [
    {
      unitOfMeasure: String,
      quantity: Number,
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient"
      }
    }
  ],
  instructions : [String],
  portions: Number
});

/**
 * @typedef {Object} RecipeIngredient
 * @prop {String} unitOfMeasure
 * @prop {Number} quantity
 * @prop {IngredientDoc} ingredient
 */

/**
 * @typedef {Object} RecipeDoc
 * @prop {String} name
 * @prop {Array<RecipeIngredient>} ingredients
 * @prop {Array<String>} instructions 
 * @prop {Number} portions 
 */
var Recipe = mongoose.model("Recipe", recipeSchema)

module.exports = Recipe;