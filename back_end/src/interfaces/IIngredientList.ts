import { IIngredient } from "./IIngredient";

export interface IIngredientList {
    name: string;
    filters?: string[];
    ingredients?: (IIngredient | string)[];
}