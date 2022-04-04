import React, {useState, useEffect, useContext} from "react";
import {Outlet, useNavigate, useParams} from "react-router";
import {
    Autocomplete,
    Avatar,
    Box,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Stack,
    TextField
} from "@mui/material";
import { FaCrown } from 'react-icons/fa';
import "../styling/components/ClubDetail.css";
import ThemeButton from "./core/ThemeButton";
import {themes} from "../resources/data/MovieThemes"
import AuthContext from "../components/helper/AuthContext";


function ClubDetail() {
    const [showBannedMembers, setBannedMembers] = useState(false);
    const [showBanDialog, setBanDialog] = useState(false);
    const [showDeleteClubDialog, setDeleteClubDialog] = useState(false);
    const [edit, setEdit] = useState(true);
	const [isMember, setIsMember] = useState(false);
	const [members, setMembers] = useState([]);
    const [owner,setOwner] = useState([])
	const [club, setClub] = useState([]);
	const [myClubData, setMyClubData] = useState([]);

    let {clubID} = useParams();
	let {user, authTokens} = useContext(AuthContext);

	const onChange = (e) => {
		setClub((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleChange = (event, value) => {
		setClub((fieldData) => ({
			...fieldData,
			theme: value,
		}));
	};

	let getClub = async (e) => {
		let response = await fetch(
			"http://127.0.0.1:8000/club/" + clubID + "/",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
		setClub(data);
	};

    let getClubMembers = async (e) => {
		let response = await fetch(
			"http://127.0.0.1:8000/club_members/" + clubID + "/",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
		setMembers(data);
	};

    let getClubOwner = async (e) => {
        let response = await fetch(
            "http://127.0.0.1:8000/club_owner/" + clubID + "/",
        {method : "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
    },
}
        );
        let data = await response.json();
        setOwner(data);
};


	let getMembershipData = async (e) => {
		let response = await fetch(
			"http://127.0.0.1:8000/memberships/" + user.user_id + "/",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
		setMyClubData(data);
	};

	let joinClub = async () => {
		let response = await fetch(
			"http://127.0.0.1:8000/join_club/" + clubID + "/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
	};

	let leaveClub = async () => {
		let response = await fetch(
			"http://127.0.0.1:8000/leave_club/" + clubID + "/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
	};

	let editClub = async () => {
		let response = await fetch(
			"http://127.0.0.1:8000/edit_club/" + clubID + "/",
			{
				method: "PUT",
				body: JSON.stringify(club),
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
		setClub(data)
	};

	useEffect(() => {
		getClubMembers();
        getClubOwner();
		getMembershipData();
		getClub();
		myClubData.find(val => val.club_id === clubID) ? setIsMember(true) : setIsMember(false);
	}, []);

    const toggleEdit = () => {
        setEdit(!edit);
		if(edit){
			editClub();
		}
    }

    const toggleBannedView = () => {
        setBannedMembers(!showBannedMembers);
    }

    const openBanDialog = () => {
        setBanDialog(true);
    }

    const closeBanDialog = () => {
        setBanDialog(false);
    }

    const openDeleteClubDialog = () => {
        setDeleteClubDialog(true);
    }

    const closeDeleteClubDialog = () => {
        setDeleteClubDialog(false);
    }

    const handleClubDelete = () => {
        closeDeleteClubDialog()
        console.log("Club Deleted");
    }

    const handleRemoveUser = () => {
        closeBanDialog();
        console.log("User Removed");
    }

    const handleBan = () => {
        handleRemoveUser();
        console.log("User Banned");
    }

    const handleUnBan = () => {
        console.log("User Un-Banned");
    }

    const navigate = useNavigate();

    const handleUserClick = (ID) => {
        navigate(`${ID}`, {replace: false});
    }

    const handleBannedUserClick = () => {
        console.log("User Clicked");
    }

    function UserDisplay() {
        if (showBannedMembers === false) {
            return (
                <>
                {owner.map((user,index)=> {
                    return (
                        <Chip
                            key={index}
                            label={user.first_name + " " + user.last_name + " "} 
                            icon ={<FaCrown/>}
                            onClick={() => handleUserClick(user.ID)}
                            sx={{mr: 1, mt: 1}}
                        />
                    
                )})}
                
                    {members.map((user, index) => {
                        return (
                            <Chip
                                key={index}
                                label={user.first_name + " " + user.last_name + " " }
                                avatar={
                                    <Avatar
                                        src={user.iconImage}
                                        alt={user.first_name + " " + user.last_name}
                                    />}
                                onDelete={openBanDialog}
                                onClick={() => handleUserClick(user.ID)}
                                sx={{mr: 1, mt: 1}}
                            />

                        )
                    })}
                </>)
        } else {
            return (
                <>
                    {members.map((user, index) => {
                        return (
                            <Chip
                                key={index}
                                label={user.first_name + " " + user.last_name}
                                avatar={
                                    <Avatar
                                        src={user.iconImage}
                                        alt={user.first_name + " " + user.last_name}
                                    />}
                                onDelete={handleUnBan}
                                onClick={handleBannedUserClick}
                                sx={{mr: 1, mt: 1}}
                            />

                        )
                    })}

                </>)
        }
    }


    return (
        <Grid container
              justifyContent={"center"}
              direction={"row"}
              alignItems={"stretch"}
              spacing={2}
              maxHeight={290}
        >

            <Grid item xs={12}>

                <Box padding={1} className={"home-page-sub-title"}>
                    <h4 className={"sub-title-text"}>{club.club_name}</h4>
                </Box>
            </Grid>

            <Grid item xs={6} maxHeight={"inherit"} sx={{display: "flex", flexDirection: "column"}}>

                <div className={"home-page-card-background"}>
                    <Grid container padding={2}>

                        <Grid item xs={12}>
                            <h5 className={"home-page-card-title"}>{showBannedMembers ? "banned users" : "members"}</h5>
                        </Grid>

                        <Grid item xs={12} overflow={"auto"}>
                            <UserDisplay style={{overflow: "auto"}}/>
                        </Grid>
                    </Grid>
                </div>
            </Grid>

            <Grid item xs={3} sx={{display: "flex", flexDirection: "column"}}>

                <Stack spacing={2} sx={{height: "100%"}}>
                    <Dialog
                        open={showDeleteClubDialog}
                        onClose={closeDeleteClubDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">

                        <DialogTitle id="alert-dialog-title">
                            <h4>delete this club
                                <h4--emphasise>?</h4--emphasise>
                            </h4>
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <h6>this club will be deleted and all associated data</h6>
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <ThemeButton
                                onClick={handleClubDelete}
                                text={"delete"}
                                style={"primary"}
                            />
                            <ThemeButton onClick={closeDeleteClubDialog} text={"cancel"}/>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={showBanDialog}
                        onClose={closeBanDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">

                        <DialogTitle id="alert-dialog-title">
                            <h4>also ban this user
                                <h4--emphasise>?</h4--emphasise>
                            </h4>
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <h6>decide whether this user will also be banned from the club or just removed</h6>
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <ThemeButton onClick={handleBan} text={"ban"} style={"primary"}/>
                            <ThemeButton onClick={handleRemoveUser} text={"remove"}/>
                        </DialogActions>
                    </Dialog>

                    <ThemeButton text={"join"} style={isMember ? "disabled" : "primary"} onClick={() => joinClub()} />

                    <ThemeButton text={"leave"} style={isMember ? "primary" : "disabled"} onClick={() => leaveClub()}/>

                    <ThemeButton text={"delete"} style={club.isOrganiser ? "primary" : "disabled"}
                                 onClick={openDeleteClubDialog}/>

                    <ThemeButton text={showBannedMembers ? "members" : "banned"} style={"normal"}
                                 onClick={toggleBannedView}/>
                </Stack>
            </Grid>

            <Grid item xs={3} sx={{display: "flex", flexDirection: "column"}}>
                <Stack spacing={2} sx={{height: "100%"}}>
                    <TextField
                        required
                        label={"club name"}
                        value={club.club_name}
						onChange={(e) => onChange(e)}
                    />

                    <TextField
                        required
                        label={"club description"}
                        value={club.mission_statement}
						onChange={(e) => onChange(e)}
                    />

                    <Autocomplete
                        multiple
						required
                        id="tags-standard"
                        options={themes}
                        getOptionLabel={(option) => option.theme}
                        defaultValue={club.theme}
						value={club.theme}
						onChange={handleChange}
						filterSelectedOptions
                        disableCloseOnSelect
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
                            />
                        )}
                    />

                    <ThemeButton text={edit ? "edit" : "save"} style={edit ? "normal" : "primary"}
                                 onClick={toggleEdit}/>
                </Stack>
            </Grid>

            <Grid item xs={12}>
                <Outlet/>
            </Grid>
        </Grid>
    );
}

export default ClubDetail;