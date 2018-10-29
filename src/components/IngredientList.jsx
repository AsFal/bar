import React, {Component} from "react";

let IngredientRow = (props)=>{
    return (
        <tr>
            <td>{props.ingredient.name}</td>
            <td>{props.ingredient.type}</td>
            <td>{props.ingredient.type}</td>
            <td>{props.ingredient.type}</td>
        </tr>
    )
}

export default class IngredientList extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {}
        }
    }
    
    render() {

    }
}