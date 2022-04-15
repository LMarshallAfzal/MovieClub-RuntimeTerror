import React, {useContext, useEffect, useState} from 'react';

import "../../styling/pages/Home.css";
import {Grid, ListItem, Stack} from "@mui/material";
import AuthContext from "../../components/helper/AuthContext";
import moviePoster from '../../resources/images/empty_movie_poster.png';
import ClubCard from "../../components/ClubCard";
import MovieQuote from "../../components/MovieQuote";
import HomepageCard from "../../components/helper/HomepageCard";
import MovieCard from "../../components/MovieCard";
import TextButton from "../../components/core/TextButton";
import useFetch from "../../components/helper/useFetch";


const Home = () => {
    const [club_name, setClubName] = useState('');
    const [mission_statement, setMissionStatement] = useState('');
    const [themes, setTheme] = useState('');
    const [club, setClub] = useState('');
    const [myClubData, setMyClubData] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    let {user, authTokens} = useContext(AuthContext)
    let api = useFetch();

    const cardHeight = 390;

    useEffect(() => {
        getRecommendedMovies();
        getMembershipData();
    }, [])

    let getRecommendedMovies = async () => {
        let {response, data} = await api(`/rec_movies/`, "GET");
        if (response.status === 200) {
            setRecommendedMovies(data);
        }
    };

    let getMembershipData = async () => {
        let {response, data} = await api(`/get_user_joined_clubs/${user.user_id}/`, "GET");
        if (response.status === 200) {
            setMyClubData(data);
        }
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
                                       maxHeight={cardHeight}
                                       sx={{overflowX: "auto", overflowY: "hidden"}}
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
                                                isMember={"M"}
                                                description={club.mission_statement}
                                                clubTheme={club.theme}
                                                ID={club.id}
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