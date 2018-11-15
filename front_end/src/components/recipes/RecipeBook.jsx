import React, {Component} from "react";
import Recipe from "./Recipe.jsx";
import AddRecipe from "./AddRecipe.jsx";

export default class RecipeBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            theme: "",
            recipeIds : [],
            nextRecipeIndex : 0,
            displayAddRecipeForm: false
        }

        this.nextRecipe = this.nextRecipe.bind(this);
        this.submitRecipe = this.submitRecipe.bind(this);
    }


    componentDidMount() {
        let menuId = "main";
        fetch(`/api/recipes/menu/${menuId}`)
        .then(res=>res.json())
        .then((menu)=> {
            this.setState( {
                name: menu.name,
                theme: menu.theme,
                season: menu.season,
                recipeIds: menu.drinks
            })
        })
    }

    // componentWillUpdate(newProps, newState) {
    //     if(this.state.)
    // }
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
        // Next recipe should not be rendered
        let recipes = [];
        for (let index = 0; index < this.state.nextRecipeIndex; index++) {
            let currentId = this.state.recipeIds[index];
            // Implement a style change depending on the position
            // Last should have right style (class in css)
            // All left should have a left page class
            // Left page classes should be modified by position
            // style = {

            // }

            recipes.push(
                <Recipe key={currentId} _id={currentId}/>
            )
        }

        if(this.state.displayAddRecipeForm) {
            recipes.push(<AddRecipe onSubmit={this.onSubmit}/>)
        }
        console.log("rerendered");
        console.log(recipes);
        console.log(this.state.lastRecipeIndex);
        console.log(this.state.recipeIds);
        
        return (
            <div>
                {recipes}
                <button onClick={this.nextRecipe}> NextRecipe</button>
            </div>
            
        ) 
    }

    nextRecipe() {
        // If so, we have reached the end of the recipes for this menu
        // The desired effect is to have a new recipe form after all of this
        if (this.state.nextRecipeIndex < this.state.recipeIds.length) {
            let newNextRecipeIndex = this.state.nextRecipeIndex + 1;
            this.setState({
                nextRecipeIndex: newNextRecipeIndex
            })
        }
        // If you are the end of the recipes and there are no displayed forms, display form
        else if(! this.state.displayAddRecipeForm) {

            this.setState(
                {
                    displayAddRecipeForm: true
                }
            )
        }
        
        // Do nothing if neither of those cases are true

    } 

    submitRecipe(event) {
        event.preventDefault();
        let form = event.form;

        let recipe = {};
        fetch("api/recipes", 
        {method: "POST",
        header: {
            contentType : "application/JSON"
        },
        body:JSON.stringify(recipe)}
        )
        .then(res=>res.json())
        .then(newRecipe=>{
            console.log(newRecipe);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

}