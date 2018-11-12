/**
 * 
 * @todo: Add a portions and price property on the recipe object
 * 
 * @todo: GET request for a certain recipe (should send a json containing all recipes)
 * @todo: GET request for a menu (containing only recipe ids and menu information)
 * @todo: POST request for a new recipe
 * @todo: 
 */

function convert(from, to, cost) {
    // Add conversions when necessary
}

/**
 * @throws A nonConversionError if conversion does not exist (drink will be priced at 0)
 * 
 * @todo: needs to be tested
 * @param {RecipeDoc} recipe 
 */
function pricePortion(recipe) {
    
    let price = 0;
    recipe.ingredients.forEach((ingredient)=>{
        let ingredientCost = ingredient.ingredient.price.cost * ingredient.quantity;
        if (ingredient.unitOfMeasue != ingredient.ingredient.price.unitOfMeasue)
            ingredientCost = convert(ingredient.ingredient.price.unitOfMeasue,
                ingredient.unitOfMeasue, 
                ingredient.ingredient.price.cost ) *ingredient.quantity;
        price += ingredientCost;
    })
    return price/recipe.portions;
}

module.exports = pricePortion;


// Need to use jest for this
// function testPriceDrink() {
//     let test_recipe = require("../seeds/recipe_rum_smash.json");
//     if (pricePortion(test_recipe) == test_recipe.price) {
//         console.log("test passed");
//     } else {
//         console.log("test failed");
//     }
// }

// testPriceDrink();