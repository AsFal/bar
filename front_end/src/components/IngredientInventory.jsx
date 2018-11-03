import React, {Component} from "react";
import IngredientList from "./IngredientList.jsx";

// Nothing in this page is functional as of yet
function IngredientListToggleButton(props) {

    return(
        <div onClick={props.changeList}>
            {props.name}
        </div>
    )
}

function IngredientListNameAdd(props) {
    return(
        <div>
            <form onSubmit={props.handleNewList}>
                <input type="text" name="name"/>
                <button type="submit"></button>
            </form>
        </div>
    )
}

// Does not yet create the actual view
function IngredientListNames(props) {

    let ingredientListToggleButtons = props.lists.map((list)=> {
        // We wrap the changeList with the key
        let key = list._id;
        let name = list.name;
        /**@todo: propage the key is id change to the INgredients list */
        let wrappedChangeList = ()=>{props.changeList(key)};
        return <IngredientListToggleButton key={key} name={name} changeList={wrappedChangeList} />
    })
    return(
        <div>
            {ingredientListToggleButtons}
            <IngredientListNameAdd handleNewList = {props.handleNewList}/>
        </div>
    )
}


// I see two strategies here to change the view
// Either
    //Everytime the view is switched, the current view is unmounted 
    //(unless no view is currently there)
    // and then a new IngredientList view is mounted (during which)
    // the program will fetch the data from the database
    // This is more computation heavy, but has the advantage of reducing the 
    // memory necesseties of the program. 


    // The way I will toggle the Ingredient Views will be like thus
    // The IngredientInventory will give a name prop to the Ingredient
    // list, which it will use to fetch the appropriate data from the 
    // db when it mounts on the Dom
export default class IngredientIventory extends Component {
    constructor(props) {
        super(props)

        this.changeList = this.changeList.bind(this);
        this.handleNewList = this.handleNewList.bind(this);

        this.state = {
            /** @todo: this needs to be prapagated (key is now _id) */
            displayedListKey: "",
            lists: []
        }
    }
    /**
     * @todo: repair the following bug
     * Bug Id, repair
     * When the page gets loaded for the first time, the listName displaylist Key has 
     * a value of main, which the Ignredient List recognizes.
     * When the page gets loaded for the second time, the displayListKey becomes some random
     * Ingredient key does not recognize, thus no ingredient information is being sent to the 
     * component, which causes an error to be thrown.
     * The placeholder key
     * 
     * To do the test, I need
     * the ids from the lists in the db, to replace those ones witht the ones in Ingredient List
     * there for testing and to change the function that changes displaedListKey to load the key 
     * into the diusplayedListKey instead of the name
     * 
     * The list keys are as follow
     * "main" : b75bi345
     * "second": lk3j4h5
     * "myNeckHurts" : rl2kj432lkb
     * 
     *  */
    
    componentDidMount() {

        fetch("/api/inventory")
        .then(res=>res.json())
        .then((json)=>{
            //need a for loop that breaks to find the main key
            // Put main key here, else the view change will not work
            
            this.setState({
                displayedListKey: "b75bi345",
                lists : json
            });
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    render() {
        console.log("inventory render");
        return(
        <div>
            <IngredientListNames lists={this.state.lists} 
            handleNewList={this.handleNewList} changeList={this.changeList}/>
            <IngredientList listKey={this.state.displayedListKey} />
        </div>)
        }

    changeList(newKey) {
       //For every Group tag element, the function is wrapped witht the group key
       this.setState({
            displayedListKey: newKey
        })
    }

    handleNewList(event) {

        event.preventDefault();

        let form = event.target;
        let newName = form.name.value;
        fetch("/api/inventory/list", {
            method: "POST",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({name:newName})
        })
        .then((res)=>res.json())
        .then((listDoc)=>{
            let oldLists = this.state.lists;
            let newLists = oldLists.slice();
            newLists.push(listDoc);
            this.setState(
                {
                    lists: newLists
                }
            )
        })
        .catch((err)=>{
            // I need better erro handling
            console.log(err);
        })
    }
}