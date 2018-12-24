import { Request, Response, Router } from "express";
import * as ingredientListDb from "../mongo/interaction/ingredientList";
import { IIngredientList } from "../interfaces/IIngredientList";
import { checkJwt } from "../config/auth";
// make and interfacce so we don't have to import from the models
const router = Router();


router.get("/", async (req: Request, res: Response) => {
    // Will require some kind of parser to convert json body to object
    console.log("what");
    try {
        const listDocs = await ingredientListDb.fetchLists();
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
        const ingredientList = await ingredientListDb.fetchIngredientList(req.params.list_id);
        res.json(ingredientList);
    } catch (err) {
        res.status(422).json(err);
    }
});

router.post("/", checkJwt, async (req: Request, res: Response) => {
console.log(req.body);
    try {
        const list: IIngredientList = req.body;
        const newListDoc = await ingredientListDb.createList(list);
    } catch (err) {
        res.status(422).json(err);
    }
});

/**
 * This route is only used to modify the metadata for lists, not the actual ingredients inside
 * the list
 * Ingredients update themselves
 */
router.put("/:ingredient_list_id", checkJwt, async (req: Request, res: Response) => {
    const listUpdate: IIngredientList = req.body;
    try {
        const updatedListDoc = await ingredientListDb.updateIngredientList(req.params.list_id, listUpdate);
        res.json(updatedListDoc);
    } catch (err) {
        res.status(422).json(err);
    }
});

router.delete("/:ingredient_list_id", checkJwt, async (req: Request, res: Response) => {
    try {
        await ingredientListDb.deleteIngredientList(req.params.ingredient_list_id);
        res.json("Ingredient List Deleted");
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = router;