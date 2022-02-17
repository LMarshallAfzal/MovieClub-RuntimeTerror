import React from "react";
import Navbar from "../components/navbar";
import HomePage from "../pages/homepage";
import LogIn from "../pages/login";
import Dashboard from "../pages/dashboard";
import NotFound404 from "../pages/notFound404";
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
