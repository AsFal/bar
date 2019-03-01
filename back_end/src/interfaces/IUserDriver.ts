import { IContainerDriver } from "./IContainerDriver";
import { IUser } from "./IUser";
import { IIngredientList } from "./IIngredientList";
import { IMenu } from "./IMenu";

export interface IUserDriver extends IContainerDriver<IUser> {

    addIngredientToMain(userId: string, ingredientId: string): Promise<IIngredientList>;
    fetchAllIngredientLists(userId: string): Promise<IIngredientList>;
    addRecipeToMain(userId: string, recipeId: string): Promise<IMenu>;
    fetchAllMenus(userId: string);
}