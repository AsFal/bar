import React from "react";

import "../styles/IngredientList.css"

function IngredientAdd(props) {
    return(
        <div>
            <form name="ingredientAdd" onSubmit={props.handleIngredientAdd}> 
                <div>
                    <button type="submit"></button>
                    <input type="text" name="name" placeholder="Ingredient Name"/></div>
                <div><input type="text" name="type" placeholder="Alcohol Type"/></div>
                <div><input type="text" name="abv" placeholder="Abv"/></div>
                <div><input type="text" name="quantity" placeholder="Remaining Quantity"/></div>
            </form>
        </div>
    )
}
