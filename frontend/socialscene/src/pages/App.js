import React from "react";
import Navbar from "../components/navbar"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import '../styling/App.css';
import enterButton from "../components/enterButton";

function App() {
  return (
      <>
          <Router>
              <Navbar />
              <Routes>
                  <Route path={"/"} exact />
              </Routes>
          </Router>
          <enterButton />
      </>
  );
}

export default App;
