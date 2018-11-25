
let seedMain = require("./seedMain.js");
let seedMenu = require("./seedMenu");
let cleanDb = require("./cleanDb.js");
let inventoryDb = require("../db_interaction/inventory.js");



function exec() {
    // Seeds used for the creation insertion of db data
    let ingredientsMain = require("./seeds/ingredients_gin.json");
    let recipesMain = [
        require("./seeds/recipe_gin_smash.json"),
        require("./seeds/recipe_vodka_smash.json"),
        require("./seeds/recipe_rum_smash.json")
    ]
    let menuTemplate = require("./seeds/menu_main.json");

    return cleanDb()
    .then((res)=>inventoryDb.createList({name:"Main"}))
    .then((res)=>seedMain(ingredientsMain))
    .then((res)=>seedMenu(menuTemplate, recipesMain));    
}


module.exports = {
    exec:exec};