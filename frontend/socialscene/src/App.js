import React, {useState} from "react";
import Navbar from "./components/Navbar";
import AuthenticateUser from "./components/AuthenticateUser";
import Add from "./components/Add"
import EditUser from "./components/EditUser";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage";

function App() {
    // const [token, setToken] = useState('');

    // const userLogin = (tok) => {
    //   setToken(tok);
    // }
    // if(!token) {
    //     return <AuthenticateUser userLogin={userLogin}/>
    //   }
    

    return (
        <>
            <Router>
                <Navbar />
                <div className={"container-fluid p-0 flex-grow-1 h-auto"}>
                    <Routes>
                        <Route path={"/"} element={(<Homepage />)}/>
                        <Route path="/login/*" element={(<AuthenticateUser />)}/>
                        <Route path="/signup" element={(<Add />)}/>
                        <Route path="/editProfile/1" element={(<EditUser />)} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
