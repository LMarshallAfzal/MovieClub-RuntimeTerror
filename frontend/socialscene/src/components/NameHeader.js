import React from 'react'
import "../styling/components/NameHeader.css";
import {Avatar, Box, Grid, Stack} from "@mui/material";
import iconImage from "../styling/images/testIconPic.jpg";


function NameHeader(props) {
// const userData = JSON.parse(localStorage.getItem('user'))
  return (
      <div className={"name-header"}>
          <Grid container spacing={2}
                alignItems={"center"}
                direction={"row"}
          >

              <Grid item xs={5}>

                  <div className={"name-header-image"}>

                      <Avatar
                          alt={props.firstName + " " + props.lastName}
                          src={iconImage}
                          sx={{width: "100%", height: "100%"}}
                      />
                  </div>
              </Grid>

              <Grid item xs={7}>

                  <Stack>

                      <h4 className={"name-header-text"}>{props.firstName} {props.lastName}<h4--emphasise>.</h4--emphasise></h4>

                      <h6 className={"name-header-text-date"}>joined: {props.joinDate}</h6>
                  </Stack>
              </Grid>
          </Grid>
      </div>
  )
}

export default NameHeader
