import React from "react";

export default function RecipeInstructions(props) {
    console.log("time for recipe instructions to get rendered")
    console.log(props);
    return(
    <div>
        <ol>
            {
                props.instructionList.map((instruction)=>(
                    <li key={Math.floor(Math.random()*10000).toString()}>{instruction}</li>
                ))
            }
        </ol>
    </div>);
}