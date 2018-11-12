function drinkAbv(recipeDoc) {
    let abv = 0;
    let drinkVolume = 0;
    recipeDoc.ingredients.forEach((ingredient)=>{
        /**
         * @todo: make conversion verifications
         */
        drinkVolume += ingredient.quantity;
        abv += ingredient.ingredient.abv;
    })
    return abv/drinkAbv;
} 

function testDrinkAbv(recipeDoc) {
    if (recipeDoc.abv != drinkAbv(recipeDoc))
        console.log("abv test passed");
    else 
        console.log("abv test failed");
}

testDrinkAbv(require("../seeds/recipe_gin_smash.json"));
