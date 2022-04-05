import React, {useContext, useEffect, useState} from "react";
import "../styling/components/ClubDiscussion.css";
import {useParams} from "react-router";
import {Avatar, Box, Divider, FormControl, Grid, TextField, Typography} from "@mui/material";
import ThemeButton from "./core/ThemeButton";
import iconImage from "../resources/images/testIconPic.jpg";
import TextButton from "./core/TextButton";
import {Outlet} from "react-router-dom";
import AuthContext from "./helper/AuthContext";


function ClubDiscussion() {
    let {user, authTokens} = useContext(AuthContext);
    let [message, setMessage] = useState('');

    const [defaultMessage, setDefaultMessage] = useState('');
    const [userData, setUserData] = useState([]);
    const [dateTime, setDateTime] = useState(new Date(Date.now()));
    const [myClubData, setMyClubData] = useState([]);
    const [messages, setMessages] = useState([]);
    const [myClub, setClub] = useState([]);

    let {clubID} = useParams();


    useEffect(() => {
        getClubMessages()
        getMembershipData()
        getClub()

    }, [])

    console.log(myClubData)

    const onChange = (e, newDateTime) => {
        e.preventDefault();
        setMessage(fieldData => ({...fieldData, [e.target.name]: e.target.value}))
        setDateTime(newDateTime);

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
        console.log(data)
        setMyClubData(data);
    };


    let club = myClubData.find(obj => obj.id === clubID);


    let getClubMessages = async (e) => {
        let response = await fetch('http://127.0.0.1:8000/message_forum/' + clubID + '/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access),
            },
        })
        let data = await response.json()
        setMessages(data)
        let sender_data = data.sender
    }

    let sendClubMessages = async (id) => {
        let response = await fetch('http://127.0.0.1:8000/write_message/' + id + '/', {
            method: 'POST',
            body: JSON.stringify({
                "sender": user.username,
                "club": myClub.id,
                "message": message.message,
                "timestamp": dateTime,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access),
            },
        })
        await response.json()
        getClubMessages(clubID)
        message.message = ""
        console.log(message)
    }

    let getClub = async (e) => {
        let response = await fetch(
            "http://127.0.0.1:8000/club/" + clubID + "/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        setClub(data);
    };

    return (
        <Grid container spacing={2}>

            <Grid item xs={10}>
                <Box padding={1} className={"home-page-sub-title"}>
                    <h4 className={"sub-title-text"}>{myClub.club_name}</h4>
                </Box>
            </Grid>

            <Grid item xs={2}>
                <ThemeButton className={"create-button"}
                             text={"create"}
                             linkTo={"new"}
                />
            </Grid>

            <Grid item xs={7}>
                <Outlet/>
            </Grid>

            <Grid item xs={5}>
                <div className={"home-page-card-background"}>
                    <Grid container padding={2} spacing={2}>

                        <Grid item xs={12}>
                            <h5 className={"home-page-card-title"}>messages</h5>
                        </Grid>

                        <Grid item xs={12}>
                            {messages.map((val) => {
                                return (
                                    <>
                                        <Divider variant="middle">{val.time}</Divider>
                                        <div style={{padding: "10px"}}>
                                            <Grid container direction={"row"}>
                                                <Grid item>
                                                    <div style={{alignSelf: "center", width: "40px", padding: "10px"}}>
                                                        <Avatar
                                                            alt={userData.first_name}
                                                            src={iconImage}
                                                            sx={{width: "100%", height: "100%"}}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <Typography sx={{fontSize: 15}} color="text.secondary">
                                                        {val.sender}
                                                    </Typography>
                                                    <Typography sx={{fontSize: 20}} variant="body2">
                                                        {val.message}
                                                    </Typography>
                                                    <Typography sx={{fontSize: 15}} variant="body2">
                                                        {/* {val.timestamp.slice(11,16) + " " + val.timestamp.slice(0,10) } */}
                                                        {val.timestamp.slice(11, 16) + " | " + val.timestamp.slice(8, 10) + "/" + val.timestamp.slice(5, 7) + "/" + val.timestamp.slice(0, 4)}
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
                                    name="message"
                                    value={message.message}
                                    placeholder={"say something nice"}
                                    variant="outlined"
                                    onChange={(e, dateTime) => onChange(e, dateTime)}
                                    InputProps={{
                                        endAdornment:
                                            <TextButton
                                                onClick={() => sendClubMessages(clubID)}
                                                text={"send"}
                                                style={{textAlign: "right"}}
                                            />
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