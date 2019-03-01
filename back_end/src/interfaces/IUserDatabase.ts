import { IIngredientList } from "./IIngredientList";
import { IMenu } from "./IMenu";
import { IUser } from "./IUser";
import { IContainerDatabase } from "./IContainerDatabase";

export interface IUserDatabase extends IContainerDatabase<IUser> {
    fetchMainIngredientList(id: string): Promise<IIngredientList>;
    fetchAllIngredientLists(id: string): Promise<IIngredientList[]>;
    fetchMainMenu(id: string): Promise<IMenu>;
    fetchAllMenus(id: string): Promise<IMenu[]>;
}