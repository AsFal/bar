import { User, IUserModel } from "../models/User";
import { IUser } from "../../interfaces/IUser";
import { Menu } from "../models/Menu";
import { IngredientList } from "../models/IngredientList";
import { IUserInfo } from "../../interfaces/IUserInfo";
import { clearMainMenu } from "./menu";
import { clearMainIngredientList, deleteIngredientList } from "./ingredientList";


export async function createUser(userObject: IUserInfo): Promise<IUserModel> {

    const mainMenu = await Menu.create({
            name: "Main",
            season: "Main",
            theme: "Main",
            recipes: [],
            ingredients: []
    });
    const mainIngredientList = await IngredientList.create({
        name: "Main",
        theme: "Main",
        ingredients: []
    });
    const userObjectFull: IUser = {
            ...userObject,
            mainIngredientList: mainIngredientList._id,
            mainMenu: mainMenu._id,
            ingredientLists: [],
            menus: []
    };
    return User.create(userObjectFull);
}

export async function clearUser(userIdentifier: string): Promise<IUserModel> {
    const user = await User.findOneAndUpdate({identifier: userIdentifier},
        {
            ingredientLists: [],
            menus: []
        }).exec();

    await Promise.all([
        clearMainMenu(<string>user.mainMenu),
        clearMainIngredientList(<string>user.mainIngredientList)]
    );


    return user;

}


export async function removeIngredientFromMain(db: IDatabase, userIdentifier: string, ingredientId: string): Promise<IIngredientModel> {
    // here the ingredient lists are populate
    // get all the list ids from the user, and then remove it from the list
    // also need to remove from main
    // na that would stop the flow, can't stop the flow
    // user function
    // the lists then need to be updated
    const allIngredientLists = await fetchLists(userIdentifier);
    // /**
    //  * @todo: this code is not pretty, fix it
    //  */
    console.log(allIngredientLists);
    allIngredientLists.forEach(async (list) => {
        list.ingredients.forEach(async (listIngredientId) => {
            if (ingredientId == listIngredientId.toString())
                await removeIngredientFromList(list._id, ingredientId);
        });
    });
    return deleteIngredient(ingredientId);
}


export async function clearMainIngredientList(listId: string): Promise<IIngredientListModel> {
    const mainIngredientList = await IngredientList.findById(listId);
    await Promise.all(mainIngredientList.ingredients.map((ingredientId) =>
        deleteIngredient(<string>ingredientId)));
    return clearIngredientList(listId);
}

async deleteIngredientList(userId: string, ingredientListId: string):
            Promise<IIngredientList> {
                try {
                    await removeDocumentFromContainer(User, userId, "ingredientLists", ingredientListId);
                    return db.ingredientList.destroy(ingredientListId);
                } catch (err) {
                    throw err;
                }
            },

            async addToMain(accountId: string, ingredientId: string):
            Promise<IIngredientList> {

                const mainIngredientList =  await db.user.fetchMainIngredientList(accountId);
                // need to change something to change here, _id is a property
                // unless i expose
                return addDocumentToContainer(db.ingredientList, mainIngredientList._id,
                    "ingredients", ingredientId);
            },


            async removeFromMain(listId: string, ingredientId: string):
            Promise<IIngredientList> {
                return removeDocumentFromContainer(db.ingredientList, listId, "ingredients", ingredientId);
            },

            async create(userId: string, list: IIngredientList): Promise<IIngredientList> {
                // problem here, user will not fetch the same way (actually there is now no reason the
                // user should fetch in a different way, even there are reasons against it)
                const ingredientListDoc = await IngredientList.create(list);
                await addDocumentToContainer(db.user, userId, "ingredientLists", ingredientListDoc._id);
                return ingredientListDoc;
            },


export async function fetchMenus(userIdentifier: string): Promise<IMenuModel[]> {
    const user = await User.findOne({identifier: userIdentifier})
    .populate("menus").populate("mainMenu").exec();
    return [<IMenuModel>user.mainMenu].concat(<IMenuModel[]>user.menus);
}

export async function fetchMainMenu(userIdentifier: string): Promise<IMenuModel> {
    const user = await User.findOne({identifier: userIdentifier}).populate("mainMenu").exec();
    return <IMenuModel>user.mainMenu;
}

export async function addRecipeToMain(userIdentifier: string, recipeId: string):
Promise<IMenuModel> {
    const mainMenu = await fetchMainMenu(userIdentifier);
    return addDocumentToContainer(Menu, mainMenu._id, "recipes", recipeId);
}

export async function createMenu(userIdentifier: string, menu: IMenu): Promise<IMenuModel> {
    const newMenu = await Menu.create(menu);
    const user = await User.findOne({identifier: userIdentifier}).exec();
    await addDocumentToContainer(User, user._id, "menus", newMenu._id);
    return newMenu;
}


export async function removeMenufromUser(userIdentifier: string, menuId: string):
Promise<IMenuModel> {
    const user = await User.findOne({identifier: userIdentifier}).exec();
    await removeDocumentFromContainer(User, user._id, "menus", menuId);
    return deleteMenu(menuId);
}

export async function clearMainMenu(menuId: string): Promise<IMenuModel> {
    const mainMenu = await Menu.findById(menuId);
    await Promise.all(mainMenu.recipes.map((recipeId) => deleteRecipe(<string>recipeId)));
    return clearMenu(menuId);
}