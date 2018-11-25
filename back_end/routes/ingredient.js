var express = require("express");
var router = express.Router();

var inventoryDb = require("../db_interaction/inventory.js");


//  This needs to be redone, since the React App will get responses when is sends a post request
// The response will include the ingredient _id, which will be used to organise the ingredients
// in the table.
// This way when a get is being made, we send the ingredient Id to the Db to increase efficiency


/**
 * @event: A GET request to handle the page init (needs to send back all of the group names)
 * @event: A GET request that receives a table name and returns a list of ingredients
 * @event: a POST request that creates a new object (need  database for this)
 * @event: a POST request to create a new empty catategory
 * @todo: a PUT request that modifies an ingredient
 * @todo: a PUT request for a table
 * @todo: a DELETE request for an ingredient
 * @todo: a DELETE request for a table
 * 
 * All ingredients should be in the main page
 * Have an ingredient selection option (with search filtering capacities) so the user can create
 * an object that already exists
 * Have a way to send this information to db
 */

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





module.exports = router;