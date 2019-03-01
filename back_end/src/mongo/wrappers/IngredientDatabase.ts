import { Ingredient, IIngredientModel } from "../models/Ingredient";
import { IRessourceDatabase } from "../../interfaces/IRessourceDatabase";
import { IIngredient } from "../../interfaces/IIngredient";


export const IngredientDatabase: () => IRessourceDatabase<IIngredient> =
() => ({
    async fetch(id: string): Promise<IIngredientModel> {
        return Ingredient.findById(id).exec();
    },

    async create(ressourceInfo: IIngredient): Promise<IIngredientModel> {
        return Ingredient.create(ressourceInfo);
    },

    async destroy(id: string): Promise<IIngredientModel> {
        return Ingredient.findByIdAndDelete(id).exec();
    },

    async update(id: string, ressourceInfo) {
        return Ingredient.findByIdAndUpdate(id, ressourceInfo, {new: true} ).exec();
   },

});
