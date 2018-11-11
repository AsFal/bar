import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import "../styles/Navbar.css";

export default function() {
    return(
        <div className="navbar">
            <div className="left">
                <div className="brand">
                    <NavLink to="/" activeClassName="active-link" >MyBar</NavLink>   
                </div>
            </div>
            <div className="right">
                <div>
                    <NavLink to="/inventory" activeClassName="active-link">Inventory</NavLink>
                </div>
                <div>
                    <NavLink to="/recipes" activeClassName ="active-link">Recipes</NavLink>
                </div>
            </div>
        </div>
    )
}