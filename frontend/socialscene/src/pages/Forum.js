import React, { Fragment } from "react";
import "../styling/pages/Forum.css";
import { Avatar, Box, Stack, Card, CardContent, TextField, Typography, Grid, Paper, ListItemText, ListItemButton, List, Divider, FormControl, IconButton, Collapse, Alert, Button } from "@mui/material";
import FormButton from "../components/FormButton";
import iconImage from "../styling/testIconPic.jpg";
import { comments, meeting } from './DummyForumData';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

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
                <Grid xs={12} item>
                    <Box sx={{ width: '100%' }}>
                        <Collapse in={open}>
                            <Alert
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
                                sx={{ mb: 2 }}
                            >
                                Close me!
                            </Alert>
                        </Collapse>
                    </Box>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={4}
            // direction={"column"}
            >
                <Grid xs={12} item>
                    <Paper style={{ maxHeight: 550, overflow: 'auto' }} elevation="3">
                        {comments.map((val) => {
                            return (
                                <>
                                    <Grid container direction={"row"}>
                                        <Grid item>
                                            <div style={{ alignSelf: "center", width: "50px", padding: "5px" }}>
                                                <Avatar
                                                    // alt={props.firstName + " " + props.lastName}
                                                    src={iconImage}
                                                    sx={{ width: "100%", height: "100%" }}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item>
                                            <div style={{ padding: "10px" }}>
                                                <Typography sx={{ fontSize: 15 }} color="text.secondary">
                                                    {val.user} | {val.time}
                                                </Typography>
                                                <Typography sx={{ fontSize: 20 }} variant="body2">
                                                    {val.message}
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </>
                            );
                        })}
                    </Paper>
                </Grid>
                <Grid xs={11} item>
                    <FormControl fullWidth>
                        <TextField className="text-field"
                            id="outlined-basic"
                            label="Type your comment..."
                            variant="outlined" />
                    </FormControl>
                </Grid>
                <Grid xs={1} item alignItems={"center"}>
                    <IconButton
                        aria-label="post"
                        color="primary">
                        <SendIcon />
                    </IconButton>
                </Grid>
                <Grid item></Grid>
            </Grid>
            {/* <Grid
                container
                direction={"column"}
                justifyContent="space-evenly"
                alignItems="flex"
                spacing={2}
            >
                <Grid item xs={12}>
                    <Stack spacing={2}>
                        <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    username
                                </Typography>
                                <Typography sx={{ fontSize: 25 }} variant="body2">
                                    @johndoe
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    bio
                                </Typography>
                                <Typography sx={{ fontSize: 25 }} variant="body2">
                                    The crazy dog jumps over a lazy fox. My bio Lorem Ipsum
                                </Typography>
                            </CardContent>
                        </Card>
                        <div>
                            Their Clubs
                        </div>
                        <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
                            {DummyDashboardClubsData.map((val) => {
                                return (
                                    <ListItemButton>
                                        <ListItemText primary={val.name} />
                                    </ListItemButton>
                                );
                            })}
                        </Paper>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <div style={{ paddingBottom: '20px' }} >
                        Their Preferences
                    </div>
                    <Paper style={{ maxHeight: 570, overflow: 'auto' }}>
                        {DummyDashboardClubsData.map((val) => {
                            return (
                                <ListItemButton>
                                    <ListItemText primary={val.themes} />
                                </ListItemButton>
                            );
                        })}
                    </Paper>
                </Grid>
            </Grid> */}
        </>
    );

}

export default Forum;
