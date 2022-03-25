import React, { useState, useContext, useEffect, number } from "react";
import {IconButton, Box, Collapse, TextField, Grid, Typography, Rating} from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { moviesWithPoster } from "../data/DummyMoviesData";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import "../../styling/pages/Movies.css";
import moviePoster from '../../styling/images/empty_movie_poster.png'
import AuthContext from "../../components/helper/AuthContext";
import FormButton from "../../components/FormButton";

const Movies = () => {
    let { user, authTokens } = useContext(AuthContext);
    const [movie, setMovie] = useState('')
    // const [value, set] = React.useState<'' | null>(2);
    const [rating, setRating] = useState({'user': user.user_id, 'movie': 0, 'score': 0.0});
    const [recommendedMovies, setRecommendedMovies] = useState([]);

    useEffect((e) => {
        // e.preventDefault()
        getRecommendedMovies()
    }, [])


    let getRecommendedMovies = async () => {
        let response = await fetch('http://127.0.0.1:8000/rec_movies/', {
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

    let AddRating = async (id, ratingScore) => {
        let response1 = await fetch('http://127.0.0.1:8000/add_rating/' + id + '/', {
            method: 'POST',
            body: JSON.stringify({
                "user": user.user_id,
                "movie": id,
                "score": ratingScore
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access),
            }
        })
        let data1 = await response1.json();
        setRating(data1);
        let response2 = await fetch('http://127.0.0.1:8000/train/movie/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access),
            }
        })
        await response2.json();
        let response3 = await fetch('http://127.0.0.1:8000/train/meeting/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access),
            }
        })
        await response3.json();        
    }

    const [openSearch, setOpenSearch] = React.useState(false);

    const clickSearch = () => {
        setOpenSearch(true);
    };

    const closeSearch = () => {
        setOpenSearch(false);
    };

    const [searchValue, setSearchValue] = useState('');

    return (
        <Grid container
            justifyContent={"center"}
            alignItems={"flex-start"}
            spacing={2}>

            <Grid item xs={12}>
                <div className={"home-page-title"}>
                    <h3>movies<h3--emphasise>.</h3--emphasise></h3>
                </div>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label={"search"}
                    fullWidth
                    value={searchValue}
                    onChange={event => { setSearchValue(event.target.value) }}
                    InputProps={{
                        endAdornment: <IconButton onClick={clickSearch}>
                            <SearchIcon />
                        </IconButton>
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Collapse in={openSearch} >
                    <div className={"home-page-card-background"}>
                        <Grid container direction={"row"}>

                            <Grid item xs={11}>
                                <h4 className={"home-page-card-title"}>search result:</h4>
                            </Grid>

                            <Grid item xs={1}>
                                <IconButton onClick={closeSearch}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>

                            <Grid container direction={"row"} spacing={1} alignItems={"center"} padding={1}>
                                        {moviesWithPoster.filter((movie) => {
                                if (movie.title.toLowerCase().includes(searchValue.toLowerCase())) {
                                  return movie;
                                }
                            }).map((movie) => {
                                return (<Grid item>
                                        <Card sx={{width: 330}}>
                                            <CardMedia
                                                component="img"
                                                height="500"
                                                image={moviePoster}
                                                alt={movie.title}
                                            />

                                            <CardHeader title={movie.title}/>

                                            <div style={{paddingLeft: "18px", paddingBottom: "10px"}}>

                                                <Typography component="legend">Rate {movie.title}</Typography>
                                                <Rating
                                                    name="simple-controlled"
                                                    precision={0.5}
                                                    max={5}
                                                    // onChange={AddRating(movie.id)}
                                                />
                                                {/*<Typography paddingTop={"10px"} component="legend"> <b>Watch before *Meeting date and time*</b></Typography>*/}
                                            </div>

                                            <Box padding={1}>
                                                <FormButton text={"watch"} />
                                            </Box>
                                        </Card>
                                </Grid>
                                )})}
                            </Grid>
                        </Grid>
                    </div>
                </Collapse >
            </Grid>

            <Grid item xs={12}>
                <div className={"ho(event, newValue) => (this.setState({score: newValue, onChange: this.fetchAddRating(movie.id)}))me-page-card-background"}>
                    <h4 className={"home-page-card-title"}>club movies:</h4>

                    <Grid container direction={"row"} spacing={1} alignItems={"center"} padding={1}>
                        {moviesWithPoster.map((movie) => {
                            return (<Grid item>
                                    <Card sx={{width: 330}}>
                                        <CardMedia
                                            component="img"
                                            height="500"
                                            image={moviePoster}
                                            alt={movie.title}
                                        />

                                        <CardHeader title={movie.title}/>

                                        <div style={{paddingLeft: "18px", paddingBottom: "10px"}}>

                                            <Typography component="legend">Rate {movie.title}</Typography>
                                            <Rating
                                                name="simple-controlled"
                                                precision={0.5}
                                                max={5}
                                                // onChange={(event, newValue) => (this.setState({score: newValue, onChange: this.fetchAddRating(movie.id)}))}
                                            />
                                            <Typography paddingTop={"10px"} component="legend"> <b>Watch before *Meeting date and time*</b></Typography>
                                        </div>

                                        <Box padding={1}>
                                            <FormButton text={"watch"} />
                                        </Box>
                                    </Card>
                            </Grid>
                            )})}
                    </Grid>
                </div>
            </Grid>

            <Grid item xs={12}>
                <div className={"home-page-card-background"}>
                    <h4 className={"home-page-card-title"}>recommended movies:</h4>

                    <Grid container direction={"row"} spacing={1} alignItems={"center"} padding={1}>
                        {recommendedMovies.map((movie) => {
                            return (<Grid item>
                                    <Card sx={{width: 330}}>
                                        <CardMedia
                                            component="img"
                                            height="500"
                                            image={moviePoster}
                                            alt={movie.title}
                                        />

                                        <CardHeader title={movie.title}/>

                                        <div style={{paddingLeft: "18px", paddingBottom: "10px"}}>

                                            <Typography component="legend">Rate {movie.title}</Typography>
                                            <Rating
                                                name="simple-controlled"
                                                precision={0.5}
                                                max={5}
                                                // value={movie.score}
                                                onChange={(event, newValue) => (setRating({score: newValue, onChange: AddRating(movie.id, newValue)}))}
                                            />
                                        </div>

                                        <Box padding={1}>
                                            <FormButton text={"watch"} />
                                        </Box>
                                    </Card>
                            </Grid>
                            )})}
                    </Grid>
                </div>
            </Grid>
        </Grid >
    );
}

export default Movies;
