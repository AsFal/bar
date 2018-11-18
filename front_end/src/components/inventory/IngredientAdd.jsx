import React, {Component} from "react";

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

        return(
            <form  name="ingredientAdd" onSubmit={this.handleIngredientAdd}> 
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
            </form>
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
        fetch(`/api/inventory/ingredient/?tableId=${this.props.listId}`, {
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

