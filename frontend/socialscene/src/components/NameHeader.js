import React from 'react'
import "../styling/components/NameHeader.css";
import {Avatar, Box, Stack} from "@mui/material";
import iconImage from "../styling/testIconPic.jpg";



function NameHeader(props) {
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
                  <h4 className={"name-header-text"}>{props.firstName} {props.lastName}<h4--emphasise>.</h4--emphasise></h4>
                  <h6 className={"name-header-text-date"}>joined {props.joinDate}</h6>
              </Stack>
          </Box>
        </Box>
      </div>
    // <table className="name-header-table">
    //   <tbody>
    //     <td>
    //       <Image className='profile-img' src="./logo512.png" alt="" />
    //     </td>
    //     <td>
    //       <tr><div style={{ fontFamily: "Helvetica-Bold" }} className='name-td'>Emmanouil</div></tr>
    //       <tr><div style={{ fontFamily: "Helvetica-Bold" }} className='name-td'>Demosthenous</div></tr>
    //     </td>
    //   </tbody>
    // </table>
  )
}

export default NameHeader
