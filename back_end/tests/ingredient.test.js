//@ts-check
var inventoryDb = require("../db_interaction/inventory.js");
var seed = require("../seeding/ingredient");
var mongoose = require("mongoose");

let testData;

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/bar_app", { useNewUrlParser: true }); 
    testData = await seed.exec();
    
    // pass information from here to the environment
});

afterAll(async ()=>{
    await mongoose.disconnect();
})

// Function should be switched so it adds to db and to given list, creation is a bit redundant to test

test("Ingredient is properly created", ()=>{
    let testIngredient = require("../seeding/seeds/ingredients_gin.json")[0];
    delete testIngredient._id;

    expect.assertions(7);
    return inventoryDb.createIngredient(testIngredient)
    .then((ingredientDoc)=>{
        expect(ingredientDoc.name).toBe(testIngredient.name);
        expect(ingredientDoc.quantity).toBe(testIngredient.quantity);
        expect(ingredientDoc.price).toEqual(testIngredient.price);
        expect(ingredientDoc.abv).toBe(testIngredient.abv);
        expect(ingredientDoc.price.cost).toBe(testIngredient.price.cost);
        expect(ingredientDoc.price.unitOfMeasure).toBe(testIngredient.price.unitOfMeasure);
        expect(ingredientDoc._id).toBeDefined();
    })
});


test("Ingredient Deletion from Table", async ()=>{
    
    await inventoryDb.removeIngredientFromList(testData.tableIds[0], testData.ingredientId)
    let ingredientList = await inventoryDb.fetchList(testData.tableIds[0])
    let deleteIngredient = await inventoryDb.fetchIngredient(testData.ingredientId)
    expect(deleteIngredient).not.toBeNull();
    expect(ingredientList).not.toContain(deleteIngredient);
})

test("Ingredient Deletion from Main", async ()=>{

    let deleteIngredient = await inventoryDb.fetchIngredient(testData.ingredientId)
    await inventoryDb.removeIngredientFromList(testData.tableIds[0], testData.ingredientId)
    let mainIngredientList = await inventoryDb.fetchIngredientList(testData.mainId)
    let ingredientList = await inventoryDb.fetchIngredientList(testData.tableIds[1])
    let ingredientAfterDeletion =  await inventoryDb.fetchIngredient(testData.ingredientId)

    expect(mainIngredientList).not.toContain(deleteIngredient)
    expect(ingredientList).not.toContain(deleteIngredient)
    expect(ingredientAfterDeletion).toBeNull()

})

test("Ingredient Deletion")