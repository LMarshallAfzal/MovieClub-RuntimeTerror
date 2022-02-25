import React from "react";
import "../styling/pages/App.css";
import Navbar from "../components/Navbar";
import HomePage from "./Homepage";
import LogIn from "./Login";
import NotFound404 from "./NotFound";
import Dashboard from "../pages/Dashboard";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "./Signup";
import Home from "./Home";
import Clubs from "./Clubs";
import Movies from "./Movies";
import WhatsOn from "./WhatsOn";
import Profile from "./Profile";
import Options from "./Options";

function App() {
  return (
      <>
          <Router>
              <Navbar />
                  <Routes>
                      <Route path={"/"} element={(<HomePage />)}/>
                      <Route path={"/login"} element={(<LogIn />)}/>
                      <Route path={"/home"} element={(<Home />)}>
                          <Route path={"dashboard"} element={(<Dashboard />)}/>
                          <Route path={"clubs"} element={(<Clubs />)}/>
                          <Route path={"movies"} element={(<Movies />)}/>
                          <Route path={"whats-on"} element={(<WhatsOn />)}/>
                          <Route path={"profile"} element={(<Profile />)}/>
                          <Route path={"options"} element={(<Options />)}/>
                      </Route>
                      <Route path={"/signup"} element={(<Signup />)}/>
                      <Route path={"*"} element={<NotFound404 />}/>
                  </Routes>
          </Router>
      </>
  );
}

export default App;
