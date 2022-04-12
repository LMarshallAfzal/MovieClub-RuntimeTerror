import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Avatar, Alert,AvatarGroup, Checkbox, Chip, FormControlLabel, Grid, Stack } from "@mui/material";
import icon5 from "../resources/images/example icons/icon5.jpeg"
import "../styling/components/ClubCard.css";
import RoundButton from "./core/RoundButton";
import { Link } from "react-router-dom";
import AuthContext from "../components/helper/AuthContext";
import NotificationsAddIcon from "@mui/icons-material/NotificationAdd";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CheckIcon from "@mui/icons-material/Check";
import { FaCrown } from "react-icons/fa";
import useFetch from "../components/helper/useFetch";





function ClubCard(props) {
    let { clubID } = useParams();
    let { user, authTokens } = useContext(AuthContext);
    const [clubData, setClubData] = useState([]);
    const [members, setMembers] = useState([]);
    const [notifications, setNotifications] = useState(false);
    const [alert, setAlert] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [isMember, setIsMember] = useState(false);
	let api = useFetch();



    let getMembershipData = async (e) => {
        let response = await fetch(
            "http://127.0.0.1:8000/get_user_joined_clubs/" + user.user_id + "/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        if (response.status === 200) {
            setClubData(data);
            console.log(data)
        }
    };

    let toggleNotifications = async (e) => {
        let response = await fetch(
            "http://127.0.0.1:8000/toggle_notifications/" + props.ID + "/",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        if (notifications === false) {
            setNotifications(true);
            setAlert(true)
        }
        else {
            setNotifications(false);
            setAlert(false)
        }
    };

    let getNotificationStatus = async (e) => {
        let response = await fetch(
            "http://127.0.0.1:8000/get_notifications_status/" + props.ID + "/",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        setNotifications(data.notifications);
        notifications = data.notifications
    }


    let getClubMembers = async (e) => {
        let response = await fetch(
            "http://127.0.0.1:8000/club_members/" + props.ID + "/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        if (response.status === 200) {
            setMembers(data);
            userInClub();

        }
    };

    let getClubOwner = async (e) => {
		let {response, data} = await api(`/club_owner/${props.ID}/`, "GET");
		if(response.status === 200) {
			data.find((owner) => owner.username === user.username)
				? setIsOwner(true)
				: setIsOwner(false);
		}
	}

   

    function ClubButton() {
        return (
            <RoundButton
                text={"info"}
                linkTo={`/home/clubs/${props.ID}`}
                onClick={getClubMembers}
            />

        )
    }

    function userInClub(){

        console.log(members)
        members.find((member) => member.id === user.user_id)
            ? setIsMember(true)
            : setIsMember(false);
        
        if (isOwner === true) {
            setIsMember(true);
    }
}

    function ClubChip() {
        if (props.isMember === "M") {

            if (props.isOrganiser) {
                return (
                    <RoundButton text={"create meeting"} linkTo={"/home/discussion"} />
                )
            }
        }
        return (
            <Chip label={props.clubTheme} />
        )
    }
    useEffect(() => {
        getMembershipData();
        getNotificationStatus();
        
    }, [props.id]);

    useEffect(() => {
        getClubOwner();
        getClubMembers();
    },[props])
    return (
        
        <Link className={"club-listing"} to={`/home/clubs/${props.ID}`}>
            {alert ? (
						<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
							Enabled email notifications for {props.clubName}!
						</Alert>
					) : (
						<></>
					)}
            <Grid container spacing={3} padding={2}>
                
                <Grid item xs={4}>
                    
                    <Stack spacing={2} alignItems={"center"} justifyContent={"center"}>
                    
                        <Avatar
                            alt={props.clubName}
                            src={require("../resources/images/club icons/" + props.clubTheme + ".png")} //Add error handling to this
                            sx={{ width: 1, height: 1 }}
                        />
                        <ClubButton />
                    </Stack>
                </Grid>

                <Grid item xs={8}>
                    <Stack spacing={1}>

                        <h4 className={"club-listing-club-name"}>{props.clubName}
                            <h4--emphasise>.</h4--emphasise>
                            {isOwner ? <FaCrown /> : <></>}
                        </h4>

                        <h6 style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden"
                        }}>{props.description}</h6>

                        <ClubChip />

                        <Grid container spacing={1} alignItems={"flex-start"}>
                            <Grid item xs={10} alignItems={"flex-start"}>
                                <AvatarGroup max={4} className={"club-listing-avatars"}>
                                    {members.map((user) => {
                                        return <Avatar alt={user.username} src={icon5} />;
                                    })}
                                </AvatarGroup>
                            </Grid>
                            <Grid item xs={2}>
                                {isMember ? (
                                <FormControlLabel
                                    control={<Checkbox checked = {notifications}
                                    icon={<NotificationsAddIcon />}
                                        checkedIcon={<NotificationsActiveIcon color="primary"/>} 
                                        onClick={(e) => toggleNotifications()}
                                        />}
                                    label={""} />
                                ) : (
                                    <></>
                                )}
                            </Grid>
                        </Grid>

                    </Stack>
                </Grid>
            </Grid>
        </Link>
    );
}

export default ClubCard;
