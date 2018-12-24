import { IRecipe } from "../interfaces/IRecipe";
import { IIngredient } from "../interfaces/IIngredient";
/**
 * @file
 * @author Alexandre Falardeau
 */

/**
 * @function drinkAbv
 * @param {IRecipeModel} recipe
 */
export function drinkAbv(recipe: IRecipe): number {
    let abv = 0;
    let drinkVolume = 0;
    recipe.ingredients.forEach((ingredient) => {
        /**
         * @todo: make conversion verifications
         */
        drinkVolume += ingredient.quantity;
        const ingredientDesc = ingredient.description;
        abv += (<IIngredient>ingredientDesc).abv * ingredient.quantity;
        // console.log(ingredient);
    });
    return abv / drinkVolume;
}

function convert(a: string, b: string, c: number): number {
    return 1;
}

/**
 * @param {RecipeDoc} recipe
 */
export function drinkPrice(recipe: IRecipe): number {
    let price = 0;
    recipe.ingredients.forEach((ingredient) => {
        const ingredientDesc = ingredient.description;
        let ingredientCost = (<IIngredient>ingredientDesc).rate.cost * ingredient.quantity;
        if (ingredient.unitOfMeasure != (<IIngredient>ingredientDesc).rate.unitOfMeasure)
            ingredientCost = convert((<IIngredient>ingredientDesc).rate.unitOfMeasure,
                ingredient.unitOfMeasure,
                (<IIngredient>ingredientDesc).rate.cost ) * ingredient.quantity;
        price += ingredientCost;
    });
    return price / recipe.portions;
}
