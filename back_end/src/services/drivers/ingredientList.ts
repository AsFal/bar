import { IDatabase } from "../../interfaces/IDatabase";
import { IIngredientList } from "../../interfaces/IIngredientList";
import { IContainerDriver } from "../../interfaces/IContainerDriver";
import { removeDocumentFromContainer, addDocumentToContainer } from "./helper";
import { create } from "domain";


export const IngredientListDriver: (db: IDatabase) => IContainerDriver<IIngredientList> =
function (db: IDatabase) {
    return {

            async fetch(id: string): Promise<IIngredientList> {
                return db.ingredientList.fetchPopulated(id);
            },

            async create(list: IIngredientList): Promise<IIngredientList> {
                return db.ingredientList.create(list);
            },

            async update(id: string,
                updatedIngredientList: IIngredientList): Promise<IIngredientList> {
                    return db.ingredientList.update(id, updatedIngredientList);
            },

            async destroy(id: string): Promise<IIngredientList> {
                return db.ingredientList.destroy(id);
            },
            async clear(id: string): Promise<IIngredientList> {
                return db.ingredientList.update(id, {ingredients: []});
            },
            async addToContainer(ingredientListId: string, ingredientId: string):
            Promise<IIngredientList> {

                return addDocumentToContainer(db.ingredientList, ingredientListId,
                                             "ingredients", ingredientId);
            },
            async removeFromContainer(ingredientListId: string, ingredientId: string):
            Promise<IIngredientList> {
                return removeDocumentFromContainer(ingredientListId, [Symbol][Symbol].)
            },
    };
};

