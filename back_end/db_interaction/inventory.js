function newId() {
    return Math.floor(Math.random()*100000).toString();
}

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

module.exports = {
    fetchLists : fetchLists,
    fetchIngredientList: fetchIngredientList,
    createIngredient: createIngredient,
    createList:createList
}