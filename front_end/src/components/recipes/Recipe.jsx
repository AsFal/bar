import React, {Component} from "react";
import RecipeIngredients from "./RecipeIngredients.jsx";
import RecipeInstructions from "./RecipeInstructions.jsx";


export default class Recipe extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            This is a recipe
            <RecipeIngredients/>
            <RecipeInstructions/>
        </div>
        );
    }

}