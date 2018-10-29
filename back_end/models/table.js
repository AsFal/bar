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

  let Table = mongoose.model("Table", tableSchema);

  module.exports = Table;