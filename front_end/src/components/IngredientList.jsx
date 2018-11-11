import React, {Component} from "react";
// import IngredientAdd from "./IngredientAdd.jsx";

import "../styles/IngredientList.css"

let IngredientRow = (props)=>{
    return (
        <div className="ingredient-row">
            <div>{props.ingredient.name}</div>
            <div>{props.ingredient.type}</div>
            <div>{props.ingredient.abv}</div>
            <div>{props.ingredient.quantity}</div>
        </div>
    )
}

function IngredientAdd(props) {
    return(
        <form  name="ingredientAdd" onSubmit={props.handleIngredientAdd}> 
            <div className="ingredient-row ingredient-add">
                <div>
                    <button type="submit"></button>
                    <input type="text" name="name" placeholder="Ingredient Name ..."/></div>
                <div><input type="text" name="type" placeholder="Alcohol Type ..."/></div>
                <div><input type="text" name="abv" placeholder="Abv ..."/></div>
                <div><input type="text" name="quantity" placeholder="Remaining Quantity ..."/></div>
            </div>
        </form>
    )
}

export default class IngredientList extends  Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            listKey: ""
        }
        this.handleIngredientAdd = this.handleIngredientAdd.bind(this);
    }

    componentWillReceiveProps(props) {
        if(props.listKey != this.state.listKey) {
            // Only triggers on prop change
            let listKey = props.listKey;

            console.log(props);
            fetch(`/api/inventory/ingredient_list/${listKey}`, {
                method: 'GET',
            })
            .then(res=>res.json())
            .then(ingredients=>{
                this.setState({
                    ingredients: ingredients,
                    listKey: listKey
                });
            });
        }

    }

    // Could also be achieved witht he PureComponent
    // this decides if the component will rerender or not
    shouldComponentUpdate(nextProps, nextState) {
        // If there is a prop change or a state change, rerender
        // If there is a state change, rerender
        // Prop changes trigger the fetch event
        // This is to handle the async, the actual determinanant
        // If no new props have appeared, there should be no state change
        if (this.state.listKey != nextState.listKey) {
            return true;
        } else {
            return true;
        }
    }


    /** since the fetch depends on info we get from the fetch in inventory mount, we should 
     * fetch at mount, only at new prop arrival
     */
    // componentDidMount() {
    //     console.log("mounting");
    //     console.log(this.props);
    //     //main key
    //     let mainKey = "b75bi345";
    //     // let keyObject = {
    //     //     listKey : mainKey
    //     // };
    //     // let ingredients = this.fetchIngredients(mainKey);
    // }

    render() {

        let ingredientRows = this.state.ingredients.map((ingredient)=>
            (<IngredientRow key={ingredient._id} ingredient={ingredient}/>)
        );

        return(
        <div className="ingredient-list">
            <div className="ingredient-row header">
                <div>Ingredient Name</div>
                <div>Alcohol Type</div>
                <div>ABV</div>
                <div>Quantity</div>
            </div>
            {ingredientRows}
            <IngredientAdd handleIngredientAdd={this.handleIngredientAdd}> </IngredientAdd>
        </div>
        );
    }

    handleIngredientAdd(event) {
        event.preventDefault();

        let form = event.target;
        let ingredient = this.extractIngredientFromForm(form);

        fetch("/api/inventory/ingredient", {
            method: "POST",
            headers : {
                "Content-Type" : "application/json ; charset=utf-8 "
            },
            body: JSON.stringify(ingredient)
        })
        .then(res=>res.json())
        .then((ingredientDoc)=>{
            let oldIngredients = this.state.ingredients;
            let newIngredients = oldIngredients.slice();
            newIngredients.push(ingredientDoc);
            this.setState({
                ingredients: newIngredients
            })
        })
        .catch((err)=>{
            // I need better error handling
            console.log(err)
        })
    }
    
    extractIngredientFromForm(formNode) {
        return {
            name: formNode.name.value,
            type: formNode.type.value,
            abv : formNode.abv.value,
            quantity : formNode.quantity.value
        }
    }

    fetchIngredients(listKey) {
        return 
    }

}

 // // main
        // if (listKey == "b75bi345") {
        //     return  [
        //         {
        //             name: "Test Ingredient",
        //             type: "Vodka",
        //             abv : "40%",
        //             quantity: 5,
        //             _id: "f9faljf9f"
        //         }
        //     ];
        // //second
        // } else if (listKey == "lk3j4h5") {
        //     return  [
        //         {
        //             name: "Not Main",
        //             type: "Gin",
        //             abv : "40%",
        //             quantity: 5,
        //             _id: "33o4ufi398f4"
        //         }
        //     ]
        // //myNeckHurts
        // } else if (listKey == "rl2kj432lkb") {
        //     return [
        //         {
        //             name: "Neck reliever",
        //             type: "Absynthe",
        //             abv : "90%",
        //             quantity: 3,
        //             _id: "f90fdslf09f"
        //         }
        //     ]
        // }