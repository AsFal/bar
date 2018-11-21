import React from "react";

import "../../styles/Recipe.css";

export default function RecipeInstructions(props) {
    console.log("time for recipe instructions to get rendered")
    console.log(props);
    return(
    <div className="recipe-instrcutions">
        <div className="recipe-sub-title">
            Ingredients
        </div>
        <ol>
            {
                props.instructionList.map((instruction)=>(
                    <li className = "recipe-instruction" 
                    key={Math.floor(Math.random()*10000).toString()}>
                    {instruction}
                    </li>
                ))
            }
        </ol>
    </div>);
}