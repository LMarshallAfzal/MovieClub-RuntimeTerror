import React from "react";
import Navbar from "./components/navbar"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './styling/App.css';

function App() {
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

export default App;
