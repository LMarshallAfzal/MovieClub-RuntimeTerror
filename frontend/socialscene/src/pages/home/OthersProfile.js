import React from "react";
import "../../styling/pages/OthersProfile.css";
import { Chip, Avatar, Box, Stack, Card, CardContent, TextField, Typography, Grid, Paper, ListItemText, ListItemButton } from "@mui/material";
import FormButton from "../../components/FormButton";
import iconImage from "../../styling/images/testIconPic.jpg";
import { DummyDashboardClubsData, meetings, movies } from './../data/DummyDashboardClubsData';

function OthersProfile() {
    return (
        <>
            <Grid container
                // justifyContent={"center"}
                // alignItems={"flex-start"}
                spacing={2}
                direction={"row"}
            >

                <Grid item xs={12}>
                    <div className={"home-page-title"}>
                        <h3>profile<h3--emphasise>.</h3--emphasise></h3>
                    </div>
                </Grid>

            </Grid>

            <Grid item xs={12} style={{ paddingTop: '20px' }}>
                <div className={"home-page-card-background"} style={{ padding: '20px' }}>
                    <h4 className={"home-page-card-title"}>John Doe</h4>

                    <Grid container
                        // justifyContent={"center"}
                        // alignItems={"flex-start"}
                        spacing={2}
                        direction={"row"}
                    >

                        <Grid item xs={12}>
                            <div className='others-profile-info-text'>
                                <Box sx={{ gridRow: '1', gridColumn: 'span 2' }}>
                                    <div className={"profile-image"}>
                                        <Avatar
                                            // alt={props.firstName + " " + props.lastName}
                                            src={iconImage}
                                            sx={{ width: "100%", height: "100%" }}
                                        />
                                    </div>
                                </Box>
                                <div style={{ paddingRight: '20px' }}>@johndoe</div>
                                <div className={"single-button"}>
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridAutoColumns: '1fr',
                                            gap: 1,
                                        }}
                                    >
                                        <Box sx={{ gridRow: '1', gridColumn: 'span 1' }}>
                                            <FormButton
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
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                            Preferences:
                                        </Typography>
                                        {/* {USERPREFERENCES.map((preference) =>
                                    return <Chip style={{margin:'5px'}} label={preference} />
                                    
                                    )} */}
                                        <Chip style={{ margin: '5px' }} label="Horror" />
                                        <Chip style={{ margin: '5px' }} label="Fantasy" />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                            Bio:
                                        </Typography>
                                        <Typography sx={{ fontSize: 25 }} variant="body2">
                                            The crazy dog jumps over a lazy fox. My bio Lorem Ipsum
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <div>
                                    <Typography style={{ paddingLeft: '10px' }} sx={{ fontSize: 20 }} color="text.secondary" >
                                        Their clubs:
                                    </Typography>
                                </div>
                                <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
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

                        <Grid item xs={6}>
                            <Stack spacing={2}>
                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                            Preferences:
                                        </Typography>
                                        {/* {USERPREFERENCES.map((preference) =>
                                    return <Chip style={{margin:'5px'}} label={preference} />
                                    
                                    )} */}
                                        <Chip style={{ margin: '5px' }} label="Horror" />
                                        <Chip style={{ margin: '5px' }} label="Fantasy" />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                            Bio:
                                        </Typography>
                                        <Typography sx={{ fontSize: 25 }} variant="body2">
                                            The crazy dog jumps over a lazy fox. My bio Lorem Ipsum
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <div>
                                    <Typography style={{ paddingLeft: '10px' }} sx={{ fontSize: 20 }} color="text.secondary" >
                                        Their clubs:
                                    </Typography>
                                </div>
                                <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
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
                        
                    </Grid>
                </div>
            </Grid>
        </>
    );
}

export default OthersProfile;