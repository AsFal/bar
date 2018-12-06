//@ts-check
var mongoose =  require("mongoose");

var ingredientSchema = new mongoose.Schema({
  // should be switched to rate
  price: {
    cost: Number,
    unitOfMeasure: String
  },
  name:String,
  type:String,
  abv:Number,
  quantity:Number
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

 /**
  * @module Ingredient
  */
var Ingredient = mongoose.model("Ingredient", ingredientSchema)
module.exports = Ingredient;