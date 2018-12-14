import { IIngredient } from "./IIngredient";

export interface IRecipe {
    name: String;
    ingredients:
      {
        unitOfMeasure: String,
        quantity: number,
        // Should be switched to description
        description: IIngredient | String
      }[];
    instructions: String[];
    portions: number;
    // refers to the price per portion
    price: number;
    abv: number;
}