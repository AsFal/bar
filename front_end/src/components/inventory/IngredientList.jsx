import React, {Component} from "react";
import IngredientAdd from "./IngredientAdd.jsx";
// import IngredientAdd from "./IngredientAdd.jsx";

import "../../styles/IngredientList.css"
// import { connect } from "net";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";



let IngredientRow = (props)=>{
    return (
        <div className="ingredient-row">
            <div>{props.ingredient.name}</div>
            <div>{props.ingredient.type}</div>
            <div>{props.ingredient.abv}</div>
            <div>{props.ingredient.quantity}</div>
        </div>
    )
}

class IngredientList extends  Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            listKey: ""
        }
        // this.handleIngredientAdd = this.handleIngredientAdd.bind(this);
        this.updateParentList = this.updateParentList.bind(this);
    }

    componentWillReceiveProps(props) {
        if(props.listKey != this.state.listKey) {
            // Only triggers on prop change
            let listKey = props.listKey;

            console.log(props);
            fetch(`/api/ingredient_list/${listKey}`, {
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
        <div className="ingredient-list">
            <div className="ingredient-row header">
                <div>Ingredient Name</div>
                <div>Alcohol Type</div>
                <div>ABV</div>
                <div>Quantity</div>
            </div>
            {ingredientRows}
            <IngredientAdd updateParentList={this.updateParentList}
            listId={this.state.listKey}> </IngredientAdd>
        </div>
        );
    }

    updateParentList(newIngredientDoc) {
        let oldIngredients = this.state.ingredients;
        let newIngredients = oldIngredients.slice();
        newIngredients.push(newIngredientDoc);
        this.setState({
            ingredients: newIngredients
        })
    }
}

 const mapStateToProps = state => ({
    list : state.activeList,
    user: state.user
});


function updateList(){
    return;
}
// Need to update List
const mapActionsToProps = (dispatch, props)=>{
    // need to use a bing actions creator
    return bindActionCreators({
        onUpdateList : updateList
    }, dispatch)
}
// the binding seems to be useful when

export default connect(mapStateToProps,mapActionsToProps)(IngredientList);


