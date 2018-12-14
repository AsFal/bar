import { model, Model, Schema, Document } from "mongoose";
import { IUser } from "../../interfaces/IUser";

interface IUserModel extends Document, IUser {}

const userSchema = new Schema({
    username: String,
    password: String
});

let User: Model<IUserModel>;
try {
    User = model("User");
} catch (err) {
    User = model("User", userSchema);
}
export {User};