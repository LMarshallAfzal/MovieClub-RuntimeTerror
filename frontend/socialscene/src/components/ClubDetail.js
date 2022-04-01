import React, {useState} from "react";
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
import "../styling/components/ClubDetail.css";
import ThemeButton from "./core/ThemeButton";
import {DummyClubData} from "../resources/data/DummyClubsData";
import {DummyClubMemberData} from "../resources/data/DummyClubMemberData";
import {themes} from "../resources/data/MovieThemes"


function ClubDetail() {
    const [showBannedMembers, setBannedMembers] = useState(false);
    const [showBanDialog, setBanDialog] = useState(false);
    const [showDeleteClubDialog, setDeleteClubDialog] = useState(false);
    const [edit, setEdit] = useState(true);

    let {clubID} = useParams();
    let club = DummyClubData.find(obj => obj.ID === clubID);

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
                    {DummyClubMemberData.map((user) => {
                        return (
                            <Chip
                                label={user.firstName + " " + user.lastName}
                                avatar={
                                    <Avatar
                                        src={user.iconImage}
                                        alt={user.firstName + " " + user.lastName}
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
                    {DummyClubMemberData.map((user) => {
                        return (
                            <Chip
                                label={user.firstName + " " + user.lastName}
                                avatar={
                                    <Avatar
                                        src={user.iconImage}
                                        alt={user.firstName + " " + user.lastName}
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
                    <h4 className={"sub-title-text"}>{club.clubName}</h4>
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

                    <ThemeButton text={"join"} style={club.isMember ? "disabled" : "primary"}/>

                    <ThemeButton text={"leave"} style={club.isMember ? "primary" : "disabled"}/>

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
                        defaultValue={club.clubName}
                    />

                    <TextField
                        required
                        label={"club description"}
                        defaultValue={club.description}
                    />

                    {/* <TextField
                        id="outlined"
                        label="theme:"
                        defaultValue={club.clubTheme}
                    /> */}
                    <Autocomplete
                        // multiple
                        id="tags-standard"
                        options={themes}
                        getOptionLabel={(option) => option.theme}
                        // defaultValue={club.clubTheme}
                        disableCloseOnSelect
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                // error={preferencesError}
                                // helperText={errorPreferencesText}
                                // required
                                spacing={6}
                                id={"outlined-basic"}
                                label={"theme"}
                                name={"preferences"}
                                type={"text"}
                                variant={"outlined"}
                                multiline
                                // value={userData.preferences}
                                // onChange={e => onChange(e)}
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