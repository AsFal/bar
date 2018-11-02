var express = require("express");
var router = express.Router();
var Table = require("../models/table.js");
var Ingredient = require("../models/ingredient.js");

//  This needs to be redone, since the React App will get responses when is sends a post request
// The response will include the ingredient _id, which will be used to organise the ingredients
// in the table.
// This way when a get is being made, we send the ingredient Id to the Db to increase efficiency


/**
 * @todo: A GET request to handle the page init (needs to send back all of the group names)
 * @todo: A GET request that receives a table name and returns a list of ingredients
 * @todo: a POST request that creates a new object (need  database for this)
 * @todo: a POST request to create a new empty catategory
 * 
 * All ingredients should be in the main page
 * Have an ingredient selection option (with search filtering capacities) so the user can create
 * an object that already exists
 * Have a way to send this information to db
 */

/** GET request to generate the page the first time */
router.get("/", (req, res)=> {
    // Will require some kind of parser to convert json body to object
    fetchLists()
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

router.get("/ingredient_list/:list_key", (req,res) =>{

    fetchIngredientList(req.params.list_key)
    .then((ingredientList)=>{
        res.json(ingredientList)
    })
    .catch(err=>{
        console.log(err);
        send(err);
        // Look in book to find out more about error handling
    });
});


function fetchLists() {
    let lists = [
        {
            name: "main",
            _id: "b75bi345"
        }, 
        {
            name: "second",
            _id : "lk3j4h5"
        },
        {
            name: "myNeckHurts",
            _id : "rl2kj432lkb"
        }
    ];
    return new Promise(function(fulfill, reject) {
        fulfill(lists)
    });
}

function fetchIngredientList(groupName) {
    let ingredients = chooseIngredientTest(groupName);
    return new Promise(function(fulfill, reject) {
        fulfill(ingredients);
    })
}

function chooseIngredientTest(groupName) {
    switch (groupName) {
        case "b75bi345":
            return [
                {
                    name: "Malibu Coconut",
                    type: "Rum",
                    abv : 21,
                    quantity: 750,
                    _id: "1klj13"
                },
                {
                    name: "Jamaican Strong",
                    type: "Rum",
                    abv : 40,
                    quantity: 750,
                    _id: "2gkvsdj1"
                },
                {
                    name: "Kraken",
                    type: "Rum",
                    abv : 48,
                    quantity: 750,
                    _id: "23lfj2"
                }
            ]
        case "lk3j4h5":
            return [
                {
                    name: "Russian Delight",
                    type: "Vodka",
                    abv : 21,
                    quantity: 750,
                    _id: "f2lb2gg4"
                },
                {
                    name: "Jamaican Strong",
                    type: "Rum",
                    abv : 40,
                    quantity: 750,
                    _id: "asdlkjh4"
                },
                {
                    name: "Kraken",
                    type: "Rum",
                    abv : 48,
                    quantity: 750,
                    _id: "234l2t"
                }
            ]
        case "rl2kj432lkb" :
            return [
                {
                    name: "Something completely different",
                    type: "yomama",
                    abv : 21,
                    quantity: 750,
                    _id: "kj32h"
                },
                {
                    name: "Jamaican Strong",
                    type: "Rum",
                    abv : 40,
                    quantity: 750,
                    _id: "kjasdfasgash"
                },
                {
                    name: "Kraken",
                    type: "Rum",
                    abv : 48,
                    quantity: 750,
                    _id: "23lrh32"
                }
            ]
        default:
            break;
    }
}

// router.get("/", (req, res)=> {
//     "use strict";

//     /**Information that needs to be sent back:
//      * All of the ingredients in the database for the given user (main page) 
//      * The name of all of the users categories (for now all of the categories in the db)
//      */

//      let resObject = {};
//      fetchCategoryNames()
//      .then((tableNames)=>{
//          resObject.tableNames=tableNames;
//          return fetchAllIngredients();
//      })
//      .then((ingredientList)=> {
//          resObject.ingredientList=ingredientList;
//          res.json(resObject);
//      })
//      .catch((err)=>{
//         console.log("==============================")
//         console.log("Generate first table GET error:")
//         console.log("==============================")
//         console.log(err);
//      });

// })

// /** GET request to change the ingredient category */
// // router.get("/changeTable", (req, res)=>{
// //     fetchIngredientList(req.body.tableName)
// //     .then((ingredientList)=>{
// //         res.json(ingredientList);
// //     })
// // });

// /** POST request for creating a new ingredient */
// router.post("/ingredient", (req,res)=> {
//     "use strict";
//     addIngredientToDb(req,body.ingredient)
//     .catch(err=>{
//         console.log(err);
//     });

// });


// /** POST request to create a new Table */

// router.post("/table", (req,res)=>{
//     "use strict";
//     let table = req.body.table;
//     Table.create({
//         name: table.name, 
//     },(err)=>{
//         console.log(err);
//     });  
// })


// /** PUT request to add existing ingredient to a catgory list */

// router.put("/existingToTable", (req,res)=>{
    
//     fetchIngredientId(req.body.ingredient.name)
//     .then((ingredientId)=>{
//         addIngredientToTable(req.body.table.name, ingredientId)
//     })
// });

// /** PUT request to add new ingredient to a table (while also adding it to the main) */
// router.put("/newToTable", (req,res)=>{
//     addNewIngredientTodb()
//     .then((ingredientId=>{
//         addIngredientToTable(req.body.table.name, ingredientId);
//     }))
// })

// /** PUT request to modify an ingredient from anywhere in the app */
// router.put("/ingredient", (req,res)=>{
//     Ingredient.findOneAndUpdate({name:req.body.oldName}, req.body.ingredient);
// })

// /** DELETE request to delete an ingredient from a table */

// router.delete("/ingredientFromTable", (req,res)=> {
//     Table.findOne({name:req.body.table.name}, (err, table)=>{
//         removeFromArray(table, req.body.ingredient._id);
//         table.save();
//     })
// })

// router.delete("/ingredient", (req,res)=> {
//     Ingredient.findOneAndDelete({name:req.body.ingredient.name});
// })

// router.delete("/table", (req,res)=> {
//     Table.findOneAndDelete({name:req.body.table.name});
// })


// /** Database fetch helper functions */

// function fetchCategoryNames()
// {
//     "use strict";
//     return new Promise(function(fulfill, reject){
//         Table.find({}, (err, tableList)=> {
//             let tableNames = [];
//             tableList.forEach((table)=> {
//                 tableNames.push(table.name);
//             });
//             fulfill(tableNames);
//         })
//     })
// }



// function fetchAllIngredients(){
//     "use strict";
//     return new Promise(function(fulfill, reject){
//         Ingredient.find({}, (err,ingredientList)=>{
//             if(err) {
//                 console.log(err);
//             }
//             else {
//                 fulfill(ingredientList);
//             }
//         });
//     });
// }



// function fetchIngredientList(tableName) 
// {
//     "use strict";
//     return new Promise(function(fulfill, reject){
//         Table.findOne({name:tableName}).populate().exec((err, table)=>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 fulfill(table.ingredients);
//             }
//         });
//     });
// }

// /** Data insertion helper functions */

// function addIngredientToDb(ingredient) {
//     "use strict";
//     return new Promise(function(fulfill, reject){
//         Ingredient.create({
//             name : ingredient.name,
//             type: ingredient.type,
//             abv: ingredient.abv,
//             quantity: ingredient.quantity
//         }, function(err, ingredient){
//             fulfill(ingredient._id);
//         })
//     })
// }

// /** Helper function that fetches an ingredient Id from a name */
// function fetchIngredientId(name) {
//     "use strict";
//     return new Promise(function(fulfill, reject) {
//         Ingredient.findOne({name:name}, (err, ingredient) => fulfill(ingredient._id));
//     });
// }

// /** Helper function that adds an ingredient to a table */
// function addIngredientToTable(tableName, ingredientId) {
//     "use strict";
//     return new Promise(function(fulfill, reject) {
//         Table.findOne({name:tableName}, (err, table)=>{
//             table.ingredients.push(ingredientId);
//             table.save(function(err){
//                 fulfill();
//             });
//         })
//     })
// }

/** Helper function remove from Array */

module.exports = router;