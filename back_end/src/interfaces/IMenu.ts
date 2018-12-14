import { IIngredient } from "./IIngredient";
import { IRecipe } from "./IRecipe";


export interface IMenu {
    name: String;
    theme: String;
    season: String;
    recipes: (IRecipe|String)[];
    // This functionality will need to be thought out, not exactly sure what I want here tbh
    ingredients: (IIngredient|String)[];
}