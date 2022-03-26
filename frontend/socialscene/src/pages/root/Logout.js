import React, {useCallback} from "react";
import "../../styling/pages/Logout.css";
import {useNavigate} from "react-router";
import {Grid, Stack} from "@mui/material";
import HeadingCircle from "../../components/HeadingCircle";
import FormButton from "../../components/FormButton";

function Logout() {
    // let {logoutUser} = useContext(AuthContext)
    //
    // useEffect(() => {
    //     logoutUser()
    // }, [])

    const navigate = useNavigate();
    const goHome = useCallback(() => navigate('/', {replace: false}), [navigate]);
    const goLogin = useCallback(() => navigate('/login', {replace: false}), [navigate]);

    return (
        <Grid container
              direction={"row"}
              spacing={2}
              className={"logout-grid"}
        >

            <Grid item
                  xs={6}
                  className={"logout-grid-child"}
            >

                <HeadingCircle title={"logged out"} />
            </Grid>

            <Grid item
                  xs={6}
                  className={"logout-grid-child"}
            >

                <Stack className={"logout-form-stack"}
                           spacing={3}
                           alignItems={"center"}>

                    <div className={"logout-row"}>
                        <FormButton
                        text={"home"}
                        style={"normal"}
                        onClick={goHome}
                        />
                    </div>

                    <div className={"logout-row"}>
                        <FormButton
                        text={"login"}
                        style={"primary"}
                        onClick={goLogin}
                        />
                    </div>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Logout;
