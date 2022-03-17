import React from 'react';
import "../styling/pages/Home.css";
import { Card, CardContent, Typography, CardActions, Button, Divider, List, Paper, ListSubheader, Grid, TextField, Stack, Box, ListItemButton, ListItemText, Autocomplete } from "@mui/material";
import FormButton from "../components/FormButton";
import { DummyDashboardClubsData, meetings, movies } from './DummyDashboardClubsData';
import { useState } from 'react'


class Home extends React.Component {

    // constructor() {
    //     super()
    //     this.state = {
    //         club_name:'',
    //         mission_statement:'',
    //         themes:'',
    //         myClubData: [],
    //         searchTerm:'',
    //     }
    //     this.changeHandler=this.changeHandler.bind(this)
    //     this.submitForm=this.submitForm.bind(this)
    // }

    // componentDidMount() {
    //     this.fetchMembershipData();
    // }

    // changeHandler(event) {
    //     this.setState({
    //         [event.target.name]:event.target.value
    //     });
    // }

    // submitForm() {
    //     const userData = JSON.parse(localStorage.getItem('user'))
    //     const token = JSON.parse(localStorage.getItem('token'))
    //     fetch('http://127.0.0.1:8000/create_club/',{
    //         method:'POST',
    //         body:JSON.stringify(this.state),
    //         headers:{
    //             'Content-type': 'application/json; charset=UTF-8',
    //             Authorization: token    
    //         },
    //     })
    //     .then(response=>response.text())
    //     .then((data)=>console.log(data))
    //     localStorage.setItem('clubs', JSON.stringify({club_name:this.state.club_name, mission_statement: this.state.mission_statement, themes: this.state.theme, club_owner: userData}))
    //     this.setState({
    //         club_name:'',
    //         mission_statement:'',
    //         themes:'',
    //     })
    //     console.log(this.state)
    // }

    // fetchMembershipData() {
    //     const userData = JSON.parse(localStorage.getItem('user'))
    //     fetch('http://127.0.0.1:8000/memberships/' + userData.username + '/', {})
    //         .then(data => data.json())
    //         // .then(data => console.log(data))
    //         .then((data) => this.setState({ myClubData: data }))
    //         .catch(error => console.error(error))
    // }



    render() {
        const bull = (
            <Box
                component="span"
                sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
            >
            </Box>
        );
        return (
            <>
                <Grid className='' style={{ borderSpacing: 0 }}>
                    <Grid
                        container
                        direction={"row"}
                        justifyContent="space-evenly"
                        alignItems="flex-start"
                    >
                        <Grid item xs={12}>
                            <div className='dashboard-text'>Dashboard</div>
                        </Grid>
                        <Paper style={{ maxHeight: 300, width: '100%' }}>
                            {/* {* notifications to organiser need to create meeting*.map((val) => { */}
                            {/* return */}
                            <Card sx={{ width: "100%" }}>
                                <CardContent>
                                    <Typography variant="h5" component="div" paddingBottom={"10px"}>
                                        {/* Change 'this club' to club name. */}
                                        You are the organiser of *this club*.
                                    </Typography>
                                    <Typography variant="h8">
                                        Create a new meeting for the club.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <FormButton text="Create new meeting" size="small"></FormButton>
                                </CardActions>
                            </Card>
                            {/* })} */}
                        </Paper>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default Home;