import React from "react";
import "../styling/pages/App.css";
import Navbar from "../components/Navbar";
import HomePage from "./Homepage";
import LogIn from "./Login";
import NotFound404 from "./NotFound";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "./Signup";
import HomeRouter from "./HomeRouter";

function App() {
  return (
      <>
          <Router>
              <Navbar />
                  <Routes>
                      <Route path={"/"} element={(<HomePage />)}/>
                      <Route path={"/login"} element={(<LogIn />)}/>
                      <Route path={"/home/*"} element={(<HomeRouter />)}/>
                      <Route path={"/signup"} element={(<Signup />)}/>
                      
                      <Route path={"*"} element={<NotFound404 />}/>
                  </Routes>
          </Router>
      </>
  );
}

export default App;
