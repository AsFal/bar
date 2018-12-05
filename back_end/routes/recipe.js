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
    let existingIngredientIds = [];
    recipe.ingredients.forEach((ingredient)=>{
        // If they sent ingredient information, then there will be a  name
        if(ingredient.ingredient.name) {
            // Make mongodb ingredient function with this in mind
            ingredientCreationPromises.push(inventoryDb.createIngredient(ingredient.ingredient))
        } else {
            // If there is no information, then the ingredient information contained is an Id
            existingIngredientIds.push(ingredient.ingredient)
        }
    })
    // This calls for a small refactor: we should avoid modifying state and instead 
    // use the promiseAnswer method to fill in
    Promise.all(ingredientCreationPromises)
    .then((newIngredientDocs)=>{
        const newIngredientIds = newIngredientDocs.map((newIngredientDoc)=>newIngredientDoc._id)
        const recipeIngredientIds = newIngredientIds.concat(existingIngredientIds)

        // Change Ingredient to contain only Id
        // Mapping over two things at once (good ol for loop maybe, or gotta keep it constant)
        const recipeIngredient = recipeIngredientIds.map((ingredient)=>({
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
        res.json(recipeDoc);
    })
    .catch((err)=>{
        res.status(422).json(err);
    })
})


router.put("/:recipe_id", async (req,res)=>{
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
    Promise.all(ingredientCreationPromises)
    .then(res=>recipeDb.updateRecipe(req.params.recipe_id, req.body))
    .then((recipe)=>{
        res.json(recipe);
    })
    .catch((err)=>{
        res.status(422).json(err);
    })
})

router.delete("/:recipe_id", (req,res)=>{

})


module.exports = router;