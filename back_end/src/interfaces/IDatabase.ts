import { IRessourceDatabase } from "./IRessourceDatabase";
import { IContainerDatabase } from "./IContainerDatabase";
import { IIngredient } from "./IIngredient";
import { IIngredientList } from "./IIngredientList";
import { IRecipe } from "./IRecipe";
import { IMenu } from "./IMenu";
import { IUserDatabase } from "./IUserDatabase";

export interface IDatabase {
    ingredient: IRessourceDatabase<IIngredient>;
    ingredientList: IContainerDatabase<IIngredientList>;
    recipe: IContainerDatabase<IRecipe>;
    menu: IContainerDatabase<IMenu>;
    user: IUserDatabase;
}