import { Request, Response, Router } from "express";
import * as menuDb from "../mongo/interaction/recipe";
import { IMenuModel } from "../mongo/models/Menu";

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

router.delete("/menu_id", async (req: Request, res: Response) => {
    try {
        await menuDb.deleteMenu(req.params.menu_id);
        res.json("sucess");
    } catch (err) {
        res.status(422).json(err);
    }
});

router.put("/menu_id", async (req: Request, res: Response) => {
    try {
        const newMenuInfo: IMenuModel = req.body;
        const newMenu = await menuDb.updateMenu(req.params.menu_id, newMenuInfo);
        res.json(newMenu);
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = router;