import React from "react";
import EditUser from "../components/EditUser";
import Add from "../components/Add";


function UpdateProfile() {  
    return (
        <>
            <div class="container">
                <div class = "row">
                    <div class = "col-12">
                        <h1>Update Profile</h1>
                    </div>
                </div>
            </div>
            <EditUser/>
        </>
        

    );
}
export default UpdateProfile