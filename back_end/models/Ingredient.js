var mongoose =  require("mongoose");

var ingredientSchema = new mongoose.Schema({
  price: {
    cost: Number,
    unitOfMeasure: String
  },
  name:String,
  type:String,
  abv:Number,
  quantity:Number
});

var Ingredient = mongoose.model("Ingredient", ingredientSchema)

module.exports = Ingredient;