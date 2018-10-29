let mongoose = require("mongoose");

let menuSchema = new mongoose.Schema(
  {
    name:String,
    theme:String,
    season:String,
    drinks: [{
      type: mongoose.Schema.types.ObjectId,
      ref: "Recipe"
    }],
    ingredients: [{
      type: mongoose.Schema.types.ObjectId,
      ref: "Ingredient"
    }]
})

let Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;