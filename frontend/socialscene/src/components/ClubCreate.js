import React, {useState, useEffect, useContext} from "react";
import {Autocomplete, Box, Grid, Stack, TextField, Alert} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ThemeButton from "./core/ThemeButton";
import "../styling/components/ClubCreate.css";
import {themes} from "../resources/data/MovieThemes"
import AuthContext from "../components/helper/AuthContext";



function ClubCreate() {
    let {authTokens} = useContext(AuthContext)

    const [club, setClub] = useState('');
    const [alert, setAlert] = useState(false);

    const onChange = (e) => {
        setClub( fieldData => ({...fieldData, [e.target.name]: e.target.value}))
    }; 

    useEffect(() => {
        setAlert(false)
    }, [])

    const handleChange = (event, value) => {
        console.log(value.theme)
		setClub((fieldData) => ({
			...fieldData,
			theme: value.theme,
		}));
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
        if(response.status === 201) {
            setClub(data)
            setAlert(true)
            
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

                <Box padding={1} className={"home-page-sub-title"}>
                    <h4 className={"sub-title-text"}>new club:</h4>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Stack spacing={2}>
                    {alert ? <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Successfully created {club.club_name}!</Alert>: <></>}
                    <TextField
                        id={"outlined-required"}
                        label={"name"}
                        name={"club_name"}
                        value={club.club_name}
                        required
                        placeholder={"choose a club name"}
                        onChange={e => onChange(e)}
                    />

                    <TextField
                        id={"outlined-required"}
                        label={"description"}
                        name={"mission_statement"}
                        value={club.mission_statement}
                        required
                        placeholder={"short club description"}
                        onChange={e => onChange(e)}
                    />

                    <Autocomplete
                        required
                        id="tags-standard"
                        name={'theme'}
                        options={themes}
                        getOptionLabel={(option) => option.theme}
                        filterSelectedOptions
                        value={club.theme}
                        onChange={handleChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                spacing={6}
                                id={"outlined-basic"}
                                label={"theme"}
                                name={"theme"}
                                type={"text"}
                                variant={"outlined"}
                                multiline
                                placeholder={"choose the club theme"}
                            />
                        )}
                    />
                    <ThemeButton 
                        text={"create"} 
                        style={"primary"} 
                        onClick={submitCreateClubForm}
                    />
                </Stack>
            </Grid>
        </Grid>
    );
}

export default ClubCreate;