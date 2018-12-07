let recipesDb = require("../../db_interaction/recipe");

function seedRecipes(recipeListJson) {
    return Promise.all(recipeListJson.map((recipe)=>{
        // Should modify the createRecipe so it can create recipes of multiple Formats
        recipe.ingredients = [];
        return recipesDb.createRecipe(recipe);
    }));
}


function seedMenu(menuJson, recipesListJson) {
    return recipesDb.createMenu(menuJson)
    .then((menuDoc)=>{
        return seedRecipes(recipesListJson)
        .then((recipeDocs)=>{
            let recipeIds = recipeDocs.map((recipe)=>recipe._id);
            let oldRecipeIds = menuDoc.drinks;
            let newRecipeIds = oldRecipeIds.slice();
            newRecipeIds = newRecipeIds.concat(recipeIds);
            return recipesDb.updateMenu(menuDoc._id, {
                drinks: newRecipeIds
            })
        })
    })
}

module.exports = seedMenu;