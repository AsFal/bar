let seedMain = require("./seedMain.js");
let cleanDb = require("./cleanDb.js");
let inventoryDb = require("../db_interaction/inventory.js");



function exec() {

    // Seeds used for the creation insertion of db data
    let ingredientsMain = require("./seeds/ingredients_gin.json");

    return cleanDb()
    .then((res)=>inventoryDb.createList({name:"Main"}))
    .then((res)=>seedMain(ingredientsMain))    
}

module.exports = {
    exec:exec}
    ;