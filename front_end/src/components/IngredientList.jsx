import React, {Component} from "react";

let IngredientRow = (props)=>{
    return (
        <tr>
            <td>{props.ingredient.name}</td>
            <td>{props.ingredient.type}</td>
            <td>{props.ingredient.abv}</td>
            <td>{props.ingredient.quantity}</td>
        </tr>
    )
}

export default class IngredientList extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [
                {
                    name: "Test Ingredient",
                    type: "Vodka",
                    abv : "40%",
                    quantity: 5,
                    _id: "f9faljf9f"
                }
            ]
        };
    }


    render() {
        let ingredientRows = this.state.ingredients.map((ingredient)=>
            (<IngredientRow key={ingredient._id} ingredient={ingredient}/>)
        );

        return(
        <div>
            <h1> Ingredient List</h1>
            <table>
                <thead>
                    <tr>
                        <td>Ingredient Name</td>
                        <td>Alcohol Type</td>
                        <td>ABV</td>
                        <td>Quantity</td>
                    </tr>
                </thead>
                <tbody>
                    {ingredientRows}
                </tbody>
            </table>
        </div>
        );
    }
}