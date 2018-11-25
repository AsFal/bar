let express = require("express");
let router = express.Router();

let inventoryDb = require("../db_interaction/inventory.js");
let recipeDb = require("../db_interaction/recipe.js");


router.get("/:recipe_id", function(req,res){
    recipeDb.fetchRecipe(req.params.recipe_id)
    .then((recipeDoc)=>{
        res.json(recipeDoc);
    })
    // .catch((err)=>{
    //     res.json(err);
    // })
})

router.post("/", function(req,res){
    // Recipe will need to be added to the recipe book
    let recipe=req.body;

    let ingredientCreationPromises = [];
    recipe.ingredients.forEach((ingredient)=>{
        if(ingredient.ingredient.name) {
            // Make mongodb ingredient function with this in mind
            ingredientCreationPromises.push(inventoryDb.createIngredient(ingredient.ingredient)
            .then((ingredientDoc)=>{
                // theoretically points to the same ingredient contained in recipe
                ingredient.ingredient = ingredientDoc._id;
            }));
        }
    })
    console.log(ingredientCreationPromises);
    // This calls for a small refactor: we should avoid modifying state and instead 
    // use the promiseAnswer method to fill in
    Promise.all(ingredientCreationPromises)
    .then((promiseAnswer)=>{

        // Change Ingredient to contain only Id
        recipe.ingredients = recipe.ingredients.map((ingredient)=>({
            quantity:ingredient.quantity,
            unitOfMeasure:ingredient.unitOfMeasure,
            ingredient:ingredient._id
        }))
        // Price drink here
        // Calculate ABV
        // Fill recip with pertinent information
        console.log("=======================");
        console.log(recipe)
        return recipeDb.createRecipe(recipe);
    })
    .then((recipeDoc)=>{
        res.json(recipeDoc);
    })
    .catch((err)=>{
        res.json(err);
    })    // ...
})



module.exports = router;