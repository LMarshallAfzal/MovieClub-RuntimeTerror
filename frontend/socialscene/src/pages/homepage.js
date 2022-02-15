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
              <Routes>
                  <Route path={"/"} exact />
              </Routes>
          </Router>
      </>
  );
}

export default Homepage;
