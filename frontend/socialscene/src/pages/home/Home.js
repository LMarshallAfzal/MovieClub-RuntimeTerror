import React, {useContext, useState} from 'react';

import "../../styling/pages/Home.css";
import {Grid, ListItem, Stack} from "@mui/material";
import AuthContext from "../../components/helper/AuthContext";
import moviePoster from '../../resources/images/empty_movie_poster.png';
import {moviesWithPoster} from "../../resources/data/DummyMoviesData";
import {DummyClubData} from "../../resources/data/DummyClubsData";
import ClubCard from "../../components/ClubCard";
import MovieQuote from "../../components/MovieQuote";
import HomepageCard from "../../components/helper/HomepageCard";
import MovieCard from "../../components/MovieCard";
import TextButton from "../../components/core/TextButton";
import {HandleNavigate} from "../../components/helper/HandleNavigate";


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

    const cardHeight = 390;

    return (
        <Grid container
              direction={"row"}
              justifyContent="space-evenly"
              spacing={2}
              padding={2}
        >


            <Grid item xs={12}>
                <Grid container direction={'row'} spacing={2}>


                    <Grid item xs={12}>
                        <MovieQuote/>
                    </Grid>

                    <Grid item xs={12}>
                        <HomepageCard title={"recommended"} titleItem={
                            <TextButton
                                text={"view movies"}
                                onClick={() => HandleNavigate("/home/movies")}
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
                                                clubMovie={false}
                                                rateMovie={true}
                                                movie={movie}
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
                                onClick={() => HandleNavigate("/home/clubs")}
                                style={{textAlign: "right"}}
                            />
                        }>
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

                        </HomepageCard>
                    </Grid>
                </Grid>
            </Grid>

            {/*<Grid item xs={3} height={1}>*/}
            {/*    <Box sx={{overflowY: 'scroll'}}>*/}
            {/*        <ImageList variant="masonry" cols={2} gap={2}>*/}
            {/*            {DummyRecommendedMovies.map((item) => {*/}
            {/*                const movieData = MovieDataAPI(item.IMDB);*/}
            {/*                return (*/}
            {/*                    <LoadingSkeleton loading={movieData}>*/}
            {/*                        <ImageListItem key={item.poster}>*/}
            {/*                            <img*/}
            {/*                                src={`${movieData ? movieData.Poster : moviePlaceholder}?w=248&fit=crop&auto=format`}*/}
            {/*                                srcSet={`${movieData ? movieData.Poster : moviePlaceholder}?w=248&fit=crop&auto=format&dpr=2 2x`}*/}
            {/*                                alt={item.title}*/}
            {/*                                loading="lazy"*/}
            {/*                            />*/}
            {/*                        </ImageListItem>*/}
            {/*                    </LoadingSkeleton>*/}


            {/*                    // <ImageListItem key={item.poster}>*/}
            {/*                    //     {(movieData) ? (*/}
            {/*                    //         <img*/}
            {/*                    //             src={`${movieData.Poster}?w=248&fit=crop&auto=format`}*/}
            {/*                    //             srcSet={`${movieData.Poster}?w=248&fit=crop&auto=format&dpr=2 2x`}*/}
            {/*                    //             alt={item.title}*/}
            {/*                    //             loading="lazy"*/}
            {/*                    //         />*/}
            {/*                    //     ) : (*/}
            {/*                    //         <Skeleton variant="rectangular" height={1} width={1} />*/}
            {/*                    //     )}*/}
            {/*                    // </ImageListItem>*/}
            {/*                )*/}
            {/*            })}*/}
            {/*        </ImageList>*/}
            {/*    </Box>*/}
            {/*</Grid>*/}
        </Grid>
    );
}

export default Home;