import { Request, Response, Router } from "express";
import * as menuDb from "../mongo/interaction/recipe";
import { IRecipe } from "../interfaces/IRecipe";

const router = Router();

router.get("/:recipe_id", async (req: Request, res: Response) => {
    try {
        const recipeDoc = await menuDb.fetchRecipe(req.params.recipe_id);
        res.json(recipeDoc);
    } catch (err) {
        res.status(422).json(err);
    }
});

/**
 * @todo create recipe function in menuDB needs to be modified so it abstracts
 * the adding the menu logic
 * function signature must only take in new recipe model and recipe as parameters
 */
router.post("/", async (req: Request, res: Response) => {
    // Recipe will need to be added to the recipe book
    const recipe: IRecipe = req.body;
    try {
        const newRecipe = await menuDb.createRecipe(recipe);
        res.json(newRecipe);
    } catch (err) {
        res.status(422).json(err);
    }
});


router.put("/:recipe_id", async (req: Request, res: Response) => {

    const recipe: IRecipe = req.body;
    try {
        const updatedRecipe = await menuDb.updateRecipe(req.params.recipe_id, recipe);
        res.json(updatedRecipe);
    } catch (err) {
        res.status(422).json(err);
    }
});

router.delete("/:recipe_id", async (req: Request, res: Response) => {
    try {
        const menuDoc = await menuDb.fetchMenu(req.query.menuId);
        if (menuDoc.name === "Main")
            menuDb.removeRecipeFromMain(req.params.recipe_id);
        else
            menuDb.removeRecipeFromMenu(req.query.menuId, req.params.recipe_id);
        res.json("Deletion is successful");
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = router;