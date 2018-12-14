import cleanDb from "./cleanDb";
import { Menu } from "../models/Menu";
import { Recipe } from "../models/Recipe";
import * as menuDb from "../interaction/recipe";

export async function exec() {

    const menuTemplates = [
        require("./seeds/menus/main.json"),
        require("./seeds/menus/one.json"),
        require("./seeds/menus/two.json"),
        require("./seeds/menus/three.json")
    ];
    const recipeTemplates = [
        require("./seeds/recipes/brandy_smash.json"),
        require("./seeds/recipes/gin_smash.json"),
        require("./seeds/recipes/rum_smash.json"),
        require("./seeds/recipes/vodka_smash.json")
    ];

    // 4 menus
    // 3 ingredients (all be the same)
    // 3 templates + the 1 for the ingredient creation
    await cleanDb();
    // create the main
    const mainMenu = await Menu.create(menuTemplates.shift());
    // create the rest of the menus
    const menuDocs = await Promise.all(menuTemplates.map((menuTemplate) => Menu.create(menuTemplate)));

    const untouchedRecipeTemplate = recipeTemplates.shift();
    const recipeDocs = await Promise.all(recipeTemplates.map((recipeTemplate) => menuDb.createRecipe(recipeTemplate)));

    // Need a recipe template for convert
    // Need a recipe template for the creation and a menu
    // Need a created recipe and an updateRecipeTemplate for the update menu
    // Need a created recipe an a menu for the first deletion test
    // Need a created recipe and two menus (including the main) for the second deletion test
    return Object.freeze({
        recipeTemplates,
        untouchedRecipeTemplate,
        mainId: mainMenu._id,
        menuIds: menuDocs.map(menu => menu._id),
        recipeIds: recipeDocs.map(recipe => recipe._id)
    });

}
