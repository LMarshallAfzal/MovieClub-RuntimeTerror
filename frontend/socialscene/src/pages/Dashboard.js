import React from 'react';
import "../styling/pages/Dashboard.css";
import { List, Paper, ListSubheader, Grid, TextField, Stack, Box, ListItemButton, ListItemText, Autocomplete } from "@mui/material";
import FormButton from "../components/FormButton";
import { DummyDashboardClubsData, meetings, movies } from './DummyDashboardClubsData';
import { useState } from 'react'




class Dashboard extends React.Component {

    constructor() {
        super()
        this.state = {
            club_name:'',
            mission_statement:'',
            themes:'',
            myClubData: [],
        }
        this.changeHandler=this.changeHandler.bind(this)
        this.submitForm=this.submitForm.bind(this)
    }

    //const [searchTerm, setSearchTerm] = useState('')

    changeHandler(event) {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    submitForm() {
        const userData = JSON.parse(localStorage.getItem('user'))
        fetch('http://127.0.0.1:8000/create_club/',{
            method:'POST',
            body:JSON.stringify(this.state),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response=>response.text())
        .then((data)=>console.log(data))
        localStorage.setItem('clubs', JSON.stringify({club_name:this.state.club_name, mission_statement: this.state.mission_statement, themes: this.state.theme, club_owner: userData}))
        this.setState({
            club_name:'',
            mission_statement:'',
            themes:'',
        })
        console.log(this.state)
    }

    fetchMembershipData() {
        const userData = JSON.parse(localStorage.getItem('user'))
        fetch('http://127.0.0.1:8000/memberships/' + userData.username + '/', {
            
        })
        .then(data => data.json())
        .then(data => console.log(data))
        .then((data) => this.setState({ myClubData: data }))
        .catch(error => console.error(error))
    }

    render() {
        return (
            <Grid className='' style={{ borderSpacing: 0 }}>
                <Grid container direction={"row"} justifyContent="space-evenly"
                    alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                        <div className='dashboard-text'>Dashboard</div>
                    </Grid>
                    {/* <Grid item xs={12}>
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
                        {DummyDashboardClubsData.filter((val) => {
                            if (searchTerm == "") {
                                return val
                            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val
                            }
                        }).map((val, key) => {
                            return <div> {val.name} </div>;
                        })}
                    </Grid> */}
                    <Grid item xs={12}>
                        {/* <Autocomplete
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
                        /> */}
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ paddingBottom: '20px' }} className='list-header-text'>My Clubs</div>
                        <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
                            {this.state.myClubData.map((val) => {
                                return <ListItemButton>
                                    <ListItemText primary={val.club_name} />
                                </ListItemButton>
                            })}
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ paddingBottom: '20px' }} className='list-header-text'>Clubs for You</div>
                        <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
                            {DummyDashboardClubsData.map((val) => {
                                return <ListItemButton>
                                    <ListItemText primary={val.name} />
                                </ListItemButton>
                            })}
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack spacing={3}>
                            <div className='list-header-text'>Create new club:</div>
                            <TextField 
                                className='dashboard-text-box' 
                                id="outlined-basic" 
                                label="Name" 
                                name="club_name"
                                variant="outlined"
                                onChange={this.changeHandler}
                                value={this.state.club_name} 
                            />
                            <TextField 
                                className='dashboard-text-box' 
                                id="outlined-basic" 
                                label="Description" 
                                name="mission_statement"
                                variant="outlined" 
                                onChange={this.changeHandler}
                                value={this.state.mission_statement} 
                            />
                            <TextField 
                                className='dashboard-text-box' 
                                id="outlined-basic" 
                                label="Themes" 
                                name="themes"
                                variant="outlined"
                                onChange={this.changeHandler}
                                value={this.state.themes} 
                            />
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
                                            onClick={this.submitForm}
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
}

export default Dashboard;