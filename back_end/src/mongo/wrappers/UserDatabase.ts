import { IIngredientListModel, isIngredientListModel, isIngredientListModelArray } from "../models/IngredientList";
import { IMenuModel, isMenuModel, isMenuModelArray } from "../models/Menu";
import { IUser } from "../../interfaces/IUser";
import { IUserModel, User } from "../models/User";
import { IUserDatabase } from "../../interfaces/IUserDatabase";

export const UserDatabase: () => IUserDatabase =
() => {
    return {
        async fetch(id: string): Promise<IUserModel> {
            return User.findById(id).exec();
        },

        async fetchPopulated(id: string): Promise<IUserModel> {
            return User.findById(id)
            .populate("mainMenu")
            .populate("menus")
            .populate("mainIngredientList")
            .populate("ingredientLists")
            .exec();
        },

        async create(ressourceInfo: IUser): Promise<IUserModel> {
            return User.create(ressourceInfo);
        },

        async destroy(id: string): Promise<IUserModel> {
            return User.findByIdAndDelete(id).exec();
        },

        async update(id: string, ressourceInfo: IUser): Promise<IUserModel> {
            return User.findByIdAndUpdate(id, ressourceInfo).exec();
        },

        async fetchMainIngredientList(id: string): Promise<IIngredientListModel> {
            const user = await User.findById(id).populate("mainIngredientList").exec();
            if (isIngredientListModel(user.mainIngredientList)) {
                return user.mainIngredientList;
            } else {
                throw new Error("User was not properly populated");
            }
        },

        async fetchAllIngredientLists(id: string): Promise<IIngredientListModel[]> {
            const user = await User.findById(id)
            .populate("mainIngredientList")
            .populate("ingredientLists")
            .exec();
            const ingredientLists = [user.mainIngredientList].concat(user.ingredientLists);
            if (isIngredientListModelArray(ingredientLists)) {
                return ingredientLists;
            } else {
                throw new Error("User was not properly populated");
            }
        },

        async fetchMainMenu(id: string): Promise<IMenuModel> {
            const user = await User.findById(id).populate("mainMenu").exec();
            if (isMenuModel(user.mainMenu)) {
                return user.mainMenu;
            } else {
                throw new Error("User was not properly populated");
            }
        },

        async fetchAllMenus(id: string): Promise<IMenuModel[]> {
            const user = await User.findById(id)
            .populate("mainMenu")
            .populate("mainMenus")
            .exec();
            const menus = [user.mainMenu].concat(user.menus);
            if (isMenuModelArray(menus)) {
                return menus;
            } else {
                throw new Error("User was not properly populated");
            }
        }
    };
};
