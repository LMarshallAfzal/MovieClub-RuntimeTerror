import React, {useContext, useState, useEffect} from 'react'
import "../styling/pages/Profile.css";
import { Box, Stack, TextField, Button, Grid } from "@mui/material";
import FormButton from "../components/FormButton";
import AuthContext from "../components/AuthContext";


const Profile = () => {
    const [userData, setUserData] = useState('')
    let {user, authTokens} = useContext(AuthContext)

    const [usernameError, setUsernameError] = useState(false)
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [bioError, setBioError] = useState(false)
    const [preferencesError, setPreferencesError] = useState(false)

    const [errorUsernameText, setUsernameErrorText] = useState('')
    const [errorFirstNameText, setFirstNameErrorText] = useState('')
    const [errorLastNameText, setLastNameErrorText] = useState('')
    const [errorEmailText, setEmailErrorText] = useState('')
    const [errorBioText, setBioErrorText] = useState('')
    const [errorPreferencesText, setPreferencesErrorText] = useState('')
    const [errorPasswordText, setPasswordErrorText] = useState('')

    const onChange = (e) => {
        setUserData( prevData => ({...prevData, [e.target.name]: e.target.value}))
     }; 

     let resetErrorState = () => {
        setUsernameError(false);
        setFirstNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setBioError(false);
        setPreferencesError(false);

        setUsernameErrorText('');
        setFirstNameErrorText('');
        setLastNameErrorText('');
        setEmailErrorText('');
        setBioErrorText('');
        setPreferencesErrorText('');
    }

    let errorHandler = (e, data) => {
        e.preventDefault()
        if((Object.keys(data)).includes('username')) {
            setUsernameError(true)
            setUsernameErrorText(data.username)
        }
        if((Object.keys(data)).includes('first_name')) {
            setFirstNameError(true)
            setFirstNameErrorText(data.first_name)
        }
        if((Object.keys(data)).includes('last_name')) {
            setLastNameError(true)
            setLastNameErrorText(data.last_name)
        }
        if((Object.keys(data)).includes('email')) {
            setEmailError(true)
            setEmailErrorText(data.email)
        }
        if((Object.keys(data)).includes('bio')) {
            setPreferencesError(true)
            setBioErrorText(data.bio)
        }
        if((Object.keys(data)).includes('preferences')) {
            setPreferencesError(true)
            setPreferencesErrorText(data.preferences)
        }
    };

    let submitChangeProfileForm = async (e) => {
        e.preventDefault();
        resetErrorState();
        let response = await fetch('http://127.0.0.1:8000/edit_profile/' + user.user_id ,{
            method:'PUT',
            body:JSON.stringify({
                "username": userData.username, 
                "first_name": userData.first_name, 
                "last_name": userData.last_name,
                "email": userData.email,
                "bio": userData.bio, 
                "preferences": userData.preferences
            }),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        if(response.status === 200) {
            setUserData(data)
        }
        else {
            errorHandler(e, data)
        }
        
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

    useEffect(() => {
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
                                error={usernameError}
                                helperText={errorUsernameText}
                                required
                                id={"outlined"}
                                label={"username"}
                                name={"username"}
                                type={"text"}
                                variant={"outlined"}
                                value={userData.username}
                                onChange={e => onChange(e)}
                            />
                            <TextField className='profile-text-box'
                                error={firstNameError}
                                helperText={errorFirstNameText}
                                required
                                id={"outlined-basic"}
                                label={"first name"}
                                name={"first_name"}
                                type={"text"}
                                variant={"outlined"}
                                value={userData.first_name}
                                onChange={e => onChange(e)}
                            />
                            <TextField className='profile-text-box'
                                error={lastNameError}
                                helperText={errorLastNameText}
                                required
                                id={"outlined-basic"}
                                label={"last name"}
                                name={"last_name"}
                                type={"text"}
                                variant={"outlined"}
                                value={userData.last_name}
                                onChange={e => onChange(e)}
                            />
                            <TextField className='profile-text-box'
                                error={emailError}
                                helperText={errorEmailText}
                                required
                                id={"outlined-basic"}
                                label={"email"}
                                name={"email"}
                                type={"email"}
                                variant={"outlined"}
                                value={userData.email}
                                onChange={e => onChange(e)}
                            />
                            <TextField className='profile-text-box'
                                error={bioError}
                                helperText={errorBioText}
                                spacing={6}
                                id={"outlined-multiline-static"}
                                label={"bio"}
                                name={"bio"}
                                type={"text"}
                                variant={"outlined"}
                                multiline
                                rows={7.5}
                                value={userData.bio}
                                onChange={e => onChange(e)}
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
                                            text={"cancel"}
                                        />
                                    </Box>
                                </Box>
                            </div>
                        </Stack>
                    {/* </td> */}
                    {/* <td className='text-field'> */}
                        <Stack spacing={2}>
                            <TextField className='profile-text-box'
                                error={preferencesError}
                                helperText={errorPreferencesText}
                                required
                                spacing={6}
                                id={"outlined-multiline-static"}
                                label={"preferences"}
                                name={"preferences"}
                                type={"text"}
                                variant={"outlined"}
                                multiline
                                rows={20}
                                value={userData.preferences}
                                onChange={e => onChange(e)}
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
                                            type="submit"
                                            text={"submit"}   
                                            onClick={submitChangeProfileForm}
                                        />        
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
