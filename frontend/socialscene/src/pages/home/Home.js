import React, {useContext, useEffect, useState} from 'react';

import "../../styling/pages/Home.css";
import {Outlet, useParams} from "react-router";
import {Box, Grid, ImageList, ImageListItem, ListItem, Stack} from "@mui/material";
import AuthContext from "../../components/helper/AuthContext";
import moviePoster from '../../resources/images/empty_movie_poster.png';
import ClubCard from "../../components/ClubCard";
import MovieQuote from "../../components/MovieQuote";
import HomepageCard from "../../components/helper/HomepageCard";
import MovieCard from "../../components/MovieCard";
import TextButton from "../../components/core/TextButton";


const Home = () => {
    const [club_name, setClubName] = useState('');
    const [mission_statement, setMissionStatement] = useState('');
    const [themes, setTheme] = useState('');
    const [club, setClub] = useState('');
    const [myClubData, setMyClubData] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    let {user, authTokens} = useContext(AuthContext)

    const cardHeight = 390;

    useEffect(() => {
        getRecommendedMovies();
        getMembershipData();
    }, [])

    let getRecommendedMovies = async () => {
        let response = await fetch("http://127.0.0.1:8000/rec_movies/", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + String(authTokens.access),
            },
        });
        let data = await response.json();
        console.log(data);
        if (response.status === 200) {
            setRecommendedMovies(data);
        } else {
            alert("Something went wrong");
        }
    };

    let getMembershipData = async (e) => {
		let response = await fetch(
			"http://127.0.0.1:8000/get_user_joined_clubs/" + user.user_id + "/",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
        console.log(data.theme)
		setMyClubData(data);
	};

    return (
        <Grid container
              direction={"row"}
              justifyContent="space-evenly"
              spacing={2}
              padding={2}
        >


            <Grid item xs={12}>
                <Grid container direction={'row'} spacing={2}>


                    <Grid item xs={9}>
                        <MovieQuote/>
                    </Grid>

                    {/*<Grid item xs={3} overflow={"hidden"}>*/}
                    {/*    <Box>*/}
                    {/*        <ImageList cols={2} rowHeight={100}>*/}
                    {/*            {DummyRecommendedMovies.map((item) => {*/}
                    {/*                const movieData = MovieDataAPI(item.IMDB);*/}
                    {/*                return (*/}

                    {/*                    <LoadingSkeleton loading={movieData}>*/}
                    {/*                        <ImageListItem key={item.poster}>*/}
                    {/*                            <img*/}
                    {/*                                src={`${movieData ? movieData.Poster : placeHolder}?w=100&h=100&fit=crop&auto=format`}*/}
                    {/*                                srcSet={`${movieData ? movieData.Poster : placeHolder}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}*/}
                    {/*                                alt={item.title}*/}
                    {/*                                loading="lazy"*/}
                    {/*                            />*/}
                    {/*                        </ImageListItem>*/}
                    {/*                    </LoadingSkeleton>*/}
                    {/*                )*/}
                    {/*            })}*/}
                    {/*        </ImageList>*/}
                    {/*    </Box>*/}
                    {/*</Grid>*/}

                    <Grid item xs={12}>
                        <HomepageCard title={"recommended"} titleItem={
                            <TextButton
                                text={"view movies"}
                                linkTo={"/home/movies"}
                                style={{textAlign: "right"}}
                            />
                        }>
                            <Grid item xs={12}>
                                <Stack direction={"row"}
                                       spacing={2}
                                       height={cardHeight}
                                       sx={{overflowX: "scroll", overflowY: "hidden"}}
                                >
                                    {recommendedMovies.map((movie, index) => {
                                        return (
                                            <MovieCard
                                                key={index}
                                                poster={moviePoster}
                                                clubMovie={false}
                                                rateMovie={true}
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
                        <HomepageCard title={"your clubs"} titleItem={
                            <TextButton
                                text={"view clubs"}
                                linkTo={"/home/clubs"}
                                style={{textAlign: "right"}}
                            />
                        }>
                            <Grid item xs={12}>
                                <Stack direction={"row"}
                                       overflow={"auto"}>
                                    {myClubData.map((club, index) => (
                                        <ListItem key={index} sx={{width: 'auto', p: 1}}>

                                            <ClubCard
                                                clubName={club.club_name}
                                                iconImage={club.iconImage}
                                                description={club.mission_statement}
                                                clubTheme={club.theme}
                                                ID={club.ID}
                                            />
                                        </ListItem>
                                    ))}
                                </Stack>
                            </Grid>
                        </HomepageCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}

export default Home;