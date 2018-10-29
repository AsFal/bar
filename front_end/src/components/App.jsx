import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ErrorPage from "./Error.jsx";
import Navbar from "./Navbar.jsx";
import IngredientList from "./IngredientList.jsx";

import '../styles/App.css';

export default class RoutedApp extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar/>
                    <Switch>
                        <Route path="/" component={IngredientList} exact/>
                        <Route  component={ErrorPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );   
    }
}