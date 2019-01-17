// Module that is being tested
import * as ingredientDb from "../src/mongo/interaction/ingredient";
import * as ingredientListDb from "../src/mongo/interaction/ingredientList";
// Seed script
import * as seed from "../dist/mongo/seeding/ingredient-test";
// for db init
import mongoose  from "mongoose";


let testData;

beforeAll(async (done: Function) => {
    try {
        const options = {

            useNewUrlParser: true
        };
        await mongoose.connect("mongodb://localhost/bar_app", options);
        testData = await seed.exec();
    } catch (err) {
        console.log(err);
    }
    done();
    // pass information from here to the environment
});


afterAll(async (done: Function) => {
    // await mongoose.disconnect();
    done();
});

// Function should be switched so it adds to db and to given list, creation is a bit redundant to test


test("Ingredient is properly created", () => {

    const ingredientTemplate = testData.ingredientTemplates[0];
    expect.assertions(7);
    return ingredientDb.createIngredient(ingredientTemplate)
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

test("Ingredient Deletion from IngredientList", async (done: Function) => {

    await ingredientDb.removeIngredientFromList(testData.listIds[0], testData.ingredientIdList0);
    const ingredientList = await ingredientListDb.fetchIngredientList(testData.listIds[0]);
    const ingredients = ingredientList.ingredients;
    const deleteIngredient = await ingredientDb.fetchIngredient(testData.ingredientId);
    expect(deleteIngredient).not.toBeNull();
    /** */
    // make sure this maps properly
    expect(ingredients.map((ingredient: string) => ingredient.toString())).not.toContain(deleteIngredient._id.toString());
    done();
});

test("Ingredient Deletion from Main", async (done: Function) => {

    // expect.assertions(1);
    const deleteIngredient = await ingredientDb.fetchIngredient(testData.ingredientId);
    await ingredientDb.removeIngredientFromMain("testAccount", testData.ingredientId);
    const newListDocs = await Promise.all([
        ingredientListDb.fetchIngredientList(testData.mainId),
        ingredientListDb.fetchIngredientList(testData.listIds[1])
    ]);
    const ingredientAfterDeletion =  await ingredientDb.fetchIngredient(testData.ingredientId);

    expect(newListDocs[0].ingredients.map((ingredientId: string) => ingredientId.toString())).not.toContain(deleteIngredient._id.toString());
    expect(newListDocs[1].ingredients.map((ingredientId: string) => ingredientId.toString())).not.toContain(deleteIngredient._id.toString());
    expect(ingredientAfterDeletion).toBeNull();
    done();
});
