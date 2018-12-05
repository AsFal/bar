import React, {Component} from "react";
import {Formik, Field, Form, FieldArray, ErrorMessage, yupToFormErrors} from 'formik';
import * as Yup from "yup";

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
        return(
            <div>
                <h3>New Recipe</h3>
                <Formik
                initialValues = {{
                    name:"",
                    ingredients: [
                        {name:"",
                        quantity:0,
                        unitOfMeasure:"mL",
                        _id:""}
                    ]
                }}
                validationSchema = {
                    Yup.object({
                        name: Yup.string().required("Required"),
                        ingredients: Yup.array().of(
                            Yup.object(
                                {
                                    name: Yup.string().required("Required"),
                                    quantity: Yup.number().required("Required"),
                                    unitOfMeasure: Yup.string().required("Required"),
                                    _id: Yup.string()
                                }
                            )
                        ).required("Must have at least one ingredient"),
                        instructions: Yup.array().of(
                            Yup.string().required("Missing Instruction")
                        ).required("Need instructions")
                    })
                }
                onSubmit = {(values)=>{
                    console.log("this is being called")
                    alert(values)}}
                render = {({isSubmitting, values})=>(
                    <Form>
                        <Field name="name" type="text"/>
                        <FieldArray name="ingredients">
                            (arrayHelpers)=> 
                                <React.Fragment>
                                    {
                                        values.ingredients.map((ingredient, index)=>{
                                            return <div key={index}>
                                                <Field name={`ingredients[${index}].name`}  type="text"/>
                                                <Field name={`ingredients[${index}].quantity` } type="number"/>
                                                <Field name={`ingredients[${index}].unitOfMeasure`} type="text" />
                                            </div>
                                        })
                                    }
                                    <button 
                                    type="button"
                                    onClick={()=>{
                                    console.log(values);
                                    arrayHelpers.push({name:"",
                                    quantity:0,
                                    unitOfMeasure:"mL",
                                    _id:""});
                                    }}> Add Ingredient</button>
                                </React.Fragment>
                            }
                        </FieldArray>
                        <button type="submit" disabled={isSubmitting}>Create the recipe</button>
                    </Form>
                )}/>
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

