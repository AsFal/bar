import { Ingredient } from "../models/Ingredient";
import { IngredientList } from "../models/IngredientList";
import  { Menu } from "../models/Menu";
import { Recipe } from "../models/Recipe";
import { createUser, clearUser } from "../interaction/user";
import { User } from "../models/User";

export default function cleanDb() {
    // This was working before, this is retarded
    return Promise.all([Ingredient.deleteMany({}).exec(),
        IngredientList.deleteMany({}).exec(),
        Menu.deleteMany({}).exec(),
        Recipe.deleteMany({}).exec(),
        User.deleteMany({}).exec()
        ]);
}

export function testUser() {
    return createUser({
        identifier: "testAccount"
    });
}


