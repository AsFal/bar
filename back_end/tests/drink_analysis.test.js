const drinkAnalysis = require("../helper/drink_analysis");

test("Portion abv is accurate", ()=>{
    let testRecipe = require("./seeding/seeds/recipe_gin_smash.json");
    expect(drinkAnalysis.abv(testRecipe)).toBe(testRecipe.abv);
})

test("Portion pricing is accurate", ()=>{
    let testRecipe = require("./seeding/seeds/recipe_rum_smash.json");
    expect(drinkAnalysis.price(testRecipe)).toBe(testRecipe.price);
})


