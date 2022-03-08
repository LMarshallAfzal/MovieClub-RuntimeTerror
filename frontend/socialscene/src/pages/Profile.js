import React from 'react'
import "../styling/pages/Profile.css";
import { Box, Stack, TextField } from "@mui/material";
import FormButton from "../components/FormButton";

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username:'',
            first_name:'',
            last_name:'',
            email:'',
            bio:'',
            preferences:'',
        }
        this.changeHandler=this.changeHandler.bind(this)
        this.submitForm=this.submitForm.bind(this)
    }

    changeHandler(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    submitForm(){
        // const token = JSON.parse(localStorage.getItem('token'))
        const userData = JSON.parse(localStorage.getItem('user'))
        fetch('http://127.0.0.1:8000/edit_profile/' + userData.username ,{
            method:'PUT',
            body:JSON.stringify(this.state),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response=>response.json())
        .then((data)=>console.log(data))
        localStorage.setItem('user', JSON.stringify(this.state))
    }
    

    fetchData(){
        const userData = JSON.parse(localStorage.getItem('user'))
        console.log(userData)
            this.setState({
                username: userData.username,
                first_name:userData.first_name,
                last_name:userData.last_name,
                email:userData.email,
                bio:userData.bio,
                preferences:userData.preferences,
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <table className='profile-table' >
                <tr>
                    <div className='edit-profile-info-text'>Edit profile info</div>
                </tr>
                <tr>
                    <td className='text-field'>
                        <Stack spacing={2}>
                            <TextField className='profile-text-box'
                                id={"outlined-basic"}
                                label={"username"}
                                name={"username"}
                                type={"text"}
                                variant={"outlined"}
                                value={this.state.username}
                                onChange={this.changeHandler}
                            />
                            <TextField className='profile-text-box'
                                id={"outlined-basic"}
                                label={"first name"}
                                name={"first_name"}
                                type={"text"}
                                variant={"outlined"}
                                onChange={this.changeHandler}
                                value={this.state.first_name}
                            />
                            <TextField className='profile-text-box'
                                id={"outlined-basic"}
                                label={"last name"}
                                name={"last_name"}
                                type={"text"}
                                variant={"outlined"}
                                onChange={this.changeHandler}
                                value={this.state.last_name}
                            />
                            <TextField className='profile-text-box'
                                id={"outlined-basic"}
                                label={"email"}
                                name={"email"}
                                type={"email"}
                                variant={"outlined"}
                                onChange={this.changeHandler}
                                value={this.state.email}
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
                                onChange={this.changeHandler}
                                value={this.state.bio}
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
                    </td>
                    <td className='text-field'>
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
                                onChange={this.changeHandler}
                                value={this.state.preferences}
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
                                            text={"save changes"}
                                            onClick={this.submitForm}
                                        />
                                    </Box>
                                </Box>
                            </div>
                        </Stack>
                    </td>
                </tr>
            </table >
        );

    }
}
export default Profile;
