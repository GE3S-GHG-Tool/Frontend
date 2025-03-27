import React from "react";
import "./manageAccount.css"

const GradientButton = (props) => {
    const {
        onClick,
        children,
        width = "auto",
        height = "auto",
        fontSize = "0.875rem",
        type = "button",
        ...other
    } = props;
    return (
        <button
            type={type}
            style={{ width, height, fontSize }}
            onClick={onClick}
            className="gradient-btn"
            {...other}
        >
            {children}
        </button>
    );
};



const OutlinedButton = (props) => {
    const {
        onClick,
        children,
        width = "auto",
        height = "auto",
        fontSize = "0.875rem",
        fontWeight = "400",
        type = "button",
        ...other
    } = props;
    return (
        <button
            type={type}
            style={{ width, height, fontSize, fontWeight }}
            className="outlined-gradient-btn"
            onClick={onClick}
            {...other}
        >
            {children}
        </button>
    );
};

export { GradientButton, OutlinedButton };