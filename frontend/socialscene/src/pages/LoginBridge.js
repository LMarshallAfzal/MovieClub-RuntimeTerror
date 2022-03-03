import React, {useState} from 'react';
import { render } from 'react-dom';
import HomeRouter from './HomeRouter';
import Login from "./Login";
import {Router, Route, Routes} from "react-router-dom";

function LoginBridge() {
    const [token, setToken] = useState('');

    const userLogin = (tok) => {
        setToken(tok);
    }
    
    localStorage.setItem('token', JSON.stringify("Token " + token))
    if(!token) {
        return <Login userLogin={userLogin}/>
    }

    return (
        <>
            <Routes>
                <Route path={"/home/*"} element={(<HomeRouter />)}/>
            </Routes>
        </>
    );
}

export default LoginBridge