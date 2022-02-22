import React from "react";
import "../styling/pages/Login.css";
// import {Stack} from "react-bootstrap";
import HeadingCircle from "../components/HeadingCircle";
import {Stack, TextField} from "@mui/material";
import FormButton from "../components/FormButton";


function login() {
    return (
        <div className={"flex"}>
            <div className={"flex-left"}>
                <HeadingCircle title={"log in"}/>
            </div>
            <div className={"flex-right"}>
                <Stack spacing={2}>
                    <TextField
                        id={"outlined-basic"}
                        label={"username"}
                        variant={"outlined"}
                    />

                    <TextField
                        id={"outlined-basic"}
                        label={"password"}
                        variant={"outlined"}
                    />

                    <FormButton
                        text={"forgot password"}
                    />
                </Stack>
            </div>
        </div>
    );
}

export default login;
