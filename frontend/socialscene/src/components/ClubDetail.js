import React from "react";
import {useParams, Outlet} from "react-router";
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
import {DummyClubMemberData} from "../pages/data/DummyClubMemberData";


function ClubDetail() {
    const [showBannedMembers, setBannedMembers] = React.useState(false);
    const [showBanDialog, setBanDialog] = React.useState(false);
    const [showDeleteClubDialog, setDeleteClubDialog] = React.useState(false);

    let { clubID } = useParams();
    let club = DummyClubData.find(obj => obj.ID === clubID);

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

    const handleUserClick = () => {
        console.log("User Clicked");
    }

    const handleBannedUserClick = () => {
        console.log("User Clicked");
    }


    function UserDisplay() {
        if (showBannedMembers === false) {
            return (
                <>
                    <h4 className={"club-member-heading"}>members:</h4>

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
                                onClick={handleUserClick}
                                sx={ {mr: 1, mt: 1}}
                                />

                            )
                        })}
                </>)
        } else {
            return (<>
                    <h4 className={"club-member-heading"}>banned users:</h4>
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
                                sx={ {mr: 1, mt: 1}}
                                />

                            )
                        })}
                </>)
        }
    }

    return (
        <Grid
        container
        justifyContent={"center"}
        direction={"row"}
        alignItems={"stretch"}
        spacing={2}
        >
            <Grid item xs={12}>
                <h4 className={"club-detail-heading"}>{club.clubName}</h4>
            </Grid>

            <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
                <div className={"club-detail-background"} >
                    <UserDisplay />
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

                    <FormButton text={"join"} style={"primary"} />

                    <FormButton text={"leave"} style={"disabled"}/>

                    <FormButton text={"delete"} style={"normal"} onClick={openDeleteClubDialog} />

                    <FormButton text={showBannedMembers ? "members" : "banned"} style={"normal"} onClick={toggleBannedView} />
                </Stack>
            </Grid>

            <Grid item xs={3} sx={{ display: "flex", flexDirection: "column" }}>
                <Stack spacing={2} sx={{height: "100%"}}>
                    <TextField
                        id="outlined"
                        label="club name"
                        defaultValue={club.clubName}
                    />

                    <TextField
                        id="outlined"
                        label="club description"
                        defaultValue={club.description}
                    />

                    <TextField
                        id="outlined"
                        label="club theme"
                        defaultValue={club.clubTheme}
                    />

                    <FormButton
                        text={"save"}
                        style={"primary"}
                    />
                </Stack>
            </Grid>

            <Grid item xs={12}>
                <Outlet />
            </Grid>
        </Grid>
    );
}

export default ClubDetail;