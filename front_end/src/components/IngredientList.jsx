import React, {Component} from "react";
import IngredientAdd from "./IngredientAdd.jsx";

let IngredientRow = (props)=>{
    return (
        <li>
            <div>{props.ingredient.name}</div>
            <div>{props.ingredient.type}</div>
            <div>{props.ingredient.abv}</div>
            <div>{props.ingredient.quantity}</div>
        </li>
    )
}

export default class IngredientList extends  Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            listKey: ""
        }
        this.handleIngredientAdd = this.handleIngredientAdd.bind(this);
    }

    componentWillReceiveProps(props) {
        if(props.listKey != this.state.listKey) {
            // Only triggers on prop change
            let listKey = props.listKey;

            console.log(props);
            fetch(`/api/inventory/ingredient_list/${listKey}`, {
                method: 'GET',
            })
            .then(res=>res.json())
            .then(ingredients=>{
                this.setState({
                    ingredients: ingredients,
                    listKey: listKey
                });
            });
        }

    }

    // Could also be achieved witht he PureComponent
    // this decides if the component will rerender or not
    shouldComponentUpdate(nextProps, nextState) {
        // If there is a prop change or a state change, rerender
        // If there is a state change, rerender
        // Prop changes trigger the fetch event
        // This is to handle the async, the actual determinanant
        // If no new props have appeared, there should be no state change
        if (this.state.listKey != nextState.listKey) {
            return true;
        } else {
            return true;
        }
    }


    /** since the fetch depends on info we get from the fetch in inventory mount, we should 
     * fetch at mount, only at new prop arrival
     */
    // componentDidMount() {
    //     console.log("mounting");
    //     console.log(this.props);
    //     //main key
    //     let mainKey = "b75bi345";
    //     // let keyObject = {
    //     //     listKey : mainKey
    //     // };
    //     // let ingredients = this.fetchIngredients(mainKey);
    // }

    render() {

        let ingredientRows = this.state.ingredients.map((ingredient)=>
            (<IngredientRow key={ingredient._id} ingredient={ingredient}/>)
        );

        return(
        <div>
            <h1> Ingredient List</h1>
            <ul>
                <li>
                    <div>Ingredient Name</div>
                    <div>Alcohol Type</div>
                    <div>ABV</div>
                    <div>Quantity</div>
                </li>
                {ingredientRows}
                <IngredientAdd handleIngredientAdd={this.handleIngredientAdd}> </IngredientAdd>
            </ul>
        </div>
        );
    }

    handleIngredientAdd(event) {
        event.preventDefault();
        let form = event.target;

        // In the real application, thi the Id will be given when the app receives the response from 
        // The db, here we will just generate an Id
        let ingredient = this.extractIngredientFromForm(form);
        ingredient._id = Math.floor(Math.random()*10000).toString();
        // For free redux
        let oldIngredients = this.state.ingredients;
        // Returns a shallow copy of the array
        let newIngredients = oldIngredients.slice();
        newIngredients.push(ingredient);
        
        this.setState({
            ingredients : newIngredients
        });
        
    }
    
    extractIngredientFromForm(formNode) {
        return {
            name: formNode.name.value,
            type: formNode.type.value,
            abv : formNode.abv.value,
            quantity : formNode.quantity.value
        }
    }

    fetchIngredients(listKey) {
        return 
    }
}

 // // main
        // if (listKey == "b75bi345") {
        //     return  [
        //         {
        //             name: "Test Ingredient",
        //             type: "Vodka",
        //             abv : "40%",
        //             quantity: 5,
        //             _id: "f9faljf9f"
        //         }
        //     ];
        // //second
        // } else if (listKey == "lk3j4h5") {
        //     return  [
        //         {
        //             name: "Not Main",
        //             type: "Gin",
        //             abv : "40%",
        //             quantity: 5,
        //             _id: "33o4ufi398f4"
        //         }
        //     ]
        // //myNeckHurts
        // } else if (listKey == "rl2kj432lkb") {
        //     return [
        //         {
        //             name: "Neck reliever",
        //             type: "Absynthe",
        //             abv : "90%",
        //             quantity: 3,
        //             _id: "f90fdslf09f"
        //         }
        //     ]
        // }