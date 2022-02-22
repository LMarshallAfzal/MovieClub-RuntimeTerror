import React, {useState} from "react";
import EditUser from "../components/EditUser";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthenticateUser from "../components/AuthenticateUser"



function Profile() {  
    
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Routes>
                    <Route path="/editUser">
                        <AuthenticateUser />
                        <EditUser />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default Profile