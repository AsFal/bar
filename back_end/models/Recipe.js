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

var Card = mongoose.model("Card", cardSchema)

module.exports = Card;