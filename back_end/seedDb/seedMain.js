let Table = require("../models/Table.js");
let inventoryDb = require("../db_interaction/inventory.js");

function seedMain(listSeed) {
    Table.findOne({name:"Main"})
    .then((tableDoc)=>{
        return Promise.all(listSeed.map((ingredient)
        =>inventoryDb.createIngredient(ingredient)))
        .then((ingredientDocs)=>{
            ingredientIds = ingredientDocs.map((ingredientDoc)=>ingredientDoc._id);
            tableDoc.ingredients = ingredientIds;
            return tableDoc.save();
        })
    })
}

module.exports = seedMain;

