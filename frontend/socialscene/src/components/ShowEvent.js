import React, {useState} from "react";
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
import {DummyRecommendedMovies} from "../pages/data/DummyRecommendedMovies";
import EnterButton from "./EnterButton";
import FormButton from "./FormButton";
import {DummyClubMemberData} from "../pages/data/DummyClubMemberData";
import MovieWatchRate from "./helper/MovieWatchRate";


function ShowEvent() {
    let { clubID } = useParams();
    let club = DummyClubData.find(obj => obj.ID === clubID);
    let event = DummyClubEventData.find(obj => obj.clubID === club.ID);
    let movie = DummyRecommendedMovies.find(obj => obj.ID === event.movieID);
    let organiser = DummyClubMemberData.find(obj => obj.ID === event.organiserID);
    console.log(movie.title);

    const [edit, setEdit] = useState(false);

    const [showPrompt, setShowPrompt] = useState(false);
    const [promptData, setPromptData] = useState("");

    const closePrompt = () => {
        setShowPrompt(false);
    }

    const toggleEdit = () => {
        setEdit(!edit);
    }

    const handleSave = () => {
        console.log("form submitted")
        setEdit(false);
    }

    function EventEditButton() {
        if (event.isOrganiser) {
            return (

                 <FormButton
                     text={edit ? "save" : "edit"}
                     style={edit ? "primary" : "normal"}
                     onClick={edit ? handleSave : toggleEdit} />
                )
        } else {
            return (

                <FormButton
                    text={"edit"}
                    style={"disabled"} />
            )
        }
    }

    function EventFields() {
        if (edit === false) {
            return (
                <>
                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            id={"outlined-read-only-input"}
                            label={"title"}
                            value={event.title}
                            InputProps={{readOnly: true}}
                        />
                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            id="outlined-read-only-input"
                            label={"description"}
                            value={event.description}
                            InputProps={{readOnly: true}}
                        />
                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            id="date"
                            label="date"
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
                            label="start"
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
                            label="end"
                            type="time"
                            value={event.end}
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            InputProps={{readOnly: true}}
                        />
                    </Grid>
                </>
            )
        } else {
            return (
                <>
                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            required
                            label={"title"}
                            defaultValue={event.title}
                        />
                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            required
                            label={"description"}
                            defaultValue={event.description}
                        />
                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            label={"date"}
                            type={"date"}
                            defaultValue={event.date}
                            fullWidth
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            label={"start"}
                            type={"time"}
                            defaultValue={event.start}
                            fullWidth
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            label={"end"}
                            type={"time"}
                            defaultValue={event.end}
                            fullWidth
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                </>
            )
        }
    }




    return (
        <div className={"home-page-card-background"}>
            <Grid container padding={2} spacing={2}>

                <Grid item xs={10}>
                    <h5 className={"show-event-title"}>coming up: <span className={"show-event-title-movie"}>{event.title}</span></h5>
                </Grid>

                <Grid item xs={2}>
                    <EnterButton text={event.hasStarted ? "attend" : "join"} linkTo={"/https://zoom.us"}/>
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
                                                label={club.clubName}
                                                sx={ {mr: 1, mt: 1}}
                                            />
                                        </Divider>
                                    </Grid>

                                    <Grid item xs={4}>

                                        <Avatar
                                            sx={{ width: 1, height: 1}}
                                            src={organiser.iconImage}/>

                                    </Grid>

                                    <Grid item xs={8}>

                                        <h6 className={"show-event-organiser-title"}>organiser</h6>
                                        <h5>{organiser.firstName}</h5>
                                        <h5>{organiser.lastName}</h5>
                                    </Grid>

                                    <EventFields />

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
                            <MovieWatchRate isOpen={showPrompt} onClose={closePrompt} data={promptData}/>

                            <FormButton text={"watched"} style={"primary"} onClick={() => {
                                setPromptData(movie);
                                setShowPrompt(true);
                            }}/>
                        </Grid>

                        <Grid item xs={3}>

                            <FormButton text={"rate"} />
                        </Grid>

                        <Grid item xs={3}>

                            <EventEditButton />
                        </Grid>

                        <Grid item xs={3}>

                            <FormButton text={"delete"} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default ShowEvent;