import { IContainerDriver } from "../../interfaces/IContainerDriver";
import { IDatabase } from "../../interfaces/IDatabase";
import { IMenu } from "../../interfaces/IMenu";
import { IRecipe } from "../../interfaces/IRecipe";
import { IIngredient } from "../../interfaces/IIngredient";
import { removeDocumentFromContainer, addDocumentToContainer } from "./helper";

export const IMenuDriver: (IDatabase) => IContainerDriver<IMenu> =
(db: IDatabase) => ({
    async fetch(id: string): Promise<IMenu> {
        return db.menu.fetch(id);
    },
    async fetchPopulated(id: string): Promise<IMenu> {
        return db.menu.fetchPopulated(id);
    },
    async create(body: IMenu): Promise<IMenu> {
        return db.menu.create(body);
    },
    async destroy(id: string): Promise<IMenu> {
        return db.menu.destroy(id);
    },
    async update(id: string, body: IMenu): Promise<IMenu> {
        return db.menu.update(id, body);
    },
    async addToContainer(menuId: string, recipeId: string): Promise<IMenu> {
        return addDocumentToContainer(db.menu, menuId, "recipes", recipeId);
    },
    async removeFromContainer(menuId: string, recipeId: string): Promise<IMenu> {
        return removeDocumentFromContainer(db.menu, menuId, "recipes", recipeId);
    },
    async clear(menuId: string): Promise<IMenu> {
        const recipeArray: (IRecipe|string)[] = [];
        const ingredientsArray: (IIngredient| string)[] = [];
        return db.menu.update(menuId, {
            recipes: recipeArray,
            ingredients: ingredientsArray,
        });
    },
});


