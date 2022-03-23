import React, {useContext, useEffect} from "react";
import "../../styling/pages/NotFound.css";
import AuthContext from "../../components/helper/AuthContext";




function Logout() {
    let {logoutUser} = useContext(AuthContext)

    useEffect(() => {
        logoutUser()
    }, [])

    return (
        <></>
    )
}

export default Logout;
