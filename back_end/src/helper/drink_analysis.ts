import { IRecipeModel } from "../models/Recipe";
import { IIngredientModel } from "../models/Ingredient";
/**
 * @file
 * @author Alexandre Falardeau
 */

/**
 * @function drinkAbv
 * @param {IRecipeModel} recipe
 */
export function drinkAbv(recipe: IRecipeModel): number {
    let abv = 0;
    let drinkVolume = 0;
    recipe.ingredients.forEach((ingredient) => {
        /**
         * @todo: make conversion verifications
         */
        drinkVolume += ingredient.quantity;
        const ingredientDesc = ingredient.description;
        abv += (<IIngredientModel>ingredientDesc).abv * ingredient.quantity;
        // console.log(ingredient);
    });
    return abv / drinkVolume;
}

function convert(a: String, b: String, c: number): number {
    return 1;
}

/**
 * @param {RecipeDoc} recipe
 */
export function drinkPrice(recipe: IRecipeModel): number {
    let price = 0;
    recipe.ingredients.forEach((ingredient) => {
        const ingredientDesc = ingredient.description;
        let ingredientCost = (<IIngredientModel>ingredientDesc).rate.cost * ingredient.quantity;
        if (ingredient.unitOfMeasure != (<IIngredientModel>ingredientDesc).rate.unitOfMeasure)
            ingredientCost = convert((<IIngredientModel>ingredientDesc).rate.unitOfMeasure,
                ingredient.unitOfMeasure,
                (<IIngredientModel>ingredientDesc).rate.cost ) * ingredient.quantity;
        price += ingredientCost;
    });
    return price / recipe.portions;
}
