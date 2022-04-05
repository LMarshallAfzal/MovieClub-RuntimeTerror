import React, {useContext, useEffect, useState} from "react";
import {Collapse, Grid, Stack, TextField,} from "@mui/material";
import {moviesWithPoster} from "../../resources/data/DummyMoviesData";
import "../../styling/pages/Movies.css";
import moviePoster from "../../resources/images/empty_movie_poster.png";
import AuthContext from "../../components/helper/AuthContext";
import TextButton from "../../components/core/TextButton";
import {Outlet} from "react-router";
import MovieCard from "../../components/MovieCard";
import HomepageCard from "../../components/helper/HomepageCard";


const Movies = () => {
    let {user, authTokens} = useContext(AuthContext);
    const [movie, setMovie] = useState("");
    const [rating, setRating] = useState({
        user: user.user_id,
        movie: 0,
        score: null,
    });
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [clubMovies, setClubMovies] = useState([]);

    useEffect(() => {
        getRecommendedMovies();
        getWatchedMovies();
        getClubMovies();
        console.log(clubMovies)
    }, []);

    let getMovie = async (e, id) => {
        let response = await fetch("http://127.0.0.1:8000/watched_list/get_movie/" + id + "/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authTokens.access,
            },
        });
        await response.json();
    }


    let getClubMovies = async (e) => {
        let response = await fetch("http://127.0.0.1:8000/get_user_attending_meetings/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authTokens.access,
            },
        });
        let data = await response.json();
        console.log(data)
        if (response.status === 200) {
            let array = [];
            data.map((val) => {
                array.push(getMovie(e, val.movie));
            });
            setClubMovies(array);
        }
    };

    let getWatchedMovies = async () => {
        let response = await fetch("http://127.0.0.1:8000/watched_list/" + user.user_id + "/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authTokens.access,
            },
        });
        let data = await response.json();
        setWatchedMovies(data);
    };

    let getRecommendedMovies = async () => {
        let response = await fetch("http://127.0.0.1:8000/rec_movies/", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + String(authTokens.access),
            },
        });
        // .catch(err => console.log(err))
        let data = await response.json();
        console.log(data);
        if (response.status === 200) {
            setRecommendedMovies(data);
        } else {
            alert("Something went wrong");
        }
    };

    const [openSearch, setOpenSearch] = useState(false);

    const toggleSearch = () => {
        setOpenSearch(!openSearch);
    };

    const openSearchAuto = (text) => {
        (text === "") ? setOpenSearch(false) : setOpenSearch(true);
    };


    const [searchValue, setSearchValue] = useState("");

    const cardHeight = 325;
    const rateCardHeight = cardHeight + 65;
    const clubCardHeight = rateCardHeight + 40;

    return (
        <Grid container
              spacing={2}
              padding={2}>

            <Grid item xs={12}>

                <TextField
                    label={"search"}
                    fullWidth
                    value={searchValue}
                    data-testid={"search-bar"}
                    inputProps={{"data-testid": "content-input"}}
                    placeholder={"search for a movie"}
                    onChange={(event) => {
                        setSearchValue(event.target.value);
                        openSearchAuto(event.target.value);
                    }}
                    InputProps={{
                        endAdornment: (
                            <TextButton
                                text={openSearch ? "close" : "open"}
                                onClick={toggleSearch}
                                style={{textAlign: "right"}}
                            />
                        ),
                    }}
                />

                <Collapse in={openSearch}>
                    <HomepageCard title={"search result"}>
                        <Grid item xs={12}>
                            <Stack direction={"row"}
                                   spacing={2}
                                   height={cardHeight}
                                   sx={{overflowX: "scroll", overflowY: "hidden"}}
                            >

                                {moviesWithPoster.filter((movie) => {
                                    if (movie.title
                                        .toLowerCase()
                                        .includes(searchValue.toLowerCase())
                                    ) {
                                        return movie;
                                    }
                                }).map((movie, index) => {
                                    return (
                                        <MovieCard
                                            key={index}
                                            clubMovie={false}
                                            rateMovie={true}
                                            movie={movie}
                                            poster={moviePoster}
                                            animated={true}
                                        />
                                    );
                                })}
                            </Stack>
                        </Grid>
                    </HomepageCard>
                </Collapse>
            </Grid>

            <Grid item xs={12}>
                <HomepageCard title={"club movies"}>
                    <Grid item xs={12}>
                        <Stack direction={"row"}
                               spacing={2}
                               height={clubCardHeight}
                               sx={{overflowX: "scroll", overflowY: "hidden"}}
                        >
                            {clubMovies.map((movie, index) => {
                                return (
                                    <MovieCard
                                        key={index}
                                        clubMovie={true}
                                        rateMovie={true}
                                        movie={movie}
                                        poster={moviePoster}
                                        animated={true}
                                    />
                                );
                            })}
                        </Stack>
                    </Grid>

                </HomepageCard>
            </Grid>

            <Grid item xs={12}>
                <HomepageCard title={"recommended"}>
                    <Grid item xs={12}>
                        <Stack direction={"row"}
                               spacing={2}
                               height={rateCardHeight}
                               sx={{overflowX: "scroll", overflowY: "hidden"}}
                        >
                            {recommendedMovies.map((movie, index) => {
                                return (
                                    <MovieCard
                                        key={index}
                                        poster={moviePoster}
                                        rateMovie={true}
                                        clubMovie={false}
                                        movie={movie}
                                        animated={true}
                                    />
                                );
                            })}
                        </Stack>
                    </Grid>
                </HomepageCard>
            </Grid>

            <Grid item xs={12}>
                <HomepageCard title={"watched"}>
                    <Grid item xs={12}>
                        <Stack direction={"row"}
                               spacing={2}
                               height={cardHeight}
                               sx={{overflowX: "scroll", overflowY: "hidden"}}
                        >
                            {watchedMovies.map((movie, index) => {
                                return (
                                    <MovieCard
                                        key={index}
                                        // poster={moviePoster}
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
            </Grid>

            <Grid item xs={12}>
                <Outlet/>
            </Grid>
        </Grid>
    );
};

export default Movies;
