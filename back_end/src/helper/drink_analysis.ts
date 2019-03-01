import { IRecipe } from "../interfaces/IRecipe";
import { IRecipeAnalysis } from "../interfaces/IRecipeAnalysis";
import { IIngredient } from "../interfaces/IIngredient";
import { Ingredient } from "../mongo/models/Ingredient";

const RecipeAnalysis: () => IRecipeAnalysis =
() => {
    const convertIngredient: (IIngredient) => (IIngredient) =
    (ingredient: IIngredient) => {
        return ingredient;
    };

    return {
        abv(recipe: IRecipe): number {
            const recipeIngredients = recipe.ingredients
            .map((ingredient) =>
                ({
                    quantity: ingredient.quantity,
                    unitOfMeasure: ingredient.unitOfMeasure,
                    description: convertIngredient(ingredient.description),
             } ) );

            const drinkVolume: number = recipe.ingredients.reduce((volume, ingredient) => volume + ingredient.quantity, 0);
            return recipe.ingredients.reduce((abv, ingredient) => 
                abv + (<IIngredient>ingredient.description).abv * ingredient.quantity / drinkVolume, 0);

        },

        price(recipe: IRecipe): number {
            return recipe.ingredients
            .map((ingredient) =>
                ({
                    quantity: ingredient.quantity,
                    unitOfMeasure: ingredient.unitOfMeasure,
                    description: convertIngredient(ingredient.description),
             }))
             .reduce((price, ingredient) => price + ingredient.quantity * (<IIngredient>ingredient.description).rate.cost, 0);

        },
    }
};