//@ts-check
const menuDb = require("../db_interaction/recipe")

const seed = require("./seeding/recipe")

const mongoose = require("mongoose");

let testData;

beforeAll(async done=>{
    try {
        await mongoose.connect("mongodb://localhost/bar_app", { useNewUrlParser: true })
        testData = await seed.exec()
    } catch(err) {
        console.log(err)
    }
    done()
})

afterAll(async done=>{
    await mongoose.disconnect()
    done()
})

test("Convert Recipe To Mongoose Friendly Format", async ()=>{
    // Need a recipe template that has the price, ingredients 
    // Extract price, abv, etc from the recipe
    // Delete the components from that
    let drinkPrice = testData.recipeTemplates[0].price;
    let drinkAbv = testData.recipeTemplates[0].abv;
    let convertedRecipe = await menuDb.convertRecipe(testData.recipeTemplates[0])
    expect(convertedRecipe.price).toBe(drinkPrice)
    expect(convertedRecipe.abv).toBe(drinkAbv)
    // This test is to check if all the ingredients have been converted to id
    expect(convertedRecipe.ingredients.map((ingredient)=>ingredient._id))
    .toEqual(convertedRecipe.ingredients.map((ingredient)=>undefined))
    convertedRecipe.ingredients.forEach((ingredient)=>{
        expect(ingredient.ingredient instanceof mongoose.mongo.ObjectID).toBeTruthy()
    })

})

test("Update Recipe", async ()=>{

    // If no ingredient change, make there should be no recompute of the price
    // Else, modify recipe according to received model
    let newRecipe = await menuDb.updateRecipe(testData.recipeIds[0], testData.untouchedRecipeTemplate)
    expect(newRecipe.price).not.toBeNull()
    expect(newRecipe.abv).not.toBeNull()
    expect(newRecipe.name).toBe(testData.untouchedRecipeTemplate.name)
    // expect(updatedRecipe.ingredients.map(ingredient=>ingredient.__proto__))
    expect(newRecipe.ingredients.length).toBe(testData.untouchedRecipeTemplate.ingredients.length)
})

test("Create Recipe", async ()=>{
    // Take a model recipe
    // Receive the answer, check if analytics are done correctly and recipe is properly created
    let newRecipe = await menuDb.createRecipe(testData.recipeTemplates[1])
    expect(newRecipe.price).not.toBeNull()
    expect(newRecipe.abv).not.toBeNull()
    expect(newRecipe.name).toBe(testData.recipeTemplates[1].name)
    // expect(updatedRecipe.ingredients.map(ingredient=>ingredient.__proto__))
    expect(newRecipe.ingredients.length).toBe(testData.recipeTemplates[1].ingredients.length)
})

test("Delete Recipe from random Menu", async ()=>{
    // Need a menu for this, and a recipe to delte from menu
    // Recipe one that can be deleted

    await menuDb.removeRecipeFromMenu(testData.menuIds[0], testData.recipeIds[1])
    let menu = await menuDb.fetchMenu(testData.menuIds[0])
    let deletedRecipe = await menuDb.fetchRecipe(testData.recipeIds[1])
    expect(deletedRecipe).not.toBeNull();
    expect(menu.recipes.map((recipe)=>recipe._id.toString())).not.toContain(deletedRecipe._id.toString());
})

test("Delete Recipe from main menu", async ()=>{

    let deleteRecipe = await menuDb.fetchRecipe(testData.recipeIds[2])
    await menuDb.removeRecipeFromMain(testData.recipeIds[2])
    let newMenuDocs = await Promise.all([
        menuDb.fetchMenu(testData.mainId),
        menuDb.fetchMenu(testData.menuIds[1])
    ])
    let recipeAfterDeletion =  await menuDb.fetchRecipe(testData.recipeIds[2])

    expect(newMenuDocs[0].recipes.map((recipe)=>recipe._id.toString())).not.toContain(deleteRecipe._id.toString())
    expect(newMenuDocs[1].recipes.map((recipe)=>recipe._id.toString())).not.toContain(deleteRecipe._id.toString())
    expect(recipeAfterDeletion).toBeNull()
    // need a main menu, a secondary menu that is not used in the first deletion test
    // A second recipe that can be deleted independentaly
})