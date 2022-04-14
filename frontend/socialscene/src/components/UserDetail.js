import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import "../styling/components/UserDetail.css";
import {Avatar, Box, Chip, Grid, Stack,} from "@mui/material";
import moviePoster from "../resources/images/empty_movie_poster.png";
import { DummyClubMemberData } from "../resources/data/DummyClubMemberData";
import HomepageCard from "./helper/HomepageCard";
import MovieCard from "./MovieCard";
import { DummyClubData } from "../resources/data/DummyClubsData";
import TextButton from "./core/TextButton";
import { DummyDashboardClubsData } from "../resources/data/DummyDashboardClubsData";
import ThemeButton from "./core/ThemeButton";
import AuthContext from "../components/helper/AuthContext";

function UserDetail() {
    let {user,authTokens} = useContext(AuthContext);
    let {userID} = useParams();
    const [otherUser, setOtherUser] = useState([]);
    const [otherPreferences, setOtherPreferences] = useState([]);
    let getOtherUser = async (e) => {
        let response = await fetch("http://127.0.0.1:8000/user/" + userID + "/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
            },
        });
        let data = await response.json();
        console.log(data);
        console.log(data.id);
        setOtherUser(data);
        setOtherPreferences(data.preferences);
    };

    const navigate = useNavigate();

    const cardHeight = 325;

    const handleChipClick = (type, id) => {
        navigate(`/home/${type}/${id}`, {replace: false});
    };

  const [following, setFollowing] = useState(false);
  const [userIcon,setUserIcon] = useState(null)
  const [followers, setFollowers] = useState([]);
  const [followees, setFollowees] = useState([]);
  const [followerCount, setFollowerCount] = useState(null);
  const [followeeCount, setFolloweeCount] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

    function checkCurrentUser(){
      if (otherUser.username === user.username){
        setIsCurrentUser(true);
      }
    }
    let getFollowers = async (e) => {
        let response = await fetch(
            "http://127.0.0.1:8000/followers/" + userID + "/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        setFollowers(data);
        console.log(data)
        setFollowerCount(data.length);
    };

    let getFollowees = async (e) => {
        let response = await fetch(
            "http://127.0.0.1:8000/following/" + userID + "/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        setFollowees(data);
        setFolloweeCount(data.length);
    };

    const [favourites, setFavourites] = useState([]);
    const [recentlyWatched, setRecentlyWatched] = useState([]);

  let toggleFollow = async (e) => {
    let response = await fetch("http://127.0.0.1:8000/toggle_follow/" + userID + "/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    console.log(data);
    setFollowing(!following)
  };

  let getIsFollowing = async (e) => {
    let response = await fetch("http://127.0.0.1:8000/is_following/" + userID + "/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
  }
    });
    let data = await response.json();
    setFollowing(data.is_following);
    console.log(data.is_following);

  }

  let getFavourites = async (e) => {
    let response = await fetch(
      "http://127.0.0.1:8000/favourite_movies/" + userID + "/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();
    setFavourites(data);
  };

    let getRecentlyWatched = async (e) => {
        let response = await fetch(
            "http://127.0.0.1:8000/watched_list/" + userID + "/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        setRecentlyWatched(data);
    };

    const [userMemberships, setUserMemberships] = useState([]);
    const [userMembershipCount, setUserMembershipCount] = useState(null);

  let getUserMemberships = async (e) => {
    let response = await fetch(
      "http://127.0.0.1:8000/get_user_joined_clubs/" + userID + "/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();
    setUserMemberships(data);
    setUserMembershipCount(data.length);
  };

  let getUserIcon = async (e) => {
    let response = await fetch(
      "http://127.0.0.1:8000/other_user_gravatars/" + userID + "/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();
    setUserIcon(data.gravatar);
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
  }, [otherUser.id,userID]);

  console.log(userIcon)
  return (
    <Grid container spacing={2} padding={2} direction={"row"}>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <HomepageCard
            title={`${otherUser.first_name} ${otherUser.last_name}`}
            titleItem={
              !isCurrentUser ? 
              <TextButton
                text={following ? "unfollow" : "follow"}
                onClick={() => toggleFollow()}
                style={{ textAlign: "right" }}
              />
              :
              <>
              </>
              
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
                                    <Box maxHeight={cardHeight / 2} sx={{overflowY: "scroll"}}>
                                        {otherPreferences.map((e, index) => (
                                            <Chip label={e} sx={{mr: 1, mt: 1}}/>
                                        ))}
                                    </Box>
                                </Stack>
                            </Stack>
                        </Grid>
                    </HomepageCard>

          <HomepageCard title={"following"} titleItemText={followeeCount}>
            <Box maxHeight={followeeCount * 100} sx={{ overflowY: "scroll" }}>
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
                        <Box maxHeight={followerCount * 100} sx={{overflowY: "scroll"}}>
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
                                        sx={{mr: 1, mt: 1}}
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
                                height={cardHeight}
                                sx={{overflowX: "scroll", overflowY: "hidden"}}
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
                                height={cardHeight}
                                sx={{overflowX: "scroll", overflowY: "hidden"}}
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
                            sx={{overflowY: "scroll"}}
                        >
                            {userMemberships.map((club, index) => {
                                return (
                                    <Chip
                                        key={"index"}
                                        label={club.club_name}
                                        onClick={() => handleChipClick("clubs", club.id)}
                                        sx={{mr: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>
                    </HomepageCard>
                </Stack>
            </Grid>
            {/*</Grid>*/}
        </Grid>
    );
}

export default UserDetail;
