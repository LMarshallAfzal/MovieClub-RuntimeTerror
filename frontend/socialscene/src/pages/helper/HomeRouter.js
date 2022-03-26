import React, {useContext} from "react";
import "../../styling/pages/HomeRouter.css";
import { Outlet} from "react-router-dom";
import Sidebar from "../../components/root/Sidebar";
import NameHeader from "../../components/NameHeader";
import { Grid } from "@mui/material";
import CsrfToken from "../../components/helper/CsrfToken";
import AuthContext from "../../components/helper/AuthContext";


function HomeRouter() {
   
    let {user} = useContext(AuthContext)

    // if(!user) return null
    
    return (
        <>
        <CsrfToken/>

            <Grid className={"home-grid"} container>

                <Grid className={"home-grid-L-sidebar"} item xs={3}>

                    <NameHeader
                        firstName={user.first_name || "error"}
                        lastName={user.last_name || "error"}
                        username={user.username || "error"}
                    />
                    <Sidebar />
                </Grid>

                <Grid className={"home-grid-R-content"} item xs={9}>
                    <Outlet/>
                </Grid>
            </Grid>
        </>
    );
}

export default HomeRouter;
