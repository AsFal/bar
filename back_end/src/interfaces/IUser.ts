import { IMenu } from "./IMenu";
import { IIngredientList } from "./IIngredientList";
import { IUserInfo } from "./IUserInfo";

export interface IUser extends IUserInfo {
    menus: IMenu[] | string[] ;
    mainMenu: IMenu | string;
    ingredientLists: IIngredientList[] | string[];
    mainIngredientList: IIngredientList | string;
}
