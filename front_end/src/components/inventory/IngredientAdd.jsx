import React, {Component} from "react";
import {Formik, Field, Form, FieldArray, ErrorMessage, yupToFormErrors} from 'formik';

import * as Yup from "yup";

export default class IngredientAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: "",
            abv: "",
            quantity: ""
        }
        this.handleIngredientAdd = this.handleIngredientAdd.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    
    render() {
        let initialValues = {
            name: "Something",
            type: "Start",
            abv: 0,
            quantity: 0
        }
        
        return(
            <Formik initialValues = {initialValues}
                validationSchema = {Yup.object({
                    name: Yup.string().required("Required"),
                    type: Yup.string().required("Required"),
                    abv : Yup.number().required("Required"),
                    quantity : Yup.number().required("Required")
                })}
                onSubmit = {values =>{
                    console.log("ha submitted");
                    alert(values)
                    // Have my redux action here to send information to the api
                }}
                render = {({isSubmitting, errors})=>
                <div>
                    <Form>
                        <div className="ingredient-row ingredient-add">
                            <div className="field">
                                <Field name="name" type="text">
                                    {({field,form})=>
                                        <input {...field} type="text" placeholder="Name..."></input>
                                    }
                                </Field>
                            </div>
                            <div className="field">
                                <Field name="type" type="text">
                                    {({field,form})=>
                                        <input {...field} type="text" placeholder="Type..."/>}
                                </Field>
                            </div>
                            <div className="field">
                                <Field name="abv" type="number">
                                    {({field,form})=>
                                    <input {...field} type="number" />}
                                </Field> 
                            </div>
                            <div className="field">
                                <Field name="quantity" type="number">
                                        {({field, form})=>
                                        <input {...field} type="number" />}
                                </Field>
                            </div>
                        </div>  
                        <button type="submit" disabled={isSubmitting} style={{height:"20px", width: "20px"}} onClick={()=>console.log(errors)}></button>
                    </Form>
                </div> }
           />
        )
    }

    onChange(event) {
        event.preventDefault();
        let fieldName = event.target.name;
        let newValue = event.target.value;
        this.setState({
           [fieldName]:newValue 
        });
    }   

    handleIngredientAdd(event) {
        event.preventDefault();

        let ingredient = {
            name : this.state.name,
            type : this.state.type,
            abv : this.state.abv,
            quantity: this.state.quantity
        }
        console.log(this.props.listId);
        console.log(this.props);
        console.log(`/api/inventory/ingredient/?${this.props.listId}`);
        fetch(`/api/ingredient/?tableId=${this.props.listId}`, {
            method: "POST",
            headers : {
                "Content-Type" : "application/json ; charset=utf-8 "
            },
            body: JSON.stringify(ingredient)
        })
        .then(res=>res.json())
        .then((ingredientDoc)=>{
            console.log(ingredientDoc)
            this.props.updateParentList(ingredientDoc);
            this.setState({
                name:"",
                type: "",
                abv:"",
                quantity:""
            })
        })
        .catch((err)=>{
            // I need better error handling
            console.log(err)
        })
    }
}

/* <form  name="ingredientAdd" onSubmit={this.handleIngredientAdd}> 
<div className="ingredient-row ingredient-add">
    <div><input type="text" name="name" value={this.state.name}
     placeholder="Ingredient Name ..." onChange={this.onChange}/></div>
    <div><input type="text" name="type"  value={this.state.type} 
    placeholder="Alcohol Type ..." onChange={this.onChange}/></div>
    <div><input type="text" name="abv" value={this.state.abv}
    placeholder="Abv ..." onChange={this.onChange}/></div>
    <div><input type="text" name="quantity" value={this.state.quantity}
    placeholder="Remaining Quantity ..." onChange={this.onChange}/></div>
    <button type="submit"></button>
</div>
</form> */