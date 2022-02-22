import React, {useState} from "react";
import AuthenticateUser from "../components/AuthenticateUser";
import EditUser from "../components/EditUser";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Profile from "./Profile";


function Login() {
    const [token, setToken] = useState('');

    const userLogin = (tok) => {
      setToken(tok);
    }
    if(!token) {
        return <AuthenticateUser userLogin={userLogin}/>
      }
    return (
        <>
            {/* <Router> */}
                <Routes>
                    <Route path="/editProfile" element={(<Profile token={token}/>)} />
                </Routes> 
            {/* </Router>   */}
            
            {/* <EditUser token={token}/> */}
        </>
        
    );
}

export default Login;
