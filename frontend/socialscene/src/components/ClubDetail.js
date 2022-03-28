import React, {useContext, useState, useEffect} from "react";
import {useParams, Outlet, useNavigate} from "react-router";
import {
    Avatar,
    Box,
    Chip,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    ListItem,
    Stack,
    TextField
} from "@mui/material";
import "../styling/components/ClubDetail.css";
import FormButton from "./FormButton";
import {DummyClubData} from "../pages/data/DummyClubsData";
import ClubListing from "./ClubListing";
import {DummyClubMemberData} from "../pages/data/DummyClubMemberData";
import AuthContext from "../components/helper/AuthContext";



function ClubDetail() {
    // const [open, setOpen] = React.useState(false);

    let { clubID } = useParams();
    let {user, authTokens, useCallback} = useContext(AuthContext);
    const [clubMembers, setClubMembers] = useState([]);
    let [recommendedClubData, setRecommendedClubData] = useState([]);
    let [myClubData, setMyClubData] = useState([]);
    const [wantedClub, setWantedClub] = useState([]);

    const [showBannedMembers, setBannedMembers] = useState(false);
    const [showBanDialog, setBanDialog] = useState(false);
    const [showDeleteClubDialog, setDeleteClubDialog] = useState(false);
    const [edit, setEdit] = useState(true);


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
        setMyClubData(data)
    }

    let getRecommendedClubs = async (e) => {
        let response = await fetch('http://127.0.0.1:8000/rec_clubs/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setRecommendedClubData(data)
    }

    // let club = (myClubData.find(obj => obj.ID === clubID)) || (recommendedClubData.find(obj => obj.ID === clubID));
    let getSpecifiedClub = async () => {
        for(let i=0; recommendedClubData.length > i; i++) {
            if(recommendedClubData[i].id === clubID) {
                setWantedClub(recommendedClubData[i].id)
                // console.log("passed")
            }
            else { 
                console.log("failed")
            }
        }    
        for(let i=0; myClubData.length > i; i++) {
            if(myClubData[i].id === clubID) {
                setWantedClub(myClubData[i].id)
                // console.log("passed")                
            } 
            else { 
                console.log("failed")
            } 
        }
    }    

    const toggleEdit = () => {
        setEdit(!edit);
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

    // function HandleUserClick(props) {
    //      const navigate = useNavigate();
    //      return useCallback(() => navigate(`${props}`, {replace: false}), [props,navigate]);
    // }

    

    const handleBannedUserClick = () => {
        console.log("User Clicked");
    }

    let getClubMembers = async () => {
        // getSpecifiedClub()
        let response = await fetch('http://127.0.0.1:8000/club_members/' + clubID +'/', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setClubMembers(data)
        console.log(clubMembers)
    }

    let joinClub = async () => {
        let response = await fetch('http://127.0.0.1:8000/join_club/' + clubID +'/', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
    }

    let leaveClub = async () => {
        let response = await fetch('http://127.0.0.1:8000/leave_club/' + clubID +'/', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
    }

    useEffect(() => {
        getSpecifiedClub()
        getMembershipData()
        getRecommendedClubs()
        getClubMembers()

    },[])


    function UserDisplay() {
        if (showBannedMembers === false) {
            return (
                    <>
                        {clubMembers.map((user) => {
                            return (
                                <Chip
                                    label={user.username}
                                    avatar={
                                    <Avatar
                                        src={user.iconImage}
                                        alt={user.username}
                                    />}
                                    onDelete={openBanDialog}
                                    // onClick={HandleUserClick(user.ID)}
                                    sx={ {mr: 1, mt: 1}}
                                 />
                            )
                        })}
                </>)
        } else {
            return (
                    <>
                        {clubMembers.map((user) => {
                            return (
                                <Chip
                                    label={user.username}
                                    avatar={
                                    <Avatar
                                        src={user.iconImage}
                                        alt={user.username}
                                    />}
                                    onDelete={handleUnBan}
                                    onClick={handleBannedUserClick}
                                    sx={ {mr: 1, mt: 1}}
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
                <h4 className={"home-page-sub-section-heading"}>{wantedClub.club_name}</h4>
            </Grid>

            <Grid item xs={6} maxHeight={"inherit"} sx={{ display: "flex", flexDirection: "column" }}>

                    <div className={"home-page-card-background"}>
                        <Grid container spacing={2} padding={2}>

                            <Grid item xs={12}>
                                <h5 className={"home-page-card-title"}>{showBannedMembers ? "banned users" : "members"}</h5>
                            </Grid>

                            <Grid item xs={12} overflow={"auto"}>
                                    <UserDisplay style={{overflow: "auto"}}/>
                            </Grid>
                        </Grid>
                    </div>
            </Grid>

            <Grid item xs={3} sx={{ display: "flex", flexDirection: "column" }}>

                <Stack spacing={2} sx={{height: "100%"}}>
                    <Dialog
                        open={showDeleteClubDialog}
                        onClose={closeDeleteClubDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">

                        <DialogTitle id="alert-dialog-title">
                            <h4>delete this club<h4--emphasise>?</h4--emphasise></h4>
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <h6>this club will be deleted and all associated data</h6>
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <FormButton
                                onClick={handleClubDelete}
                                text={"delete"}
                                style={"primary"}
                            />
                            <FormButton onClick={closeDeleteClubDialog} text={"cancel"} />
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={showBanDialog}
                        onClose={closeBanDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">

                        <DialogTitle id="alert-dialog-title">
                            <h4>also ban this user<h4--emphasise>?</h4--emphasise></h4>
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <h6>decide whether this user will also be banned from the club or just removed</h6>
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <FormButton onClick={handleBan} text={"ban"} style={"primary"}/>
                            <FormButton onClick={handleRemoveUser} text={"remove"} />
                        </DialogActions>
                    </Dialog>

                    <FormButton 
                    text={"join"} 
                    style={wantedClub.isMember ? "disabled" : "primary"}
                    onClick={() => joinClub()} 
                    />

                    <FormButton 
                    text={"leave"} 
                    style={wantedClub.isMember ? "primary" : "disabled"} 
                    onClick={() => leaveClub()}
                    />

                    <FormButton 
                    text={"delete"} style={wantedClub.isOrganiser ? "primary" : "disabled"} 
                    onClick={openDeleteClubDialog} 
                    // onClick={deleteClub(props.clubID)}
                    />

                    <FormButton 
                    text={showBannedMembers ? "members" : "banned"} 
                    style={"normal"} 
                    onClick={toggleBannedView} 
                    />
                </Stack>
            </Grid>

            <Grid item xs={3} sx={{ display: "flex", flexDirection: "column" }}>
                <Stack spacing={2} sx={{height: "100%"}}>
                    <TextField
                        id="outlined"
                        label="club name"
                        defaultValue={wantedClub.club_name}
                    />
                    <TextField
                        id="outlined"
                        label="club description"
                        defaultValue={wantedClub.mission_statement}
                    />
                    <TextField
                        id="outlined"
                        label="club theme"
                        defaultValue={wantedClub.theme}
                    />

                    <FormButton text={edit ? "edit" : "save"} style={edit ? "normal" : "primary"} onClick={toggleEdit}/>
                </Stack>
            </Grid>

            <Grid item xs={12}>
                <Outlet />
            </Grid>
        </Grid>
    );
}

export default ClubDetail;