import { IIngredient } from "./IIngredient";

export interface IIngredientList {
    name: String;
    filters?: String[];
    ingredients?: (IIngredient | String)[];
}