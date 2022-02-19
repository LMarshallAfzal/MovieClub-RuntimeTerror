import React from "react";
import Navbar from "../components/navbar";
import LogIn from "./Login";
import SignUp from "./SignUp"
import UpdateProfile from "./Profile";
import NotFound404 from "../pages/notFound404";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Homepage from "./Homepage";


function App() {
  return (
      <>
          <Router>
              <Navbar />
              <div className={"container-fluid p-0 flex-grow-1 h-auto"}>
                  <Routes>
                      <Route path={"/"} element={(<Homepage />)}/>
                      <Route path="/login" element={(<LogIn />)}/>
                      <Route path="/signup" element={(<SignUp />)}/>
                      <Route path="/editProfile/1" element={(<UpdateProfile/>)}/>
                      <Route path="*" element={<NotFound404 />}/>
                  </Routes>
              </div>
          </Router>
      </>
  );
}

export default App;
