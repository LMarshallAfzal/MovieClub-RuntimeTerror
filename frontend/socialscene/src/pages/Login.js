import React from "react";
import AuthUser from "../components/AuthenticateUser";

function Login() {
    return (
        <>
            <div class="container">
                <div class = "row">
                    <div class = "col-12">
                        <h1>Log In</h1>
                        <AuthUser/>
                    </div>    
                </div> 
            </div>    
        </>
    );
}

export default Login;
