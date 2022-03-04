import React from "react";
import "../styling/pages/App.css";
import HomePage from "./Homepage";
import LogIn from "./Login";
import NotFound404 from "./NotFound";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "./Signup";
import HomeRouter from "./HomeRouter";

import {Provider} from "react-redux";
import store from "../API/store";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRouter.js";


function App() {
  return (
      <Provider store={store}>
          <Router>
              <Layout>
                  <Routes>
                      <Route path={"/"} element={(<HomePage />)}/>
                      <Route path={"/login"} element={(<LogIn />)}/>
                      <Route path={"/home/*"} element={(<HomeRouter />)}/>
                      <Route path={"/signup"} element={(<Signup />)}/>
                      <Route path={"*"} element={<NotFound404 />}/>
                  </Routes>
              </Layout>
          </Router>
      </Provider>
  );
}

export default App;
