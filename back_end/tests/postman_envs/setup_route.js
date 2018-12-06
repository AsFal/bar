
/**
 * @file
 * @author Alexandre Falardeau
 * 
 * @typedef {import("../../models/IngredientList").TableDoc} TableDoc
 */
let express = require("express");
let router = express.Router();


let inventoryDb = require("../../db_interaction/inventory");
let recipeDb = require("../../db_interaction/recipe");

router.get("/test_setup", (req,res)=>{
    // I want to be sending a
    // Sample Recipe With only ingredients
    // Sample Recipe Mixed
    // Sample Recipe Only Ids
    let testObject = {};
    inventoryDb.fetchLists()
    .then((IngredientListDocs)=>{
        let sampleListId =  IngredientListDocs[0]._id;
        testObject.sampleListId = sampleListId;
        let ingredientListUpdate = require("./templates/ingredient_list_update.json");
        ingredientListUpdate.ingredients[0]._id = IngredientListDocs[0].ingredients[0]._id;
        testObject.updateIngredientList = JSON.stringify(ingredientListUpdate);
        return inventoryDb.fetchIngredientList(sampleListId);
    })
    .then((IngredientDocs)=>{
        var templateRecipe = require("./templates/recipe.json");
        recipeIngredients = IngredientDocs.map((IngredientDoc)=>({
            quantity : Math.floor(Math.random()*30),
            unitOfMeasure: "mL",
            ingredient: IngredientDoc._id
        }));
        

        templateRecipe.ingredients = recipeIngredients;
        testObject.sampleRecipeWithIds = JSON.stringify(templateRecipe);

        var templateIngredient = require("./templates/ingredient.json");
        templateRecipe.ingredients.push({
            quantity : Math.floor(Math.random()*30),
            unitOfMeasure: "mL",
            ingredient: templateIngredient});
        testObject.sampleRecipeMixed = JSON.stringify(templateRecipe);

        return recipeDb.fetchMenus();

    })
    .then((menuDocs)=>{
        let sampleMenu = menuDocs[0];
        testObject.sampleMenuId = sampleMenu._id;
        testObject.sampleRecipeId =  sampleMenu.drinks[0];
        res.json(testObject);
    })
    .catch((err)=>{
        res.json(err);
        console.log(err);
    })

});

module.exports = router;