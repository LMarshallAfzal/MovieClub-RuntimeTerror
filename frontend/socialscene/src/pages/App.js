import React from "react";
import Navbar from "../components/navbar";
import HomePage from "../pages/homepage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
  return (
      <>
          <Router>
              <Navbar />
              <div className={"container-fluid p-0 flex-grow-1 h-auto"}>
                  <Routes>
                      <Route
                          path={"/"}
                          element={(
                              <HomePage />
                          )}
                      />
                  </Routes>
              </div>
          </Router>

      </>
  );
}

export default App;
