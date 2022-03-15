import React, { Fragment } from "react";
import "../styling/pages/Forum.css";
import { CardMedia, Avatar, Box, Stack, Card, CardContent, TextField, Typography, Grid, Paper, ListItemText, ListItemButton, List, Divider, FormControl, IconButton, Collapse, Alert, Button } from "@mui/material";
import FormButton from "../components/FormButton";
import iconImage from "../styling/testIconPic.jpg";
import { comments, meeting } from './DummyForumData';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import poster from '../styling/jack-giant.jpg';

function Forum() {
    const [open, setOpen] = React.useState(true);

    return (
        <>
            <Grid container>
                <Grid xs={12} item>
                    <div className='others-profile-info-text'>
                        <div style={{ paddingBottom: '20px' }}>Club 1 Forum</div>
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                <Grid xs={12} item style={{ paddingBottom: '20px' }}>
                    <Box sx={{ width: '100%' }}>
                        <Collapse in={open}>
                            <Alert severity="info"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpen(false);
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
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                    <Paper style={{ maxHeight: 550, overflow: 'auto' }} elevation="3">
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
                    </Paper>
                </Grid>
                <Grid xs={12} item>
                    <FormControl fullWidth>
                        <TextField className="text-field"
                            label="Type your comment..."
                            variant="outlined"
                            InputProps={{
                                endAdornment:
                                    < IconButton >
                                        <SendIcon />
                                    </IconButton>
                            }} />
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );

}

export default Forum;
