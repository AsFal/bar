import { User, IUserModel } from "../models/User";
import { IUser } from "../../interfaces/IUser";
import { Menu } from "../models/Menu";
import { IngredientList } from "../models/IngredientList";
import { IUserInfo } from "../../interfaces/IUserInfo";
import { clearMainMenu } from "./menu";
import { clearMainIngredientList, deleteIngredientList } from "./ingredientList";


export async function createUser(userObject: IUserInfo): Promise<IUserModel> {

    const mainMenu = await Menu.create({
            name: "Main",
            season: "Main",
            theme: "Main",
            recipes: [],
            ingredients: []
    });
    const mainIngredientList = await IngredientList.create({
        name: "Main",
        theme: "Main",
        ingredients: []
    });
    const userObjectFull: IUser = {
            ...userObject,
            mainIngredientList: mainIngredientList._id,
            mainMenu: mainMenu._id,
            ingredientLists: [],
            menus: []
    };
    return User.create(userObjectFull);
}

export async function clearUser(userIdentifier: string): Promise<IUserModel> {
    const user = await User.findOneAndUpdate({identifier: userIdentifier},
        {
            ingredientLists: [],
            menus: []
        }).exec();

    await Promise.all([
        clearMainMenu(<string>user.mainMenu),
        clearMainIngredientList(<string>user.mainIngredientList)]
    );


    return user;

}