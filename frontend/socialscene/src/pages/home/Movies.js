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

    useEffect(() => {
        getRecommendedMovies();
        getWatchedMovies();
    }, []);

    let getWatchedMovies = async () => {
        let response = await fetch("http://127.0.0.1:8000/watched_list/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authTokens.access,
            },
        });
        let data = await response.json();
        setWatchedMovies(data);
    };

    let addToWatchedList = async (id) => {
        let response = await fetch(
            "http://127.0.0.1:8000/add_watched_movie/" + id + "/",
            {
                method: "POST",
                body: JSON.stringify({movie: id, user: user.user_id}),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authTokens.access,
                },
            }
        );
    };

    let editRating = async (id) => {
        let response = await fetch(
            "http://127.0.0.1:8000/edit_rating/" + id + "/",
            {
                method: "PUT",
                body: JSON.stringify({
                    user: user.user_id,
                    movie: id,
                    score: rating.score,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        if (response.status === 200) {
            setRating(data);
        } else {
            setRating({user: user.user_id, movie: id, score: 0.0});
            console.log(rating.score);
        }
    };

    let getRating = async (id) => {
        let response = await fetch("http://127.0.0.1:8000/get_rating/" + id + "/", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + String(authTokens.access),
            },
        });
        let data = await response.json();
        if (response.status === 200) {
            setRating(data);
        } else if (response.status === 400) {
            setRating({user: user.user_id, movie: id, score: 0.0});
            console.log(rating.score);
        } else {
            setRating({user: user.user_id, movie: id, score: 0.0});
            console.log(rating.score);
        }
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

    let AddRating = async (id, ratingScore) => {
        let response1 = await fetch(
            "http://127.0.0.1:8000/add_rating/" + id + "/",
            {
                method: "POST",
                body: JSON.stringify({
                    user: user.user_id,
                    movie: id,
                    score: ratingScore,
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data1 = await response1.json();
        setRating(data1);
        let response2 = await fetch("http://127.0.0.1:8000/train/movie/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + String(authTokens.access),
            },
        });
        await response2.json();
        let response3 = await fetch("http://127.0.0.1:8000/train/meeting/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + String(authTokens.access),
            },
        });
        await response3.json();
    };

    const [openSearch, setOpenSearch] = React.useState(false);

    const toggleSearch = () => {
        setOpenSearch(!openSearch);
    };

    const openSearchCollapse = () => {
        setOpenSearch(true);
    };

    const [searchValue, setSearchValue] = useState("");

    return (
        <Grid container
              spacing={2}
              padding={2}>

            {/* <Grid item xs={12}>
					<ThemeButton linkTo={"/home/movies/movie"}/>
				</Grid> */}

            <Grid item xs={12}>

                <TextField
                    label={"search"}
                    fullWidth
                    value={searchValue}
                    placeholder={"search for a movie"}
                    onChange={(event) => {
                        setSearchValue(event.target.value);
                    }}
                    InputProps={{
                        endAdornment: (
                            <TextButton
                                text={openSearch ? "close" : "open"}
                                onClick={toggleSearch}
                            />
                        ),
                    }}
                />

                <Collapse in={openSearch}>
                    <HomepageCard title={"search result"}>
                        <Stack direction={"row"}
                               spacing={2}
                               paddingBottom={1}
                               overflow={"auto"}
                        >

                            {moviesWithPoster.filter((movie) => {
                                if (movie.title
                                    .toLowerCase()
                                    .includes(searchValue.toLowerCase())
                                ) {
                                    return movie;
                                }
                            }).map((movie) => {
                                return (
                                    <MovieCard
                                        isClubMovie={false}
                                        movie={movie}
                                        poster={moviePoster}
                                    />
                                );
                            })}
                        </Stack>
                    </HomepageCard>
                </Collapse>
            </Grid>

            <Grid item xs={12}>
                <HomepageCard title={"club movies"}>
                    <Stack direction={"row"}
                           spacing={2}
                           paddingBottom={1}
                           overflow={"auto"}>

                        {moviesWithPoster.map((movie) => {
                            return (
                                <MovieCard
                                    isClubMovie={true}
                                    movie={movie}
                                    poster={moviePoster}
                                />
                            );
                        })}
                    </Stack>
                </HomepageCard>
            </Grid>

            <Grid item xs={12}>
                <HomepageCard title={"recommended"}>
                    <Stack direction={"row"}
                           spacing={2}
                           paddingBottom={1}
                           overflow={"auto"}>
                        {moviesWithPoster.map((movie) => {
                            return (
                                <MovieCard
                                    poster={moviePoster}
                                    isClubMovie={false}
                                    movie={movie}
                                />
                            );
                        })}
                    </Stack>
                </HomepageCard>
            </Grid>

            <Grid item xs={12}>
                <HomepageCard title={"watched"}>
                    <Stack direction={"row"}
                           spacing={2}
                           paddingBottom={1}
                           overflow={"auto"}>
                        {moviesWithPoster.map((movie) => {
                            return (
                                <MovieCard
                                    poster={moviePoster}
                                    isClubMovie={false}
                                    movie={movie}
                                />
                            );
                        })}
                    </Stack>
                </HomepageCard>
            </Grid>

            <Grid item xs={12}>
                <Outlet/>
            </Grid>
        </Grid>
    );
};

export default Movies;
