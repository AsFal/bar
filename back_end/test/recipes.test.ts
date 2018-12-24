import * as recipeDb from "../src/mongo/interaction/recipe";
import * as menuDb from "../src/mongo/interaction/menu";
import * as seed from "../src/mongo/seeding/recipe";
import mongoose from "mongoose";

let testData;

beforeAll(async done => {
    console.log("in");
    try {
        await mongoose.connect("mongodb://localhost/bar_app",  { useNewUrlParser: true });
        testData = await seed.exec();
    } catch (err) {
        console.log(err);
    }
    done();
});

afterAll(async done => {
    await mongoose.disconnect();
    done();
});


test("Convert Recipe To Mongoose Friendly Format", async () => {
    // Need a recipe template that has the price, ingredients
    // Extract price, abv, etc from the recipe
    // Delete the components from that
    const drinkPrice = testData.recipeTemplates[0].price;
    const drinkAbv = testData.recipeTemplates[0].abv;
    const convertedRecipe = await recipeDb.convertRecipe(testData.recipeTemplates[0]);
    expect(convertedRecipe.price).toBe(drinkPrice);
    expect(convertedRecipe.abv).toBe(drinkAbv);
    // This test is to check if all the ingredients have been converted to id
    convertedRecipe.ingredients.forEach((ingredient) => {
        expect(ingredient.description instanceof mongoose.mongo.ObjectID).toBeTruthy();
    });
});

test("Update Recipe", async () => {

    // If no ingredient change, make there should be no recompute of the price
    // Else, modify recipe according to received model
    const newRecipe = await recipeDb.updateRecipe(testData.recipeIds[0], testData.untouchedRecipeTemplate);
    expect(newRecipe.price).not.toBeNull();
    expect(newRecipe.abv).not.toBeNull();
    expect(newRecipe.name).toBe(testData.untouchedRecipeTemplate.name);
    expect(newRecipe.ingredients.length).toBe(testData.untouchedRecipeTemplate.ingredients.length);
});

test("Create Recipe", async () => {
    // Take a model recipe
    // Receive the answer, check if analytics are done correctly and recipe is properly created
    const newRecipe = await recipeDb.createRecipe(testData.recipeTemplates[1]);
    expect(newRecipe.price).not.toBeNull();
    expect(newRecipe.abv).not.toBeNull();
    expect(newRecipe.name).toBe(testData.recipeTemplates[1].name);
    expect(newRecipe.ingredients.length).toBe(testData.recipeTemplates[1].ingredients.length);
});

test("Delete Recipe from random Menu", async () => {
    // Need a menu for this, and a recipe to delte from menu
    // Recipe one that can be deleted
    await recipeDb.removeRecipeFromMenu(testData.menuIds[0], testData.recipeIds[1]);
    const menu = await menuDb.fetchMenu(testData.menuIds[0]);
    const deletedRecipe = await recipeDb.fetchRecipe(testData.recipeIds[1]);
    expect(deletedRecipe).not.toBeNull();
    expect(menu.recipes.map((recipeId: string) => recipeId.toString())).not.toContain(deletedRecipe._id.toString());
});

test("Delete Recipe from main menu", async () => {

    const deleteRecipe = await recipeDb.fetchRecipe(testData.recipeIds[2]);
    await recipeDb.removeRecipeFromMain(testData.recipeIds[2]);
    const newMenuDocs = await Promise.all([
        menuDb.fetchMenu(testData.mainId),
        menuDb.fetchMenu(testData.menuIds[1])
    ]);
    const recipeAfterDeletion =  await recipeDb.fetchRecipe(testData.recipeIds[2]);

    expect(newMenuDocs[0].recipes.map((recipeId: string) => recipeId.toString())).not.toContain(deleteRecipe._id.toString());
    expect(newMenuDocs[1].recipes.map((recipe) => recipe.toString())).not.toContain(deleteRecipe._id.toString());
    expect(recipeAfterDeletion).toBeNull();
    // need a main menu, a secondary menu that is not used in the first deletion test
    // A second recipe that can be deleted independentaly
});