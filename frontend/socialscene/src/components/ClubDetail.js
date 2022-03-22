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
    const [showBanAlert, setBanAlert] = React.useState(false);

    let { clubID } = useParams();
    let club = DummyClubData.find(obj => obj.ID === clubID);

     const toggleBannedView = () => {
        setBannedMembers(!showBannedMembers);
    }

    const closeBannedDialog = () => {
        setBanAlert(false);
    }

    const openBannedDialog = () => {
         setBanAlert(true);
    }



    const handleDelete = () => {
        console.log("User Deleted");
    }

    const handleBan = () => {
        console.log("User Banned");
        closeBannedDialog();
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
                        open={showBanAlert}
                        onClose={closeBannedDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">

                        <DialogTitle id="alert-dialog-title">
                            do you also want to block this user?
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                this user will be blocked from the group and will no longer have access
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <FormButton onClick={handleBan} text={"confirm"} />
                            <FormButton onClick={closeBannedDialog} text={"cancel"} />
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
                                onDelete={openBannedDialog}
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
                    <FormButton text={"join"} />

                    <FormButton text={"leave"} />

                    <FormButton text={"delete"} />

                    <FormButton text={showBannedMembers ? "members" : "banned"} onClick={toggleBannedView} />
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