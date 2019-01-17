import { Router, Request, Response } from "express";
const router = Router();
import * as ingredientDb from "../mongo/interaction/ingredient";
import * as ingredientListDb from "../mongo/interaction/ingredientList";
import { IIngredient } from "../interfaces/IIngredient";
import { checkJwt } from "../config/auth";

router.get("/:ingredient_id", async (req: Request, res: Response) => {

    const ingredientId: string = req.params.ingredient_id;
    try {
        const ingredientDoc = await ingredientDb.fetchIngredient(ingredientId);
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
    console.log("this");
    console.log(req.body);
    const ingredient: IIngredient = req.body;
    const tableId: string = req.query.tableId;
    try {
        const ingredientDoc = await ingredientDb.createIngredient(ingredient);
        await ingredientListDb.addToIngredientList(tableId, ingredientDoc);
        res.json(ingredientDoc);
    } catch (err) {
        console.log(err);
        res.status(422).json(err);
    }
});

/**
 * @todo change the fetchIngredientList function so it returns an actual ingredient list
 * that way i can make the check to see if the returned list is the main or not
 */
router.delete("/:ingredient_id", async (req: Request, res: Response) => {
    const listId: string = req.query.listId;
    const ingredientId: string = req.query.ingredientId;
    try {
        const listDoc = await ingredientListDb.fetchIngredientList(listId);
        if (listDoc.name === "Main")
            /**
             * If the deletion is from the main, the ingredient will not only be deleted from
             * the main, but also from the other lists and the database
             */
            /**
             * @todo: fix this mistake
             */
            await ingredientDb.removeIngredientFromMain("TBD", ingredientId);
        else
            /**
             * If the deletion is not from the main, the ingredient will only be deleted from
             * the corresponding list
             */
            await ingredientDb.removeIngredientFromList(listId, ingredientId);
        res.json("Deleted");
    } catch (err) {
        res.status(422).json(err);
    }
});

router.put("/:ingredient_id", (req: Request, res: Response) => {
    const ingredientUpdate = req.body;
    const ingredientId = req.params.ingredient_id;
    ingredientDb.updateIngredient(ingredientId, ingredientUpdate)
    .then((newIngredientDoc) => {
        res.json(newIngredientDoc);
    })
    .catch((err) => {
        res.status(422).json(err);
    });
});

module.exports = router;