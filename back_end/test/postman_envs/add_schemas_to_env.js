let fs = require("fs");

let testEnv = require("./test_bar.postman_environment.json");

function createEnvAdder(env) {
    envCurrentVariableKeys = testEnv.values.map((value)=>value.key);
    console.log(envCurrentVariableKeys);
    let description = {
        content: "",
        type: "text/plain"
    }

    return function(key, value) {
        /** @type {Value} */
        let variable = {
            key:key,
            value: value,
            description: description,
            enabled: true
        }
        for (const [i, existingKey] of envCurrentVariableKeys.entries()) {
            if(key == existingKey) {
                env.values[i] = variable;
                break;
            } else if (i == envCurrentVariableKeys.length - 1) {
                env.values.push(variable);
            }
        }
    }
}

let addToTestEnv = createEnvAdder(testEnv);

// need to check before adding
// Get all key names and filter based on that 
// Adding template variable to the env
addToTestEnv("templateRecipe", JSON.stringify(require("./templates/recipe.json")))
addToTestEnv("templateIngredientList", JSON.stringify(require("./templates/ingredient_list.json")));
addToTestEnv("templateIngredient", JSON.stringify(require("./templates/ingredient.json")));
addToTestEnv("updateIngredient", JSON.stringify(require("./templates/ingredient_update.json")));
// updateingredientlist needs to bebuilt
// addToTestEnv("updateIngredientList", JSON.string)
// Adding json schemas to the env
addToTestEnv("schemaIngredient", JSON.stringify(require("./schemas/ingredientDoc.json")))
addToTestEnv("schemaIngredientList",  JSON.stringify(require("./schemas/ingredientListDoc.json")))
// testEnv.menuSchema = require("./schemas/menuDoc.json");

let testEnvJson = JSON.stringify(testEnv);

try {
    fs.writeFileSync("./tests/postman_envs/test_bar.postman_environment.json", testEnvJson);
    console.log("sho")
}
catch(error) {
    console.log(error);
}







