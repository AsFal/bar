//@ts-check
/**
 * @file
 * @author Alexandre Falardeau
 * 
 * @typedef {import("../models/Recipe").RecipeDoc} RecipeDoc
 * @typedef {import("../models/Ingredient").IngredientDoc} IngredientDoc
 */

/**
 * @function drinkAbv
 * @param {RecipeDoc} recipe 
 */ 
function drinkAbv(recipe) {
    let abv = 0;
    let drinkVolume = 0;
    recipe.ingredients.forEach((ingredient)=>{
        /**
         * @todo: make conversion verifications
         */
        drinkVolume += ingredient.quantity;
        abv += ingredient.ingredient.abv * ingredient.quantity;
        
        // console.log(ingredient);
    })
    return abv/drinkVolume;
} 

function convert(a,b,c) {
    return null;
}

/**
 * 
 * @param {RecipeDoc} recipe 
 */
function drinkPrice(recipe) {
    
    let price = 0;
    recipe.ingredients.forEach((ingredient)=>{
        let ingredientCost = ingredient.ingredient.price.cost * ingredient.quantity;
        if (ingredient.unitOfMeasure != ingredient.ingredient.price.unitOfMeasure)
            ingredientCost = convert(ingredient.ingredient.price.unitOfMeasure,
                ingredient.unitOfMeasure, 
                ingredient.ingredient.price.cost ) *ingredient.quantity;
        price += ingredientCost;
    })
    return price/recipe.portions;
}

module.exports = {
    price : drinkPrice,
    abv: drinkAbv
}