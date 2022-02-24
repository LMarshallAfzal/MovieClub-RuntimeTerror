import React from "react";
import "../styling/pages/Login.css";
import {Link} from "react-router-dom"
import HeadingCircle from "../components/HeadingCircle";
import {Grid, Stack, TextField} from "@mui/material";
import FormButton from "../components/FormButton";
import RoundButtonForward from "../components/RoundButtonForward";


function login() {
    return (
        <Grid className={"login-grid"} container spacing={2}>
            <Grid className={"login-grid-left"} item xs={6}>
                <HeadingCircle title={"log in"}/>
            </Grid>

            <Grid className={"login-grid-right"} item xs={6}>
                <Stack className={"form-stack"} spacing={3}>
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
                    <Link className={"link-form-button"} to={"/dashboard"}>
                        <FormButton
                            text={"log in"}
                        />
                    </Link>
                </Stack>
            </Grid>
        </Grid>

        // <login className={"login"}>
        //
        //     <login className={"login-left"}>
        //
        //         <HeadingCircle title={"log in"}/>
        //
        //     </login>
        //
        //     <login className={"login-right"}>
        //
        //         <Stack spacing={3}>
        //             <TextField
        //                 id={"outlined-basic"}
        //                 label={"username"}
        //                 variant={"outlined"}
        //             />
        //
        //             <TextField
        //                 id={"outlined-basic"}
        //                 label={"password"}
        //                 variant={"outlined"}
        //             />
        //
        //             <FormButton
        //                 text={"forgot password"}
        //             />
        //
        //             <FormButton
        //                 text={"log in"}
        //             />
        //             {/*<div className={"dual-button"}>*/}
        //             {/*    /!*<div className={"dual-button-left"}>*!/*/}
        //             {/*        <FormButton*/}
        //             {/*            text={"forgot password"}*/}
        //             {/*        />*/}
        //             {/*    /!*</div>*!/*/}
        //             {/*    /!*<div className={"dual-button-right"}>*!/*/}
        //             {/*        <RoundButtonForward text={"login"}/>*/}
        //             {/*    /!*</div>*!/*/}
        //             {/*</div>*/}
        //         </Stack>
        //     </login>
        // </login>
    );
}

export default login;
