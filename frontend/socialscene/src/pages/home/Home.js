import React, { useContext, useCallback } from 'react';

import "../../styling/pages/Home.css";
import { Rating, Typography, Tooltip, CardHeader, CardMedia, Card, List, Paper, ListSubheader, Grid, TextField, Stack, Box, ListItemButton, ListItemText, Autocomplete, Button } from "@mui/material";
import FormButton from "../../components/FormButton";
import { DummyDashboardClubsData, meetings, movies } from '../data/DummyDashboardClubsData';
import { useState, useEffect } from 'react'
import AuthContext from "../../components/helper/AuthContext";
import CsrfToken from "../../components/helper/CsrfToken";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import moviePoster from '../../styling/images/empty_movie_poster.png';
import { moviesWithPoster } from "../data/DummyMoviesData";
import { useNavigate } from "react-router";
import HomePageTitle from "../../components/HomePageTitle";




const Home = () => {
    const [club_name, setClubName] = useState('');
    const [mission_statement, setMissionStatement] = useState('');
    const [themes, setTheme] = useState('');
    const [club, setClub] = useState('');
    const [myClubData, setMyClubData] = useState([]);
    let { user, authTokens } = useContext(AuthContext)

    useEffect(() => {
    }, [])

    let submitCreateClubForm = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/create_club/', {
            method: 'POST',
            body: JSON.stringify({
                "club_name": e.target.club_name.value,
                "mission_statement": e.target.mission_statement.value,
                "themes": e.target.themes.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access),
                // "X-CSRFToken": Cookies.get("csrftoken"),
            }
        })
        let data = await response.json()
        if (response.status === 200) {
            setClub(data)
        }

    }

    const navigate = useNavigate();
    const moreMovies = useCallback(() => navigate('movies', { replace: false }), [navigate]);
    return (
        <>

            <HomePageTitle title={"home"} />

            <Grid style={{ borderSpacing: 0 }}>

                <Grid container
                    direction={"row"}
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                    spacing={2}
                    padding={2}>

                    <Grid item xs={12}>

                        <Autocomplete
                            freeSolo
                            id="search"
                            disableClearable
                            options={DummyDashboardClubsData.map((movie) => movie.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="🔎︎ Search Clubs"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    {/* <Grid item xs={4}>
                        <div style={{ paddingBottom: '20px' }} className='list-header-text'>
                            My Clubs
                        </div>
                    </Grid> */}

                    <Grid item xs={12}>
                        <div className={"home-page-card-background"}>
                            <Grid container direction={'row'} padding={2}>

                                <Grid item xs={10}>
                                    <h4 className={"home-page-card-title"}>recommended movies:</h4>
                                </Grid>

                                <Grid item xs={2} style={{ paddingBottom: '20px' }}>
                                    <FormButton
                                        text={"more movies"}
                                        onClick={moreMovies}
                                    />
                                </Grid>

                                <Grid container direction={"row"} spacing={1} alignItems={"center"}>
                                    {/* MOVIES RECOMMENDED */}
                                    {moviesWithPoster.map((movie) => {
                                        return (<Grid item>
                                            <Card sx={{ width: 330 }}>
                                                <CardMedia
                                                    component="img"
                                                    height="500"
                                                    image={moviePoster}
                                                    alt={movie.title}
                                                />

                                                <CardHeader title={
                                                    <Tooltip title={movie.title} placement="top-start">
                                                        <Typography noWrap maxWidth={'300px'} fontSize={"25px"}>{movie.title}</Typography>
                                                    </Tooltip>
                                                } />

                                                <div style={{ paddingLeft: "18px", paddingBottom: "10px" }}>

                                                    <Tooltip title={`Rate ${movie.title}`} placement="top-start">
                                                        <Typography noWrap fontSize={"15px"}>Rate {movie.title}</Typography>
                                                    </Tooltip>
                                                    <Rating
                                                        name="simple-controlled"
                                                        precision={0.5}
                                                        max={5}
                                                    // onChange={(event, newValue) => (this.setState({score: newValue, onChange: this.fetchAddRating(movie.id)}))}
                                                    />
                                                </div>

                                                <Box padding={1}>
                                                    <FormButton text={"watch"} />
                                                </Box>
                                            </Card>
                                        </Grid>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;