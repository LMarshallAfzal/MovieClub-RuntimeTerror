import React, { useState, useContext, useEffect } from "react";
import { Tooltip, IconButton, Box, Collapse, TextField, Grid, Typography, Rating } from "@mui/material";
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

    const [openSearch, setOpenSearch] = React.useState(false);

    const clickSearch = () => {
        setOpenSearch(true);
    };

    const closeSearch = () => {
        setOpenSearch(false);
    };

    const [searchValue, setSearchValue] = React.useState('');

    return (
        <>
         <Grid item xs={12} sx={{position: "sticky", top: 0, zIndex: "9000"}}>
                <div className={"home-page-title"} >
                    <h3>movies<h3--emphasise>.</h3--emphasise></h3>
                </div>
            </Grid>

        <Grid container
            justifyContent={"center"}
            alignItems={"flex-start"}
            spacing={2}
              padding={2}
        >

            {/*<Grid item xs={12}>*/}
            {/*    <div className={"home-page-title"}>*/}
            {/*        <h3>movies<h3--emphasise>.</h3--emphasise></h3>*/}
            {/*    </div>*/}
            {/*</Grid>*/}

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
                        <Grid container direction={"row"} padding={2}>

                            <Grid item xs={11}>
                                <h4 className={"home-page-card-title"}>search result:</h4>
                            </Grid>

                            <Grid item xs={1}>
                                <IconButton onClick={closeSearch}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>

                            <Grid container direction={"row"} spacing={1} alignItems={"center"} padding={1}>
                                {/* LIST OF ALL MOVIES */}
                                {moviesWithPoster.filter((movie) => {
                                    if (movie.title.toLowerCase().includes(searchValue.toLowerCase())) {
                                        return movie;
                                    }
                                }).map((movie) => {
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
                                                {/*<Typography paddingTop={"10px"} component="legend"> <b>Watch before *Meeting date and time*</b></Typography>*/}
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
                </Collapse >
            </Grid>

            <Grid item xs={12}>
                <div className={"home-page-card-background"}>
                    <Grid container direction={"row"} padding={2}>
                        <Grid item xs={12}>
                            <h4 className={"home-page-card-title"}>club movies:</h4>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container direction={"row"} spacing={1} alignItems={"center"}>
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
                                        <Typography paddingTop={"10px"} component="legend"> <b>Watch before *Meeting date and time*</b></Typography>
                                    </div>

                                    <Box padding={1}>
                                        <FormButton text={"watch"} />
                                    </Box>
                                </Card>
                            </Grid>
                            )})}
                    </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Grid>

            <Grid item xs={12}>
                <div className={"home-page-card-background"}>
                    <Grid container direction={"row"} padding={2}>
                        <Grid item xs={12}>
                            <h4 className={"home-page-card-title"}>recommended movies:</h4>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container direction={"row"} spacing={1} alignItems={"center"}>
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
                    </Grid>
                </div>
            </Grid>

            <Grid item xs={12}>
                <div className={"home-page-card-background"}>
                    <h4 className={"home-page-card-title"}>watched movies:</h4>

                    <Grid container direction={"row"} spacing={1} alignItems={"center"} padding={1}>
                        {/* LIST OF MOVIES WATCHED BY THE USER */}
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
                                    </div>
                                </Card>
                            </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </Grid>
        </Grid >
            </>
    );
}

export default Movies;
