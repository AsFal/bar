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

let Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;