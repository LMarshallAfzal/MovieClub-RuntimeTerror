import React from "react";
import Navbar from "../components/navbar";
import HomePage from "../pages/homepage";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import NotFound404 from "../pages/notFound404";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
  return (
      <>
          <Router>
              <Navbar />
              <div className={"container-fluid p-0 flex-grow-1 h-auto"}>
                  <Routes>
                      <Route path={"/"} element={(<HomePage />)}/>
                      <Route path={"/sign_up"} element={(<SignUp />)}/>
                      <Route path={"/log_in"} element={(<LogIn />)}/>
                      <Route path={"*"} element={<NotFound404 />}/>
                  </Routes>
              </div>
          </Router>
      </>
  );
}

export default App;
