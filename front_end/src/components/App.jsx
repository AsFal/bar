//@ts-check
import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ErrorPage from "./Error.jsx";
import Home from "./home/Home.jsx";
import Navbar from "./Navbar.jsx";
import IngredientInventory from "./inventory/IngredientInventory.jsx";
import Menu from "./recipes/Menu.jsx";

import '../styles/App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

let themeColors = {
    palette:{
        primary: {
            light: "#23432",
            main: "#26282b",
            dark: "#23432"
        },
        secondary: {
            light: "#23432",
            main: "#1b1b35",
            dark: "#23432"
        },
        error: {
            light: "#23432",
            main: "#ce2d48",
            dark: "#23432"
        }
    }
}


export default class RoutedApp extends Component {
    render() {
        return (
            <MuiThemeProvider theme={createMuiTheme(themeColors)}>
                <BrowserRouter>
                    <div>
                        <Navbar/>
                        <Switch>
                            <Route path="/" component={Home} exact />
                            <Route path="/inventory" component={IngredientInventory} exact/>
                            <Route path="/recipes" component={Menu} exact></Route>
                            <Route  component={ErrorPage}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );   
    }
}