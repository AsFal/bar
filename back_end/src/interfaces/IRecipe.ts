import { IIngredient } from "./IIngredient";

export interface IRecipe {
    name?: string;
    ingredients?:
      {
        unitOfMeasure: string,
        quantity: number,
        // Should be switched to description
        description: IIngredient | string
      }[];
    instructions?: string[];
    portions?: number;
    // refers to the price per portion
    price?: number;
    abv?: number;
}