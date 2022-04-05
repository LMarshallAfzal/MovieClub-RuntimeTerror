import React, {useContext, useEffect, useState} from "react";
import "../../styling/pages/Profile.css";
import {Autocomplete, Avatar, Box, Chip, Grid, Stack, TextField,} from "@mui/material";
import ThemeButton from "../../components/core/ThemeButton";
import AuthContext from "../../components/helper/AuthContext";
import {themes} from "../../resources/data/MovieThemes";
import moviePoster from "../../resources/images/empty_movie_poster.png";
import MovieCard from "../../components/MovieCard";
import HomepageCard from "../../components/helper/HomepageCard";
import {useNavigate} from "react-router";

const Profile = () => {
    const [userData, setUserData] = useState("");
    let {user, authTokens} = useContext(AuthContext);
    let preferencesValues = [];

    const [watchedMovies, setWatchedMovies] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [followerCount, setFollowerCount] = useState(null);
    const [followingCount, setFollowingCount] = useState(null);
    const [userMemberships, setUserMemberships] = useState([]);
    const [userMembershipCount, setUserMembershipCount] = useState(null);
    const [favouriteMovies, setFavouriteMovies] = useState([]);
    const [usernameError, setUsernameError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [bioError, setBioError] = useState(false);
    const [preferencesError, setPreferencesError] = useState(false);
    const [errorUsernameText, setUsernameErrorText] = useState("");
    const [errorFirstNameText, setFirstNameErrorText] = useState("");
    const [errorLastNameText, setLastNameErrorText] = useState("");
    const [errorEmailText, setEmailErrorText] = useState("");
    const [errorBioText, setBioErrorText] = useState("");
    const [errorPreferencesText, setPreferencesErrorText] = useState("");


    const onChange = (e) => {
        setUserData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChange = (event, value) => {
        let array = [];
        value.map((val) => {
            array.push(val.theme);
        });
        setUserData((fieldData) => ({
            ...fieldData,
            preferences: array,
        }));
    };

    let resetErrorState = () => {
        setUsernameError(false);
        setFirstNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setBioError(false);
        setPreferencesError(false);
        setUsernameErrorText("");
        setFirstNameErrorText("");
        setLastNameErrorText("");
        setEmailErrorText("");
        setBioErrorText("");
        setPreferencesErrorText("");
    };

    let errorHandler = (e, data) => {
        e.preventDefault();
        if (Object.keys(data).includes("username")) {
            setUsernameError(true);
            setUsernameErrorText(data.username);
        }
        if (Object.keys(data).includes("first_name")) {
            setFirstNameError(true);
            setFirstNameErrorText(data.first_name);
        }
        if (Object.keys(data).includes("last_name")) {
            setLastNameError(true);
            setLastNameErrorText(data.last_name);
        }
        if (Object.keys(data).includes("email")) {
            setEmailError(true);
            setEmailErrorText(data.email);
        }
        if (Object.keys(data).includes("bio")) {
            setPreferencesError(true);
            setBioErrorText(data.bio);
        }
        if (Object.keys(data).includes("preferences")) {
            setPreferencesError(true);
            setPreferencesErrorText(data.preferences);
        }
    };


    let getWatchedMovies = async () => {
        let response = await fetch("http://127.0.0.1:8000/watched_list/" + user.user_id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authTokens.access,
            },
        });
        let data = await response.json();
        setWatchedMovies(data);
    };

    let getFavourites = async (e) => {
        let response = await fetch("http://127.0.0.1:8000/favourite_movies/" + user.user_id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authTokens.access,
            },
        });
        let data = await response.json();
        setFavouriteMovies(data);
    };


    let submitChangeProfileForm = async (e) => {
        e.preventDefault();
        resetErrorState();
        let response = await fetch(
            "http://127.0.0.1:8000/edit_profile/" + user.user_id,
            {
                method: "PUT",
                body: JSON.stringify({
                    username: userData.username,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: userData.email,
                    bio: userData.bio,
                    preferences: userData.preferences,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        if (response.status === 200) {
            setUserData(data);
        } else {
            errorHandler(e, data);
        }
    };

    let getUserData = async (e) => {
        let response = await fetch("http://127.0.0.1:8000/user/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
            },
        });
        let data = await response.json();
        setUserData(data);
        let themes2 = themes.map((theme) => theme.theme);
        let preferences = data.preferences.map((preference) =>
            themes2.find((theme) => theme === preference)
        );
        preferences.map((preference) => {
            preferencesValues.push({theme: preference});
        });
    };

    let getUserMemberships = async (e) => {
        let response = await fetch("http://127.0.0.1:8000/memberships/" + user.user_id + "/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
            },
        });
        let data = await response.json();
        setUserMemberships(data);
        setUserMembershipCount(data.length);
    };

    let getFollowers = async (e) => {
        let response = await fetch("http://127.0.0.1:8000/followers/" + user.user_id + "/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
            },
        });
        let data = await response.json();
        setFollowers(data);
        setFollowerCount(data.length);
    }

    let getFollowing = async (e) => {
        let response = await fetch("http://127.0.0.1:8000/following/" + user.user_id + "/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
            },
        });
        let data = await response.json();

        setFollowing(data);
        setFollowingCount(data.length);
    }

    useEffect(() => {
        getUserData();
        getWatchedMovies();
        getUserMemberships();
        getFavourites();
        getFollowers();
        getFollowing();
        getUserMemberships();
    }, []);

    const navigate = useNavigate();

    const cardHeight = 325;

    const handleChipClick = (type, id) => {
        navigate(`/home/${type}/${id}`, {replace: false});
    };


    return (
        <Grid container spacing={2} padding={2} direction={"row"}>
            <Grid item xs={6}>
                <Stack spacing={2}>
                    <HomepageCard title={"details"}>
                        <Grid item xs={12}>
                            <form onSubmit={submitChangeProfileForm}>
                                <Stack spacing={2}>
                                    <TextField
                                        error={usernameError}
                                        helperText={errorUsernameText}
                                        placeholder={"choose a different username"}
                                        required
                                        fullWidth
                                        label={"username"}
                                        name={"username"}
                                        type={"text"}
                                        value={userData.username}
                                        defaultValue={userData.username}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => onChange(e)}
                                    />

                                    <TextField
                                        error={firstNameError}
                                        helperText={errorFirstNameText}
                                        required
                                        placeholder={"your first name"}
                                        label={"first name"}
                                        name={"first_name"}
                                        type={"text"}
                                        variant={"outlined"}
                                        value={userData.first_name}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => onChange(e)}
                                        fullWidth
                                    />
                                    <TextField
                                        error={lastNameError}
                                        helperText={errorLastNameText}
                                        required
                                        placeholder={"your last name"}
                                        label={"last name"}
                                        name={"last_name"}
                                        type={"text"}
                                        variant={"outlined"}
                                        value={userData.last_name}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => onChange(e)}
                                        fullWidth
                                    />

                                    <TextField
                                        error={emailError}
                                        helperText={errorEmailText}
                                        required
                                        placeholder={"example@socialscene.co.uk"}
                                        label={"email"}
                                        name={"email"}
                                        type={"email"}
                                        variant={"outlined"}
                                        value={userData.email}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => onChange(e)}
                                    />

                                    <TextField
                                        error={bioError}
                                        helperText={errorBioText}
                                        placeholder={"short personal description"}
                                        label={"bio"}
                                        name={"bio"}
                                        multiline
                                        rows={4}
                                        value={userData.bio}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => onChange(e)}
                                    />
                                    <Autocomplete
                                        multiple
                                        required
                                        id="tags-standard"
                                        options={themes}
                                        getOptionLabel={(option) => option.theme}
                                        defaultValue={preferencesValues}
                                        value={userData.preferences}
                                        onChange={handleChange}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={preferencesError}
                                                helperText={errorPreferencesText}
                                                spacing={6}
                                                placeholder={"select or change themes"}
                                                label={"preferences"}
                                                name={"preferences"}
                                                type={"text"}
                                                variant={"outlined"}
                                                multiline
                                            />
                                        )}
                                    />
                                    <ThemeButton
                                        text={"save"}
                                        type={"submit"}
                                        style={"primary"}
                                    />
                                </Stack>
                            </form>
                        </Grid>
                    </HomepageCard>

                    <HomepageCard title={"following"} titleItemText={followingCount}>
                        <Box maxHeight={followingCount * 100} sx={{overflowY: "scroll"}}>
                            {following.map((user, index) => {
                                return (
                                    <Chip
                                        key={index}
                                        label={user.first_name + " " + user.last_name}
                                        avatar={
                                            <Avatar
                                                src={user.iconImage}
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

                    <HomepageCard title={"followers"} titleItemText={followerCount}>
                        <Box maxHeight={followerCount * 100} sx={{overflowY: "scroll"}}>
                            {followers.map((user, index) => {
                                return (
                                    <Chip
                                        key={"index"}
                                        label={user.first_name + " " + user.last_name}
                                        avatar={
                                            <Avatar
                                                src={user.iconImage}
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
                                {watchedMovies.slice(0, 5).map((movie, index) => {
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
                                {favouriteMovies.slice(0, 5).map((movie, index) => {
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
                        <Box maxHeight={userMembershipCount * 100} sx={{overflowY: "scroll"}}>
                            {userMemberships.map((club, index) => {
                                return (
                                    <Chip
                                        key={"index"}
                                        label={club.club_name}
                                        avatar={<Avatar src={club.iconImage} alt={club.club_name}/>}
                                        // onClick={() => handleChipClick("clubs", club.ID)}
                                        sx={{mr: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>
                    </HomepageCard>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default Profile;
