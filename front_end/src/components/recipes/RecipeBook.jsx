import React, {Component} from "react";
import Recipe from "./Recipe.jsx";

export default class RecipeBook extends Component {
    constructor(props) {
        super(props);
    }

    // The animation that I want
    // I want the Recipe book to load with A title page, giving a brief description of the menu
    //This page is on the right and there is clearly a slot on the left for another page
    // When the user toggles the page to go to the right, The current page on the right goes to 
    // the left and a new page appears

    // Sequence of events when a user goes right
    // -> Check if right page exists, if so, display next page with animation
    // (this step is completed in the recipe book)
    // -> If the page is new, the information for that page is fetched from the database
    // -> New page is rendered underneath current right page
    // -> right page goes to the left
    // 

    // The recipe book keeps track of all the recipes in memory
    // The recipe state has a list of ids for all the recipes in the book
    // The recipe book also has an index to tell at which book were at
    // 
    // This means, positional style gets sent down to recipes as a prop,
    // The recipes need to check if style has changes, if it has, they can
    // get rerendred accordingly (need to find out how to trigger css transitions
    // with js tho)
    // If the css hasn't changed, then I don't need to rerender the page.
    // Dealing with the recipe transtion is a recipe thing, it can be abstracted for now

    // New recipe form is at the end of the recipe booklet, with option to go to the end of the booklet

    render() {
        return (
            <div>
                <Recipe/>
            </div>
        )
    }
}