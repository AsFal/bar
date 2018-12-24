import { IMenu } from "./IMenu";

export interface IUser {
    identifier: string;
    menus: IMenu| string ;
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
}
