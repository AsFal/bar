//@ts-check
/** @typedef {import("./seeding/ingredient-test").ReturnData} TestData */
// Module that is being tested
var inventoryDb = require("../db_interaction/inventory.js");
// Seed script
var seed = require("./seeding/ingredient-test");
// for db init
var mongoose = require("mongoose");

/** @type {TestData} */
var testData;

beforeAll(async (done) => {
    try{
        await mongoose.connect("mongodb://localhost/bar_app", { useNewUrlParser: true })
        testData = await seed.exec()
    } catch(err) {
        console.log(err);
    }
    done()
    // pass information from here to the environment
});


afterAll(async ()=>{
    await mongoose.disconnect();
})

// Function should be switched so it adds to db and to given list, creation is a bit redundant to test

test("Ingredient is properly created", ()=>{

    let ingredientTemplate = testData.ingredientTemplates[0]

    expect.assertions(7);
    return inventoryDb.createIngredient(ingredientTemplate)
    .then((ingredientDoc)=>{
        expect(ingredientDoc.name).toBe(ingredientTemplate.name);
        expect(ingredientDoc.quantity).toBe(ingredientTemplate.quantity);
        expect(ingredientDoc.price).toEqual(ingredientTemplate.price);
        expect(ingredientDoc.abv).toBe(ingredientTemplate.abv);
        expect(ingredientDoc.price.cost).toBe(ingredientTemplate.price.cost);
        expect(ingredientDoc.price.unitOfMeasure).toBe(ingredientTemplate.price.unitOfMeasure);
        expect(ingredientDoc._id).toBeDefined();
    })
});

test("Ingredient Deletion from Table", async ()=>{
    
    await inventoryDb.removeIngredientFromList(testData.listIds[0], testData.ingredientId)
    let ingredientList = await inventoryDb.fetchIngredientList(testData.listIds[0])
    let deleteIngredient = await inventoryDb.fetchIngredient(testData.ingredientId)
    expect(deleteIngredient).not.toBeNull();
    /** */
    expect(ingredientList.map((ingredient)=>ingredient._id.toString())).not.toContain(deleteIngredient._id.toString());
})

test("Ingredient Deletion from Main", async ()=>{

    let deleteIngredient = await inventoryDb.fetchIngredient(testData.ingredientId)
    await inventoryDb.removeIngredientFromMain(testData.ingredientId)
    let newListDocs = await Promise.all([
        inventoryDb.fetchIngredientList(testData.mainId),
        inventoryDb.fetchIngredientList(testData.listIds[1])
    ])
    let ingredientAfterDeletion =  await inventoryDb.fetchIngredient(testData.ingredientId)


    expect(newListDocs[0].map((ingredient)=>ingredient._id.toString())).not.toContain(deleteIngredient._id.toString())
    expect(newListDocs[1].map((ingredient)=>ingredient._id.toString())).not.toContain(deleteIngredient._id.toString())
    expect(ingredientAfterDeletion).toBeNull()

})
