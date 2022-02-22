import React, {useState} from "react";
import Navbar from "../components/Navbar";
import AuthenticateUser from "../components/AuthenticateUser";
import LogIn from "./Login";
import SignUp from "./SignUp"
import Profile from "./Profile";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Homepage from "./Homepage";

function App() {
    
    

    return (
        <>
            <Router>
                <Navbar />
                <div className={"container-fluid p-0 flex-grow-1 h-auto"}>
                    <Routes>
                        <Route path={"/"} element={(<Homepage />)}/>
                        <Route path="/login/*" element={(<LogIn />)}/>
                        <Route path="/signup" element={(<SignUp />)}/>
                        <Route path="/editProfile/*" element={(<Profile />)} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
