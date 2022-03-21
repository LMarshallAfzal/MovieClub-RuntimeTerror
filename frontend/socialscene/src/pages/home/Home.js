import React, {useContext} from 'react';
import "../../styling/pages/Home.css";
import { List, Paper, ListSubheader, Grid, TextField, Stack, Box, ListItemButton, ListItemText, Autocomplete, Button } from "@mui/material";
import FormButton from "../../components/FormButton";
import { DummyDashboardClubsData, meetings, movies } from '../data/DummyDashboardClubsData';
import { useState, useEffect } from 'react'
import AuthContext from "../../components/helper/AuthContext";
import CsrfToken from "../../components/helper/CsrfToken";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";





const Home = () =>  {
    const [club_name, setClubName] = useState('');
    const [mission_statement, setMissionStatement] = useState('');
    const [themes, setTheme] = useState('');
    const [club, setClub] = useState('');
    const [myClubData, setMyClubData] = useState([]);
    let {user, authTokens} = useContext(AuthContext)
    

    useEffect(() => { 
        getMembershipData()
        // console.log(authTokens.access)
    },[])


    // const changeHandler = (e) => {
    //     setClubName(e.target.club_name.value);
    //     setTheme(e.target.themes.value);
    //     setMissionStatement(e.target.mission_statement.value);
    // }

    let submitCreateClubForm = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/create_club/',{
            method:'POST',
            body:JSON.stringify({
                "club_name": e.target.club_name.value, 
                "mission_statement": e.target.mission_statement.value, 
                "themes": e.target.themes.value
            }),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access),
                // "X-CSRFToken": Cookies.get("csrftoken"),
            }
        })
        let data = await response.json()
        if(response.status === 200) {
            setClub(data)
        }
        
    }

    let getMembershipData = async (e) => {
        // e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/memberships/' + user.user_id +'/', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        console.log(data)
        setMyClubData(data)
    }

    return (
        <Grid className='' style={{ borderSpacing: 0 }}>
            <Grid 
                container 
                direction={"row"} 
                justifyContent="space-evenly"
                alignItems="flex-start" 
                spacing={2}
            >
                <Grid item xs={12}>
                <div className={"home-page-title"}>
                    <h3>home<h3--emphasise>.</h3--emphasise></h3>
                </div>
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
                    <div style={{ paddingBottom: '20px' }} className='list-header-text'>
                        My Clubs
                    </div>
                    <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
                        {myClubData.map((val) => {
                            return (
                                <ListItemButton>
                                    <ListItemText primary={val.club_name} />
                                </ListItemButton>
                            );
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
                    <Box container component="form" onSubmit={submitCreateClubForm}>
                    <Stack spacing={3}>
                        <div className='list-header-text'>Create new club:</div>
                        <TextField 
                            className='dashboard-text-box' 
                            id="outlined-basic" 
                            label="Name" 
                            name="club_name"
                            variant="outlined"
                            // onChange={changeHandler()}
                            // value={club_name} 
                        />
                        <TextField 
                            className='dashboard-text-box' 
                            id="outlined-basic" 
                            label="Description" 
                            name="mission_statement"
                            variant="outlined" 
                            // onChange={changeHandler()}
                            // value={mission_statement} 
                        />
                        <TextField 
                            className='dashboard-text-box' 
                            id="outlined-basic" 
                            label="Themes" 
                            name="themes"
                            variant="outlined"
                            // onChange={this.changeHandler}
                            // value={themes} 
                        />
                        {/* <div className={"single-button"}> */}
                            {/* <Box component="form" onSubmit={submitCreateClubForm}
                                sx={{
                                    display: 'grid',
                                    gridAutoColumns: '1fr',
                                    gap: 1,
                                }}
                            > */}
                                {/* <Box component="form" onSubmit={submitCreateClubForm} sx={{ gridRow: '1', gridColumn: 'span 1' }}> */}
                                    <Button className="Button"
                                        // text={"Create"}
                                        type="submit"
                                        // onClick={submitCreateClubForm()}
                                        // onChange={getMembershipData()}

                                    >
                                        Create
                                    </Button>    
                                {/* </Box> */}
                            {/* </Box> */}
                        {/* </div> */}
                    </Stack>
                    </Box>
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

export default Home;