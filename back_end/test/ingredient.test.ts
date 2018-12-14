// Module that is being tested
import * as inventoryDb from "../src/mongo/interaction/inventory";
// Seed script
import * as seed from "../dist/mongo/seeding/ingredient-test";
// for db init
import mongoose  from "mongoose";


let testData;

beforeAll(async (done: Function) => {
    console.log("in ingredient");
    try {
        await mongoose.connect("mongodb://localhost/bar_app", { useNewUrlParser: true });
        testData = await seed.exec();
    } catch (err) {
        console.log(err);
    }
    done();
    // pass information from here to the environment
});


afterAll(async (done: Function) => {
    await mongoose.disconnect();
    done();
});

// Function should be switched so it adds to db and to given list, creation is a bit redundant to test


test("Ingredient is properly created", () => {

    const ingredientTemplate = testData.ingredientTemplates[0];
    expect.assertions(7);
    return inventoryDb.createIngredient(ingredientTemplate)
    .then((ingredientDoc) => {
        expect(ingredientDoc.name).toBe(ingredientTemplate.name);
        expect(ingredientDoc.quantity).toBe(ingredientTemplate.quantity);
        expect(ingredientDoc.rate).toEqual(ingredientTemplate.rate);
        expect(ingredientDoc.abv).toBe(ingredientTemplate.abv);
        expect(ingredientDoc.rate.cost).toBe(ingredientTemplate.rate.cost);
        expect(ingredientDoc.rate.unitOfMeasure).toBe(ingredientTemplate.rate.unitOfMeasure);
        expect(ingredientDoc._id).toBeDefined();
    });
});

test("Ingredient Deletion from Table", async () => {

    await inventoryDb.removeIngredientFromList(testData.listIds[0], testData.ingredientId);
    const ingredientList = await inventoryDb.fetchIngredientList(testData.listIds[0]);
    const ignredients = ingredientList.ingredients;
    const deleteIngredient = await inventoryDb.fetchIngredient(testData.ingredientId);
    expect(deleteIngredient).not.toBeNull();
    /** */
    // make sure this maps properly
    expect(ignredients.map((ingredient: String) => ingredient.toString())).not.toContain(deleteIngredient._id.toString());
});

test("Ingredient Deletion from Main", async () => {

    const deleteIngredient = await inventoryDb.fetchIngredient(testData.ingredientId);
    await inventoryDb.removeIngredientFromMain(testData.ingredientId);
    const newListDocs = await Promise.all([
        inventoryDb.fetchIngredientList(testData.mainId),
        inventoryDb.fetchIngredientList(testData.listIds[1])
    ]);
    const ingredientAfterDeletion =  await inventoryDb.fetchIngredient(testData.ingredientId);


    expect(newListDocs[0].ingredients.map((ingredientId: String) => ingredientId.toString())).not.toContain(deleteIngredient._id.toString());
    expect(newListDocs[1].ingredients.map((ingredientId: String) => ingredientId.toString())).not.toContain(deleteIngredient._id.toString());
    expect(ingredientAfterDeletion).toBeNull();
});
