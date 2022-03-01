import React from 'react'
import "../styling/components/NameHeader.css";
import {Avatar, Box, Stack} from "@mui/material";
import iconImage from "../styling/testIconPic.jpg";


function NameHeader(props) {
const userData = JSON.parse(localStorage.getItem('user'))
  return (
      <div className={"name-header"}>
        <Box
            sx={{
                display: 'grid',
                gridAutoColumns: '1fr',
                gap: 1,
                height: '100%',
                alignItems: 'center',
            }}
        >
          <Box sx={{ gridRow: '1', gridColumn: 'span 2' }}>
              <div className={"name-header-image"}>
                  <Avatar
                      alt={props.firstName + " " + props.lastName}
                      src={iconImage}
                      sx={{width: "100%", height: "100%"}}
                  />
              </div>

          </Box>

          <Box sx={{ gridRow: '1', gridColumn: 'span 3'}}>
              <Stack>
                  <h4 className={"name-header-text"}>{userData.first_name} {userData.last_name}<h4--emphasise>.</h4--emphasise></h4>
                  <h6 className={"name-header-text-date"}>joined {props.joinDate}</h6>
              </Stack>
          </Box>
        </Box>
      </div>
  )
}

export default NameHeader
