import React, {Component} from "react";
import IngredientAdd from "./IngredientAdd.jsx";

let IngredientRow = (props)=>{
    return (
        <li>
            <div>{props.ingredient.name}</div>
            <div>{props.ingredient.type}</div>
            <div>{props.ingredient.abv}</div>
            <div>{props.ingredient.quantity}</div>
        </li>
    )
}

export default class IngredientList extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: []
        }
        this.handleIngredientAdd = this.handleIngredientAdd.bind(this);
    }
    
    componentWillMount() {
        let ingredients = this.fetchIngredients("main");
        this.setState({
            ingredients: ingredients
        })
    }

    componentWillReceiveProps(props) {
        // Only triggers on prop change
        console.log(props.name);
        let groupName = props.name;
        let ingredients = this.fetchIngredients(groupName);
        this.setState({
            ingredients: ingredients
        })
    }

    render() {

        let ingredientRows = this.state.ingredients.map((ingredient)=>
            (<IngredientRow key={ingredient._id} ingredient={ingredient}/>)
        );

        return(
        <div>
            <h1> Ingredient List</h1>
            <ul>
                <li>
                    <div>Ingredient Name</div>
                    <div>Alcohol Type</div>
                    <div>ABV</div>
                    <div>Quantity</div>
                </li>
                {ingredientRows}
                <IngredientAdd handleIngredientAdd={this.handleIngredientAdd}> </IngredientAdd>
            </ul>
        </div>
        );
    }

    handleIngredientAdd(event) {
        event.preventDefault();
        let form = event.target;

        // In the real application, thi the Id will be given when the app receives the response from 
        // The db, here we will just generate an Id
        let ingredient = this.extractIngredientFromForm(form);
        ingredient._id = Math.floor(Math.random()*10000).toString();
        // For free redux
        let oldIngredients = this.state.ingredients;
        // Returns a shallow copy of the array
        let newIngredients = oldIngredients.slice();
        newIngredients.push(ingredient);
        
        this.setState({
            ingredients : newIngredients
        });
        
    }
    
    extractIngredientFromForm(formNode) {
        return {
            name: formNode.name.value,
            type: formNode.type.value,
            abv : formNode.abv.value,
            quantity : formNode.quantity.value
        }
    }

    fetchIngredients(groupName) {
        if (groupName == "main") {
            return  [
                {
                    name: "Test Ingredient",
                    type: "Vodka",
                    abv : "40%",
                    quantity: 5,
                    _id: "f9faljf9f"
                }
            ];
        } else if (groupName == "second") {
            return  [
                {
                    name: "Not Main",
                    type: "Gin",
                    abv : "40%",
                    quantity: 5,
                    _id: "33o4ufi398f4"
                }
            ]
        }
    }
}