import React from "react";
import "../../styling/pages/OthersProfile.css";
import { Avatar, Box, Stack, Card, CardContent, TextField, Typography, Grid, Paper, ListItemText, ListItemButton } from "@mui/material";
import FormButton from "../../components/FormButton";
import iconImage from "../../styling/images/testIconPic.jpg";
import { DummyDashboardClubsData, meetings, movies } from './../data/DummyDashboardClubsData';

function OthersProfile() {
    return (
        <table className='others-profile-table' >
            <tr>
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
                    <div style={{padding: '20px'}}>John Doe</div>
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
            </tr>
            <tr>
                <Grid
                    container
                    direction={"row"}
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                </Grid>
            </tr>
        </table >
    );
}

export default OthersProfile;