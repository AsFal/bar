import * as seedLists from "./ingredient-list";
import * as inventoryDb from "../../mongo/interaction/inventory";
import cleanDb  from "./cleanDb";

const ingredientTemplates = [require("./seeds/ingredients/sample-ingredient-1.json")];
 ingredientTemplates.push(require("./seeds/ingredients/sample-ingredient-2.json"));
 ingredientTemplates.push(require("./seeds/ingredients/sample-ingredient-3.json"));

/**
 * @async
 * @function exec
 * @typedef {Object} ReturnData
 * @prop {String} mainId
 * @prop {Array<String>} listIds
 * @prop {String} ingredientId
 * @prop {Array<Object>} ingredientTemplates
 * @returns {Promise<ReturnData>}
 */
export async function exec() {

    await cleanDb();
    const mainIngredientList = await inventoryDb.createList({name: "Main"});
    const otherIngredientLists = await Promise.all([inventoryDb.createList({name: "Shank"}),
        inventoryDb.createList({name: "Shanked"})]);

    const data = await seedLists.seedList(mainIngredientList._id, ingredientTemplates);
    await seedLists.seedList(otherIngredientLists[0]._id, ingredientTemplates);
    await seedLists.seedList(otherIngredientLists[1]._id, ingredientTemplates);
    console.log("yes");
    return {
        mainId: mainIngredientList._id,
        listIds: otherIngredientLists.map(list => list._id),
        ingredientId : data.ingredientIds[0],
        ingredientTemplates: ingredientTemplates
    };

}
