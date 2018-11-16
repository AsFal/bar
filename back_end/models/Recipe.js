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
  instructions : [String]
});

var Recipe = mongoose.model("Recipe", recipeSchema)

module.exports = Recipe;