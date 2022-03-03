import React from "react";
import "../styling/pages/App.css";
import Navbar from "../components/Navbar";
import HomePage from "./Homepage";
import LogIn from "./Login";
import NotFound404 from "./NotFound";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "./Signup";
import HomeRouter from "./HomeRouter";
import LoginBridge from "./LoginBridge";

function App() {
  return (
      <>
          <Router>
              <Navbar />
                  <Routes>
                      <Route path={"/"} element={(<HomePage />)}/>
                      <Route path={"/log-in"} element={(<LoginBridge />)}/>
                      <Route path={"/login"} element={(<LogIn />)}/>
                      <Route path={"/home/*"} element={(<HomeRouter />)}/>
                      <Route path={"/signup"} element={(<Signup />)}/>
                      <Route path={"/profile"} element={(<Profile />)}/>
                      <Route path={"/dashboard"} element={(<Dashboard />)}/>
                      <Route path={"*"} element={<NotFound404 />}/>
                  </Routes>
          </Router>
      </>
  );
}

export default App;
