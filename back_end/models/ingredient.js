var mongoose =  require("mongoose");

var ingredientSchema = new mongoose.Schema({
  name:String,
  type:String,
  abv:Number,
  quantity:Number
});

var Ingredient = mongoose.model("Ingredient", ingredientSchema)

module.exports = Ingredient;