import React, {useState, useContext, useEffect} from "react";
import {
    Autocomplete,
    Avatar,
    Box,
    Card,
    CardMedia,
    Chip,
    Divider,
    Grid,
    Rating,
    Stack,
    TextField,
    Tooltip
} from "@mui/material";
import "../styling/components/ShowEvent.css";
import {useParams} from "react-router";
import {DummyClubData} from "../pages/data/DummyClubsData";
import {DummyClubEventData} from "../pages/data/DummyClubEventData";
import {dummyRecommendedMovies} from "../pages/data/DummyRecommendedMovies";
import EnterButton from "./EnterButton";
import FormButton from "./FormButton";
import {DummyClubMemberData} from "../pages/data/DummyClubMemberData";
import AuthContext from "./helper/AuthContext";


function ShowEvent() {
    let {user, authTokens} = useContext(AuthContext);
    const [myClubData, setMyClubData] = useState([]);
    const [myMeetingData, setMyMeetingData] = useState([]);
    const[recommendedMovies, setRecommendedMovies] = useState([]);
    let { clubID } = useParams();


    let getMembershipData = async () => {
        let response = await fetch('http://127.0.0.1:8000/memberships/' + user.user_id +'/', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        console.log(data)
        setMyClubData(data)
    }

    let getMeetingData = async (id) => {
        let response = await fetch('http://127.0.0.1:8000/get_club_upcoming_meeting/' + id +'/', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        console.log(data)
        setMyMeetingData(data)
    }

    let getRecommendedMovies = async () => {
        let response = await fetch('http://127.0.0.1:8000/rec_meeting/' + clubID + '/', {
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


    useEffect(() => {
        getMembershipData()
        getMeetingData(clubID)
        getRecommendedMovies()
    }, [])

    getMembershipData()
    getMeetingData(clubID)
    getRecommendedMovies()
    let club = myClubData.find(obj => obj.id === clubID);
    //let event = DummyClubEventData.find(obj => obj.clubID === club.ID);
    let event = myMeetingData.find(obj => obj.id === club.id);
    let movie = recommendedMovies.find(obj => obj.id === event.movie);
    // let organiser = DummyClubMemberData.find(obj => obj.ID === event.organiserID);

    const [edit, setEdit] = useState(false);

    const toggleEdit = () => {
        setEdit(!edit);
    }


    return (
        <div className={"home-page-card-background"}>
            <Grid container padding={2} spacing={2}>

                <Grid item xs={10}>
                    <h5 className={"show-event-title"}>coming up: <span className={"show-event-title-movie"}>{'event.meeting_title'}</span></h5>
                </Grid>

                <Grid item xs={2}>
                    {/* <EnterButton text={event.hasStarted ? "attend" : "join"} linkTo={"/https://zoom.us"}/> */}
                </Grid>

                <Grid item xs={12}>

                    <Grid container spacing={2}>

                        <Grid item xs={6}>

                            <Grid container spacing={2}>

                                <Grid item xs={12}>

                                    <Card>

                                        <CardMedia component={"img"}
                                                   alt={movie.title}
                                                   image={movie.poster}/>

                                        <Stack spacing={1} padding={1} alignItems={"center"}>
                                            <Rating readOnly
                                                    sx={{fontSize: "1.2em"}}
                                                    precision={0.5}
                                                    name={"read-only"}
                                                    value={movie.rating}/>

                                            <Tooltip title={movie.title} placement="top-start">
                                                <h4 className={"new-event-movie-text"}>{movie.title}</h4>
                                            </Tooltip>

                                        </Stack>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>

                            <Stack spacing={2} sx={{flexDirection: "column", height: "100%"}}>

                                <Grid container spacing={2}>

                                    <Grid item xs={12}>

                                        <Divider>

                                            <Chip
                                                label={'organiser.firstName + " " + organiser.lastName'}
                                                avatar={<Avatar
                                                src={'organiser.iconImage'}
                                                alt={'organiser.firstName + " " + organiser.lastName'}/>}
                                                sx={ {mr: 1, mt: 1}}
                                            />
                                        </Divider>
                                    </Grid>

                                    <Grid item xs={4}>

                                        <Avatar
                                            sx={{ width: 1, height: 1}}
                                            src={'organiser.iconImage'}/>

                                    </Grid>

                                    <Grid item xs={8}>

                                        <h6 className={"show-event-organiser-title"}>organiser:</h6>
                                        <h5>{'organiser.firstName'}</h5>
                                        <h5>{'organiser.lastName'}</h5>
                                    </Grid>

                                    <Grid item xs={12}>

                                        <TextField
                                            fullWidth
                                            id="outlined-read-only-input"
                                            label={"title:"}
                                            value={event.title}
                                            InputProps={{readOnly: true}}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>

                                        <TextField
                                            fullWidth
                                            id="outlined-read-only-input"
                                            label={"description:"}
                                            value={event.description}
                                            InputProps={{readOnly: true}}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>

                                        <TextField
                                            id="date"
                                            label="date:"
                                            type="date"
                                            value={event.date}
                                            fullWidth
                                            InputProps={{readOnly: true}}
                                            InputLabelProps={{shrink: true}}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>

                                        <TextField
                                            id="time"
                                            label="start:"
                                            type="time"
                                            value={event.start}
                                            fullWidth
                                            InputLabelProps={{shrink: true}}
                                            InputProps={{readOnly: true}}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>

                                        <TextField
                                            id="time"
                                            label="end:"
                                            type="time"
                                            value={event.end}
                                            fullWidth
                                            InputLabelProps={{shrink: true}}
                                            InputProps={{readOnly: true}}
                                        />
                                    </Grid>





                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>

                    <Box sx={{border: "1px solid black"}} maxHeight={200} overflow={"auto"} padding={1}>

                        {DummyClubMemberData.map((user) => {return (
                            <Chip label={user.firstName + " " + user.lastName}
                                  avatar={<Avatar
                                      src={user.iconImage}
                                      alt={user.firstName + " " + user.lastName}/>}
                                  sx={ {mr: 1, mt: 1}}
                                  color={user.canAttend ? "primary" : "default"}
                            />
                        )})}
                    </Box>
                </Grid>

                <Grid item xs={12}>

                    <Grid container spacing={2}>

                        <Grid item xs={3}>
                            <FormButton text={"watched"} style={"primary"}/>
                        </Grid>

                        <Grid item xs={3}>
                            <FormButton text={"rate"} />
                        </Grid>

                        <Grid item xs={3}>
                            <FormButton text={edit ? "edit" : "save"} style={edit ? "normal" : "primary"} onClick={toggleEdit}/>
                        </Grid>

                        <Grid item xs={3}>
                            <FormButton text={"delete"}/>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default ShowEvent;