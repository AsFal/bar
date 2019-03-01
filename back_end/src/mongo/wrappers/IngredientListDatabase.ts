import { IIngredientList } from "../../interfaces/IIngredientList";
import { IContainerDatabase } from "../../interfaces/IContainerDatabase";
import { IngredientList, IIngredientListModel } from "../models/IngredientList";

const IngredientListDatabase: () => IContainerDatabase<IIngredientList> =
() => ({
    async fetch(id: string): Promise<IIngredientListModel> {
        return IngredientList.findById(id).exec();
    },

    async fetchPopulated(id: string): Promise<IIngredientListModel> {
        return IngredientList.findById(id).populate("ingredients").exec();
    },

    async create(ressourceInfo: IIngredientList): Promise<IIngredientListModel> {
        return IngredientList.create(ressourceInfo);
    },

    async destroy(id: string): Promise<IIngredientListModel> {
        return IngredientList.findByIdAndDelete(id).exec();
    },

    async update(id: string, ressourceInfo: IIngredientList): Promise<IIngredientListModel> {
        return IngredientList.findByIdAndUpdate(id, ressourceInfo, {new: true} ).exec();
    },

});