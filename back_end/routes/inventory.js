var express = require("express");
var router = express.Router();
var Table = require("../models/table.js");
var Ingredient = require("../models/ingredient.js");

//  This needs to be redone, since the React App will get responses when is sends a post request
// The response will include the ingredient _id, which will be used to organise the ingredients
// in the table.
// This way when a get is being made, we send the ingredient Id to the Db to increase efficiency


/**
 * 
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

function newId() {
    return Math.floor(Math.random()*100000).toString();
}

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
        res.status(422).json({errorMessage: err});
        // Look in book to find out more about error handling
    });
});

router.post("/ingredient", (req, res)=>{
    let ingredient = req.body;
    createIngredient(ingredient)
    .then((ingredientDoc)=>{
        console.log(ingredientDoc)
        res.json(ingredientDoc);
    })
    .catch((err)=>{
        console.log(err);
        res.status(422).json({errorMessage: err});
    })
})

router.post("/list", (req, res)=> {
    // "Validation Could be done on the fron-end or the back-end"
    /** @todo: research best spot for this */
    let list = req.body;
    createList(list)
    .then((listDoc)=>{
        res.json(listDoc)
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })


})

/** @todo: INject Mongoose here */
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

/** @todo: INject Mongoose here */
function fetchIngredientList(groupName) {
    let ingredients = chooseIngredientTest(groupName);
    return new Promise(function(fulfill, reject) {
        fulfill(ingredients);
    })
}

function chooseIngredientTest(groupName) {
    switch (groupName) {
        case "b75bi345":
            return require("../seeds/ingredients_rum.json")
        case "lk3j4h5":
            return require("../seeds/ingredients_gin.json")
        case "rl2kj432lkb" :
            return require("../seeds/ingredients_vodka.json")
        default:
            break;
    }
}

/** @todo: Mongoose here */
function createList(list) {
    return new Promise(function(fulfill, reject) {
        list._id = newId();
        fulfill(list);
    });
}

/** @todo: Mongoose here */
function createIngredient(ingredient) {
    return new Promise(function(fulfill, reject) {
        let ingredientDoc = ingredient;
        ingredientDoc._id = newId();
        fulfill(ingredientDoc);
    })
}

function addIngredientTo(tableId) {

}

function addIngredientToMain() {

}

module.exports = router;