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

router.get("/menu/:menu_id", function(req,res){
    recipeDb.fetchMenu(req.params.menu_id)
    .then((menuDoc)=>{
        res.json(menuDoc);
    })
    // .catch((err)=>{
    //     res.json(err);
    // })
})

// functional
// Receives object of form
// 
router.post("/", function(req,res){
    let recipe=req.body;
    console.log(recipe);
    let ingredients = recipe.ingredients;

    let ingredientCreationPromises = [];
    ingredients.forEach((ingredient)=>{
        if(!ingredient._id) {
            // Make mongodb ingredient function with this in mind
            ingredientCreationPromises.push(inventoryDb.createIngredient(ingredient)
            .then((ingredientDoc)=>{
                // theoretically points to the same ingredient contained in recipe
                ingredient._id = ingredientDoc._id;
            }));
        }
    })
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