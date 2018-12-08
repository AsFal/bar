import { Request, Response, Router } from "express";
import * as inventoryDb from "../db_interaction/inventory";
import { IIngredientListModel } from "../models/IngredientList";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    // Will require some kind of parser to convert json body to object
    try {
        const listDocs = await inventoryDb.fetchLists();
        const listNames = listDocs.map((list) => (
            {
                name: list.name,
                _id: list._id
            }
        ));
        res.json(listNames);
    } catch (err) {
        res.status(422).json(err);
    }
});

router.get("/:list_id", async (req: Request, res: Response) => {
    try {
        const ingredientList = await inventoryDb.fetchIngredientList(req.params.list_id);
        res.json(ingredientList);
    } catch (err) {
        res.status(422).json(err);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const list: IIngredientListModel = req.body;
        const newListDoc = await inventoryDb.createList(list);
    } catch (err) {
        res.status(422).json(err);
    }
});

/**
 * This route is only used to modify the metadata for lists, not the actual ingredients inside
 * the list
 * Ingredients update themselves
 */
router.put("/:ingredient_list_id", async (req: Request, res: Response) => {
    const listUpdate: IIngredientListModel = req.body;
    try {
        const updatedListDoc = await inventoryDb.updateIngredientList(req.params.list_id, listUpdate);
        res.json(updatedListDoc);
    } catch (err) {
        res.status(422).json(err);
    }
});

router.delete("/:ingredient_list_id", async (req: Request, res: Response) => {
    try {
        await inventoryDb.deleteIngredientList(req.params.ingredient_list_id);
        res.json("Ingredient List Deleted");
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = router;