import React from 'react';
import "../styling/pages/Dashboard.css";
import { List, Paper, ListSubheader, Grid, TextField, Stack, Box } from "@mui/material";
import FormButton from "../components/FormButton";
import { DummyDashboardClubsData } from './DummyDashboardClubsData';
import { useState } from 'react'

function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <Grid className='' style={{ borderSpacing: 0 }}>
            <Grid container direction={"row"} justifyContent="space-evenly"
                alignItems="flex-start" spacing={4}>
                <Grid item xs={12}>
                    <div className='dashboard-text'>Dashboard</div>
                </Grid>
                <Grid item xs={12}>
                    <div className='search'>
                        <TextField
                            // id="filled-basic"
                            label="🔎︎ Search Clubs"
                            variant="filled"
                            fullWidth
                            onChange={event => {
                                setSearchTerm(event.target.value);
                            }} />
                    </div>
                    {/* {DummyDashboardClubsData.filter((val) => {
                        if (searchTerm == "") {
                            return val
                        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val
                        }
                    }).map((val, key) => {
                        return <div> {val.name} </div>;
                    })} */}
                </Grid>
                <Grid item xs={4}>
                    <Paper style={{ maxHeight: 350, overflow: 'auto' }}>
                        {/* <li> */}
                        <li style={{ listStyleType: 'none', padding: '0', margin: '0' }}>

                            <ListSubheader>My Clubs</ListSubheader>
                            {DummyDashboardClubsData.map((val, key) => {
                                return <List> {val.name} </List>;
                            })}
                        </li>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper style={{ maxHeight: 350, overflow: 'auto' }}>
                        {/* <li> */}
                        <li style={{ listStyleType: 'none', padding: '0', margin: '0' }}>

                            <ListSubheader>Clubs for You</ListSubheader>
                            {DummyDashboardClubsData.map((val, key) => {
                                return <List> {val.name} </List>;
                            })}
                        </li>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Stack spacing={3}>
                        <div className='create-new-club-text'>Create new club:</div>
                        <TextField id="outlined-basic" label="Name" variant="outlined" />
                        <TextField id="outlined-basic" label="Description" variant="outlined" />
                        <TextField id="outlined-basic" label="Themes" variant="outlined" />
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
                    <Paper style={{ maxHeight: 350, overflow: 'auto' }}>
                        <li style={{ listStyleType: 'none', padding: '0', margin: '0' }}>

                            <ListSubheader>Meetings</ListSubheader>
                            {DummyDashboardClubsData.map((val, key) => {
                                return <List> {val.name} </List>;
                            })}
                        </li>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper style={{ maxHeight: 350, overflow: 'auto' }}>
                        <li style={{ listStyleType: 'none', padding: '0', margin: '0' }}>

                            <ListSubheader>Watched Movies</ListSubheader>
                            {DummyDashboardClubsData.map((val, key) => {
                                return <List> {val.name} </List>;
                            })}
                        </li>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Dashboard;
