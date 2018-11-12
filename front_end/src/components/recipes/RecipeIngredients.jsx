import React from "react";

export default function RecipeIngredients(props) {
    return(
    <div>
        <ul>
            {props.ingredientList.map((ingredient)=> (
                <li key={ingredient._id}>
                    <div>{ingredient.name}</div>    
                    <div>{ingredient.quantity}</div>    
                    <div>{ingredient.unitOfMeasure}</div>       
                </li>
            ))}
        </ul>
    </div>);
}