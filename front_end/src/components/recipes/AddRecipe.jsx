import React, {Component} from "react";

export class RecipeIngredient {
    constructor(quantity=0, unitOfMeasure="mL", name="", _id = 0) {
        this.name = name;
        this.quantity = quantity;
        this.unitOfMeasure = unitOfMeasure;
        this._id = _id;
    }
}

export default class AddRecipe extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            ingredients : [new RecipeIngredient()],
            instructions: [""]
        }
        this.newInput = this.newInput.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submitRecipe = this.submitRecipe.bind(this);
    }

    render() {

        let style = {
            border: "1px solid black"
        }

        let emptyRecipeIngredient = new RecipeIngredient();
        delete emptyRecipeIngredient._id;
        let ingredientKeys = Object.keys(emptyRecipeIngredient);
        let ingredientInputs = [];
        // Once I'm done making it so all of the ingredients get added to the main 
        // I should have this pull suggestions from there and filter the suggestions
        for (let index = 0; index < this.state.ingredients.length; index++) {
            ingredientInputs.push(
                <div style={style} key={index.toString()}>
                    {
                        ingredientKeys.map((key)=>(
                            <input type="text" name={"ingredient-"+key} index = {index.toString()}
                            value={this.state.ingredients[index][key]} placeholder={key+"..."}
                            onChange={this.onChange} key={key}/>
                        ))
                    }
                </div>
            )
        }

        let  instructionInputs = [];
        for (let index = 0; index < this.state.instructions.length; index++) {
            instructionInputs.push(
                <div style={style} key={index.toString()}>
                    <input type="text" name="instruction" index = {index.toString()}
                    value={this.state.instructions[index]} placeholder="Instruction..."
                    onChange={this.onChange} />
                </div>
            )
        }

        return (
            <div className="recipe">
                <div className="frame"></div>
                <h3>New Recipe</h3>
                
                <form name="newRecipe" onSubmit={this.submitRecipe}>
                    <div>
                        <input type="text" name="name" placeholder="Name..."
                        value={this.state.name} onChange={this.onChange}/>
                        <h4>Ingredients</h4>
                            {ingredientInputs}
                            <button onClick={this.newInput} name="ingredient">New Ingredient</button>
                        <h4>Instructions</h4>
                            {instructionInputs}
                            <button onClick={this.newInput} name="instruction">New Instructions</button>
                        <button type="submit">Submit Me Ah oui Ah oui</button>
                    </div>

                </form>
            </div>
        )
    }

    onChange(event) {
        event.preventDefault();
        let name = event.target.name;
        let newValue = event.target.value;
        let index = Number(event.target.getAttribute('index'));
        if(name == "name") {
            this.setState({
                name:newValue
            })
        } else if (name == "instruction") {

            let oldInstructions = this.state.instructions;
            let newInstructions = oldInstructions.slice();
            newInstructions[index] = newValue;
            this.setState({
                instructions : newInstructions
            })
        } else {
            let ingredientKey = name.split("-")[1];
            let oldIngredients = this.state.ingredients;
            let newIngredients = oldIngredients.slice();
            newIngredients[index][ingredientKey] = newValue;
            this.setState({
                ingredients: newIngredients
            })
        }
    }

    newInput(event) {
        event.preventDefault();
        let buttonName = event.target.name;
        if (buttonName == "ingredient") {
            let oldIngredients = this.state.ingredients;
            let newIngredients = oldIngredients.slice();
            newIngredients.push(new RecipeIngredient());
            this.setState({
                ingredients:newIngredients
            });
        }
        else if(buttonName == "instruction") {
            let oldInstructions = this.state.instructions;
            let newInstructions = oldInstructions.slice();
            newInstructions.push(new RecipeIngredient());
            this.setState({
                instructions:newInstructions
            });
        }
    }

    submitRecipe(event) {
        event.preventDefault();
        let recipe = {
            name: this.state.name,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions
        }
        console.log(JSON.stringify(recipe));
        fetch("/api/recipes", {
            method: "POST",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify(recipe)
        })
        .then(res=>res.json())
        .then(recipeId=>{
            console.log(recipeId);
            let oldRecipeIds = this.state.recipeIds;
            let newRecipeIds = oldRecipeIds.slice();
            newRecipeIds.push(recipeId);
            this.setState({
                name: "",
                ingredients: [],
                instructions: []
            });
            this.props.newRecipeId(recipeId);
        })
        .catch(err=>{
            console.log(err);
        })
    }


}