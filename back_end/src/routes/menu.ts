import { Request, Response, Router } from "express";
import * as menuDb from "../db_interaction/recipe";

const router = Router();

router.get("/:menu_id", async (req: Request, res: Response) => {
    try {
        const menuDoc = await menuDb.fetchMenu(req.params.menu_id);
        res.json(menuDoc);
    } catch (err) {
        res.status(422).json(err);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const newMenuDoc = await menuDb.createMenu(req.body);
        res.json(newMenuDoc);
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = router;