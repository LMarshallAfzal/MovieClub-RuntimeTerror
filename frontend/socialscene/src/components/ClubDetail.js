import React, {useCallback, useState} from "react";
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
    TextField,
    Autocomplete
} from "@mui/material";
import "../styling/components/ClubDetail.css";
import FormButton from "./FormButton";
import { DummyClubData } from "../pages/data/DummyClubsData";
import { DummyClubMemberData } from "../pages/data/DummyClubMemberData";
import { themes } from "../pages/data/MovieThemes"


function ClubDetail() {
    const [showBannedMembers, setBannedMembers] = useState(false);
    const [showBanDialog, setBanDialog] = useState(false);
    const [showDeleteClubDialog, setDeleteClubDialog] = useState(false);
    const [edit, setEdit] = useState(true);

    let { clubID } = useParams();
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

    function HandleUserClick(props) {
         const navigate = useNavigate();
         return useCallback(() => navigate(`${props}`, {replace: false}), [navigate]);
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
                                onClick={HandleUserClick(user.ID)}
                                sx={ {mr: 1, mt: 1}}
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
                                    sx={{ mr: 1, mt: 1 }}
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

            <Grid item xs={6} maxHeight={"inherit"} sx={{ display: "flex", flexDirection: "column" }}>

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

            <Grid item xs={3} sx={{ display: "flex", flexDirection: "column" }}>

                <Stack spacing={2} sx={{ height: "100%" }}>
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

                    <FormButton text={"join"} style={club.isMember ? "disabled" : "primary"} />

                    <FormButton text={"leave"} style={club.isMember ? "primary" : "disabled"} />

                    <FormButton text={"delete"} style={club.isOrganiser ? "primary" : "disabled"} onClick={openDeleteClubDialog} />

                    <FormButton text={showBannedMembers ? "members" : "banned"} style={"normal"} onClick={toggleBannedView} />
                </Stack>
            </Grid>

            <Grid item xs={3} sx={{ display: "flex", flexDirection: "column" }}>
                <Stack spacing={2} sx={{ height: "100%" }}>
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