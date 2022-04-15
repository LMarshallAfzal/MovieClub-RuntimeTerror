import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../styling/components/UserDetail.css";
import { Avatar, Box, Chip, Grid, Stack } from "@mui/material";
import moviePoster from "../resources/images/empty_movie_poster.png";
import HomepageCard from "./helper/HomepageCard";
import MovieCard from "./MovieCard";
import TextButton from "./core/TextButton";
import AuthContext from "../components/helper/AuthContext";
import useFetch from "../components/helper/useFetch";

function UserDetail() {
	let { user } = useContext(AuthContext);
	let { userID } = useParams();
	const [otherUser, setOtherUser] = useState([]);
	const [otherPreferences, setOtherPreferences] = useState([]);
	let api = useFetch();
	let getOtherUser = async (e) => {
		let { response, data } = await api(`/user/${userID}/`, "GET");
		if (response.status === 200) {
			setOtherUser(data);
			setOtherPreferences(data.preferences);
		}
	};

	const navigate = useNavigate();

	const cardHeight = 325;

	const handleChipClick = (type, id) => {
		navigate(`/home/${type}/${id}`, { replace: false });
	};

	const [following, setFollowing] = useState(false);
	const [userIcon, setUserIcon] = useState(null);
	const [followers, setFollowers] = useState([]);
	const [followees, setFollowees] = useState([]);
	const [followerCount, setFollowerCount] = useState(null);
	const [followeeCount, setFolloweeCount] = useState(null);
	const [isCurrentUser, setIsCurrentUser] = useState(false);

	function checkCurrentUser() {
		if (otherUser.username === user.username) {
			setIsCurrentUser(true);
		}
	}

	let getFollowers = async (e) => {
		let { response, data } = await api(`/followers/${userID}/`, "GET");
		if (response.status === 200) {
			setFollowers(data);
			setFollowerCount(data.length);
		}
	};

	let getFollowees = async (e) => {
		let { response, data } = await api(`/following/${userID}/`, "GET");
		if (response.status === 200) {
			setFollowees(data);
			setFolloweeCount(data.length);
		}
	};

	const [favourites, setFavourites] = useState([]);
	const [recentlyWatched, setRecentlyWatched] = useState([]);

	let toggleFollow = async () => {
		let { response, data } = await api(`/toggle_follow/${userID}/`, "PUT");
		if (response.status === 200) {
			setFollowing(!following);
		}
	};

	let getIsFollowing = async () => {
		let { response, data } = await api(`/is_following/${userID}/`, "GET");
		if (response.status === 200) {
			setFollowing(data.is_following);
		}
	};

	let getFavourites = async () => {
		let { response, data } = await api(`/favourite_movies/${userID}/`, "GET");
		if (response.status === 200) {
			setFavourites(data);
		}
	};

	let getRecentlyWatched = async () => {
		let { response, data } = await api(`/watched_list/${userID}/`, "GET");
		if (response.status === 200) {
			setRecentlyWatched(data);
		}
	};

	const [userMemberships, setUserMemberships] = useState([]);
	const [userMembershipCount, setUserMembershipCount] = useState(null);

	let getUserMemberships = async () => {
		let { response, data } = await api(
			`/get_user_joined_clubs/${userID}/`,
			"GET"
		);
		if (response.status === 200) {
			setUserMemberships(data);
			setUserMembershipCount(data.length);
		}
	};

	let getUserIcon = async (e) => {
		let { response, data } = await api(`/other_user_gravatars/${userID}/`, "GET");
		if (response.status === 200) {
			setUserIcon(data.gravatar);
		}
	};

	useEffect(() => {
		getUserIcon();
		getOtherUser();
		checkCurrentUser();
		getFollowers();
		getFollowees();
		getFavourites();
		getRecentlyWatched();
		getUserMemberships();
		getIsFollowing();
	}, [otherUser.id, userID]);

	return (
		<Grid container spacing={2} padding={2} direction={"row"}>
			<Grid item xs={6}>
				<Stack spacing={2}>
					<HomepageCard
						title={`${otherUser.first_name} ${otherUser.last_name}`}
						titleItem={
							!isCurrentUser ? (
								<TextButton
									text={following ? "unfollow" : "follow"}
									onClick={() => toggleFollow()}
									style={{ textAlign: "right" }}
								/>
							) : (
								<></>
							)
						}
					>
						<Grid item xs={4}>
							<Avatar
								alt={otherUser.first_name + " " + otherUser.last_name}
								src={userIcon}
								sx={{ width: 1, height: 1 }}
							/>
						</Grid>

						<Grid item xs={8}>
							<Stack direction={"column"} justifyContent={"center"} height={1}>
								<h6 className={"user-detail-heading"}>username</h6>
								<h5 className={"user-detail"}>{otherUser.username}</h5>
							</Stack>
						</Grid>

						<Grid item xs={12}>
							<Stack spacing={1}>
								<Stack>
									<h6 className={"user-detail-heading"}>bio</h6>
									<h5 className={"user-detail"}>{otherUser.bio}</h5>
								</Stack>

								<Stack>
									<h6 className={"user-detail-heading"}>preferences</h6>
									<Box maxHeight={cardHeight / 2} sx={{ overflowY: "auto" }}>
										{otherPreferences.map((e, index) => (
											<Chip label={e} sx={{ mr: 1, mt: 1 }} />
										))}
									</Box>
								</Stack>
							</Stack>
						</Grid>
					</HomepageCard>

					<HomepageCard title={"following"} titleItemText={followeeCount}>
						<Box maxHeight={followeeCount * 100} sx={{ overflowY: "auto" }}>
							{followees.map((user, index) => {
								return (
									<Chip
										key={index}
										label={user.first_name + " " + user.last_name}
										avatar={
											<Avatar
												src={user.gravatar}
												alt={user.first_name + " " + user.last_name}
											/>
										}
										onClick={() => handleChipClick("profile", user.id)}
										sx={{ mr: 1, mt: 1 }}
									/>
								);
							})}
						</Box>
					</HomepageCard>

					<HomepageCard title={"followers"} titleItemText={followerCount}>
						<Box maxHeight={followerCount * 100} sx={{ overflowY: "auto" }}>
							{followers.map((user, index) => {
								return (
									<Chip
										key={"index"}
										label={user.first_name + " " + user.last_name}
										avatar={
											<Avatar
												src={user.gravatar}
												alt={user.first_name + " " + user.last_name}
											/>
										}
										onClick={() => handleChipClick("profile", user.id)}
										sx={{ mr: 1, mt: 1 }}
									/>
								);
							})}
						</Box>
					</HomepageCard>
				</Stack>
			</Grid>

			<Grid item xs={6}>
				<Stack spacing={2}>
					<HomepageCard title={"recently watched"}>
						<Grid item xs={12}>
							<Stack
								direction={"row"}
								spacing={2}
								maxHeight={cardHeight}
								sx={{ overflowX: "auto", overflowY: "hidden" }}
							>
								{recentlyWatched.slice(0, 5).map((movie, index) => {
									return (
										<MovieCard
											key={index}
											poster={moviePoster}
											rateMovie={false}
											clubMovie={false}
											movie={movie}
											animated={true}
										/>
									);
								})}
							</Stack>
						</Grid>
					</HomepageCard>

					<HomepageCard title={"favourites"}>
						<Grid item xs={12}>
							<Stack
								direction={"row"}
								spacing={2}
								maxHeight={cardHeight}
								sx={{ overflowX: "auto", overflowY: "hidden" }}
							>
								{favourites.slice(0, 5).map((movie, index) => {
									return (
										<MovieCard
											key={index}
											poster={moviePoster}
											rateMovie={false}
											clubMovie={false}
											movie={movie}
											animated={true}
										/>
									);
								})}
							</Stack>
						</Grid>
					</HomepageCard>

					<HomepageCard title={"clubs"} titleItemText={userMembershipCount}>
						<Box
							maxHeight={userMembershipCount * 100}
							sx={{ overflowY: "auto" }}
						>
							{userMemberships.map((club, index) => {
								return (
									<Chip
										key={"index"}
										label={club.club_name}
										onClick={() => handleChipClick("clubs", club.id)}
										sx={{ mr: 1, mt: 1 }}
									/>
								);
							})}
						</Box>
					</HomepageCard>
				</Stack>
			</Grid>
		</Grid>
	);
}

export default UserDetail;
