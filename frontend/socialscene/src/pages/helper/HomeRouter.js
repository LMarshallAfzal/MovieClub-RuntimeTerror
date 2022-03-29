import React, {useContext, useEffect, useState} from "react";
import "../../styling/pages/HomeRouter.css";
import { Outlet} from "react-router-dom";
import Sidebar from "../../components/root/Sidebar";
import NameHeader from "../../components/NameHeader";
import { Grid } from "@mui/material";
import CsrfToken from "../../components/helper/CsrfToken";
import AuthContext from "../../components/helper/AuthContext";


function HomeRouter() {
   
    let {authTokens, user} = useContext(AuthContext);
    const [userData, setUserData] = useState('')

    let getCurrentUser = async () => {
		let response = await fetch("http://127.0.0.1:8000/user_image/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + authTokens.access,
			},
		});
		let data = await response.json();
        console.log(data)
        setUserData(data);

	};

    useEffect(() => {
        getCurrentUser();
    }, []);
    
    return (
        <>
        <CsrfToken/>

            <Grid className={"home-grid"} container>

                <Grid className={"home-grid-L-sidebar"} item xs={3}>

                    <NameHeader
                        firstName={user.first_name || "error"}
                        lastName={user.last_name || "error"}
                        username={user.username || "error"}
                        iconImage={userData}
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
