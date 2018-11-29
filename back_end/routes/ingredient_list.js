var express = require("express");
var router = express.Router();

var inventoryDb = require("../db_interaction/inventory.js");

router.get("/", (req, res)=> {
    // Will require some kind of parser to convert json body to object
    inventoryDb.fetchLists()
    .then((lists)=>{
        listNames = lists.map((list)=>{
            return {
                name: list.name,
                _id: list._id
            }
        });
        
        res.json(listNames);
    })
    .catch(err=>{
        console.log(err);
        send(err);
    })
    // Look in book to find out more about error handling
});

router.get("/:list_id", (req,res) =>{

    inventoryDb.fetchIngredientList(req.params.list_id)
    .then((ingredientList)=>{
        res.json(ingredientList)
    })
    .catch(err=>{
        console.log(err);
        res.status(422).json({errorMessage: err});
        // Look in book to find out more about error handling
    });
});

router.post("/", (req, res)=> {
    // "Validation Could be done on the fron-end or the back-end"
    /** @todo: research best spot for this */
    let list = req.body;
    inventoryDb.createList(list)
    .then((listDoc)=>{
        res.json(listDoc)
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })


})

module.exports = router;