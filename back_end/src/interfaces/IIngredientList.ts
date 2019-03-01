import { IIngredient } from "./IIngredient";
import { IContainer } from "./IContainer";

export interface IIngredientList extends IContainer {
    name?: string;
    filters?: string[];
    ingredients?: (IIngredient | string)[];
}