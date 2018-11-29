import React from "react";
import ReactDom from "react-dom";
import RoutedApp from "./components/App.jsx";
import {store} from "./redux/store.jsx";
import {Provider} from "react-redux";


let rootNode = document.getElementById("root");



ReactDom.render(<Provider store = {store}><RoutedApp/></Provider>, rootNode);