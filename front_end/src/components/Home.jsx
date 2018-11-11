import React from "react";

import "../styles/Home.css";

import BarImage from "../images/bar.jpg";


export default function Home(props) {

    let backgroundImage = {
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${BarImage})`,
        backgroundSize : "cover"
    };

    return(
        <div className="home" style={backgroundImage}>
            <div className="home-navigation">
                <div className="middle-bubble"></div>
                <div className="left-bubble bubble ">
                    <div className="text">
                        <a href="/inventory">Inventory</a>
                    </div>
                </div>
                <div className="right-bubble bubble ">
                    <div className="text">
                        <a href="/recipes">Recipes</a>  
                    </div>
                </div>
            </div>
            <div className="home-overlay" ></div>
        </div>
    )

}