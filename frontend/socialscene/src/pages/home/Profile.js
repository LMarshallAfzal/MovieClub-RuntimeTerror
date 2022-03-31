import React, { useContext, useState, useEffect } from 'react'
import "../../styling/pages/Profile.css";
import { Tooltip, CardHeader, CardMedia, ListItemText, ListItemButton, Paper, Chip, Typography, CardContent, Card, Avatar, Autocomplete, Box, Stack, TextField, Button, Grid } from "@mui/material";
import ThemeButton from "../../components/core/ThemeButton";
import AuthContext from "../../components/helper/AuthContext";
import { themes } from "../../resources/data/MovieThemes"
import { DummyDashboardClubsData, meetings, movies } from '../../resources/data/DummyDashboardClubsData';
import { moviesWithPoster } from '../../resources/data/DummyMoviesData';
import moviePoster from '../../resources/images/empty_movie_poster.png';
import { DummyClubMemberData } from "../../resources/data/DummyClubMemberData";

const Profile = () => {
    const [userData, setUserData] = useState('')
    let { user, authTokens } = useContext(AuthContext)

    const [usernameError, setUsernameError] = useState(false)
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [bioError, setBioError] = useState(false)
    const [preferencesError, setPreferencesError] = useState(false)

    const [errorUsernameText, setUsernameErrorText] = useState('')
    const [errorFirstNameText, setFirstNameErrorText] = useState('')
    const [errorLastNameText, setLastNameErrorText] = useState('')
    const [errorEmailText, setEmailErrorText] = useState('')
    const [errorBioText, setBioErrorText] = useState('')
    const [errorPreferencesText, setPreferencesErrorText] = useState('')
    const [errorPasswordText, setPasswordErrorText] = useState('')

    const onChange = (e) => {
        setUserData(prevData => ({ ...prevData, [e.target.name]: e.target.value }))
    };

    let resetErrorState = () => {
        setUsernameError(false);
        setFirstNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setBioError(false);
        setPreferencesError(false);

        setUsernameErrorText('');
        setFirstNameErrorText('');
        setLastNameErrorText('');
        setEmailErrorText('');
        setBioErrorText('');
        setPreferencesErrorText('');
    }

    let errorHandler = (e, data) => {
        e.preventDefault()
        if ((Object.keys(data)).includes('username')) {
            setUsernameError(true)
            setUsernameErrorText(data.username)
        }
        if ((Object.keys(data)).includes('first_name')) {
            setFirstNameError(true)
            setFirstNameErrorText(data.first_name)
        }
        if ((Object.keys(data)).includes('last_name')) {
            setLastNameError(true)
            setLastNameErrorText(data.last_name)
        }
        if ((Object.keys(data)).includes('email')) {
            setEmailError(true)
            setEmailErrorText(data.email)
        }
        if ((Object.keys(data)).includes('bio')) {
            setPreferencesError(true)
            setBioErrorText(data.bio)
        }
        if ((Object.keys(data)).includes('preferences')) {
            setPreferencesError(true)
            setPreferencesErrorText(data.preferences)
        }
    };

    let submitChangeProfileForm = async (e) => {
        e.preventDefault();
        resetErrorState();
        let response = await fetch('http://127.0.0.1:8000/edit_profile/' + user.user_id, {
            method: 'PUT',
            body: JSON.stringify({
                "username": userData.username,
                "first_name": userData.first_name,
                "last_name": userData.last_name,
                "email": userData.email,
                "bio": userData.bio,
                "preferences": userData.preferences
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        if (response.status === 200) {
            setUserData(data)
        }
        else {
            errorHandler(e, data)
        }

    }

    let getUserData = async (e) => {
        let response = await fetch("http://127.0.0.1:8000/user/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            }
        })
        let data = await response.json()
        setUserData(data)
    }

    useEffect(() => {
        getUserData();
        // console.log(user)
    }, [])

    return (
            // <Grid container
            //       spacing={2}
            //       padding={2}
            //       direction={"row"}
            // >

                // <Grid item xs={12}>
                    <Grid container
                          spacing={2}
                          padding={2}
                          direction={"row"}
                    >

                        <Grid item xs={6}>
                            <Stack spacing={2}>

                                <Card>
                                    <CardContent>
                                        <form onSubmit={submitChangeProfileForm}>
                                            <Stack spacing={2}>
                                                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                                    Basic information:
                                                </Typography>
                                                <TextField
                                                    error={usernameError}
                                                    helperText={errorUsernameText}
                                                    placeholder={"choose a different username"}
                                                    required
                                                    fullWidth
                                                    id={"outlined-required"}
                                                    label={"username"}
                                                    name={"username"}
                                                    type={"text"}
                                                    value={userData.username}
                                                    defaultValue={userData.username}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={e => onChange(e)}
                                                />

                                                <TextField
                                                    error={firstNameError}
                                                    helperText={errorFirstNameText}
                                                    required
                                                    placeholder={"your first name"}
                                                    id={"outlined-basic"}
                                                    label={"first name"}
                                                    name={"first_name"}
                                                    type={"text"}
                                                    variant={"outlined"}
                                                    value={userData.first_name}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={e => onChange(e)}
                                                    fullWidth
                                                />
                                                <TextField
                                                    error={lastNameError}
                                                    helperText={errorLastNameText}
                                                    required
                                                    placeholder={"your last name"}
                                                    id={"outlined-basic"}
                                                    label={"last name"}
                                                    name={"last_name"}
                                                    type={"text"}
                                                    variant={"outlined"}
                                                    value={userData.last_name}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={e => onChange(e)}
                                                    fullWidth
                                                />

                                                <TextField
                                                    error={emailError}
                                                    helperText={errorEmailText}
                                                    required
                                                    placeholder={"example@socialscene.co.uk"}
                                                    id={"outlined-basic"}
                                                    label={"email"}
                                                    name={"email"}
                                                    type={"email"}
                                                    variant={"outlined"}
                                                    value={userData.email}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={e => onChange(e)}
                                                />

                                                <TextField
                                                    error={bioError}
                                                    helperText={errorBioText}
                                                    id={"outlined-multiline-static"}
                                                    placeholder={"short personal description"}
                                                    label={"bio"}
                                                    name={"bio"}
                                                    multiline
                                                    rows={7.5}
                                                    value={userData.bio}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={e => onChange(e)}
                                                />
                                                <Autocomplete
                                                    multiple
                                                    id="tags-standard"
                                                    options={themes}
                                                    getOptionLabel={(option) => option.theme}
                                                    defaultValue={[themes[0]]}
                                                    filterSelectedOptions
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={preferencesError}
                                                            helperText={errorPreferencesText}
                                                            required
                                                            spacing={6}
                                                            id={"outlined-multiline-static"}
                                                            placeholder={"select or change themes"}
                                                            label={"preferences"}
                                                            name={"preferences"}
                                                            type={"text"}
                                                            variant={"outlined"}
                                                            multiline
                                                            value={userData.preferences}
                                                            onChange={e => onChange(e)}
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

                                    </CardContent>
                                </Card>

                                <div>
                                    <Typography style={{ paddingLeft: '10px' }} sx={{ fontSize: 20 }} color="text.secondary" >
                                        {/* SUBSTITUTE 30 WITH NUMBER OF FOLLOWING */}
                                        My clubs
                                    </Typography>
                                </div>
                                <Paper style={{ maxHeight: 250, overflow: 'auto' }}>
                                    {/* SUBSTITUTE WITH LIST OF PPL THE USER FOLLOWS */}
                                    {DummyDashboardClubsData.map((val) => {
                                        return (
                                            <ListItemButton>
                                                <ListItemText primary={val.name} />
                                            </ListItemButton>
                                        );
                                    })}
                                </Paper>

                                <div>
                                    <Typography style={{ paddingLeft: '10px' }} sx={{ fontSize: 20 }} color="text.secondary" >
                                        {/* SUBSTITUTE 30 WITH NUMBER OF FOLLOWING */}
                                        Following 30
                                    </Typography>
                                </div>
                                <Paper style={{ maxHeight: 250, overflow: 'auto' }}>
                                    {/* SUBSTITUTE WITH LIST OF PPL THE USER FOLLOWS */}
                                    {DummyDashboardClubsData.map((val) => {
                                        return (
                                            <ListItemButton>
                                                <ListItemText primary={val.name} />
                                            </ListItemButton>
                                        );
                                    })}
                                </Paper>

                                <div>
                                    <Typography style={{ paddingLeft: '10px' }} sx={{ fontSize: 20 }} color="text.secondary" >
                                        {/* SUBSTITUTE 30 WITH NUMBER OF FOLLOWERS */}
                                        Followers 30
                                    </Typography>
                                </div>
                                <Paper style={{ maxHeight: 250, overflow: 'auto' }}>
                                    {/* SUBSTITUTE WITH LIST OF PPL WHO FOLLOWS THE USER*/}
                                    {DummyDashboardClubsData.map((val) => {
                                        return (
                                            <ListItemButton>
                                                <ListItemText primary={val.name} />
                                            </ListItemButton>
                                        );
                                    })}
                                </Paper>

                            </Stack>
                        </Grid>

                        <Grid item xs={6}>
                            <Grid container direction={"row"} spacing={1} alignItems={"center"} padding={1}>

                                <Grid item xs={12}>
                                    <Typography sx={{ fontSize: 20 }} color="text.secondary" >
                                        Recently watched movies:
                                    </Typography>
                                </Grid>
                                {/* SUBSTITUTE WITH RECENTLY WATCHED MOVIES */}
                                {moviesWithPoster.slice(0, 5).map((movie) => {
                                    return (<Grid item>
                                        <Card sx={{ width: 150 }}>
                                            <CardMedia
                                                component="img"
                                                height="100%"
                                                image={moviePoster}
                                                alt={movie.title}
                                            />

                                            <CardHeader title={
                                                <Tooltip title={movie.title} placement="top-start">
                                                    <Typography noWrap maxWidth={"125px"} fontSize="13px" >{movie.title}</Typography>
                                                </Tooltip>
                                            } />
                                        </Card>
                                    </Grid>
                                    )
                                })}

                                <Grid item xs={12}>
                                    <Typography sx={{ fontSize: 20 }} color="text.secondary" >
                                        Favourite movies:
                                    </Typography>
                                </Grid>
                                {/* SUBSTITUTE WITH FAVOURITE MOVIES */}
                                {moviesWithPoster.slice(0, 5).map((movie) => {
                                    return (<Grid item>
                                        <Card sx={{ width: 150 }}>
                                            <CardMedia
                                                component="img"
                                                height="100%"
                                                image={moviePoster}
                                                alt={movie.title}
                                            />

                                            <CardHeader title={
                                                <Tooltip title={movie.title} placement="top-start">
                                                    <Typography noWrap maxWidth={"125px"} fontSize="13px" >{movie.title}</Typography>
                                                </Tooltip>
                                            } />
                                        </Card>
                                    </Grid>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                // </Grid>
            // </Grid >
    );
}

export default Profile;
