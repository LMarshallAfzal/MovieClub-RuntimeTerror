import React, {useContext, useEffect, useState} from "react";
import {Collapse, Grid, Stack, TextField} from "@mui/material";
import {moviesWithPoster} from "../../resources/data/DummyMoviesData";
import "../../styling/pages/Movies.css";
import moviePoster from "../../resources/images/empty_movie_poster.png";
import AuthContext from "../../components/helper/AuthContext";
import TextButton from "../../components/core/TextButton";
import {Outlet} from "react-router";
import MovieCard from "../../components/MovieCard";
import HomepageCard from "../../components/helper/HomepageCard";
import useFetch from "../../components/helper/useFetch";

const Movies = () => {
    let {user} = useContext(AuthContext);
    let api = useFetch()

    const [rating, setRating] = useState({
        user: user.user_id,
        movie: 0,
        score: null,
    });
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [clubMovies, setClubMovies] = useState([]);
    const [specificClubMovie, setSpecificClubMovie] = useState("");

    useEffect(() => {
        getRecommendedMovies();
        getWatchedMovies();
        getClubMovies();
    }, []);

    let getMovie = async (id) => {
        await api(`/get_movie/${id}/`, "GET");

    }

    let getClubMovies = async (e) => {
        let {response, data} = await api(`/get_user_attending_meetings/`, "GET");
        if (response.status === 200) {
            let array = [];
            data.map((val) => {
                array.push(getMovie(e, val.movie));
            });
            setClubMovies(array);
            console.log(array)
        }
    };

    let getWatchedMovies = async () => {
        let {response, data} = await api(`/watched_list/${user.user_id}/`, "GET");
        if (response.status === 200) {
            setWatchedMovies(data);
        }
    };

    let getRecommendedMovies = async () => {
        let {response, data} = await api(`/rec_movies/`, "GET");
        if (response.status === 200) {
            setRecommendedMovies(data);
        }
    };

    const [openSearch, setOpenSearch] = useState(false);

    const toggleSearch = () => {
        setOpenSearch(!openSearch);
    };

    const openSearchAuto = (text) => {
        text === "" ? setOpenSearch(false) : setOpenSearch(true);
    };

    const [searchValue, setSearchValue] = useState("");

    const cardHeight = 325;
    const rateCardHeight = cardHeight + 65;
    const clubCardHeight = rateCardHeight + 40;

    return (
        <Grid container spacing={2} padding={2}>
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
                                   maxHeight={cardHeight}
                                   sx={{overflowX: "auto", overflowY: "hidden"}}
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
                               maxHeight={clubCardHeight}
                               sx={{overflowX: "auto", overflowY: "hidden"}}
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
                               maxHeight={rateCardHeight}
                               sx={{overflowX: "auto", overflowY: "hidden"}}
                        >
                            {recommendedMovies.map((movie, index) => {
                                return (
                                    <MovieCard
                                        key={index}
                                        poster={moviePoster}
                                        watchMovie={true}
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
                               maxHeight={cardHeight}
                               sx={{overflowX: "auto", overflowY: "hidden"}}
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
