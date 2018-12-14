const drinkAnalysis = require("../dist/helper/drink_analysis");

test("Portion abv is accurate", () => {
    const testRecipe = require("../dist/mongo/seeding/seeds/recipes/gin_smash.json");
    expect(drinkAnalysis.drinkAbv(testRecipe)).toBe(testRecipe.abv);
});

test("Portion pricing is accurate", () => {
    const testRecipe = require("../dist/mongo/seeding/seeds/recipes/rum_smash.json");
    expect(drinkAnalysis.drinkPrice(testRecipe)).toBe(testRecipe.price);
});


