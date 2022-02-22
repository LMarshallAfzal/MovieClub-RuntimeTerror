import React, {useState} from "react";
import EditUser from "../components/EditUser";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthenticateUser from "../components/AuthenticateUser"



function Profile() {
    
    const [token, setToken] = useState('');

    const userLogin = (tok) => {
      setToken(tok);
    }
    if(!token) {
        return <AuthenticateUser userLogin={userLogin}/>
      }
    
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Routes>
                    <Route path="/editUser">
                        <EditUser />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default Profile