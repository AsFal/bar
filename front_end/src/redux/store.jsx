
import  {combineReducers, createStore, 
    applyMiddleware, compose} from "redux";
import thunk from "redux-thunk"

function apiAccessKeyReducer(state = '', {type, payload}) {
    return state;
}

function userReducer(state = '', {type, payload}) {
    return state;
}

const allReducers = combineReducers({
    // this is the state property that gets modified by the reducer
    // userIngredients: userIngredientsReducer,
    // userMenus: userMenusReducer,
    // userIngredientLists : userIngredientListsReducer,
    user: userReducer,
    apiAccessKey: apiAccessKeyReducer,
});


const allStoreEnhancers = compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension()
)


// Check with formik what needs to be done
/**
 * @module
 * @classdesc store
 * @prop {Array<Ingredient>} userIngredients - required application wide
 * @prop {Array<Menu>} userMenus - required application wide
 * @prop {Array<IngredientList>} userIngredientLists - ingredients are not populated
 * @prop {String} username - Required application wide
 * @prop {String} apiAccessKey - Required application wide
 * @prop {IngredientList} activeIngredientList - ingredients are populated (defaults to main on user load)
 * @prop {Menu} activeMenu - Need a decision on population
 * I would like my form data to stay in the components (research formik vs. redux forms)
 * 
 * 
 * 
 * Two reducers can both read the same action (i think)
 * Therefore, sending an action to add an ingredient to the store ,I could have the mainIngredientList
 * update as well as the activeIngredientList update
 * (As a response of receiving information from the db).
 */
export let store =  createStore(allReducers, {
    user: "",
    apiAccessKey: ""
}, allStoreEnhancers)
// Need the enhancers
// Need the initial state
// store.dispatch(action) - as an fyi