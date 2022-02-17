import React from "react";
import Add from "../components/Add";
import {Routes, Route} from 'react-router-dom';

function SignUp() {  
    return (
        <>
            <div class="container">
                <div class = "row">
                    <div class = "col-12">
                        <h1>Sign up</h1>
                    </div>
                </div>
            </div>
            <Add/>
            {/* <Route path="/add" component={(<Add/>)} /> */}
            {/* <Routes>
                <Route path="/add" component={(<Add/>)} />   
            </Routes>     */}
        </>
        

    );
}
export default SignUp