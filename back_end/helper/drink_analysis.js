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

function drinkPrice(recipe) {
    
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

module.exports = {
    price : drinkPrice,
    abv: drinkAbv
}