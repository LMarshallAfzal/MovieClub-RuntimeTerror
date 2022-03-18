import React, { useState, useContext, useEffect } from "react";
import { TextField, Autocomplete, Grid, Button, Typography, Rating } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import "../styling/pages/Movie.css";
import moviePoster from '../styling/empty_movie_poster.png'
import AuthContext from "../components/AuthContext";
import { moviesWithPoster } from "./DummyMoviesData";


const Movies = () => {
    const [movie, setMovie] = useState('')
    const [recommendedMovies, setRecommendedMovies] = useState([])
    let { user, authTokens } = useContext(AuthContext)

    useEffect(() => {
        getRecommendedMovies()
    }, [])


    let getRecommendedMovies = async (e) => {
        let response = await fetch('http://127.0.0.1:8000/rec/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access),
            },
        })
        let data = await response.json()
        console.log(data)
        setRecommendedMovies(data)
    }

    // let AddRating = async (e) => {
    //     const token = JSON.parse(localStorage.getItem('token'))
    //     fetch("http://127.0.0.1:8000/get_movie/" + movie + "/", {
    //         method: 'GET',
    //         headers: { 
    //             'Content-type': 'application/json; charset=UTF8',
    //             Authorization: token
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(specifiedMovie => {
    //         fetch('http://127.0.0.1:8000/add_rating/' + movie + '/', {
    //             method: 'POST',
    //             body: JSON.stringify(this.state),
    //             headers: {
    //                 'Content-Type': 'application/json; charset=UTF-8',
    //                 Authorization: token
    //             },
    //         })
    //         .then(data => data.json())
    //         .then(data => this.setState({score : data.score, movie: specifiedMovie.id}))
    //         .catch(error => console.error(error))
    //     })
    // }
    return (
        <Grid>
            <Grid paddingBottom={"10px"} className="profile-table" style={{ borderSpacing: 0 }}>
                <tr>
                    <div className='page-title'>Movies</div>
                </tr>
            </Grid>
            <Autocomplete
                        freeSolo
                        id="search"
                        disableClearable
                        options={moviesWithPoster.map((movie) => movie.title)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="🔎︎ Search Movies"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                        
                    />
            {/* MOVIES FROM CLUBS TO WATCH */}
            <Grid paddingTop={"20px"} container direction={"row"} spacing={2}>
                <Grid item xs={12}><div className='page-subtitle'>Movies from clubs</div></Grid>
                {/*SUBSTITUTE BELOW moviesWithPoster TO MOVIES FROM CLUBS TO WATCH*/}
                {moviesWithPoster.map((movie) => {
                    return <Grid item>
                        <Card sx={{ maxWidth: 330 }}>
                            <CardMedia
                                component="img"
                                height="500"
                                image={moviePoster}
                                alt={movie.title}
                            />
                            <CardHeader
                                title={movie.title}
                            />
                            <div style={{ paddingLeft: "18px", paddingBottom: "10px" }}>
                                <Typography component="legend">Rate {movie.title}</Typography>
                                <Rating
                                    name="simple-controlled"
                                    precision={0.5}
                                    max={5}
                                // onChange={(event, newValue) => (this.setState({score: newValue, onChange: this.fetchAddRating(movie.id)}))}                                    
                                />
                                <Typography paddingTop={"10px"} component="legend"> <b>Watch before *Meeting date and time*</b></Typography>
                            </div>
                            <Button sx={{ height: 38, width: 330 }} className="watched-button" variant="outlined">Watched?</Button>
                        </Card>
                    </Grid>
                })}
            </Grid>
            {/* MOVIES RECOMMENDED FROM AI TO USER*/}
            <Grid paddingTop={"20px"} container direction={"row"} spacing={2}>
                <Grid item xs={12}><div className='page-subtitle'>Movies recommended for you</div></Grid>
                {/* SUBSTITUTE BELOW moviesWithPoster TO MOVIES RECOMMENDED FROM AI*/}
                {moviesWithPoster.map((movie) => {
                    return <Grid item>
                        <Card sx={{ maxWidth: 330 }}>
                            <CardMedia
                                component="img"
                                height="500"
                                image={moviePoster}
                                alt={movie.title}
                            />
                            <CardHeader
                                title={movie.title}
                            />
                            <div style={{ paddingLeft: "18px", paddingBottom: "10px" }}>
                                <Typography component="legend">Rate {movie.title}</Typography>
                                <Rating
                                    name="simple-controlled"
                                    precision={0.5}
                                    max={5}
                                // onChange={(event, newValue) => (this.setState({score: newValue, onChange: this.fetchAddRating(movie.id)}))}                                    
                                />
                            </div>
                            <Button sx={{ height: 38, width: 330 }} className="watched-button" variant="outlined">Watched?</Button>
                        </Card>
                    </Grid>
                })}
                {/* SEARCH FOR MOVIES AND MARK AS WATCHED AND RATE IT */}

            </Grid>
        </Grid>
    );

}

export default Movies;
