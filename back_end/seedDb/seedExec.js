let seedMain = require("./seedMain.js");
let cleanDb = require("./cleanDb.js");
let inventoryDb = require("../db_interaction/inventory.js");


// Seeds used in the creation of seedExec
let ingredientsMain = require("../seeds/ingredients_gin.json");

function seedExec() {
    return cleanDb()
    .then((res)=>inventoryDb.createList({name:"Main"}))
    .then((res)=>seedMain(ingredientsMain))    
}

module.exports = seedExec;