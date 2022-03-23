import React, {useContext, useEffect} from "react";
import "../../styling/pages/NotFound.css";
import AuthContext from "../../components/helper/AuthContext";




function AuthenticatedEnter() {
    let {loginUser} = useContext(AuthContext)

    useEffect(() => {
        loginUser()

    }, [])

    return (
        <></>
    )
}

export default AuthenticatedEnter;
