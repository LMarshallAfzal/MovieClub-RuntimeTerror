import React from "react";
import "../styling/enterButton.css";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const STYLES = ['btn--primary', 'btn--outline'];

const SIZES = ['btn--medium', 'btn--large'];

export const enterButton = ({
                                children,
                                type,
                                onClick,
                                buttonStyle,
                                buttonSize}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return (
        <Link to ='/' className={'btn-mobile'}>
            <button
            className={'btn ${checkButtonStyle} ${checkButtonSize}'}
            onClick={onClick}
            type={type}
            >
                {children}
            </button>

            <Button>
                enter
            </Button>
        </Link>
    )
    };
