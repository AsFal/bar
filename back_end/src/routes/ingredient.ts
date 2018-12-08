import { Router, Request, Response } from "express";
const router = Router();
import * as inventoryDb from "../db_interaction/inventory";
import { IIngredientModel } from "../models/Ingredient";

router.get("/:ingredient_id", async (req: Request, res: Response) => {

    const ingredientId: String = req.params.ingredient_id;

    try {
        const ingredientDoc = await inventoryDb.fetchIngredient(ingredientId);
        res.json(ingredientDoc);
    } catch (err) {
        res.status(422).json("Ingredient not found");
    }
});

/**
 * @todo Fix this route so when an ingredient is created, it is added to main
 * @todo Abstract the above functionality into a db_interaction function
 */
router.post("/", async (req: Request, res: Response) => {
    const ingredient: IIngredientModel = req.body;
    const tableId: String = req.query.tableId;

    try {
        const ingredientDoc = await inventoryDb.createIngredient(ingredient);
        await inventoryDb.addToIngredientList(tableId, [ingredientDoc]);
        res.json(ingredientDoc);
    } catch (err) {
        res.status(422).json(err);
    }
});

/**
 * @todo change the fetchIngredientList function so it returns an actual ingredient list
 * that way i can make the check to see if the returned list is the main or not
 */
router.delete("/:ingredient_id", async (req: Request, res: Response) => {
    const listId: String = req.query.listId;
    const ingredientId: String = req.query.ingredientId;
    try {
        const listDoc = await inventoryDb.fetchIngredientList(listId);
        if (listDoc.name === "Main")
            /**
             * If the deletion is from the main, the ingredient will not only be deleted from
             * the main, but also from the other lists and the database
             */
            await inventoryDb.removeIngredientFromMain(ingredientId);
        else
            /**
             * If the deletion is not from the main, the ingredient will only be deleted from
             * the corresponding list
             */
            await inventoryDb.removeIngredientFromList(listId, ingredientId);
        res.json("Deleted");
    } catch (err) {
        res.status(422).json(err);
    }
});

router.put("/:ingredient_id", (req: Request, res: Response) => {
    const ingredientUpdate = req.body;
    const ingredientId = req.params.ingredient_id;
    inventoryDb.updateIngredient(ingredientId, ingredientUpdate)
    .then((newIngredientDoc) => {
        res.json(newIngredientDoc);
    })
    .catch((err) => {
        res.status(422).json(err);
    });
});

module.exports = router;