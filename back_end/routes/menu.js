let express = require("express");
let router = express.Router();

let recipeDb = require("../db_interaction/recipe.js");


router.get("/:menu_id", function(req,res){
    recipeDb.fetchMenu(req.params.menu_id)
    .then((menuDoc)=>{
        res.json(menuDoc);
    })
    // .catch((err)=>{
    //     res.json(err);
    // })
})

router.post("/", function(req,res){
    recipeDb.createMenu(req.body)
    .then((menuDoc)=>{
        res.json(menuDoc);
    })
    .catch((err)=>{
        res.json(err);
    })
})

module.exports = router;