import React from "react";
import "../../styling/pages/App.css";
import Navbar from "../../components/root/Navbar";
import HomePage from "../root/Homepage";
import LogIn from "../root/Login";
import NotFound404 from "../root/NotFound";
// import Dashboard from "./Dashboard";
import Profile from "../home/Profile";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "../root/Signup";
import HomeRouter from "./HomeRouter";
import Clubs from "../home/Clubs";
import Movies from "../home/Movies";
import WhatsOn from "../WhatsOn";
import Options from "../home/Options";
import Home from "../home/Home";
import OthersProfile from "../OthersProfile";
import PrivateRoute from "../../components/helper/PrivateRoute";
import { AuthProvider } from "../../components/helper/AuthContext";
import Messages from "../home/Messages";
import ClubDetail from "../../components/ClubDetail";
import NewClub from "./NewClubForm";
import Events from "../home/Events";

function App() {
  return (
      <Router>
          <Navbar />
          <AuthProvider>
              <Routes>
                  <Route path={"/"} element={(<HomePage />)} />
                  <Route path={"/login"} element={(<LogIn />)} />
                  <Route path={"/signup"} element={(<Signup />)} />
                  <Route path={"*"} element={<NotFound404 />} />
                    <PrivateRoute path={"/home"}  element={(<HomeRouter />)}>
                        <Route index element={(<Home />)} />
                        <Route path={"profile"} element={(<Profile />)} />
                        <Route path={"movies"} element={(<Movies />)} />
                        <Route path={"clubs"} element={(<Clubs />)}>
                            <Route path={":clubID"} element={(<ClubDetail />)} />
                            <Route path={"clubs/new"} element={(<NewClub />)} />
                        </Route>
                        <Route path={"events"} element={(<Events />)} />
                        <Route path={"messages"} element={(<Messages />)} />
                        <Route path={"options"} element={(<Options />)} />

                        <Route path={"whats-on"} element={(<WhatsOn />)} />
                        <Route path={"others-profile"} element={(<OthersProfile />)} />
                    </PrivateRoute>
              </Routes>
          </AuthProvider>
      </Router>
  );
}

export default App;
