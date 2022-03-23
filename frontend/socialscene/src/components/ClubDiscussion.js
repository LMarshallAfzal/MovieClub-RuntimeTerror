import React, {useCallback, useState} from "react";
import "../styling/components/ClubDiscussion.css";
import {useParams, useNavigate} from "react-router";
import {DummyClubData} from "../pages/data/DummyClubsData";
import {Avatar, Divider, FormControl, Grid, IconButton, TextField, Typography} from "@mui/material";
import FormButton from "./FormButton";
import {comments} from "../pages/data/DummyForumData";
import iconImage from "../styling/images/testIconPic.jpg";
import TextButton from "./TextButton";
import ShowEvent from "./ShowEvent";
import {Outlet, useLocation} from "react-router-dom";

function ClubDiscussion() {
    // const [showNewMeeting, setNewMeeting] = useState(false);
    // const location = useLocation();

    // const toggleNewMeeting = () => {
    //     setNewMeeting(!showNewMeeting);
    // }

    let { clubID } = useParams();
    let club = DummyClubData.find(obj => obj.ID === clubID);

    const navigate = useNavigate();
    const createNewEvent = useCallback(() => navigate('new', {replace: false}), [navigate]);

    // function NewMeeting() {
    //     console.log(location.pathname);
    //     return location.pathname === `/home/discussion/${clubID}/new` ? (<Outlet/>) : (<ShowEvent/>)
    // }

    return(
        <Grid container
              spacing={2}>

            <Grid item xs={10}>
                <h4 className={"home-page-sub-section-heading"}>{club.clubName}:</h4>
            </Grid>

            <Grid item xs={2}>
                <FormButton className={"create-button"}
                    text={"create"}
                    onClick={createNewEvent}
                />
            </Grid>

            <Grid item xs={7}>
                <div className={"home-page-card-background"}>
                    <Outlet />
                </div>
            </Grid>

            <Grid item xs={5}>
                <div className={"home-page-card-background"}>
                    <Grid container padding={1}>
                        <Grid item xs={12}>
                            <h4 className={"home-page-card-title"}>messages:</h4>
                        </Grid>

                        <Grid item xs={12}>
                            {comments.map((val) => {
                            return (
                                <>
                                    <Divider variant="middle">{val.time}</Divider>
                                    <div style={{ padding: "10px" }}>
                                        <Grid container direction={"row"}>
                                            <Grid item>
                                                <div style={{ alignSelf: "center", width: "40px", padding: "10px" }}>
                                                    <Avatar
                                                        // alt={props.firstName + " " + props.lastName}
                                                        src={iconImage}
                                                        sx={{ width: "100%", height: "100%" }}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item>
                                                <Typography sx={{ fontSize: 15 }} color="text.secondary">
                                                    {val.user}
                                                </Typography>
                                                <Typography sx={{ fontSize: 20 }} variant="body2">
                                                    {val.message}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </>
                            );
                        })}
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    className="text-field"
                                    label="message"
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment:
                                            <TextButton text={"send"}/>
                                }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    )
}

export default ClubDiscussion;