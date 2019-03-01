import { IIngredient } from "./IIngredient";
import { IRecipe } from "./IRecipe";


export interface IMenu {
    name?: string;
    theme?: string;
    season?: string;
    recipes?: (IRecipe|string)[];
    // This functionality will need to be thought out, not exactly sure what I want here tbh
    ingredients?: (IIngredient|string)[];
}