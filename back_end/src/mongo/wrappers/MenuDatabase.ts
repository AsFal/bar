import { IMenu } from "../../interfaces/IMenu";
import { IContainerDatabase } from "../../interfaces/IContainerDatabase";
import { IMenuModel, Menu } from "../models/Menu";

const MenuDatabase: () => IContainerDatabase<IMenu> =
() => ({
    async fetch(id: string): Promise<IMenuModel> {
        return Menu.findById(id).exec();
    },

    async fetchPopulated(id: string): Promise<IMenuModel> {
        return Menu.findById(id).populate("recipes").exec();
    },

    async create(ressourceInfo: IMenu): Promise<IMenuModel> {
        return Menu.create(ressourceInfo);
    },

    async destroy(id: string): Promise<IMenuModel> {
        return Menu.findByIdAndDelete(id).exec();
    },

    async update(id: string, ressourceInfo): Promise<IMenuModel> {
        return Menu.findByIdAndUpdate(id, ressourceInfo, {new: true}).exec();
    },

});
