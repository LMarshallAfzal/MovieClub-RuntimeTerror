import { createContext, useContext, useState, useEffect } from "react"
import AuthContext from "../../components/helper/AuthContext";



const ClubContext = createContext();

export default ClubContext;

export const ClubProvider = ({children}) => {
    
    let {user, authTokens} = useContext(AuthContext);
    let [clubData, setClubData] = useState([]);
    let [recommendedClubData, setRecommendedClubData] = useState([]);


    let getUsersClubs = async (e) => {
        e.preventDefault();
        let response = await fetch('http://127.0.0.1:8000/get_user_joined_clubs/' + user.user_id +'/', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setClubData(data)
    }

    let getRecommendedClubs = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/rec/clubs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setRecommendedClubData(data)
    }

    useEffect((e) => {
        getRecommendedClubs();
        getUsersClubs()
    })

    let contextData = {
        recommendedClubData: recommendedClubData,
        clubData: clubData
    }

    return (
        <ClubContext.Provider value={contextData}>
            {children}
        </ClubContext.Provider>
    )
}