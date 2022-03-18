import React from "react";
import "../styling/pages/App.css";
import Navbar from "../components/Navbar";
import HomePage from "./Homepage";
import LogIn from "./Login";
import NotFound404 from "./NotFound";
// import Dashboard from "./Dashboard";
import Profile from "./Profile";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "./Signup";
import HomeRouter from "./HomeRouter";
import Clubs from "./Clubs";
import Movies from "./Movies";
import WhatsOn from "./WhatsOn";
import Options from "./Options";
import Home from "./Home";
import OthersProfile from "./OthersProfile";
import ChangePassword from "./ChangePassword";
import PrivateRoute from "../components/PrivateRoute";
import { AuthProvider } from "../components/AuthContext";

function App() {
  return (
      <>
          <Router>
              <Navbar />
              <AuthProvider>
                  <Routes>
                      <Route path={"/"} element={(<HomePage />)}/>
                      <Route path={"/login/*"} element={(<LogIn />)}/>
                      <Route path={"/signup"} element={(<Signup />)}/>
                      <Route path={"*"} element={<NotFound404 />}/>
                        <PrivateRoute path={"/home"}  element={(<HomeRouter />)}>
                            <Route index element={(<Home />)} />
                            {/* <Route path={"dashboard"} element={(<Dashboard />)} /> */}
                            <Route path={"clubs"} element={(<Clubs />)} />
                            <Route path={"movies"} element={(<Movies />)} />
                            <Route path={"whats-on"} element={(<WhatsOn />)} />
                            <Route path={"profile"} element={(<Profile />)} />
                            <Route path={"options"} element={(<Options />)} />
                            <Route path={"change-password"} element={(<ChangePassword />)} />
                            <Route path={"others-profile"} element={(<OthersProfile />)} />
                        </PrivateRoute>
                  </Routes>
              </AuthProvider>    
          </Router>
      </>
  );
}

export default App;
