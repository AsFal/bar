import { IIngredient } from "../../interfaces/IIngredient";
import { IDatabase } from "../../interfaces/IDatabase";
import { IRessourceDriver } from "../../interfaces/IRessourceDriver";

export const IngredientDriver: (db: IDatabase) => IRessourceDriver<IIngredient> =
(db: IDatabase) => ({

        async fetch(id: string): Promise<IIngredient> {
            return db.ingredient.fetch(id);
        },
        async create(ingredient: IIngredient): Promise<IIngredient> {
            return db.ingredient.create(ingredient);
        },
        async destroy(id: string): Promise<IIngredient> {
            return db.ingredient.destroy(id);
        },
        async update(id: string, updatedIngredient: IIngredient):
        Promise<IIngredient> {
            return db.ingredient.update(id, updatedIngredient);
        },
});