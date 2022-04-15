import React, {useContext, useEffect, useState} from "react";
import "../../styling/pages/HomeRouter.css";
import {Outlet, useLocation} from "react-router-dom";
import Sidebar from "../../components/core/Sidebar";
import NameHeader from "../../components/NameHeader";
import {Grid} from "@mui/material";
import CsrfToken from "../../components/helper/CsrfToken";
import AuthContext from "../../components/helper/AuthContext";
import HomepageTitle from "../../components/helper/HomepageTitle";


function HomeRouter() {

    let {authTokens, user} = useContext(AuthContext);
    const [userData, setUserData] = useState('')

    let getCurrentUser = async () => {
        let response = await fetch("http://127.0.0.1:8000/user/", {
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

    const pageTabs = [
        {title: 'home', path: '/home'},
        {title: 'profile', path: 'profile'},
        {title: 'movies', path: 'movies'},
        {title: 'clubs', path: 'clubs'},
        {title: 'discussion', path: 'discussion'},
        {title: 'options', path: 'options'},
    ]

    let location = useLocation();
    let pathArray = location.pathname.split('/').filter((x) => x);
    let currentPage = ((pathArray.length > 1) ? pathArray[1] : pathArray[0]);

    return (
        <>
            <CsrfToken/>
            <Grid className={"home-grid"} container>


                <Grid className={"home-grid-L-sidebar"} item xs={3}>

                    <NameHeader
                        firstName={userData.first_name || "error"}
                        lastName={userData.last_name || "error"}
                        username={userData.username || "error"}
                        iconImage={userData.gravatar}
                    />

                    <Sidebar
                        tabs={pageTabs}
                        current={currentPage}
                    />
                </Grid>

                <Grid item xs={9} className={"home-grid-R-content"}>
                    <HomepageTitle title={currentPage}/>
                    <Outlet/>
                </Grid>
            </Grid>
        </>
    );
}

export default HomeRouter;
