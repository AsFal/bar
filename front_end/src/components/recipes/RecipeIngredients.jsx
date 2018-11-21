import React from "react";

import "../../styles/Recipe.css";

export default function RecipeIngredients(props) {
    return(
    <div className="recipe-ingredients">
        <div className="recipe-sub-title">
            Ingredients
        </div>
        <ul>
            {props.ingredientList.map((ingredient)=> (
                <li className="recipe-ingredient" key={ingredient._id}>
                    <span>{ingredient.name}</span>    
                    <span>{ingredient.quantity}</span>    
                    <span>{ingredient.unitOfMeasure}</span>       
                </li>
            ))}
        </ul>
    </div>);
}