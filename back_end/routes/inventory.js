var express = require("express");
var router = express.Router();
var Table = require("../models/table.js");
var Ingredient = require("../models/ingredient.js");


/** Here all of the mongoose fetches are completed with findOne and names instead 
 * of Id because newly generated items will not have access to their ids as the express
 * will not respond to post/put requests
 */

//  This needs to be redone, since the React App will get responses when is sends a post request
// The response will include the ingredient _id, which will be used to organise the ingredients
// in the table.
// This way when a get is being made, we send the ingredient Id to the Db to increase efficiency


/** GET request to generate the page the first time */
router.get("/", (req, res)=> {
    "use strict";

    /**Information that needs to be sent back:
     * All of the ingredients in the database for the given user (main page) 
     * The name of all of the users categories (for now all of the categories in the db)
     */

     let resObject = {};

     fetchCategoryNames()
     .then((tableNames)=>{
         resObject.tableNames=tableNames;
         return fetchAllIngredients();
     })
     .then((ingredientList)=> {
         resObject.ingredientList=ingredientList;
         res.json(resObject);
     })
     .catch((err)=>{
        console.log("==============================")
        console.log("Generate first table GET error:")
        console.log("==============================")
        console.log(err);
     })

})

/** GET request to change the ingredient category */
router.get("/changeTable", (req, res)=>{
    fetchIngredientList(req.body.tableName)
    .then((ingredientList)=>{
        res.json(ingredientList);
    })
});

/** POST request for creating a new ingredient */
router.post("/ingredient", (req,res)=> {
    "use strict";
    addIngredientToDb(req,body.ingredient)
    .catch(err=>{
        console.log(err);
    });

});


/** POST request to create a new Table */

router.post("/table", (req,res)=>{
    "use strict";
    let table = req.body.table;
    Table.create({
        name: table.name, 
    },(err)=>{
        console.log(err);
    });  
})


/** PUT request to add existing ingredient to a catgory list */

router.put("/existingToTable", (req,res)=>{
    
    fetchIngredientId(req.body.ingredient.name)
    .then((ingredientId)=>{
        addIngredientToTable(req.body.table.name, ingredientId)
    })
});

/** PUT request to add new ingredient to a table (while also adding it to the main) */
router.put("/newToTable", (req,res)=>{
    addNewIngredientTodb()
    .then((ingredientId=>{
        addIngredientToTable(req.body.table.name, ingredientId);
    }))
})

/** PUT request to modify an ingredient from anywhere in the app */
router.put("/ingredient", (req,res)=>{
    Ingredient.findOneAndUpdate({name:req.body.oldName}, req.body.ingredient);
})

/** DELETE request to delete an ingredient from a table */

router.delete("/ingredientFromTable", (req,res)=> {
    Table.findOne({name:req.body.table.name}, (err, table)=>{
        removeFromArray(table, req.body.ingredient._id);
        table.save();
    })
})

router.delete("/ingredient", (req,res)=> {
    Ingredient.findOneAndDelete({name:req.body.ingredient.name});
})

router.delete("/table", (req,res)=> {
    Table.findOneAndDelete({name:req.body.table.name});
})


/** Database fetch helper functions */

function fetchCategoryNames()
{
    "use strict";
    return new Promise(function(fulfill, reject){
        Table.find({}, (err, tableList)=> {
            let tableNames = [];
            tableList.forEach((table)=> {
                tableNames.push(table.name);
            });
            fulfill(tableNames);
        })
    })
}



function fetchAllIngredients(){
    "use strict";
    return new Promise(function(fulfill, reject){
        Ingredient.find({}, (err,ingredientList)=>{
            if(err) {
                console.log(err);
            }
            else {
                fulfill(ingredientList);
            }
        });
    });
}



function fetchIngredientList(tableName) 
{
    "use strict";
    return new Promise(function(fulfill, reject){
        Table.findOne({name:tableName}).populate().exec((err, table)=>{
            if(err){
                console.log(err);
            }
            else{
                fulfill(table.ingredients);
            }
        });
    });
}

/** Data insertion helper functions */

function addIngredientToDb(ingredient) {
    "use strict";
    return new Promise(function(fulfill, reject){
        Ingredient.create({
            name : ingredient.name,
            type: ingredient.type,
            abv: ingredient.abv,
            quantity: ingredient.quantity
        }, function(err, ingredient){
            fulfill(ingredient._id);
        })
    })
}

/** Helper function that fetches an ingredient Id from a name */
function fetchIngredientId(name) {
    "use strict";
    return new Promise(function(fulfill, reject) {
        Ingredient.findOne({name:name}, (err, ingredient) => fulfill(ingredient._id));
    });
}

/** Helper function that adds an ingredient to a table */
function addIngredientToTable(tableName, ingredientId) {
    "use strict";
    return new Promise(function(fulfill, reject) {
        Table.findOne({name:tableName}, (err, table)=>{
            table.ingredients.push(ingredientId);
            table.save(function(err){
                fulfill();
            });
        })
    })
}

/** Helper function remove from Array */

module.exports = router;