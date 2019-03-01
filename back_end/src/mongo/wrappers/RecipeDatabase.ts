import { IRecipe } from "../../interfaces/IRecipe";
import { IRecipeModel, Recipe } from "../models/Recipe";
import { IContainerDatabase } from "../../interfaces/IContainerDatabase";

export const RecipeDatabse: () => IContainerDatabase<IRecipe> =
() => ({
    async fetch(id: string): Promise<IRecipeModel> {
        return Recipe.findById(id).exec();
    },

    async fetchPopulated(id: string): Promise<IRecipeModel> {
        return Recipe.findById(id).populate("ingredients").exec();
    },

    async create(ressourceInfo: IRecipe): Promise<IRecipeModel> {
        return Recipe.create(ressourceInfo);
    },

    async destroy(id: string): Promise<IRecipeModel> {
        return Recipe.findByIdAndDelete(id).exec();
    },

    async update(id: string, ressourceInfo: IRecipe) {
        return Recipe.findByIdAndUpdate(id, ressourceInfo).exec();
    }
});
