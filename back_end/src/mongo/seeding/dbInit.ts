import * as seedLists from "./ingredient-list";
import * as ingredientDb from "../interaction/ingredient";
import * as ingredientListDb from "../interaction/ingredientList";
import * as recipeDb from "../interaction/recipe";
import * as menuDb from "../interaction/menu";
import { clearUser } from "../interaction/user";

const ingredientTemplates = [require("./seeds/ingredients/sample-ingredient-1.json")];
 ingredientTemplates.push(require("./seeds/ingredients/sample-ingredient-2.json"));
 ingredientTemplates.push(require("./seeds/ingredients/sample-ingredient-3.json"));

/**
 * @async
 * @function exec
 * @typedef {Object} ReturnData
 * @prop {string} mainId
 * @prop {Array<string>} listIds
 * @prop {string} ingredientId
 * @prop {Array<Object>} ingredientTemplates
 */
export async function exec() {

    await clearUser("testAccount");
    // Once the user is cleared, we fill it with containers
    // (The main list and the main menu already being there)
    // I believe the two sets can be mirrored for tests
    // ingredients should be tested first, but we don't know that for sure

    // SECTION FOR THE SEEDING OF ALL THE INGREDIENTS
    const mainIngredientList = await ingredientListDb.fetchMainIngredientList("testAccount");
    const otherIngredientLists = await Promise
        .all([ingredientListDb.createIngredientList("testAccount", {name: "Shank"}),
    ingredientListDb.createIngredientList("testAccount", {name: "Shanked"})]);
    console.log(ingredientTemplates);
    const data = await seedLists.seedList(mainIngredientList._id, ingredientTemplates);
    const randomList = await seedLists.seedList(otherIngredientLists[0]._id, ingredientTemplates);
    await seedLists.seedList(otherIngredientLists[1]._id, ingredientTemplates);

    // SECTION FOR THE SEEDING OF LISTS IN THE USER
    const testLists = ["list1", "list2", "list3"].map(async (listName) => {
        return await ingredientListDb.createIngredientList("testAccount", {name: listName});
    });
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
    // create the main
    const mainMenu = await menuDb.fetchMainMenu("testAccount");
    // create the rest of the menus
    const menuDocs = [];
    for (const menuTemplate of menuTemplates) {
        const newMenu = await menuDb.createMenu("testAccount", menuTemplate);
        menuDocs.push(newMenu);
    }
    const untouchedRecipeTemplate = recipeTemplates.shift();
    const recipeDocs = await Promise.all(recipeTemplates.map((recipeTemplate) =>
        recipeDb.createRecipe(recipeTemplate)));

    for (const recipeDoc of recipeDocs) {
        try {
            const addPromises = menuDocs.map(menuDoc =>
            menuDb.addRecipeToMenu(menuDoc._id, recipeDoc._id));
            addPromises.push(menuDb.addRecipeToMain("testAccount", recipeDoc._id));
            await Promise.all(addPromises);

        } catch (err) {
            console.log(err);
            console.log(menuDocs);
        }
    }
    // Need a recipe template for convert
    // Need a recipe template for the creation and a menu
    // Need a created recipe and an updateRecipeTemplate for the update menu
    // Need a created recipe an a menu for the first deletion test
    // return Object.freeze({
    //     recipeTemplates,
    //     untouchedRecipeTemplate,
    //     mainId: mainMenu._id,
    //     menuIds: menuDocs.map(menu => menu._id),
    //     recipeIds: recipeDocs.map(recipe => recipe._id)
    // });

    // SECTION FOR THE SEEDING OF RECIPES
    return {
        mainId: mainIngredientList._id,
        listIds: otherIngredientLists.map(list => list._id),
        ingredientIdList0: randomList.ingredientIds[0],
        ingredientId : data.ingredientIds[0],
        ingredientTemplates: ingredientTemplates
    };
}
