//@ts-check
var express = require("express");
var router = express.Router();

var inventoryDb = require("../db_interaction/inventory.js");



router.get("/:ingredient_id", (req,res)=>{
    let ingredientId = req.params.ingredient_id;
    
    inventoryDb.fetchIngredient(ingredientId)
    .then((ingredientDoc)=>{
        res.json(ingredientDoc);
    })
    .catch((err)=>{
        res.status(422).json("Ingredient not found");
    })
})


router.post("/", (req, res)=>{
    let ingredient = req.body;
    // let addToMain = req.query.addToMain == "true";
    let tableId = req.query.tableId;
    console.log(tableId);
    // This is cheating
    let resIngredient = null;

    inventoryDb.createIngredient(ingredient)
    .then((ingredientDoc)=>{
        resIngredient = ingredientDoc;
        return inventoryDb.addToTable(tableId, [ingredientDoc])
    })
    .then((tableDoc)=>res.json(resIngredient))
    .catch((err)=>{
        console.log(err);
        res.status(422).json({errorMessage: err});
    })
})

router.delete("/:ingredient_id", (req,res)=>{
    let listId = req.query.listId;
    let ingredientId = req.query.ingredientId
    inventoryDb.removeIngredientFromList(listId, ingredientId)
    .then((listDoc)=>{
        if(listDoc.name == "Main") {
            console.log("main");
            return inventoryDb.fetchLists();
        } else {
            res.json("success");
            // code might continue
        }
    })
    .then((listDocs)=>{
        // What happens when you delete and id does not exist (siltently fail??)
        /** @type {Array<Promise<any>>} */
        let removalPromises = listDocs.map((listDoc)=>
        inventoryDb.removeIngredientFromList(listDoc._id, ingredientId));
        removalPromises.push(inventoryDb.deleteIngredient(ingredientId));
        return Promise.all(removalPromises);
    })
    .then((newListDocs)=>{

        console.log(newListDocs);
        res.json("success");
    })
    .catch((err)=>{
        console.log(err);
        res.status(422).json("Error while updating deleting ingredient");
    })
        // Check if the current list is the main
        // If current list is main delete ingredient and remove from all list
    // if deletion is from the main, we have to delete all instances of ingredient
});

// Does not return the new ingredient, need to check if thats a mongoose thing or just me
router.put("/:ingredient_id", (req,res)=>{
    let ingredientUpdate = req.body;
    let ingredientId = req.params.ingredient_id;
    inventoryDb.updateIngredient(ingredientId, ingredientUpdate)
    .then((newIngredientDoc)=>{
        res.json(newIngredientDoc);
    })
    .catch((err)=>{
        res.status(422).json(err);
    })
})





module.exports = router;