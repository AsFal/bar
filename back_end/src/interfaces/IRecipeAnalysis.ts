import { IRecipe } from "./IRecipe";

export interface IRecipeAnalysis {
    abv(recipe: IRecipe): number;
    price(recipe: IRecipe): number;
}