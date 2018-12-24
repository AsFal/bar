import { model, Model, Schema, Document } from "mongoose";
import { IUser } from "../../interfaces/IUser";

interface IUserModel extends Document, IUser {}

const userSchema = new Schema({
    identifier: String,
    menus : [{
        type: Schema.Types.ObjectId,
        ref: "Menu"
    }],
    mainMenu : {
        type: Schema.Types.ObjectId,
        ref: "Menu"
    },
    ingredientLists : [{
        type : Schema.Types.ObjectId,
        ref: "IngredientList"
    }],
    mainIngredientList : {
        type: Schema.Types.ObjectId,
        ref: "IngredientList"
    }
});

let User: Model<IUserModel>;
try {
    User = model("User");
} catch (err) {
    User = model("User", userSchema);
}
export {User};