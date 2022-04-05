import React, { useEffect, useContext } from "react";
import "../../styling/pages/App.css";
import Navbar from "../../components/core/Navbar";
import HomePage from "./Homepage";
import LogIn from "./Login";
import Logout from "./Logout";
import NotFound404 from "./NotFound";
import Profile from "../home/Profile";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "./Signup";
import HomeRouter from "../home/HomeRouter";
import Clubs from "../home/Clubs";
import Movies from "../home/Movies";
import Options from "../home/Options";
import Home from "../home/Home";
import UserDetail from "../../components/UserDetail";
import MovieDetail from "../../components/MovieDetail";
import PrivateRoute from "../../components/helper/PrivateRoute";
import { AuthProvider } from "../../components/helper/AuthContext";
import ClubDetail from "../../components/ClubDetail";
import ClubCreate from "../../components/ClubCreate";
import Discussion from "../home/Discussion";
import EventCreate from "../../components/EventCreate";
import ClubDiscussion from "../../components/ClubDiscussion";
import EventDetail from "../../components/EventDetail";
import AuthContext from "../../components/helper/AuthContext";


function App() {

    

    useEffect(() => {
        let interval = setInterval(() => {
            train();
        }, 1000 * 60 * 60);

    }, []);

    let train = async () => {
        let response2 = await fetch("http://127.0.0.1:8000/train/movie/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });
        await response2.json();
        let response3 = await fetch("http://127.0.0.1:8000/train/meeting/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });
        await response3.json();
    }


  return (
    <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
              <Route path={"/"} element={(<HomePage />)} />
              <Route path={"/login"} element={(<LogIn />)} />
              <Route path={"/signup"} element={(<Signup />)} />
              <Route path={"/logout"} element={(<Logout />)} />
              <Route path={"/home"} element={<PrivateRoute><HomeRouter /></PrivateRoute>}>

                  <Route index element={(<Home />)} />
                  <Route path={"logout"} element={(<Logout />)} />

                  <Route path={"profile"}>
                      <Route index element={(<Profile />)} />
                      <Route path={":userID"} element={(<UserDetail />)} />
                  </Route>

                  <Route path={"movies"} element={(<Movies />)}>
                      <Route path={":movieID"} element={(<MovieDetail />)}/>
                  </Route>

                  <Route path={"clubs"} element={(<Clubs />)} >
                      <Route path={":clubID"} element={(<ClubDetail />)}>
                          <Route path={":userID"} element={(<UserDetail />)} />
                      </Route>
                      <Route path={"clubs/new"} element={(<ClubCreate />)} />
                  </Route>

                  <Route path={"discussion"} element={(<Discussion />)}>
                      <Route path={":clubID"} element={(<ClubDiscussion />)}>
                          <Route index element={(<EventDetail />)} />
                          <Route path={"new"} element={(<EventCreate />)} />
                      </Route>
                  </Route>

                  <Route path={"options"} element={(<Options />)} />
              </Route>
              <Route path={"*"} element={<NotFound404 />} />
          </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
