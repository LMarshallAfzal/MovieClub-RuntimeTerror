import React, {useState} from "react";
import EditUser from "./EditUser";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthenticateUser from "./AuthenticateUser"



function Profile() {  
    const [token, setToken] = useState();

    if(!token) {
        
        return <AuthenticateUser setToken={setToken} />
    }  

    return (
        <div className="wrapper">
            <BrowserRouter>
                <Routes>
                    <Route path="/editUser">
                        <h1>Edit User Profile</h1>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default Profile