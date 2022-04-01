import React, {useCallback, useContext, useState} from 'react';

import "../../styling/pages/Home.css";
import {Box, Grid, ImageList, ImageListItem, ListItem, Stack} from "@mui/material";
import ThemeButton from "../../components/core/ThemeButton";
import {movies} from '../../resources/data/DummyDashboardClubsData';
import AuthContext from "../../components/helper/AuthContext";
import moviePoster from '../../resources/images/empty_movie_poster.png';
import moviePlaceholder from '../../resources/images/empty_movie_poster.png';
import {moviesWithPoster} from "../../resources/data/DummyMoviesData";
import {useNavigate} from "react-router";
import {DummyRecommendedMovies} from "../../resources/data/DummyRecommendedMovies";
import {DummyClubData} from "../../resources/data/DummyClubsData";
import ClubCard from "../../components/ClubCard";
import MovieQuote from "../../components/MovieQuote";
import {MovieDataAPI} from "../../components/helper/MovieDataAPI";
import LoadingSkeleton from "../../components/helper/LoadingSkeleton";
import HomepageCard from "../../components/helper/HomepageCard";
import MovieCard from "../../components/MovieCard";
import TextButton from "../../components/core/TextButton";


const Home = () => {
    const [club_name, setClubName] = useState('');
    const [mission_statement, setMissionStatement] = useState('');
    const [themes, setTheme] = useState('');
    const [club, setClub] = useState('');
    const [myClubData, setMyClubData] = useState([]);
    let {user, authTokens} = useContext(AuthContext)

    // useEffect(() => {
    // }, [])

    let submitCreateClubForm = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/create_club/', {
            method: 'POST',
            body: JSON.stringify({
                "club_name": e.target.club_name.value,
                "mission_statement": e.target.mission_statement.value,
                "themes": e.target.themes.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access),
                // "X-CSRFToken": Cookies.get("csrftoken"),
            }
        })
        let data = await response.json()
        if (response.status === 200) {
            setClub(data)
        }

    }


    const navigate = useNavigate();
    const moreMovies = useCallback(() => navigate('movies', {replace: false}), [navigate]);
    const moreClubs = useCallback(() => navigate('clubs', {replace: false}), [navigate]);
    const cardHeight = 390;

    return (
        <Grid container
              direction={"row"}
              justifyContent="space-evenly"
              spacing={2}
              padding={2}
        >


            <Grid item xs={9} height={"inherit"}>
                <Grid container direction={'row'} spacing={2}>

                    {/*<Grid item xs={12}>*/}
                    {/*    <Autocomplete*/}
                    {/*        freeSolo*/}
                    {/*        id="search"*/}
                    {/*        disableClearable*/}
                    {/*        options={DummyDashboardClubsData.map((movie) => movie.name)}*/}
                    {/*        renderInput={(params) => (*/}
                    {/*            <TextField*/}
                    {/*                {...params}*/}
                    {/*                label="search clubs"*/}
                    {/*                InputProps={{*/}
                    {/*                    ...params.InputProps,*/}
                    {/*                    type: 'search',*/}
                    {/*                }}*/}
                    {/*            />*/}
                    {/*        )}*/}
                    {/*    />*/}
                    {/*</Grid>*/}

                    <Grid item xs={12}>
                        <MovieQuote/>
                    </Grid>

                    <Grid item xs={12}>
                        <HomepageCard title={"recommended"} titleItem={
                            <TextButton
                                text={"view movies"}
                                onClick={moreMovies}
                                style={{textAlign: "right"}}
                            />
                        }>
                            <Grid item xs={12}>
                                <Stack direction={"row"}
                                       spacing={2}
                                       height={cardHeight}
                                       sx={{overflowX: "scroll", overflowY: "hidden"}}
                                >
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
                            </Grid>
                        </HomepageCard>
                    </Grid>

                    <Grid item xs={12}>
                        <div className={"home-page-card-background"}>
                            <Grid container direction={"row"} padding={2}>

                                <Grid item xs={9}>
                                    <h5 className={"home-page-card-title"}>your clubs</h5>
                                </Grid>

                                <Grid item xs={3}>
                                    <ThemeButton
                                        text={"view clubs"}
                                        onClick={moreClubs}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Stack direction={"row"}
                                           overflow={"auto"}>
                                        {DummyClubData.map((club) => club.isMember === true && (
                                            <ListItem sx={{width: 'auto', p: 1}}>

                                                <ClubCard
                                                    clubName={club.clubName}
                                                    isMember={club.isMember}
                                                    iconImage={club.iconImage}
                                                    description={club.description}
                                                    isOrganiser={club.isOrganiser}
                                                    memberRole={club.memberRole}
                                                    clubTheme={club.clubTheme}
                                                    ID={club.ID}
                                                />
                                            </ListItem>
                                        ))}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>

                </Grid>
            </Grid>

            <Grid item xs={3} height={1}>
                <Box sx={{overflowY: 'scroll'}}>
                    <ImageList variant="masonry" cols={2} gap={2}>
                        {DummyRecommendedMovies.map((item) => {
                            const movieData = MovieDataAPI(item.IMDB);
                            return (
                                <LoadingSkeleton loading={movieData}>
                                    <ImageListItem key={item.poster}>
                                        <img
                                            src={`${movieData ? movieData.Poster : moviePlaceholder}?w=248&fit=crop&auto=format`}
                                            srcSet={`${movieData ? movieData.Poster : moviePlaceholder}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                </LoadingSkeleton>


                                // <ImageListItem key={item.poster}>
                                //     {(movieData) ? (
                                //         <img
                                //             src={`${movieData.Poster}?w=248&fit=crop&auto=format`}
                                //             srcSet={`${movieData.Poster}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                //             alt={item.title}
                                //             loading="lazy"
                                //         />
                                //     ) : (
                                //         <Skeleton variant="rectangular" height={1} width={1} />
                                //     )}
                                // </ImageListItem>
                            )
                        })}
                    </ImageList>
                </Box>
            </Grid>

        </Grid>
    );
}

export default Home;