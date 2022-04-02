import React, {useContext, useState} from "react";
import {Box, Grid, Stack, TextField} from "@mui/material";
import HeadingCircle from "../../components/HeadingCircle";
import FormButton from "../../components/FormButton";
import "../../styling/pages/NewClubForm.css";
import AuthContext from "../../components/helper/AuthContext";


function NewClub() {
    let {authTokens} = useContext(AuthContext)

    const [club, setClub] = useState('');

    const onChange = (e) => {
        setClub( fieldData => ({...fieldData, [e.target.name]: e.target.value}))
     }; 

    


    let submitCreateClubForm = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/create_club/',{
            method:'POST',
            body:JSON.stringify({
                "club_name": club.club_name, 
                "mission_statement": club.mission_statement, 
                "theme": club.theme
            }),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access),
            }
        })
        let data = await response.json()
        if(response.status === 200) {
            setClub(data)
        }
    }    

    return (
        <Grid
            container
            justifyContent={"center"}
            direction={"row"}
            alignItems={"flex-start"}
            spacing={2}
        >
            <Grid item xs={12}>
                <h4 className={"new-club-heading"}>new club:</h4>
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={2}>
                    <TextField 
                        className='dashboard-text-box' 
                        id="outlined-basic" 
                        label="Name" 
                        name="club_name"
                        variant="outlined"
                        value={club.club_name}
                        onChange={e => onChange(e)}
                    />
                    <TextField 
                        className='dashboard-text-box' 
                        id="outlined-basic" 
                        label="Description"
                        name="mission_statement"
                        variant="outlined"
                        value={club.mission_statement}
                        onChange={e => onChange(e)}
                    />
                    <TextField 
                        className='dashboard-text-box'
                        id="outlined-basic"
                        label="Themes"
                        name="theme"
                        variant="outlined"
                        value = {club.theme}
                        onChange={e => onChange(e)}
                    />
                    <FormButton 
                        text={"Create"}
                        onClick={submitCreateClubForm}

                    />
                </Stack>
            </Grid>
        </Grid>
    );
}

export default NewClub;
