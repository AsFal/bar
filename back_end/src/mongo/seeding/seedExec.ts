
const seedMain = require("./seedMain");
const seedMenu = require("./seedMenu");
const cleanDb = require("./cleanDb");
const inventoryDb = require("../../db_interaction/inventory");



export function exec() {
    // Seeds used for the creation insertion of db data
    const ingredientsMain = require("./seeds/ingredients_gin.json");
    const recipesMain = [
        require("./seeds/recipe_gin_smash.json"),
        require("./seeds/recipe_vodka_smash.json"),
        require("./seeds/recipe_rum_smash.json")
    ];
    const menuTemplate = require("./seeds/menu_main.json");

    return cleanDb()
    .then((res: any) => inventoryDb.createList({name: "Main"}))
    .then((res: any) => seedMain(ingredientsMain))
    .then((res: any) => seedMenu(menuTemplate, recipesMain));
}
