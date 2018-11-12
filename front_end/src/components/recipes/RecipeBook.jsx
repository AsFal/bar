import React, {Component} from "react";
import Recipe from "./Recipe.jsx";

export default class RecipeBook extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Recipe/>
            </div>
        )
    }
}