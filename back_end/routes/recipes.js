let express = require("express");
let router = express.Router();
let inventoryDb = require("../db_interaction/ingredient.js");
let recipeDb = require("../db_interaction/recipe.js");

let pricePortion = require("../helper/price_drink.js");

function newId() {
    return Math.floor(Math.random()*100000).toString();
}



router.get("/:recipe_id", function(req,res){
    recipeDb.fetchRecipe(req.params.recipe_id)
    .then((recipeDoc)=>{
        res.json(recipeDoc);
    })
    // .catch((err)=>{
    //     res.json(err);
    // })
})

router.get("/menu/:menu_id", function(req,res){
    recipeDb.fetchMenu(req.params.menu_id)
    .then((menuDoc)=>{
        res.json(menuDoc);
    })
    // .catch((err)=>{
    //     res.json(err);
    // })
})

router.post("/", function(req,res){
    let recipe=req.body;
    let ingredients = recipe.ingredients;

    let ingredientCreationPromises = [];
    ingredients.forEach((ingredient)=>{
        
        ingredientCreationPromises.push(inventoryDb.createIngredient(ingredient)
            .then((ingredientDoc)=>{
                // theoretically points to the same ingredient contained in recipe
                ingredient._id = ingredientDoc._id;
            })
            .catch((err)=>{console.log(err)}));
    })
    Promise.all(ingredientCreationPromises)
    .then((promiseAnswer)=>{

        // Change Ingredient to contain only Id
        recipe.ingredients = recipe.ingredients.map((ingredient)=>({
            quantity:ingredient.quantity,
            unitOfMeasure:ingredient.unitOfMeasure,
            ingredient:ingredient.ingredient._id
        }))
        // Price drink here
        // Calculate ABV
        // Fill recip with pertinent information
        return recipeDb.createRecipe(recipe);
    })
    .then((recipeDoc)=>{
        res.json(recipeDoc._id);
    })
    .catch((err)=>{
        res.json(err);
    })    // ...
})



module.exports = router;