import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ErrorPage from "./Error.jsx";
import Home from "./home/Home.jsx";
import Navbar from "./Navbar.jsx";
import IngredientInventory from "./inventory/IngredientInventory.jsx";
import RecipeBook from "./recipes/RecipeBook.jsx";

import '../styles/App.css';

export default class RoutedApp extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar/>
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/inventory" component={IngredientInventory} exact/>
                        <Route path="/recipes" component={RecipeBook} exact></Route>
                        <Route  component={ErrorPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );   
    }
}