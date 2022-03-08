import React from 'react';
import "../styling/pages/Dashboard.css";
import { List, Paper, ListSubheader, Grid, TextField, Stack, Box, ListItemButton, ListItemText, Autocomplete } from "@mui/material";
import FormButton from "../components/FormButton";
import { DummyDashboardClubsData, meetings, movies } from './DummyDashboardClubsData';
import { useState } from 'react'

function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <Grid className='' style={{ borderSpacing: 0 }}>
            <Grid container direction={"row"} justifyContent="space-evenly"
                alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                    <div className='dashboard-text'>Dashboard</div>
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        freeSolo
                        id="search"
                        disableClearable
                        options={DummyDashboardClubsData.map((movie) => movie.name)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="🔎︎ Search Clubs"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4}>
                    <div style={{ paddingBottom: '20px' }} className='list-header-text'>My Clubs</div>
                    <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
                        {DummyDashboardClubsData.map((val, key) => {
                            return <ListItemButton>
                                <ListItemText primary={val.name} />
                            </ListItemButton>
                        })}
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <div style={{ paddingBottom: '20px' }} className='list-header-text'>Clubs for You</div>
                    <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
                        {DummyDashboardClubsData.map((val, key) => {
                            return <ListItemButton>
                                <ListItemText primary={val.name} />
                            </ListItemButton>
                        })}
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Stack spacing={3}>
                        <div className='list-header-text'>Create new club:</div>
                        <TextField className='dashboard-text-box' id="outlined-basic" label="Name" variant="outlined" />
                        <TextField className='dashboard-text-box' id="outlined-basic" label="Description" variant="outlined" />
                        <TextField className='dashboard-text-box' id="outlined-basic" label="Themes" variant="outlined" />
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
                                        text={"Create"}
                                    // onClick={this.submitForm}
                                    />
                                </Box>
                            </Box>
                        </div>
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    <div style={{ paddingBottom: '20px' }} className='list-header-text'>Meetings</div>
                    <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
                        {meetings.map((val, key) => {
                            return <ListItemButton>
                                <ListItemText primary={`${val.name} | ${val.time} `} />
                            </ListItemButton>
                        })}
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <div style={{ paddingBottom: '20px' }} className='list-header-text'>Watched Movies</div>
                    <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
                        {movies.map((val, key) => {
                            return <ListItemButton>
                                <ListItemText primary={`${val.name} | ${val.ratings} `} />
                            </ListItemButton>
                        })}
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Dashboard;
