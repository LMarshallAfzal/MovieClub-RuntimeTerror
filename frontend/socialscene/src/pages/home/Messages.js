import React, {useState, useContext, useEffect, Fragment} from "react";
import "../../styling/pages/Messages.css";
import { Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CardMedia, Avatar, Box, Card, CardContent, TextField, Typography, Grid, Paper, Divider, FormControl, IconButton, Collapse, Alert, Button } from "@mui/material";
import FormButton from "../../components/FormButton";
import iconImage from "../../styling/images/testIconPic.jpg";
import { comments, meeting } from '../data/DummyForumData';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import AuthContext from "../../components/helper/AuthContext"; 
import poster from '../../styling/images/jack-giant.jpg';

const Messages = () => {
    let {user, authTokens} = useContext(AuthContext)
    let [message, setMessage] = useState('')
    const [defaultMessage, setDefaultMessage] = useState('')
    const [openReminder, setOpenReminder] = useState(true);
    const [userData, setUserData] = useState([])

    const [messages, setMessages] = useState([]);
   
    useEffect(() => {
        getClubMessages()
    },[])

    const [dateTime, setDateTime] = useState(new Date(Date.now()));

    const onChange = (e, newDateTime) => {
        e.preventDefault();
        setMessage( fieldData => ({...fieldData, [e.target.name]: e.target.value}))
        setDateTime(newDateTime);
        
     }; 


    let getClubMessages = async (e) => {
        const club = 2
        let response = await fetch('http://127.0.0.1:8000/message_forum/' + club + '/', {
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

    let sendClubMessages = async () => {
        const club = 2
        let response = await fetch('http://127.0.0.1:8000/write_message/' + club + '/', {
            method: 'POST',
            body:JSON.stringify({
                "sender": user.username, 
                "club": club, 
                "message": message.message,
                "timestamp": dateTime,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access),
            },
        })
        await response.json()
        getClubMessages()
        message.message = ""
        console.log(message)
    }

    return (
        <>
            <Grid
                container
                direction={"row"}
                paddingBottom={"10px"}>
                <Grid item xs={12}>
                <div className={"home-page-title"}>
                    <h3>messages<h3--emphasise>.</h3--emphasise></h3>
                </div>
            </Grid>
                {/* IF NOT YOU ARE THE ORGANISER, HIDE THE BELOW GRID*/}
                {/* <Grid xs={3} item>
                    <div>
                        <div>
                            <FormButton text={"Create new meeting +"} onClick={handleClickOpen}>
                            </FormButton>
                        </div>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Create new meeting</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    You are currently the organiser of this club.
                                    Select one of the recommended movies, and choose a date and the time for the meeting.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <FormButton text={"Cancel"} onClick={handleClose}>
                                </FormButton>
                                <FormButton text={"Create Meeting"} onClick={handleClose}>
                                </FormButton>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Grid> */}
            </Grid>
            <Grid container>
                <Grid xs={12} item style={{ paddingBottom: '10px' }}>
                    <Box sx={{ width: '100%' }} className="meeting-card">
                        <Paper elevation={'5'}>
                            <Collapse in={openReminder}>
                                <Alert severity="info"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpenReminder(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                >
                                    Reminder: Upcoming Meeting!
                                </Alert>
                                <Card sx={{ display: 'flex' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 120 }}
                                        image={poster}
                                        alt="Jack the Giant Slayer"
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} className="meeting-card">
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography sx={{ fontSize: 30 }} component="div" variant="h5">
                                                Jack the Giant Slayer
                                            </Typography>
                                            <Typography sx={{ fontSize: 25 }} component="div" variant="h5">
                                                2014
                                            </Typography>
                                            <Typography sx={{ fontSize: 20 }} variant="h5" color="text.secondary" component="div">
                                                Meeting time:
                                            </Typography>
                                            <Typography sx={{ fontSize: 20 }} variant="h5" color="text.secondary" component="div">
                                                15:00, Wed 13th Jan 2020
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Card>
                            </Collapse>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={4}
                direction={"row"}
                justifyContent={"center"}
            >
                <Grid xs={12} item>
                    <Paper style={{ maxHeight: 800, overflow: 'auto' }} elevation="3">
                        {messages.map((val) => {
                            return (
                                <>
                                    <Divider variant="middle">{val.time}</Divider>
                                    <div style={{ padding: "10px" }}>
                                        <Grid container direction={"row"}>
                                            <Grid item>
                                                <div style={{ alignSelf: "center", width: "40px", padding: "10px" }}>
                                                    <Avatar
                                                        alt={userData.first_name}
                                                        src={iconImage}
                                                        sx={{ width: "100%", height: "100%" }}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item>
                                                <Typography sx={{ fontSize: 15 }} color="text.secondary">
                                                    {val.sender}
                                                </Typography>
                                                <Typography sx={{ fontSize: 20 }} variant="body2">
                                                    {val.message}
                                                </Typography>
                                                <Typography sx={{ fontSize: 15 }} variant="body2">
                                                    {/* {val.timestamp.slice(11,16) + " " + val.timestamp.slice(0,10) } */}
                                                    {val.timestamp.slice(11,16) + " | " + val.timestamp.slice(8,10) + "/" + val.timestamp.slice(5,7) + "/" + val.timestamp.slice(0,4)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </>
                            );
                        })}
                    </Paper>
                </Grid>
                <Grid xs={12} item>
                    <FormControl fullWidth>
                        <TextField className="text-field"
                            label="Type your comment..."
                            variant="outlined"
                            name="message"
                            value={message.message}
                            onChange={(e, dateTime) => onChange(e, dateTime)}
                            InputProps={{
                                endAdornment:
                                <div >
                                    < Button onClick={sendClubMessages} >
                                        <SendIcon />
                                    </Button>
                                </div>
                            }} 
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
}

export default Messages;