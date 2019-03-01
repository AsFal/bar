import { IContainerDriver } from "../../interfaces/IContainerDriver";
import { IRecipe } from "../../interfaces/IRecipe";
import { IIngredientModel } from "../models/Ingredient";
import { instanceOfIIngredient } from "../../interfaces/IIngredient";
import { removeDocumentFromContainer, addDocumentToContainer } from "./helper";
import { fetchMenus } from "./menu";
import { IDatabase } from "../../interfaces/IDatabase";
import { IRecipeAnalysis } from "../../interfaces/IRecipeAnalysis";
import { PassThrough } from "stream";

export const IRecipeDriver: (IDatabase) => IContainerDriver<IRecipe> =
(db: IDatabase, recipeAnalysis: IRecipeAnalysis) => {

    const fillMissingIngredients: (IRecipe) => Promise<IRecipe> =
    async (recipe: IRecipe) => {
        // Function: fill in ingredients when necessary
        const recipeIngredientPromises:
        Promise<{quantity: number, unitOfMeasure: string, description: IIngredientModel}>[] = [];

        const {
            "ingredients": preFilledIngredients,
            ...recipeInfo,
        } = recipe;

        preFilledIngredients.map((ingredient) => {
            // this creates and ingredient without actually adding it to anything
            const ingredientPromise = instanceOfIIngredient(ingredient.description)
                ? db.ingredient.create(ingredient.description)
                  .then((ingredientDoc) => {
                      await db.user.addIngredientToMain(ingredientDoc._id);
                      return Promise.resolve(ingredientDoc._id); })
                : Promise.resolve(ingredient.description);
            return ingredientPromise.then((ingredientId) => ({
                quantity: ingredient.quantity,
                unityOfMeasure: ingredient.unitOfMeasure,
               description: ingredientId
            }));
        });

        const recipeIngredients = await Promise.all(recipeIngredientPromises);

        return {
            ...recipeInfo,
            ingredients: recipeIngredients,
        };


    };

    const saveAnalysed: (string) => Promise<IRecipe> =
    async (id: string) => {
        return db.recipe.fetchPopulated(id)
        .then((recipeDoc) => analyseRecipe(recipeDoc))
        .then((analysedRecipe) => db.recipe.update(id, analysedRecipe));
    };

    const analyseRecipe: (IRecipe) => IRecipe =
    (recipe: IRecipe) => {
        const {
            price,
            abv,
            ...recipeInfo,
        } = recipe;

        // Therefore the populated recipe is - Affected real recipe - function leakage
        const recipePrice =  price ? price : recipeAnalysis.price(recipe);
        const recipeAbv = abv ? abv : recipeAnalysis.abv(recipe);
        return {
            price: recipePrice,
            abv: recipeAbv,
            ...recipeInfo
        };
    };

    return {

        async fetch(id: string): Promise<IRecipe> {
            return db.recipe.fetch(id);
        },

        async fetchPopulated(id: string): Promise<IRecipe> {
            return db.recipe.fetchPopulated(id);
        },

        async create(recipe: IRecipe): Promise<IRecipe> {
            return fillMissingIngredients(recipe)
            .then((formattedRecipe) => db.recipe.create(formattedRecipe))
            .then((recipeDoc) => saveAnalysed(recipeDoc._id));
        },

        async update(id: string, updateRecipe: IRecipe): Promise<IRecipe> {
            return fillMissingIngredients(updateRecipe)
            .then((formattedRecipe) => db.recipe.update(id, formattedRecipe))
            .then((recipeDoc) => saveAnalysed(recipeDoc._id));
        },

        async delete(id: string): Promise<IRecipe> {
            return db.recipe.destroy(id);
        },

        async removeFromContainer(containerId: string, ressourceId: string): Promise<IRecipe> {
           return undefined;
        }

        async addDocumentToContainer(containerId: string, ressourceId: string): Promise<IRecipe> {
            reutnr undefined;
        }

        async removeRecipeFromMain(userIdentifier: string, recipeId: string): Promise<IRecipe> {
            const allMenus = await fetchMenus(userIdentifier);
            const removalPromises: Promise<IMenuModel>[] = [];
            allMenus.forEach(async (menuDoc) => {
                menuDoc.recipes.forEach(async (fetchedRecipeId) => {
                    if (recipeId.toString() == fetchedRecipeId.toString())
                        removalPromises.push(removeRecipeFromMenu(menuDoc._id, recipeId));
                });
            });
            await Promise.all(removalPromises);
            return deleteRecipe(recipeId);
        },

});
