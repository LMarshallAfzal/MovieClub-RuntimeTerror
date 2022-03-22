import React from "react";
import {useParams} from "react-router";
import {Avatar, Box, Chip, Grid, ListItem, Stack, TextField} from "@mui/material";
import "../styling/components/ClubDetail.css";
import FormButton from "./FormButton";
import {DummyClubData} from "../pages/data/DummyClubsData";
import ClubListing from "./ClubListing";
import {DummyClubMemberData} from "../pages/data/DummyClubMemberData";


function ClubDetail() {
    const [open, setOpen] = React.useState(false);

    let { clubID } = useParams();
    let club = DummyClubData.find(obj => obj.ID === clubID);

    const handleDelete = () => {
        console.log("User Deleted");

    //    Snackbar here
    }

    const handleUserClick = () => {
        console.log("User Clicked");
    }

    


    return (
        <Grid
        container
        justifyContent={"center"}
        direction={"row"}
        alignItems={"flex-start"}
        spacing={2}
        >
            <Grid item xs={12}>
                <h4 className={"club-detail-heading"}>{club.clubName}</h4>
            </Grid>

            <Grid item xs={6}>
                <div className={"club-detail-background"}>
                    <h4 className={"club-member-heading"}>members:</h4>

                    <Box sx={{ flexDirection: 'row',
                        flexWrap: 'wrap',
                        padding:'10px'

                    }}
                    >
                        {DummyClubMemberData.map((user) => {
                            return (
                                <Chip
                                label={user.firstName + " " + user.lastName}
                                avatar={
                                <Avatar
                                    src={user.iconImage}
                                    alt={user.firstName + " " + user.lastName}
                                />}
                                onDelete={handleDelete}
                                onClick={handleUserClick}

                                />

                            )
                        })}

                    </Box>

                </div>


            </Grid>

            <Grid item xs={3}>
                <Stack spacing={2}>
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

                    <FormButton text={"save"}/>

                </Stack>

            </Grid>
            <Grid item xs={3}>
                <Stack spacing={2}>
                    <FormButton text={"create"}/>
                    <FormButton text={"join"}/>
                    <FormButton text={"leave"}/>
                    <FormButton text={"delete"}/>

                </Stack>

            </Grid>

        </Grid>
    );
}

export default ClubDetail;