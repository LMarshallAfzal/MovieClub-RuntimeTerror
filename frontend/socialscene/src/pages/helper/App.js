import React, {useEffect, useContext} from "react";
import "../../styling/pages/App.css";
import Navbar from "../../components/root/Navbar";
import HomePage from "../root/Homepage";
import LogIn from "../root/Login";
import Logout from "../home/Logout";
import NotFound404 from "../root/NotFound";
import Profile from "../home/Profile";
import {useLocation, BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "../root/Signup";
import HomeRouter from "./HomeRouter";
import Clubs from "../home/Clubs";
import Movies from "../home/Movies";
import Options from "../home/Options";
import Home from "../home/Home";
import OthersProfile from "../home/OthersProfile";
import PrivateRoute from "../../components/helper/PrivateRoute";
import { AuthProvider } from "../../components/helper/AuthContext";
import Messages from "../home/Messages";
import ClubDetail from "../../components/ClubDetail";
import NewClub from "../../components/NewClubForm";
import Discussion from "../home/Discussion";
import NewEvent from "../../components/NewEventForm";
import AuthContext from "../../components/helper/AuthContext";
import ClubDiscussion from "../../components/ClubDiscussion";
import ShowEvent from "../../components/ShowEvent";

function App() {

  return (
    <Router>
          <AuthProvider>
          <Navbar />
              <Routes>
                  <Route path={"/"} element={(<HomePage />)} />
                  <Route path={"/login"} element={(<LogIn />)} />
                  <Route path={"/signup"} element={(<Signup />)} />
                  <Route path={"*"} element={<NotFound404 />} />
                  <Route path="/home" element={
                      <PrivateRoute>
                          <HomeRouter />
                      </PrivateRoute>}>

                        <Route index element={(<Home />)} />
                        <Route path={"logout"} element={(<Logout />)} />
                        <Route path={"profile"} element={(<Profile />)} />
                        <Route path={"movies"} element={(<Movies />)} />
                        <Route path={"clubs"} element={(<Clubs />)} >
                            <Route path={":clubID"} element={(<ClubDetail />)}>
                                <Route path={"others-profile"} element={(<OthersProfile />)} />
                            </Route>
                            <Route path={"clubs/new"} element={(<NewClub />)} />
                        </Route>
                        <Route path={"discussion"} element={(<Discussion />)}>
                            <Route path={":clubID"} element={(<ClubDiscussion />)}>
                                <Route index element={(<ShowEvent />)} />
                                <Route path={"new"} element={(<NewEvent />)} />
                            </Route>
                        </Route>
                        <Route path={"messages"} element={(<Messages />)} />
                        <Route path={"options"} element={(<Options />)} />
                        <Route path={"others-profile"} element={(<OthersProfile />)} />
                  </Route>  
              </Routes>
          </AuthProvider>
      </Router>
  );
}

export default App;
