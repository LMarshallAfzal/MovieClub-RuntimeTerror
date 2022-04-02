import React, {useState} from "react";
import {useNavigate, useParams} from "react-router";
import "../styling/components/UserDetail.css";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Grid,
    ListItemButton,
    ListItemText,
    Paper,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import {moviesWithPoster} from '../resources/data/DummyMoviesData';
import moviePoster from '../resources/images/empty_movie_poster.png';
import {DummyClubMemberData} from "../resources/data/DummyClubMemberData";
import HomepageCard from "./helper/HomepageCard";
import MovieCard from "./MovieCard";
import {DummyClubData} from "../resources/data/DummyClubsData";
import TextButton from "./core/TextButton";
import {DummyDashboardClubsData} from "../resources/data/DummyDashboardClubsData";
import ThemeButton from "./core/ThemeButton";

function UserDetail() {

    let {userID} = useParams();
    let user = DummyClubMemberData.find(obj => obj.ID === userID);

    const navigate = useNavigate();

    const cardHeight = 325;

    const handleChipClick = (type, id) => {
        navigate(`/home/${type}/${id}`, {replace: false});
    }

    const [following, setFollowing] = useState(false);


    return (
        <Grid container
              spacing={2}
              padding={2}
              direction={"row"}
        >

            <Grid item xs={6}>
                <Stack spacing={2}>
                    <HomepageCard title={`${user.firstName} ${user.lastName}`} titleItem={
                        <TextButton
                            text={(following) ? "following" : "follow"}
                            onClick={() => setFollowing(!following)}
                            style={{textAlign: "right"}}
                        />
                    }>
                        <Grid item xs={4}>
                            <Avatar
                                alt={user.firstName + " " + user.lastName}
                                src={user.iconImage}
                                sx={{width: 1, height: 1}}
                            />
                        </Grid>

                        <Grid item xs={8}>
                            <Stack direction={"column"} justifyContent={"center"} height={1}>
                                <h6 className={"user-detail-heading"}>username</h6>
                                <h5 className={"user-detail"}>{user.username}</h5>
                            </Stack>

                        </Grid>

                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <Stack>
                                    <h6 className={"user-detail-heading"}>bio</h6>
                                    <h5 className={"user-detail"}>{user.bio}</h5>
                                </Stack>

                                <Stack>
                                    <h6 className={"user-detail-heading"}>preferences</h6>
                                    <Box maxHeight={cardHeight / 2} sx={{overflowY: "scroll"}}>
                                        <Chip label={"Horror"} sx={{mr: 1, mt: 1}}/>
                                        <Chip label={"Fantasy"} sx={{mr: 1, mt: 1}}/>
                                        <Chip label={"Porn"} sx={{mr: 1, mt: 1}}/>
                                        <Chip label={"Kids"} sx={{mr: 1, mt: 1}}/>
                                        <Chip label={"Action"} sx={{mr: 1, mt: 1}}/>
                                        <Chip label={"Classic"} sx={{mr: 1, mt: 1}}/>
                                    </Box>
                                </Stack>

                            </Stack>

                        </Grid>


                    </HomepageCard>

                    <HomepageCard title={"following"} titleItemText={cardHeight}>
                        <Box maxHeight={cardHeight / 2} sx={{overflowY: "scroll"}}>
                            {DummyClubMemberData.map((user, index) => {
                                return (
                                    <Chip
                                        key={index}
                                        label={user.firstName + " " + user.lastName}
                                        avatar={
                                            <Avatar
                                                src={user.iconImage}
                                                alt={user.firstName + " " + user.lastName}
                                            />}
                                        onClick={() => handleChipClick("profile", user.ID)}
                                        sx={{mr: 1, mt: 1}}
                                    />

                                )
                            })}

                        </Box>
                    </HomepageCard>

                    <HomepageCard title={"followers"} titleItemText={cardHeight}>
                        <Box maxHeight={cardHeight / 2} sx={{overflowY: "scroll"}}>
                            {DummyClubMemberData.map((user, index) => {
                                return (
                                    <Chip
                                        key={"index"}
                                        label={user.firstName + " " + user.lastName}
                                        avatar={
                                            <Avatar
                                                src={user.iconImage}
                                                alt={user.firstName + " " + user.lastName}
                                            />}
                                        onClick={() => handleChipClick("profile", user.ID)}
                                        sx={{mr: 1, mt: 1}}
                                    />

                                )
                            })}

                        </Box>
                    </HomepageCard>
                </Stack>
            </Grid>

            <Grid item xs={6}>
                <Stack spacing={2}>
                    <HomepageCard title={"recently watched"}>
                        <Grid item xs={12}>
                            <Stack direction={"row"}
                                   spacing={2}
                                   height={cardHeight}
                                   sx={{overflowX: "scroll", overflowY: "hidden"}}
                            >
                                {moviesWithPoster.slice(0, 5).map((movie, index) => {
                                    return (
                                        <MovieCard
                                            key={index}
                                            poster={moviePoster}
                                            rateMovie={false}
                                            clubMovie={false}
                                            movie={movie}
                                        />
                                    );
                                })}
                            </Stack>
                        </Grid>
                    </HomepageCard>

                    <HomepageCard title={"favourites"}>
                        <Grid item xs={12}>
                            <Stack direction={"row"}
                                   spacing={2}
                                   height={cardHeight}
                                   sx={{overflowX: "scroll", overflowY: "hidden"}}
                            >
                                {moviesWithPoster.slice(0, 5).map((movie, index) => {
                                    return (
                                        <MovieCard
                                            key={index}
                                            poster={moviePoster}
                                            rateMovie={false}
                                            clubMovie={false}
                                            movie={movie}
                                        />
                                    );
                                })}
                            </Stack>
                        </Grid>
                    </HomepageCard>

                    <HomepageCard title={"clubs"} titleItemText={cardHeight}>
                        <Box maxHeight={cardHeight / 2} sx={{overflowY: "scroll"}}>

                            {DummyClubData.map((club, index) => {
                                return (
                                    <Chip
                                        key={"index"}
                                        label={club.clubName}
                                        avatar={
                                            <Avatar
                                                src={club.iconImage}
                                                alt={club.clubName}
                                            />}
                                        onClick={() => handleChipClick("clubs", club.ID)}
                                        sx={{mr: 1, mt: 1}}
                                    />

                                )
                            })}
                        </Box>
                    </HomepageCard>
                </Stack>
            </Grid>
            {/*</Grid>*/}


            <Grid container
                  spacing={2}
                  direction={"row"}
            >

                <Grid item xs={12} style={{paddingTop: '20px'}}>
                    <div className={"home-page-card-background"} style={{padding: '20px'}}>
                        {/* SUBSTITUTE WITH FIRST NAME AND LAST NAME */}
                        <h4 className={"home-page-card-title"}>{user.firstName || "error"} {user.lastName || "error"}
                            <h4--emphasise>.</h4--emphasise>
                        </h4>

                        <Grid container
                              spacing={2}
                              direction={"row"}
                        >

                            <Grid item xs={12}>
                                <div className='others-profile-info-text'>
                                    <Box sx={{gridRow: '1', gridColumn: 'span 2'}}>
                                        <div className={"profile-image"}>
                                            <Avatar
                                                alt={user.firstName + " " + user.lastName}
                                                src={user.iconImage}
                                                sx={{width: "100%", height: "100%"}}
                                            />
                                        </div>
                                    </Box>

                                    {/* SUBSTITUTE WITH USERNAME */}
                                    <div style={{paddingRight: '20px'}}>{user.username}</div>

                                    {/* IF LOGGED IN USER IS THE *SAME* AS THE USER VIEWED, THEN SHOW THE EDIT BUTTON  */}
                                    <div className={"single-button"}>
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridAutoColumns: '1fr',
                                                gap: 1,
                                            }}
                                        >
                                            <Box sx={{gridRow: '1', gridColumn: 'span 1'}}>
                                                <ThemeButton
                                                    text={"edit"}
                                                    // onClick={editProfile}
                                                />
                                            </Box>
                                        </Box>
                                    </div>

                                    {/* IF LOGGED IN USER IS *NOT* THE SAME AS THE USER VIEWED, THEN SHOW THE FOLLOW BUTTON  */}
                                    <div className={"single-button"}>
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridAutoColumns: '1fr',
                                                gap: 1,
                                            }}
                                        >
                                            <Box sx={{gridRow: '1', gridColumn: 'span 1'}}>
                                                <ThemeButton
                                                    text={"follow"}
                                                    // onClick={this.submitForm}
                                                />
                                            </Box>
                                        </Box>
                                    </div>

                                </div>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={2}>

                                    <Card>
                                        <CardContent>
                                            <Typography sx={{fontSize: 20}} color="text.secondary" gutterBottom>
                                                Preferences:
                                            </Typography>
                                            {/* UNCOMMENT AND SUBSTITUTE WITH USER PREFERENCES */}
                                            {/* {USERPREFERENCES.map((preference) =>
                                    return <Chip style={{margin:'5px'}} label={preference} />
                                    )} */}
                                            <Chip style={{margin: '5px'}} label="Horror"/>
                                            <Chip style={{margin: '5px'}} label="Fantasy"/>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent>
                                            <Typography sx={{fontSize: 20}} color="text.secondary" gutterBottom>
                                                Bio:
                                            </Typography>
                                            <Typography sx={{fontSize: 25}} variant="body2">
                                                {user.bio}
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                    {/* IF LOGGED IN USER IS *NOT* THE SAME AS THE USER VIEWED, THEN SHOW THE MUTUAL CLUBS LIST  */}
                                    <div>
                                        <Typography style={{paddingLeft: '10px'}} sx={{fontSize: 20}}
                                                    color="text.secondary">
                                            Mutual Clubs:
                                        </Typography>
                                    </div>
                                    <Paper style={{maxHeight: 250, overflow: 'auto'}}>
                                        {/* SUBSTITUTE WITH MUTUAL CLUBS DATA */}
                                        {DummyDashboardClubsData.map((val) => {
                                            return (
                                                <ListItemButton>
                                                    <ListItemText primary={val.name}/>
                                                </ListItemButton>
                                            );
                                        })}
                                    </Paper>

                                    <div>
                                        <Typography style={{paddingLeft: '10px'}} sx={{fontSize: 20}}
                                                    color="text.secondary">
                                            {/* SUBSTITUTE 30 WITH NUMBER OF FOLLOWING */}
                                            Following 30
                                        </Typography>
                                    </div>
                                    <Paper style={{maxHeight: 250, overflow: 'auto'}}>
                                        {/* SUBSTITUTE WITH LIST OF PPL THE USER FOLLOWS */}
                                        {DummyDashboardClubsData.map((val) => {
                                            return (
                                                <ListItemButton>
                                                    <ListItemText primary={val.name}/>
                                                </ListItemButton>
                                            );
                                        })}
                                    </Paper>

                                    <div>
                                        <Typography style={{paddingLeft: '10px'}} sx={{fontSize: 20}}
                                                    color="text.secondary">
                                            {/* SUBSTITUTE 30 WITH NUMBER OF FOLLOWERS */}
                                            Followers 30
                                        </Typography>
                                    </div>
                                    <Paper style={{maxHeight: 250, overflow: 'auto'}}>
                                        {/* SUBSTITUTE WITH LIST OF PPL WHO FOLLOWS THE USER*/}
                                        {DummyDashboardClubsData.map((val) => {
                                            return (
                                                <ListItemButton>
                                                    <ListItemText primary={val.name}/>
                                                </ListItemButton>
                                            );
                                        })}
                                    </Paper>

                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Grid container direction={"row"} spacing={1} alignItems={"center"} padding={1}>

                                    <Grid item xs={12}>
                                        <Typography sx={{fontSize: 20}} color="text.secondary">
                                            Recently watched movies:
                                        </Typography>
                                    </Grid>
                                    {/* SUBSTITUTE WITH RECENTLY WATCHED MOVIES */}
                                    {moviesWithPoster.slice(0, 5).map((movie) => {
                                        return (<Grid item>
                                                <Card sx={{width: 150}}>
                                                    <CardMedia
                                                        component="img"
                                                        height="100%"
                                                        image={moviePoster}
                                                        alt={movie.title}
                                                    />

                                                    <CardHeader title={
                                                        <Tooltip title={movie.title} placement="top-start">
                                                            <Typography noWrap maxWidth={"125px"}
                                                                        fontSize="13px">{movie.title}</Typography>
                                                        </Tooltip>
                                                    }/>
                                                </Card>
                                            </Grid>
                                        )
                                    })}

                                    <Grid item xs={12}>
                                        <Typography sx={{fontSize: 20}} color="text.secondary">
                                            Favourite movies:
                                        </Typography>
                                    </Grid>
                                    {/* SUBSTITUTE WITH FAVOURITE MOVIES */}
                                    {moviesWithPoster.slice(0, 5).map((movie) => {
                                        return (<Grid item>
                                                <Card sx={{width: 150}}>
                                                    <CardMedia
                                                        component="img"
                                                        height="100%"
                                                        image={moviePoster}
                                                        alt={movie.title}
                                                    />

                                                    <CardHeader title={
                                                        <Tooltip title={movie.title} placement="top-start">
                                                            <Typography noWrap maxWidth={"125px"}
                                                                        fontSize="13px">{movie.title}</Typography>
                                                        </Tooltip>
                                                    }/>
                                                </Card>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Grid>

                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default UserDetail;