import React, {useContext, useEffect, useState} from "react";
import "../../styling/pages/HomeRouter.css";
import {Outlet, useLocation} from "react-router-dom";
import Sidebar from "../../components/root/Sidebar";
import NameHeader from "../../components/NameHeader";
import { Grid } from "@mui/material";
import CsrfToken from "../../components/helper/CsrfToken";
import AuthContext from "../../components/helper/AuthContext";
import HomePageTitle from "../../components/HomePageTitle";


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
    console.log(pathArray);
    let currentPage = ((pathArray.length > 1) ? pathArray[1] : pathArray[0]);
    console.log(currentPage);
    
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

                    <Sidebar
                        tabs={pageTabs}
                        current={currentPage}
                    />
                </Grid>

                <Grid item xs={9} height={1}>
                    <HomePageTitle title={currentPage}/>

                    <Grid item xs={12} overflow={"auto"}>
                        <Outlet/>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default HomeRouter;
