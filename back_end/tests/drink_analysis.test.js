const drinkAnalysis = require("../helper/drink_analysis");

test("Portion abv is accurate", ()=>{
    let testRecipe = require("./seeding/seeds/recipes/gin_smash.json");
    expect(drinkAnalysis.abv(testRecipe)).toBe(testRecipe.abv);
})

test("Portion pricing is accurate", ()=>{
    let testRecipe = require("./seeding/seeds/recipes/rum_smash.json");
    expect(drinkAnalysis.price(testRecipe)).toBe(testRecipe.price);
})


