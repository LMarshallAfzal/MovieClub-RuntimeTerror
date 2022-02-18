import React from "react";
import "../styling/pages/App.css";
import Navbar from "../components/Navbar";
import HomePage from "./Homepage";
import LogIn from "./Login";
import NotFound404 from "./NotFound";
import Dashboard from "../pages/Dashboard";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <>
          <Router>
              <Navbar />
              <div className={"container-fluid p-0 flex-grow-1 h-auto"}>
                  <Routes>
                      <Route path={"/"} element={(<HomePage />)}/>
                      <Route path={"/login"} element={(<LogIn />)}/>
                      <Route path={"/dashboard"} element={(<Dashboard />)}/>
                      <Route path={"*"} element={<NotFound404 />}/>
                  </Routes>
              </div>
          </Router>
      </>
  );
}

export default App;
