import React from 'react'
import "../styling/components/NameHeader.css";
import {Avatar, Box, Grid, Stack} from "@mui/material";
import iconImage from "../styling/images/testIconPic.jpg";
import {DummyClubData} from "../pages/data/DummyClubsData";


function NameHeader(props) {

    const messages = [
        {timeID: 1, message: "good morning, "},
        {timeID: 2, message: "welcome, "},
        {timeID: 3, message: "good evening, "}
    ]

    let today = new Date();
    let time = today.getHours();

    function getTimePeriod() {
        if (time <= 12) {
            return 1
        } else if (time <= 17) {
            return 2
        } else {
            return 3
        }
    }

    let currentMessage = messages.find(obj => obj.timeID === getTimePeriod());



  return (
      <div className={"name-header"}>
          <Grid container spacing={2}
                padding={2}
                alignItems={"center"}
                direction={"row"}
          >

              <Grid item xs={4}>

                  <div className={"name-header-image"}>

                      <Avatar
                          alt={props.firstName + " " + props.lastName}
                          src={props.iconImage}
                          sx={{width: 1, height: 1}}
                      />
                  </div>
              </Grid>

              <Grid item xs={8}>

                  <Stack>
                      <h5 className={"name-header-text"}>{currentMessage.message}</h5>
                      <h4 className={"name-header-name"}>{props.firstName} {props.lastName}</h4>

                      <h6 className={"name-header-text-date"}>{props.username}</h6>
                  </Stack>
              </Grid>
          </Grid>
      </div>
  )
}

export default NameHeader
