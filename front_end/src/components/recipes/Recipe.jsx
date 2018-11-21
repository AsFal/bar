import React, {Component} from "react";
import RecipeIngredients from "./RecipeIngredients.jsx";
import RecipeInstructions from "./RecipeInstructions.jsx";
import { PassThrough } from "stream";

import "../../styles/Recipe.css";


export default class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeId : props._id,
            ingredientList: [],
            instructionList: []
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps == this.props) {
            return false;
        } else {
            return true;
        }
    }

    // Since there are multiple recipe elements
    // We only need to check for prop change, because every new recipe will get mounted
    // Check if state has changed
    // shouldComponentUpdate(newProps, newState) {

    // }

    componentDidMount() {
        this.getRecipe(this.state)
        .then((recipe)=>{
            this.setState({
                ingredientList: recipe.ingredientList,
                instructionList: recipe.instructionList
            })
        });
    }

    render() {
        console.log("rendering")
        console.log(this.state);
        return (
            <div className="recipe">
                <div>
                    <div className="recipe-image"></div>
                    <div className="seperator"></div>
                    <div className="recipe-title">Some Random Title</div>
                    <div className="recipe-analytics">
                        <div className="analytics-price">5$</div>
                        <div className="analytics-portions">6</div>
                        <div className="analytics-abv">70%</div>
                    </div>
                    <div className="other">
                        <RecipeIngredients ingredientList = {this.state.ingredientList}/>
                        <RecipeInstructions instructionList = {this.state.instructionList}/>
                    </div>
                </div>
   
        </div>
        );
    }

    getRecipe() {
        return new Promise((fulfill, reject) =>{
            let id = this.state.recipeId;
            fetch(`/api/recipes/${id}`)
            .then(res=>res.json())
            .then((recipe)=>{
                if(!recipe.ingredients) {
                    recipe.ingredients=[]
                }
                if(!recipe.instructions) {
                    recipe.instructions = [];
                }

                let ingredientList = recipe.ingredients.map((ingredient)=>
                ({
                    name:ingredient.ingredient.name,
                    unitOfMeasure: ingredient.unitOfMeasure,
                    quantity: ingredient.quantity,
                    _id: ingredient.ingredient._id
                }));
                
                fulfill({
                    name: recipe.name,
                    ingredientList: ingredientList,
                    instructionList: recipe.instructions
                });
            })
            .catch((err)=>{
                console.log(err);
            }) 
        })
    }

}