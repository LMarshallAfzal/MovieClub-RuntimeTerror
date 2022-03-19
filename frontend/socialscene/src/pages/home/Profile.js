import React, {useContext, useState, useEffect} from 'react'
import "../../styling/pages/Profile.css";
import { Box, Stack, TextField, Button, Grid } from "@mui/material";
import FormButton from "../../components/FormButton";
import AuthContext from "../../components/helper/AuthContext";


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
        <Grid container
              direction={"row"}
              spacing={2}
        >
            <Grid item xs={12}>
                <div className={"home-page-title"}>
                    <h3>profile<h3--emphasise>.</h3--emphasise></h3>
                </div>
            </Grid>

            <Grid item xs={12}>
                <form onSubmit={submitChangeProfileForm}>
                    <Stack spacing={2}>
                        <TextField className={"profile-text-box"}
                                   id={"outlined-basic"}
                                   label={"username"}
                                    name={"username"}
                                    type={"text"}
                                    variant={"outlined"}
                                    value={userData.username}
                                    onChange={handleChange}
                        />

                        <TextField className={"profile-text-box"}
                                   id={"outlined-basic"}
                                   label={"first name"}
                                   name={"first_name"}
                                   type={"text"}
                                   variant={"outlined"}
                                   value={userData.first_name}
                                   onChange={handleChange}
                        />

                        <TextField className={"profile-text-box"}
                                   id={"outlined-basic"}
                                   label={"last name"}
                                   name={"last_name"}
                                   type={"text"}
                                   variant={"outlined"}
                                   value={userData.last_name}
                                   onChange={handleChange}
                        />

                        <TextField className={"profile-text-box"}
                                   id={"outlined-basic"}
                                   label={"email"}
                                   name={"email"}
                                   type={"email"}
                                   variant={"outlined"}
                                   value={userData.email}
                                   onChange={handleChange}
                        />

                        <TextField className={"profile-text-box"}
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

                        <TextField className={"profile-text-box"}
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

                        <FormButton
                            text={"save"}
                            type={"submit"}
                        />
                        </Stack>
                    </form>
                </Grid>
            </Grid>
    );
}
export default Profile;
