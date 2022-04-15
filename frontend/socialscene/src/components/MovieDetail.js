import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Box, Card, CardMedia, Grid, Rating, Stack } from "@mui/material";
import "../styling/components/MovieDetail.css";
import moviePoster from "../resources/images/empty_movie_poster.png";
import AuthContext from "./helper/AuthContext";
import useFetch from "./helper/useFetch";
import LoadingSkeleton from "./helper/LoadingSkeleton";
import HomepageCard from "./helper/HomepageCard";
import ThemeButton from "./core/ThemeButton";

function MovieDetail() {
  const params = useParams();
  let { movieID } = useParams();
  const [movie, setMovie] = useState("");
  const [movieAPIData, setMovieAPIData] = useState("");
  const [hasRated, setHasRated] = useState(0);
  const [score, setScore] = useState(0);
  const [hasWatched, setHasWatched] = useState(0);

  let { user, authTokens } = useContext(AuthContext);
  let api = useFetch();

  useEffect(() => {
    getHasWatched();
    getMovie();
    getRating();
    getMovieAPIData();
  }, [hasWatched, movieID, movie.imdb_id, movieAPIData.Poster, hasRated]);

  let addToWatchedList = async () => {
    let {response} = await api(`/add_watched_movie/${movieID}/`, "POST", {
      user: user.user_id,
      movie: movieID,
    });
    if (response.status === 201) {
      setHasWatched(1);
    }
  };

  let removeFromWatchList = async () => {
    let {response} = await api(`/remove_watched_movie/${movieID}/`, "DELETE");
    if (response.status === 200) {
      setHasWatched(2);
    }
  };

  let getHasWatched = async () => {
    let {response} = await api(`/has_watched/${movieID}/`, "GET");
    if (response.status === 200) {
      setHasWatched(1);
    } else {
      setHasWatched(2);
    }
  };

  let getMovie = async () => {
    let {response, data} = await api(`/get_movie/${movieID}/`, "GET");
    if (response.status === 200) {
      setMovie(data);
      if (data.ratings && data.ratings.length) {
        if (data.ratings.includes(user.user_id)) {
          setHasRated(1);
        } else {
          setHasRated(2);
        }
      } else {
        setHasRated(2);
      }
    }
  };


  

  let getRating = async () => {
    let {response, data} = await api(`/get_rating/${movieID}/`, "GET");
    if (response.status === 200) {
      setScore(data.score);
      setHasRated(1);
    } else {
      setHasRated(2);
    }
  };


  let getMovieAPIData = async () => {
    axios
      .get(`http://www.omdbapi.com/?i=tt${movie.imdb_id}&apikey=199b93be`)
      .then((res) => {
        // console.log(res.data);
        setMovieAPIData(res.data);
      });
  };

  let handleRateMovie = async (event, newValue) => {
    if (hasRated === 1) {
      editRating(newValue);
      setHasRated(0);
    } else if (hasRated === 2) {
      addRating(newValue);
      setHasRated(0);
    }
  };

  let editRating = async (newValue) => {
    let response = await api(`/edit_rating/${movieID}/`, "PUT", {
      user: user.user_id,
      movie: movieID,
      score: newValue,
    });
    if (response.status === 200) {
      setScore(newValue);
    }
  };

  let addRating = async (newValue) => {
    let response = await fetch(
      "http://127.0.0.1:8000/add_rating/" + movieID + "/",
      {
        method: "POST",
        body: JSON.stringify({
          user: user.user_id,
          movie: movieID,
          score: newValue,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();
    if (response.status === 200) {
    } else {
      setHasRated(2);
    }
  };

  let addRating = async (newValue) => {
    let response = await api(`/add_rating/${movieID}/`, "POST", {
      user: user.user_id,
      movie: movieID,
      score: newValue,
    });
    if (response.status === 200) {
      setScore(newValue);
    }
  };


  return (
    <Grid container spacing={2} direction={"row"}>
      <Grid item xs={12}>
        <Box padding={1} className={"home-page-sub-title"}>
          <h4 className={"sub-title-text"}>{movie.title}</h4>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Stack
          alignContent={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          justifyItems={"center"}
        >
          <Card sx={{ width: "100%" }}>
            <LoadingSkeleton loading={movieAPIData}>
              <CardMedia
                component="img"
                height="100%"
                image={movieAPIData ? movieAPIData.Poster : moviePoster}
                alt="moviePoster"
              />
            </LoadingSkeleton>
          </Card>
        </Stack>
      </Grid>

      <Grid item xs={8}>
        <HomepageCard title={"details"}>
          <Grid item xs={3}>
            <h6 className={"movie-detail-heading"}>year</h6>
            <h5 className={"movie-detail-content"}>{movieAPIData.Year}</h5>
          </Grid>

          <Grid item xs={3}>
            <h6 className={"movie-detail-heading"}>released</h6>
            <h5 className={"movie-detail-content"}>{movieAPIData.Released}</h5>
          </Grid>

          <Grid item xs={3}>
            <h6 className={"movie-detail-heading"}>runtime</h6>
            <h5 className={"movie-detail-content"}>{movieAPIData.Runtime}</h5>
          </Grid>

          <Grid item xs={3}>
            <h6 className={"movie-detail-heading"}>rated</h6>
            <h5 className={"movie-detail-content"}>{movieAPIData.Rated}</h5>
          </Grid>

          <Grid item xs={12}>
            <h6 className={"movie-detail-heading"}>plot</h6>
            <h5 className={"movie-detail-content"}>{movieAPIData.Plot}</h5>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <Stack>
                <h6 className={"movie-detail-heading"}>genres</h6>
                <h5 className={"movie-detail-content"}>{movieAPIData.Genre}</h5>
              </Stack>

              <Stack>
                <h6 className={"movie-detail-heading"}>directors</h6>
                <h5 className={"movie-detail-content"}>
                  {movieAPIData.Director}
                </h5>
              </Stack>

              <Stack>
                <h6 className={"movie-detail-heading"}>writers</h6>
                <h5 className={"movie-detail-content"}>
                  {movieAPIData.Writer}
                </h5>
              </Stack>

              <Stack>
                <h6 className={"movie-detail-heading"}>actors</h6>
                <h5 className={"movie-detail-content"}>
                  {movieAPIData.Actors}
                </h5>
              </Stack>

              <Stack>
                <h6 className={"movie-detail-heading"}>awards</h6>
                <h5 className={"movie-detail-content"}>
                  {movieAPIData.Awards}
                </h5>
              </Stack>

              <Stack>
                <h6 className={"movie-detail-heading"}>language</h6>
                <h5 className={"movie-detail-content"}>
                  {movieAPIData.Language}
                </h5>
              </Stack>
            </Stack>

            <Grid item xs={2}>
              <h6 className={"movie-detail-heading"}>your rating</h6>
              <Rating
                value={score}
                name="simple-controlled"
                sx={{ width: "100%" }}
                precision={0.5}
                max={5}
                onChange={(event, newValue) => {
                  // console.log("event.target.value is " + event.target.value);
                  // console.log("newValue is " + newValue);
                  handleRateMovie(event, newValue);
                }}
              />
              <ThemeButton
                onClick={() => {
                  hasWatched == 2 ? addToWatchedList() : removeFromWatchList();
                }}
                text={hasWatched == 2 ? "watch" : "unwatch"}
                style={"primary"}
              />
            </Grid>
          </Grid>
        </HomepageCard>
      </Grid>
    </Grid>
  );
}

export default MovieDetail;