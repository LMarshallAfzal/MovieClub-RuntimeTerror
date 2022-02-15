import React from "react";
import Navbar from "../components/navbar"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import '../styling/App.css';
import enterButton from "../components/enterButton";

function Homepage() {
  return (
      <>
          <Router>
              <Navbar />
              <div className={"container-fluid p-0 flex-grow-1 h-auto"}>
                  <Routes>
                      <Route path={"/"} exact />
                  </Routes>
              </div>
          </Router>
      </>
  );
}

export default Homepage;
