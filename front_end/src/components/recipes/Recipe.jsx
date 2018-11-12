import React, {Component} from "react";
import RecipeIngredients from "./RecipeIngredients.jsx";
import RecipeInstructions from "./RecipeInstructions.jsx";
import { PassThrough } from "stream";


export default class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeId : props.key,
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
        console.log("mounted");
        this.getRecipe(this.state)
        .then((recipe)=>{
            console.log(recipe);
            console.log(recipe.ingredientList);
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
        <div>
            This is a recipe
            <RecipeIngredients ingredientList = {this.state.ingredientList}/>
            <RecipeInstructions instructionList = {this.state.instructionList}/>
        </div>
        );
    }

    getRecipe() {
        return new Promise(function(fulfill, reject) {
            fulfill(
                {
                    ingredientList: [
                        {
                            name: "Vagues",
                            unitOfMeasure: "mL",
                            quantity: 30,
                            _id: Math.floor(Math.random()*10000).toString()
                        },
                        {
                            name: "Rum",
                            unitOfMeasure: "mL",
                            quantity: 30,
                            _id: Math.floor(Math.random()*10000).toString()
                        },
                        {
                            name: "Antything, litteraly",
                            unitOfMeasure: "mL",
                            quantity: 30,
                            _id: Math.floor(Math.random()*10000).toString()
                        },
                    ],
                    instructionList: [
                        "In order, this should be one",
                        "If this aint two, then I don't know what the fuck is going on",
                        "Oh shit, we at three already"
                    ]
                }
            )
        })
    }

}