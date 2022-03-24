import React, {useCallback} from "react";
import {useNavigate} from "react-router";
import "../../styling/pages/OthersProfile.css";
import { Tooltip, Rating, CardHeader, CardMedia, Chip, Avatar, Box, Stack, Card, CardContent, TextField, Typography, Grid, Paper, ListItemText, ListItemButton } from "@mui/material";
import FormButton from "../../components/FormButton";
import iconImage from "../../styling/images/testIconPic.jpg";
import { DummyDashboardClubsData, meetings, movies } from './../data/DummyDashboardClubsData';
import { moviesWithPoster } from '../data/DummyMoviesData';
import moviePoster from '../../styling/images/empty_movie_poster.png';

function OthersProfile() {
    return (
        <>
            <Grid container
                spacing={2}
                direction={"row"}
            >

                <Grid item xs={12}>
                    <div className={"home-page-title"}>
                        <h3>profile<h3--emphasise>.</h3--emphasise></h3>
                    </div>
                </Grid>

            </Grid>

            <Grid item xs={12} style={{ paddingTop: '20px' }}>
                <div className={"home-page-card-background"} style={{ padding: '20px' }}>
                    {/* SUBSTITUTE WITH FIRST NAME AND LAST NAME */}
                    <h4 className={"home-page-card-title"}>John Doe</h4>

                    <Grid container
                        spacing={2}
                        direction={"row"}
                    >

                        <Grid item xs={12}>
                            <div className='others-profile-info-text'>
                                <Box sx={{ gridRow: '1', gridColumn: 'span 2' }}>
                                    <div className={"profile-image"}>
                                        <Avatar
                                            // alt={props.firstName + " " + props.lastName}
                                            src={iconImage}
                                            sx={{ width: "100%", height: "100%" }}
                                        />
                                    </div>
                                </Box>

                                {/* SUBSTITUTE WITH USERNAME */}
                                <div style={{ paddingRight: '20px' }}>@johndoe</div>

                                {/* IF LOGGED IN USER IS THE *SAME* AS THE USER VIEWED, THEN SHOW THE EDIT BUTTON  */}
                                    <div className={"single-button"}>
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridAutoColumns: '1fr',
                                                gap: 1,
                                            }}
                                        >
                                            <Box sx={{ gridRow: '1', gridColumn: 'span 1' }}>
                                                <FormButton
                                                    text={"edit"}
                                                // onClick={editProfile}
                                                />
                                            </Box>
                                        </Box>
                                    </div>

                                {/* IF LOGGED IN USER IS *NOT* THE SAME AS THE USER VIEWED, THEN SHOW THE FOLLOW BUTTON  */}
                                    <div className={"single-button"}>
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridAutoColumns: '1fr',
                                                gap: 1,
                                            }}
                                        >
                                            <Box sx={{ gridRow: '1', gridColumn: 'span 1' }}>
                                                <FormButton
                                                    text={"follow"}
                                                // onClick={this.submitForm}
                                                />
                                            </Box>
                                        </Box>
                                    </div>

                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <Stack spacing={2}>

                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                            Preferences:
                                        </Typography>
                                        {/* UNCOMMENT AND SUBSTITUTE WITH USER PREFERENCES */}
                                        {/* {USERPREFERENCES.map((preference) =>
                                    return <Chip style={{margin:'5px'}} label={preference} />
                                    )} */}
                                        <Chip style={{ margin: '5px' }} label="Horror" />
                                        <Chip style={{ margin: '5px' }} label="Fantasy" />
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                            Bio:
                                        </Typography>
                                        <Typography sx={{ fontSize: 25 }} variant="body2">
                                            {/* SUBSTITUTE WITH USER BIO */}
                                            The crazy dog jumps over a lazy fox. My bio Lorem Ipsum
                                        </Typography>
                                    </CardContent>
                                </Card>
                                
                                {/* IF LOGGED IN USER IS *NOT* THE SAME AS THE USER VIEWED, THEN SHOW THE MUTUAL CLUBS LIST  */}
                                    <div>
                                        <Typography style={{ paddingLeft: '10px' }} sx={{ fontSize: 20 }} color="text.secondary" >
                                            Mutual Clubs:
                                        </Typography>
                                    </div>
                                    <Paper style={{ maxHeight: 250, overflow: 'auto' }}>
                                        {/* SUBSTITUTE WITH MUTUAL CLUBS DATA */}
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
                </div>
            </Grid >
        </>
    );
}

export default OthersProfile;