import React, {useContext, useState, useEffect} from 'react'
import "../styling/pages/Profile.css";
import { Box, Stack, TextField, Button, Grid } from "@mui/material";
import FormButton from "../components/FormButton";
import AuthContext from "../components/AuthContext";


const Profile = () => {
    const [userData, setUserData] = useState('')
    let {user, authTokens} = useContext(AuthContext)

    const handleChange = (event) => {
        setUserData( prevData => ({...prevData, [event.target.name]: event.target.value}))
     }; 

    let submitChangeProfileForm = async (e) => {
        let response = await fetch('http://127.0.0.1:8000/edit_profile/' + user.user_id ,{
            method:'PUT',
            body:JSON.stringify({
                "username": e.target.username.value, 
                "first_name": e.target.first_name.value, 
                "last_name": e.target.last_name.value,
                "email": e.target.email.value,
                "bio": e.target.bio.value, 
                "preferences": e.target.preferences.value
            }),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setUserData(data)
    }

    let getUserData = async (e) => {
        let response = await fetch("http://127.0.0.1:8000/user/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            }
        })
        let data = await response.json()
        setUserData(data)
    }

    useEffect((e) => {
        // e.preventDefault()
        getUserData();
    },[])

    return (
        <table className='profile-table' >
            <tr>
                <div className='edit-profile-info-text'>Edit profile info</div>
            </tr>
                <Grid item>
                    <Box component="form" onSubmit={submitChangeProfileForm}>
                        <Stack spacing={2}>
                            <TextField className='profile-text-box'
                                id={"outlined-basic"}
                                label={"username"}
                                name={"username"}
                                type={"text"}
                                variant={"outlined"}
                                value={userData.username}
                                onChange={handleChange}
                            />
                            <TextField className='profile-text-box'
                                id={"outlined-basic"}
                                label={"first name"}
                                name={"first_name"}
                                type={"text"}
                                variant={"outlined"}
                                value={userData.first_name}
                                onChange={handleChange}
                            />
                            <TextField className='profile-text-box'
                                id={"outlined-basic"}
                                label={"last name"}
                                name={"last_name"}
                                type={"text"}
                                variant={"outlined"}
                                value={userData.last_name}
                                onChange={handleChange}
                            />
                            <TextField className='profile-text-box'
                                id={"outlined-basic"}
                                label={"email"}
                                name={"email"}
                                type={"email"}
                                variant={"outlined"}
                                value={userData.email}
                                onChange={handleChange}
                            />
                            <TextField className='profile-text-box'
                                spacing={6}
                                id={"outlined-multiline-static"}
                                label={"bio"}
                                name={"bio"}
                                type={"text"}
                                variant={"outlined"}
                                multiline
                                rows={7.5}
                                value={userData.bio}
                                onChange={handleChange}
                            />
                            <div className={"single-button"}>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridAutoColumns: '1fr',
                                        gap: 1,
                                    }}
                                >
                                    {/* <Box sx={{ gridRow: '1', gridColumn: 'span 1' }}>
                                        <FormButton
                                            text={"cancel"}
                                        />
                                    </Box> */}
                                </Box>
                            </div>
                        </Stack>
                    {/* </td> */}
                    {/* <td className='text-field'> */}
                        <Stack spacing={2}>
                            <TextField className='profile-text-box'
                                spacing={6}
                                id={"outlined-multiline-static"}
                                label={"preferences"}
                                name={"preferences"}
                                type={"text"}
                                variant={"outlined"}
                                multiline
                                rows={20}
                                value={userData.preferences}
                                onChange={handleChange}
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
                                        <Button
                                            // text={"save changes"}
                                            // onClick={this.submitForm}
                                            type="submit"
                                        >
                                            save changes
                                        </Button>        
                                    </Box>
                                </Box>
                            </div>
                        </Stack>
                    {/* </td> */}
                
                </Box>
            </Grid>    
        </table >
    );
}
export default Profile;
