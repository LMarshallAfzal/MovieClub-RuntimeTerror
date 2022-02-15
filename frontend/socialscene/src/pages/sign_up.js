import React from "react"
import Navbar from "../components/navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import '../styling/App.css'
import From from "react-bootstrap/Form"

function Sign_up() {
    
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
    )
}