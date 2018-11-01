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

    

    let ingredientListToggleButtons = props.listNames.map((name)=> {
        // We wrap the changeList with the key
        let key = name;
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
            displayedListKey: "main",
            listNames: ["main", "second"]
        }
    }

    render() {
        console.log("being rerendered")
        return(
        <div>
            <IngredientListNames listNames={this.state.listNames} 
            handleNewList={this.handleNewList} changeList={this.changeList}/>
            <IngredientList name={this.state.displayedListKey} />
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
        // Do thing with dataBase
        let oldListNames = this.state.listNames;
        let newListNames = oldListNames.slice();
        newListNames.push(newName);

        // I just want it to rerender the group tags
        // Don't know how yet
        //(if entire thing is rerendered, INgredient list gets remounted, fetch gets sent, blah blah)

        // This will eventually make a request to the db
        this.setState( {
            listNames : newListNames
        });
    }


}