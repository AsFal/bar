import React, {Component} from "react";

export default class AddRecipe extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ingredientInputs: 1,
            instructionInputs: 1
        }
        this.newIngredientInput = this.newIngredientInput.bind(this);
        this.newInstructionInput = this.newInstructionInput.bind(this);
        this.submitRecipe = this.submitRecipe.bind(this);
    }

    render() {
        let ingredientInputs = [];
        let style = {
            border: "1px solid black"
        }
        // Once I'm done making it so all of the ingredients get added to the main 
        // I should have this pull suggestions from there and filter the suggestions
        for (let index = 0; index < this.state.ingredientInputs; index++) {
            ingredientInputs.push(
                <div style={style}>
                    <input type="text" name={"ingredientQuantity" + index.toString()} placeholder="Name..."/>
                    <input type="text" name={"ingredientQuantity" + index.toString()}  placeholder="Quantity..."/>
                </div>
            )
        }
        let  instructionInputs = [];
        for (let index = 0; index < this.state.instructionInputs; index++) {
            instructionInputs.push(
                <div style={style}>
                    <input type="text" name={"instruction" + index.toString()} placeholder="Instruction..."/>
                </div>
            )
        }

        return (
            <div>
                <h3>New Recipe</h3>
                <form name="newRecipe" onSubmit={submitRecipe}>
                    <div>
                        <input type="text" name="name" placeholder="name"/>
                        <h4>Ingredients</h4>
                            {ingredientInputs}
                            <button onClick={this.newIngredientInput}>New Ingredient</button>
                        <h4>Instructions</h4>
                            {instructionInputs}
                            <button onClick={this.newInstructionInput}>New INstructions</button>
                    </div>
                </form>
            </div>
        )
    }

    newIngredientInput(event) {
        event.preventDefault();
        // alert("Here  I am")
        let ingredientInputNb = this.state.ingredientInputs + 1;
        this.setState({
            ingredientInputs: ingredientInputNb
        })
    }

    newInstructionInput(event) {
        event.preventDefault();
        let instructionInputNb = this.state.instructionInputs + 1;
        this.setState({
            instructionInputs: instructionInputNb
        })
    }

    submitRecipe(event) {
        event.preventDefault();
        let form = event.form;
        fetch("api/recipes", 
        {method: "POST"})

    }
}