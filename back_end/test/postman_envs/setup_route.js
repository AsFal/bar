/**
 * @file
 * @author Alexandre Falardeau
 */

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/bar_app", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
    console.log("The mongo connection is live.");
});

// Replace these by seeding functions found in dist
let inventoryDb = require("../../dist/mongo/interaction/inventory");
let recipeDb = require("../../dist/mongo/interaction/recipe");

app.get("/test_setup", (req,res)=>{
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

app.listen(4000,() => {
    console.log("Postman setup route is live.")
});
