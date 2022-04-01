import React, {useCallback, useContext, useEffect, useState} from "react";
import {Avatar, Box, Card, CardMedia, Chip, Divider, Grid, Rating, Stack, TextField, Tooltip,} from "@mui/material";
import "../styling/components/EventDetail.css";
import {useParams} from "react-router";
import ThemeButton from "./core/ThemeButton";
import MovieWatchRateDialog from "./helper/MovieWatchRateDialog";
import moviePoster from "../resources/images/empty_movie_poster.png";
import AuthContext from "./helper/AuthContext";

function EventDetail() {
    let {user, authTokens} = useContext(AuthContext);
    const [myClubData, setMyClubData] = useState([]);
    const [myMeetingData, setMyMeetingData] = useState({});
    const [specificMovie, setSpecificMovie] = useState("");
    const [organiser, setOrganiser] = useState("");
    const [isOrganiser, setIsOrganiser] = useState(false);
    const [attendees, setAttendees] = useState([]);
    let {clubID} = useParams();

    let getUser = useCallback(
        async (id) => {
            let response = await fetch("http://127.0.0.1:8000/user/" + id + "/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            });
            let data = await response.json();
            setOrganiser(data);
            return data;
        },
        [authTokens]
    );

    useEffect(() => {
        getMembershipData();
        getMeetingData(clubID);
        console.log(myMeetingData.movie);
        //getMovie(myMeetingData.movie);
        console.log(myMeetingData.organiser);
        // console.log("attendees", attendee)
        //getUser(myMeetingData.organiser);
        // getRecommendedMovies()
    }, []);

    useEffect(() => {
        async function fetchAttendees() {
            if (myMeetingData.attendees) {
                setAttendees(await Promise.all(myMeetingData.attendees.map(getUser)));
            }
        }

        fetchAttendees();
    }, [myMeetingData, getUser]);

    const onChange = (e) => {
        setMyMeetingData(fieldData => ({...fieldData, [e.target.name]: e.target.value}));
    };

    let getMembershipData = async () => {
        let response = await fetch(
            "http://127.0.0.1:8000/memberships/" + user.user_id + "/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        setMyClubData(data);
        if (data.is_organiser) {
            setIsOrganiser(true);
        }
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

    let deleteMeeting = async (id) => {
        let response = await fetch(
            "http://127.0.0.1:8000/cancel_meeting/" + id + "/",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authTokens.access,
                },
            }
        );
        let data = await response.json();
        if (response.status === 200) {
            return data;
        } else {
        }
    };

    // let getAttendees = () => {
    // 	setAttendees(myMeetingData.attendees?.map(getUser) ?? []);
    // 	console.log(attendees)
    //   };

    let getMeetingData = async (id) => {
        let response = await fetch(
            "http://127.0.0.1:8000/get_club_upcoming_meeting/" + id + "/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        console.log(data);
        setMyMeetingData(data);
        getMovie(data.movie);
        getUser(data.organiser);
        // getAttendees();
    };

    // let getUser = async (id) => {
    // 	let response = await fetch("http://127.0.0.1:8000/user/" + id + "/", {
    // 		method: "GET",
    // 		headers: {
    // 			"Content-Type": "application/json",
    // 			Authorization: "Bearer " + String(authTokens.access),
    // 		},
    // 	});
    // 	let data = await response.json();
    // 	// console.log(data);
    // 	setOrganiser(data);
    // };

    let getMovie = async (id) => {
        let response = await fetch("http://127.0.0.1:8000/get_movie/" + id + "/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
            },
        });
        let data = await response.json();
        // console.log(data);
        setSpecificMovie(data);
    };

    let editMeeting = async (e) => {
        e.preventDefault();
        let response = await fetch(
            "http://127.0.0.1:8000/edit_meeting/" + clubID + "/",
            {
                method: "PUT",
                body: JSON.stringify({
                    meeting_title: e.target.meeting_title.value,
                    description: e.target.description.value,
                    date: e.target.date.value,
                    start_time: e.target.end_time.value,
                    end_time: e.target.end_time.value,
                    meeting_link: "placeholder",
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        if (response.status === 200) {
            // console.log(data);
            setMyMeetingData(data);
        }
    };


    console.log(myClubData);
    console.log(myMeetingData);
    console.log(specificMovie);

    let club = myClubData.find((obj) => obj.id === clubID);
    // let event = myMeetingData.find(obj => obj.id === club.id);
    // let movie = recommendedMovies.find(obj => obj.id === myMeetingData.movie);
    // console.log(movie)
    // let organiser = DummyClubMemberData.find(obj => obj.ID === event.organiserID);

    const [edit, setEdit] = useState(false);

    const [showPrompt, setShowPrompt] = useState(false);
    const [promptData, setPromptData] = useState("");

    const closePrompt = () => {
        setShowPrompt(false);
    }

    const openEdit = () => {
        setEdit(true);
    }

    const handleSave = () => {
        console.log("form submitted") // substitute with edit meeting
        setEdit(false);
    }

    function EventEditButton() {
        if (organiser === user) { // replace with organiser condition
            return (

                <ThemeButton
                    text={edit ? "save" : "edit"}
                    style={edit ? "primary" : "normal"}
                    onClick={edit ? handleSave : openEdit}/>
            )
        } else {
            return (

                <ThemeButton
                    text={"edit"}
                    style={"disabled"}/>
            )
        }
    }

    function EventDeleteButton() {
        if (organiser === user) { // replace with organiser condition
            return (

                <ThemeButton
                    text={"delete"}
                    onClick={() => {
                        deleteMeeting(clubID);
                    }}
                    style={"primary"}
                />
            )
        } else {
            return (

                <ThemeButton
                    text={"delete"}
                    style={"disabled"}
                />
            )
        }
    }

    function EventFields() {
        if (edit === false) {
            return (
                <Stack spacing={2}>

                    <TextField
                        fullWidth
                        disabled
                        label={"title"}
                        value={myMeetingData.meeting_title}
                        InputProps={{readOnly: true}}
                    />


                    <TextField
                        fullWidth
                        disabled
                        label={"description"}
                        value={myMeetingData.description}
                        InputProps={{readOnly: true}}
                    />


                    <TextField
                        fullWidth
                        disabled
                        label={"date"}
                        type={"date"}
                        value={myMeetingData.date}
                        InputProps={{readOnly: true}}
                        InputLabelProps={{shrink: true}}
                    />


                    <TextField
                        fullWidth
                        disabled
                        label={"start"}
                        type={"time"}
                        value={myMeetingData.start_time}
                        InputProps={{readOnly: true}}
                        InputLabelProps={{shrink: true}}
                    />


                    <TextField
                        fullWidth
                        disabled
                        label={"end"}
                        type={"time"}
                        value={myMeetingData.end_time}
                        InputProps={{readOnly: true}}
                        InputLabelProps={{shrink: true}}
                    />
                </Stack>
            )
        } else {
            return (
                <Stack spacing={2}>
                    {/* form needed?*/}

                    <TextField
                        fullWidth
                        required
                        placeholder={"event title"}
                        label={"title"}
                        name={"meeting_title"}
                        value={myMeetingData.meeting_title}
                        defaultValue={myMeetingData.meeting_title}
                        onChange={e => onChange(e)}
                    />

                    <TextField
                        fullWidth
                        required
                        placeholder={"short event description"}
                        label={"description"}
                        name={"description"}
                        value={myMeetingData.description}
                        defaultValue={myMeetingData.description}
                        onChange={e => onChange(e)}
                    />

                    <TextField
                        fullWidth
                        required
                        label={"date"}
                        type={"date"}
                        name={"date"}
                        value={myMeetingData.date}
                        defaultValue={myMeetingData.date}
                        onChange={e => onChange(e)}
                        InputLabelProps={{shrink: true}}
                    />

                    <TextField
                        fullWidth
                        required
                        label={"start"}
                        type={"time"}
                        name={"start_time"}
                        value={myMeetingData.start_time}
                        defaultValue={myMeetingData.start_time}
                        onChange={e => onChange(e)}
                        InputLabelProps={{shrink: true,}}
                        inputProps={{step: 300,}}
                    />

                    <TextField
                        fullWidth
                        required
                        label={"end"}
                        type={"time"}
                        name={"end_time"}
                        value={myMeetingData.end_time}
                        defaultValue={myMeetingData.end_time}
                        onChange={e => onChange(e)}
                        InputLabelProps={{shrink: true,}}
                        inputProps={{step: 300,}}
                    />
                </Stack>
            )
        }
    }


    return (
        <div className={"home-page-card-background"}>
            <Grid container padding={2} spacing={2}>

                <Grid item xs={10}>
                    <h5 className={"show-event-title"}>coming up:
                        <span className={"show-event-title-movie"}>{myMeetingData.meeting_title}</span>
                    </h5>
                </Grid>

                <Grid item xs={2}>
                    {/*<RoundButton text={event.hasStarted ? "attend" : "join"} linkTo={"/https://zoom.us"}/>*/}
                </Grid>

                <Grid item xs={12}>

                    <Grid container spacing={2}>

                        <Grid item xs={6}>

                            <Grid container spacing={2}>

                                <Grid item xs={12}>

                                    <Card>

                                        <CardMedia
                                            component={"img"}
                                            alt={specificMovie.title}
                                            image={moviePoster}
                                        />

                                        <Stack spacing={1} padding={1} alignItems={"center"}>
                                            <Rating
                                                readOnly
                                                sx={{fontSize: "1.2em"}}
                                                precision={0.5}
                                                name={"read-only"}
                                                // value={movie.rating}
                                            />

                                            <Tooltip title={specificMovie.title} placement="top-start">
                                                <h4 className={"new-event-movie-text"}>{specificMovie.title}</h4>
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
                                                // label={club.clubName} // get club name
                                                sx={{mr: 1, mt: 1}}
                                            />
                                        </Divider>
                                    </Grid>

                                    <Grid item xs={4}>

                                        <Avatar
                                            sx={{width: 1, height: 1}}
                                            src={organiser.iconImage}/>

                                    </Grid>

                                    <Grid item xs={8}>

                                        <h6 className={"show-event-organiser-title"}>organiser</h6>
                                        <h5>{organiser.first_name}</h5>
                                        <h5>{organiser.last_name}</h5>
                                    </Grid>

                                    <Grid item xs={12}>

                                        <EventFields/>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>

                    <Box sx={{border: "1px solid black"}} maxHeight={200} overflow={"auto"} padding={1}>

                        {attendees.map((user) => {
                            return (
                                <Chip
                                    label={user.first_name + " " + user.last_name}
                                    avatar={
                                        <Avatar
                                            src={user.iconImage}
                                            alt={user.first_name + " " + user.last_name}
                                        />
                                    }
                                    sx={{mr: 1, mt: 1}}
                                    color={user.canAttend ? "primary" : "default"}
                                />
                            );
                        })}
                    </Box>
                </Grid>

                <Grid item xs={12}>

                    <Grid container spacing={2}>

                        <Grid item xs={3}>
                            <MovieWatchRateDialog isOpen={showPrompt} onClose={closePrompt} data={promptData}/>

                            <ThemeButton text={"watch"} style={"primary"} onClick={() => {
                                setPromptData(specificMovie);
                                setShowPrompt(true);
                            }}/>
                        </Grid>

                        <Grid item xs={3}>
                            <ThemeButton text={"rate"}/>
                        </Grid>

                        <Grid item xs={3}>

                            <EventEditButton/>
                        </Grid>

                        <Grid item xs={3}>

                            <EventDeleteButton/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default EventDetail;