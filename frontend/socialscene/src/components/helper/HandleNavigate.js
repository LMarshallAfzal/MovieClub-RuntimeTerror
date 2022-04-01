import React from "react";
import {useNavigate} from "react-router";

export const HandleNavigate = (location, useReplace) => {
    const navigate = useNavigate();
    navigate(`${location}`, {replace: (useReplace || false)});
}