import React, { useEffect, useContext } from "react";
import "../../styling/pages/App.css";
import Navbar from "../../components/root/Navbar";
import HomePage from "../root/Homepage";
import LogIn from "../root/Login";
import Logout from "../root/Logout";
import NotFound404 from "../root/NotFound";
import Profile from "../home/Profile";
import {
	useLocation,
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Signup from "../root/Signup";
import HomeRouter from "./HomeRouter";
import Clubs from "../home/Clubs";
import Movies from "../home/Movies";
import Options from "../home/Options";
import Home from "../home/Home";
import OthersProfile from "../../components/OthersProfile";
import PrivateRoute from "../../components/helper/PrivateRoute";
import { AuthProvider } from "../../components/helper/context/AuthContext";
import { UserProvider } from "../../components/helper/context/UserContext";
import ClubDetail from "../../components/ClubDetail";
import NewClub from "../../components/NewClubForm";
import Discussion from "../home/Discussion";
import NewEvent from "../../components/NewEventForm";
import ClubDiscussion from "../../components/ClubDiscussion";
import ShowEvent from "../../components/ShowEvent";
import { OptionProvider } from "../../components/helper/context/OptionContext";
import { EventProvider } from "../../components/helper/context/EventContext";
import { MovieProvider } from "../../components/helper/context/MovieContext";

function App() {
	return (
		<Router>
			<AuthProvider>
				<UserProvider>
					<OptionProvider>
						<EventProvider>
							<Navbar />
							<Routes>
								<Route path={"/"} element={<HomePage />} />
								<Route path={"/login"} element={<LogIn />} />
								<Route path={"/signup"} element={<Signup />} />
								<Route path={"/logout"} element={<Logout />} />
								<MovieProvider>
									<Route
										path={"/home"}
										element={
											<PrivateRoute>
												<HomeRouter />
											</PrivateRoute>
										}
									>
										<Route index element={<Home />} />
										<Route path={"logout"} element={<Logout />} />
										<Route path={"profile"} element={<Profile />} />
										<Route path={"movies"} element={<Movies />} />
										<Route path={"clubs"} element={<Clubs />}>
											<Route path={":clubID"} element={<ClubDetail />}>
												<Route path={":userID"} element={<OthersProfile />} />
											</Route>
											<Route path={"clubs/new"} element={<NewClub />} />
										</Route>
										<Route path={"discussion"} element={<Discussion />}>
											<Route path={":clubID"} element={<ClubDiscussion />}>
												<Route index element={<ShowEvent />} />
												<Route path={"new"} element={<NewEvent />} />
											</Route>
										</Route>
										<Route path={"options"} element={<Options />} />
									</Route>
								</MovieProvider>
								<Route path={"*"} element={<NotFound404 />} />
							</Routes>
						</EventProvider>
					</OptionProvider>
				</UserProvider>
			</AuthProvider>
		</Router>
	);
}

export default App;
