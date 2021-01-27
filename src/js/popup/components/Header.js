import React from "react";
import "./Header.css";

const Header = (props) => {
    return(
        <div className="header">
            <p>Question Generator</p>
            <button className="options">options</button>
        </div>
    )
}

export default Header;