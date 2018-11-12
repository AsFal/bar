let express = require("express");
let router = express.Router();

let pricePortion = require("../helper/price_drink.js");

function newId() {
    return Math.floor(Math.random()*100000).toString();
}



router.get("/:recipe_id", function(req,res){
    fetchRecipe(req.params.recipe_id)
    .then((recipeDoc)=>{
        res.json(recipeDoc);
    })
    // .catch((err)=>{
    //     res.json(err);
    // })
})

router.get("/menu/:menu_id", function(req,res){
    fetchMenu(req.params.menu_id)
    .then((menuDoc)=>{
        res.json(menuDoc);
    })
    // .catch((err)=>{
    //     res.json(err);
    // })
})

router.post("/", function(req,res){
    recipe=req.body;
    // ...
})


function fetchRecipe(recipeId) {
    return new Promise(function(fulfill, reject) {
        
        /**
         * @todo: figure out if its better to have more client side operations and send more data
         * or have more back-end operations
         */
        switch (recipeId) {
            case "rum_smash":
                fulfill(require("../seeds/recipe_rum_smash.json"));
            case "gin_smash":
                fulfill(require("../seeds/recipe_gin_smash.json"));
            case "vodka_smash":
                fulfill(require("../seeds/recipe_vodka_smash.json"));
            default:
                fulfill(require("../seeds/recipe_vodka_smash.json"));
        }
    });
}

function fetchMenu(menuId) {
    return new Promise(function(fulfill, reject) {
        if(menuId == "main") {
            let menu = require("../seeds/menu_main.json");
            fulfill(menu);
        }
    })
}


module.exports = router;